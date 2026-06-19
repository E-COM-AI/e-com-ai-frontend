// =====================================================
// src/hooks/useInquiryList.js
// 문의 목록 커스텀 훅
//
// - 목록 조회 + 페이지네이션
// - 정렬: 최신순(DESC) / 등록순(ASC)
// - 상태 필터: 전체 / 답변 대기(OPEN) / 답변 완료
// =====================================================

import { useState, useEffect, useCallback } from 'react';
import { getInquiries } from '../api/inquiryApi.js';

/** 정렬 방향 상수 */
export const DIRECTION = {
  DESC: 'DESC', // 최신순
  ASC:  'ASC',  // 등록순
};

/** 상태 필터 상수 */
export const STATUS_FILTER = {
  ALL:    '',
  OPEN:   'OPEN',
  CLOSED: 'CLOSED',
};

/**
 * 문의 목록 훅
 *
 * @returns {{
 *   data: Object|null,
 *   isLoading: boolean,
 *   error: string|null,
 *   page: number,
 *   direction: string,
 *   statusFilter: string,
 *   setPage: Function,
 *   setDirection: Function,
 *   setStatusFilter: Function,
 *   refetch: Function,
 * }}
 */
const useInquiryList = () => {
  const [data,         setData]         = useState(null);
  const [isLoading,    setIsLoading]    = useState(true);
  const [error,        setError]        = useState(null);

  // ─── 쿼리 상태 ──────────────────────────────────
  const [page,         setPageState]    = useState(0);
  const [direction,    setDirectionState] = useState(DIRECTION.DESC);
  const [statusFilter, setStatusFilterState] = useState(STATUS_FILTER.ALL);

  /** 페이지 변경 */
  const setPage = useCallback((newPage) => {
    setPageState(newPage);
  }, []);

  /** 정렬 변경 시 첫 페이지로 이동 */
  const setDirection = useCallback((newDirection) => {
    setDirectionState(newDirection);
    setPageState(0);
  }, []);

  /** 상태 필터 변경 시 첫 페이지로 이동 */
  const setStatusFilter = useCallback((newStatus) => {
    setStatusFilterState(newStatus);
    setPageState(0);
  }, []);

  /** 목록 패칭 */
  const fetchList = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const result = await getInquiries({
        page:      page,
        size:      10,
        sort:      'createdAt',
        direction: direction,
        ...(statusFilter ? { status: statusFilter } : {}),
      });
      setData(result);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  }, [page, direction, statusFilter]);

  useEffect(() => {
    fetchList();
  }, [fetchList]);

  return {
    data,
    isLoading,
    error,
    page,
    direction,
    statusFilter,
    setPage,
    setDirection,
    setStatusFilter,
    refetch: fetchList,
  };
};

export default useInquiryList;
