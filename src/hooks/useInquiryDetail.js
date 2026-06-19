// =====================================================
// src/hooks/useInquiryDetail.js
// 문의 상세 커스텀 훅
//
// - 단건 조회
// - 수정 액션 (OPEN 상태만)
// - 삭제 액션 (OPEN 상태만)
// =====================================================

import { useState, useEffect, useCallback } from 'react';
import { getInquiry, updateInquiry, deleteInquiry } from '../api/inquiryApi.js';

/**
 * 문의 상세 훅
 * @param {string|number} id - 문의 ID
 */
const useInquiryDetail = (id) => {
  const [data,        setData]        = useState(null);
  const [isLoading,   setIsLoading]   = useState(true);
  const [error,       setError]       = useState(null);

  const [isUpdating,  setIsUpdating]  = useState(false);
  const [isDeleting,  setIsDeleting]  = useState(false);
  const [actionError, setActionError] = useState(null);

  /** 상세 조회 */
  const fetchDetail = useCallback(async () => {
    if (!id) return;
    setIsLoading(true);
    setError(null);
    try {
      const result = await getInquiry(id);
      setData(result);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchDetail();
  }, [fetchDetail]);

  /**
   * 문의 수정
   * @param {{ title: string, content: string }} payload
   * @returns {boolean} 성공 여부
   */
  const update = useCallback(async ({ title, content }) => {
    setIsUpdating(true);
    setActionError(null);
    try {
      const updated = await updateInquiry(id, { title, content });
      // 수정 성공 시 로컬 data 업데이트 (재조회 없이)
      setData((prev) => ({ ...prev, ...updated }));
      return true;
    } catch (err) {
      setActionError(err.message);
      return false;
    } finally {
      setIsUpdating(false);
    }
  }, [id]);

  /**
   * 문의 삭제
   * @returns {boolean} 성공 여부
   */
  const remove = useCallback(async () => {
    setIsDeleting(true);
    setActionError(null);
    try {
      await deleteInquiry(id);
      return true;
    } catch (err) {
      setActionError(err.message);
      setIsDeleting(false);
      return false;
    }
  }, [id]);

  return {
    data,
    isLoading,
    error,
    isUpdating,
    isDeleting,
    actionError,
    update,
    remove,
    refetch: fetchDetail,
  };
};

export default useInquiryDetail;
