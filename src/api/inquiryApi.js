// =====================================================
// src/api/inquiryApi.js
// 고객 문의 API 모듈
//
// - POST   /inquiries       문의 등록
// - GET    /inquiries       목록 조회 (페이지네이션/정렬)
// - GET    /inquiries/:id   상세 조회
// - PATCH  /inquiries/:id   수정 (OPEN 상태만)
// - DELETE /inquiries/:id   삭제 (OPEN 상태만, Soft Delete)
// =====================================================

import apiClient from './axios.js';

/**
 * 고객 문의 등록
 * @param {{ title: string, content: string }} payload
 * @returns {Promise<{ inquiryId: number, title: string, status: string, statusDisplay: string, createdAt: string }>}
 */
export const createInquiry = async ({ title, content }) => {
  const response = await apiClient.post('/inquiries', { title, content });
  const { success, data, error } = response.data;
  if (!success) throw new Error(error?.message || '문의 등록에 실패했습니다.');
  return data;
};

/**
 * 내 문의 목록 조회
 * @param {{ page?: number, size?: number, sort?: string, direction?: string, status?: string }} params
 * @returns {Promise<{ items: Array, page: number, size: number, totalElements: number, totalPages: number }>}
 */
export const getInquiries = async ({
  page      = 0,
  size      = 10,
  sort      = 'createdAt',
  direction = 'DESC',
  status,
} = {}) => {
  const params = { page, size, sort, direction };

  // status 파라미터: 백엔드가 지원하는 경우 서버 필터링, 미지원 시 무시됨
  if (status) params.status = status;

  const response = await apiClient.get('/inquiries', { params });
  const { success, data, error } = response.data;
  if (!success) throw new Error(error?.message || '문의 목록 조회에 실패했습니다.');
  return data;
};

/**
 * 문의 상세(단건) 조회
 * @param {number|string} id - 문의 ID
 * @returns {Promise<{ inquiryId: number, title: string, content: string, status: string, statusDisplay: string, createdAt: string }>}
 */
export const getInquiry = async (id) => {
  const response = await apiClient.get(`/inquiries/${id}`);
  const { success, data, error } = response.data;
  if (!success) throw new Error(error?.message || '문의 조회에 실패했습니다.');
  return data;
};

/**
 * 문의 수정 (OPEN 상태만 가능)
 * @param {number|string} id
 * @param {{ title: string, content: string }} payload
 * @returns {Promise<{ inquiryId: number, title: string, content: string, status: string, statusDisplay: string, updatedAt: string }>}
 */
export const updateInquiry = async (id, { title, content }) => {
  const response = await apiClient.patch(`/inquiries/${id}`, { title, content });
  const { success, data, error } = response.data;
  if (!success) throw new Error(error?.message || '문의 수정에 실패했습니다.');
  return data;
};

/**
 * 문의 삭제 (OPEN 상태만 가능, Soft Delete)
 * @param {number|string} id
 * @returns {Promise<void>}
 */
export const deleteInquiry = async (id) => {
  const response = await apiClient.delete(`/inquiries/${id}`);
  const { success, error } = response.data;
  if (!success) throw new Error(error?.message || '문의 삭제에 실패했습니다.');
};
