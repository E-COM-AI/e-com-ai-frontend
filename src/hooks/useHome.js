// =====================================================
// src/hooks/useHome.js
// 홈 대시보드 데이터 패칭 커스텀 훅
//
// - GET /home API 호출
// - 로딩, 에러, 데이터 상태 관리
// - 재시도(refetch) 기능 포함
// =====================================================

import { useState, useEffect, useCallback } from 'react';
import { fetchHomeData } from '../api/homeApi.js';

/**
 * 홈 대시보드 데이터 훅
 *
 * @returns {{
 *   data: Object|null,
 *   isLoading: boolean,
 *   error: string|null,
 *   refetch: Function,
 * }}
 */
const useHome = () => {
  const [data, setData]         = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError]         = useState(null);

  /**
   * 홈 데이터 패칭 함수
   * useCallback으로 메모이제이션하여 refetch에 재사용
   */
  const fetchData = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const result = await fetchHomeData();
      setData(result);
    } catch (err) {
      setError(err.message || '데이터를 불러오는 중 오류가 발생했습니다.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  // 컴포넌트 마운트 시 데이터 패칭
  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return {
    data,
    isLoading,
    error,
    refetch: fetchData,
  };
};

export default useHome;
