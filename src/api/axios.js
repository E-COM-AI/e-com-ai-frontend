// =====================================================
// src/api/axios.js
// Axios 인스턴스 + 자동 로그아웃 처리
// =====================================================

import axios from 'axios';
import { getToken, clearAuthStorage } from '../utils/storage.js';

/**
 * JWT 토큰 만료 여부 확인
 * @param {string} token
 * @returns {boolean} true = 만료됨
 */
const isTokenExpired = (token) => {
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    const now = Math.floor(Date.now() / 1000);
    // 10초 여유를 두고 만료 판단 (네트워크 지연 대비)
    return payload.exp < now + 10;
  } catch {
    return true; // 디코딩 실패 시 만료로 간주
  }
};

/**
 * 인증 만료 처리 - 스토리지 초기화 후 로그인 페이지 이동
 * @param {string} message - 사용자에게 표시할 메시지
 */
const handleAuthExpired = (message) => {
  clearAuthStorage();
  if (window.location.pathname !== '/login') {
    // state로 만료 메시지 전달 (LoginPage에서 표시 가능)
    window.location.href = '/login';
  }
  return Promise.reject(new Error(message));
};

// ─── Axios 인스턴스 생성 ──────────────────────────────

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
    'Accept':       'application/json',
  },
});

// ─── 요청 인터셉터 ────────────────────────────────────

/**
 * [방어선 1] 요청 전 토큰 만료 선제 확인
 * 만료된 토큰으로 요청하지 않고 즉시 자동 로그아웃 처리
 */
apiClient.interceptors.request.use(
  (config) => {
    const token = getToken();

    if (token) {
      // 토큰 만료 여부 선제 확인
      if (isTokenExpired(token)) {
        return handleAuthExpired('로그인 세션이 만료되었습니다. 다시 로그인해주세요.');
      }
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error),
);

// ─── 응답 인터셉터 ────────────────────────────────────

/**
 * [방어선 2] 응답 401 / 403 수신 시 처리
 *
 * - 401: 토큰 없음 or 유효하지 않음 → 자동 로그아웃
 * - 403: Spring Security가 만료 토큰에 403 반환하는 경우 대응
 *        → 토큰이 있고 만료됐으면 자동 로그아웃
 *        → 실제 권한 없음(403)이면 에러 메시지만 throw
 */
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    const { response } = error;

    if (!response) {
      return Promise.reject(
        new Error('서버에 연결할 수 없습니다. 네트워크 상태를 확인해주세요.'),
      );
    }

    if (response.status === 401) {
      return handleAuthExpired('로그인 세션이 만료되었습니다. 다시 로그인해주세요.');
    }

    if (response.status === 403) {
      const token = getToken();
      // 토큰이 있고 만료된 경우 → 자동 로그아웃
      if (token && isTokenExpired(token)) {
        return handleAuthExpired('로그인 세션이 만료되었습니다. 다시 로그인해주세요.');
      }
      // 토큰은 유효하지만 권한 없는 경우 → 에러만 throw
      return Promise.reject(new Error('접근 권한이 없습니다.'));
    }

    const serverMessage =
      response.data?.error?.message ||
      response.data?.message ||
      `서버 오류가 발생했습니다. (${response.status})`;

    return Promise.reject(new Error(serverMessage));
  },
);

export default apiClient;