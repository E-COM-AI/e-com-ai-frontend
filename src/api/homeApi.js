// =====================================================
// src/api/homeApi.js
// 홈 대시보드 관련 API 모듈
//
// - 홈 데이터 조회: GET /home
//   인증이 필요한 API (Authorization 헤더 자동 삽입됨)
// =====================================================

import apiClient from './axios.js';

/**
 * 홈 대시보드 데이터 조회
 * axios 인터셉터에 의해 JWT 토큰이 자동으로 헤더에 삽입됩니다.
 *
 * @returns {Promise<Object>} 홈 대시보드 데이터 (서버 응답에 따라 구조 결정)
 */
export const fetchHomeData = async () => {
  const response = await apiClient.get('/home');

  const { success, data, error } = response.data;

  if (!success) {
    throw new Error(error?.message || '홈 데이터를 불러오는 데 실패했습니다.');
  }

  // data가 null일 수 있음 (서버에 데이터 없는 경우)
  return data ?? null;
};
