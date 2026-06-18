// =====================================================
// src/utils/storage.js
// 토큰 스토리지 유틸리티
//
// [보안 고려사항]
// - localStorage는 XSS 공격에 노출될 수 있습니다.
// - 더 높은 보안이 필요하다면 백엔드에서 httpOnly Cookie를 사용하세요.
// - 현재 구현은 SPA 표준 방식인 localStorage를 추상화하여,
//   추후 보안 정책 변경 시 이 파일만 수정하면 전체 적용됩니다.
// =====================================================

/** 스토리지 키 상수 - 하드코딩 방지 */
const STORAGE_KEYS = {
  ACCESS_TOKEN: 'ecom_ai_access_token',
  USER_INFO:    'ecom_ai_user_info',
};

// ─── Access Token ─────────────────────────────────────

/**
 * Access Token을 localStorage에 저장
 * @param {string} token - JWT Access Token
 */
export const saveToken = (token) => {
  try {
    localStorage.setItem(STORAGE_KEYS.ACCESS_TOKEN, token);
  } catch (error) {
    console.error('[Storage] 토큰 저장 실패:', error);
  }
};

/**
 * localStorage에서 Access Token 조회
 * @returns {string|null} JWT Access Token 또는 null
 */
export const getToken = () => {
  try {
    return localStorage.getItem(STORAGE_KEYS.ACCESS_TOKEN);
  } catch (error) {
    console.error('[Storage] 토큰 조회 실패:', error);
    return null;
  }
};

/**
 * localStorage에서 Access Token 제거
 */
export const removeToken = () => {
  try {
    localStorage.removeItem(STORAGE_KEYS.ACCESS_TOKEN);
  } catch (error) {
    console.error('[Storage] 토큰 제거 실패:', error);
  }
};

// ─── User Info ─────────────────────────────────────────

/**
 * 사용자 정보를 localStorage에 저장 (민감 정보 제외)
 * @param {{ memberId: number, email: string }} userInfo
 */
export const saveUserInfo = (userInfo) => {
  try {
    // password 등 민감 정보는 절대 저장하지 않음
    const safeInfo = {
      memberId: userInfo.memberId,
      email:    userInfo.email,
    };
    localStorage.setItem(STORAGE_KEYS.USER_INFO, JSON.stringify(safeInfo));
  } catch (error) {
    console.error('[Storage] 사용자 정보 저장 실패:', error);
  }
};

/**
 * localStorage에서 사용자 정보 조회
 * @returns {{ memberId: number, email: string }|null}
 */
export const getUserInfo = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.USER_INFO);
    return raw ? JSON.parse(raw) : null;
  } catch (error) {
    console.error('[Storage] 사용자 정보 조회 실패:', error);
    return null;
  }
};

/**
 * localStorage에서 사용자 정보 제거
 */
export const removeUserInfo = () => {
  try {
    localStorage.removeItem(STORAGE_KEYS.USER_INFO);
  } catch (error) {
    console.error('[Storage] 사용자 정보 제거 실패:', error);
  }
};

// ─── 일괄 제거 ─────────────────────────────────────────

/**
 * 인증 관련 모든 스토리지 데이터 제거 (로그아웃 시 사용)
 */
export const clearAuthStorage = () => {
  removeToken();
  removeUserInfo();
};
