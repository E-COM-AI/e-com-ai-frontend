import { useState, useEffect, useCallback } from 'react';
import { getInquiries } from '../api/inquiryApi.js';

export const DIRECTION = {
  DESC: 'DESC',
  ASC:  'ASC',
};

export const STATUS_FILTER = {
  ALL:         '',
  OPEN:        'OPEN',
  IN_PROGRESS: 'IN_PROGRESS',
  CLOSED:      'CLOSED',
};

const PAGE_SIZE = 10;

const useInquiryList = () => {
  const [data,         setData]              = useState(null);
  const [isLoading,    setIsLoading]         = useState(true);
  const [error,        setError]             = useState(null);
  const [page,         setPageState]         = useState(0);
  const [direction,    setDirectionState]    = useState(DIRECTION.DESC);
  const [statusFilter, setStatusFilterState] = useState(STATUS_FILTER.ALL);

  const setPage = useCallback((p) => setPageState(p), []);

  const setDirection = useCallback((d) => {
    setDirectionState(d);
    setPageState(0);
  }, []);

  const setStatusFilter = useCallback((s) => {
    setStatusFilterState(s);
    setPageState(0);
  }, []);

  // 서버 사이드 필터링 (백엔드가 status 파라미터 지원)
  const fetchList = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const result = await getInquiries({
        page,
        size: PAGE_SIZE,
        sort: `createdAt,${direction}`,
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