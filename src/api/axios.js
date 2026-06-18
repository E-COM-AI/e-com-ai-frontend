// =====================================================
// src/api/axios.js
// Axios 인스턴스 설정
//
// - 환경변수에서 Base URL 로드 (절대 하드코딩 금지)
// - 요청 인터셉터: Access Token 자동 주입
// - 응답 인터셉터: 공통 에러 처리 및 401 → 로그인 리다이렉트
// =====================================================

import axios from 'axios';
import { getToken, clearAuthStorage } from '../utils/storage.js';

/**
 * Axios 인스턴스 생성
 * - baseURL은 Vite 환경변수에서 주입 (절대 하드코딩 금지)
 * - .env.local  → /api/v1  (Vite Proxy를 통해 백엔드 우회)
 * - .env.production → https://api.ecom-ai.com/api/v1
 */
const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 15000, // 15초 타임아웃
  headers: {
    'Content-Type': 'application/json',
    'Accept':       'application/json',
  },
});

// ─── 요청 인터셉터 ────────────────────────────────────

/**
 * 모든 요청에 JWT Access Token을 Authorization 헤더에 자동 삽입
 * 토큰이 없는 경우(비인증 요청)에는 헤더를 추가하지 않음
 */
apiClient.interceptors.request.use(
  (config) => {
    const token = getToken();

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// ─── 응답 인터셉터 ────────────────────────────────────

/**
 * 응답 공통 처리
 * - 성공: 응답 그대로 반환
 * - 401 Unauthorized: 인증 만료 → 스토리지 초기화 후 로그인 페이지 이동
 * - 그 외 에러: 서버 에러 메시지 추출 후 reject
 */
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    const { response } = error;

    if (!response) {
      // 네트워크 에러 (서버 다운, 타임아웃 등)
      return Promise.reject(
        new Error('서버에 연결할 수 없습니다. 네트워크 상태를 확인해주세요.'),
      );
    }

    if (response.status === 401) {
      // 인증 만료 또는 유효하지 않은 토큰
      clearAuthStorage();

      // React Router navigate를 사용할 수 없는 레이어이므로 window.location 사용
      // (인터셉터는 React 컴포넌트 외부에서 실행됨)
      if (window.location.pathname !== '/login') {
        window.location.href = '/login';
      }

      return Promise.reject(new Error('인증이 만료되었습니다. 다시 로그인해주세요.'));
    }

    // 서버 응답 에러 메시지 추출 (공통 응답 포맷 기반)
    const serverMessage =
      response.data?.error?.message ||
      response.data?.message ||
      `서버 오류가 발생했습니다. (${response.status})`;

    return Promise.reject(new Error(serverMessage));
  },
);

export default apiClient;
