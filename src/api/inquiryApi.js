import apiClient from './axios.js';

export const createInquiry = async ({ title, content }) => {
  const response = await apiClient.post('/inquiries', { title, content });
  const { success, data, error } = response.data;
  if (!success) throw new Error(error?.message || '문의 등록에 실패했습니다.');
  return data;
};

export const getInquiries = async ({
  page   = 0,
  size   = 10,
  sort   = 'createdAt,DESC',
  status,
} = {}) => {
  const params = { page, size, sort };
  if (status) params.status = status;

  const response = await apiClient.get('/inquiries', { params });
  const { success, data, error } = response.data;
  if (!success) throw new Error(error?.message || '문의 목록 조회에 실패했습니다.');
  return data;
};

export const getInquiry = async (id) => {
  const response = await apiClient.get(`/inquiries/${id}`);
  const { success, data, error } = response.data;
  if (!success) throw new Error(error?.message || '문의 조회에 실패했습니다.');
  return data;
};

export const updateInquiry = async (id, { title, content }) => {
  const response = await apiClient.patch(`/inquiries/${id}`, { title, content });
  const { success, data, error } = response.data;
  if (!success) throw new Error(error?.message || '문의 수정에 실패했습니다.');
  return data;
};

export const deleteInquiry = async (id) => {
  const response = await apiClient.delete(`/inquiries/${id}`);
  const { success, error } = response.data;
  if (!success) throw new Error(error?.message || '문의 삭제에 실패했습니다.');
};