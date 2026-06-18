// =====================================================
// src/hooks/useAuth.js
// 인증 액션 커스텀 훅
//
// - 로그인, 회원가입 API 호출 + 상태 관리를 캡슐화
// - 로딩, 에러 상태 포함
// - AuthContext의 전역 상태와 연동
// =====================================================

import { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { login as loginApi, signup as signupApi } from '../api/authApi.js';
import { useAuthContext } from '../context/AuthContext.jsx';

/**
 * 인증 액션 훅
 *
 * @returns {{
 *   loginAction: Function,
 *   signupAction: Function,
 *   logoutAction: Function,
 *   isLoading: boolean,
 *   error: string|null,
 *   clearError: Function,
 * }}
 */
const useAuth = () => {
  const navigate = useNavigate();
  const { login, logout } = useAuthContext();

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError]         = useState(null);

  /** 에러 초기화 */
  const clearError = useCallback(() => setError(null), []);

  /**
   * 로그인 액션
   * @param {{ email: string, password: string }} credentials
   */
  const loginAction = useCallback(async (credentials) => {
    setIsLoading(true);
    setError(null);

    try {
      const data = await loginApi(credentials);

      // AuthContext에 로그인 정보 반영
      login(data);

      // 홈 화면으로 이동
      navigate('/', { replace: true });
    } catch (err) {
      setError(err.message || '로그인에 실패했습니다.');
    } finally {
      setIsLoading(false);
    }
  }, [login, navigate]);

  /**
   * 회원가입 액션
   * @param {{ email: string, password: string, passwordConfirm: string, name: string }} signupData
   */
  const signupAction = useCallback(async (signupData) => {
    setIsLoading(true);
    setError(null);

    try {
      await signupApi(signupData);

      // 회원가입 성공 후 로그인 페이지로 이동
      navigate('/login', {
        replace: true,
        state: { message: '회원가입이 완료되었습니다. 로그인해주세요.' },
      });
    } catch (err) {
      setError(err.message || '회원가입에 실패했습니다.');
    } finally {
      setIsLoading(false);
    }
  }, [navigate]);

  /**
   * 로그아웃 액션
   */
  const logoutAction = useCallback(() => {
    logout();
    navigate('/login', { replace: true });
  }, [logout, navigate]);

  return {
    loginAction,
    signupAction,
    logoutAction,
    isLoading,
    error,
    clearError,
  };
};

export default useAuth;
