// =====================================================
// src/utils/storage.js
// =====================================================

const STORAGE_KEYS = {
  ACCESS_TOKEN: 'ecom_ai_access_token',
  USER_INFO:    'ecom_ai_user_info',
};

// ─── JWT 디코딩 유틸 ──────────────────────────────────

/**
 * JWT 토큰 페이로드 디코딩 (라이브러리 없이 순수 JS)
 * @param {string} token
 * @returns {Object|null} 디코딩된 페이로드
 */
export const decodeJwt = (token) => {
  try {
    const payload = token.split('.')[1];
    return JSON.parse(atob(payload));
  } catch {
    return null;
  }
};

// ─── Access Token ─────────────────────────────────────

export const saveToken = (token) => {
  try {
    localStorage.setItem(STORAGE_KEYS.ACCESS_TOKEN, token);
  } catch (error) {
    console.error('[Storage] 토큰 저장 실패:', error);
  }
};

export const getToken = () => {
  try {
    return localStorage.getItem(STORAGE_KEYS.ACCESS_TOKEN);
  } catch (error) {
    console.error('[Storage] 토큰 조회 실패:', error);
    return null;
  }
};

export const removeToken = () => {
  try {
    localStorage.removeItem(STORAGE_KEYS.ACCESS_TOKEN);
  } catch (error) {
    console.error('[Storage] 토큰 제거 실패:', error);
  }
};

// ─── User Info ─────────────────────────────────────────

/**
 * 사용자 정보 저장
 * accessToken을 디코딩해서 role도 함께 저장합니다.
 */
export const saveUserInfo = (userInfo, accessToken) => {
  try {
    const decoded = accessToken ? decodeJwt(accessToken) : null;

    const safeInfo = {
      memberId: userInfo.memberId,
      email:    userInfo.email,
      role:     decoded?.role ?? null, // ex) "ROLE_USER", "ROLE_ADMIN"
    };

    localStorage.setItem(STORAGE_KEYS.USER_INFO, JSON.stringify(safeInfo));
  } catch (error) {
    console.error('[Storage] 사용자 정보 저장 실패:', error);
  }
};

export const getUserInfo = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.USER_INFO);
    return raw ? JSON.parse(raw) : null;
  } catch (error) {
    console.error('[Storage] 사용자 정보 조회 실패:', error);
    return null;
  }
};

export const removeUserInfo = () => {
  try {
    localStorage.removeItem(STORAGE_KEYS.USER_INFO);
  } catch (error) {
    console.error('[Storage] 사용자 정보 제거 실패:', error);
  }
};

// ─── 일괄 제거 ─────────────────────────────────────────

export const clearAuthStorage = () => {
  removeToken();
  removeUserInfo();
};