// =====================================================
// src/api/authApi.js
// 인증 관련 API 모듈
//
// - 로그인: POST /auth/login
// - 회원가입: POST /auth/signup
// =====================================================

import apiClient from './axios.js';

// ─── 로그인 ───────────────────────────────────────────

/**
 * 이메일/비밀번호로 로그인 요청
 * @param {{ email: string, password: string }} credentials
 * @returns {Promise<{ memberId: number, email: string, accessToken: string, tokenType: string }>}
 */
export const login = async ({ email, password }) => {
  const response = await apiClient.post('/auth/login', { email, password });

  // 공통 응답 포맷에서 data 추출
  const { success, data, error } = response.data;

  if (!success) {
    throw new Error(error?.message || '로그인에 실패했습니다.');
  }

  return data;
};

// ─── 회원가입 ─────────────────────────────────────────

/**
 * 회원가입 요청
 * @param {{ email: string, password: string, passwordConfirm: string, name: string }} signupData
 * @returns {Promise<void>}
 */
export const signup = async ({ email, password, passwordConfirm, name }) => {
  const response = await apiClient.post('/auth/signup', {
    email,
    password,
    passwordConfirm,
    name,
  });

  const { success, error } = response.data;

  if (!success) {
    throw new Error(error?.message || '회원가입에 실패했습니다.');
  }
};
