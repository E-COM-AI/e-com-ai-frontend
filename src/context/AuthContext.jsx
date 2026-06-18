// =====================================================
// src/context/AuthContext.jsx
// 인증 상태 전역 관리 컨텍스트
//
// - 로그인 상태, 사용자 정보를 앱 전역에서 공유
// - localStorage 기반 토큰 영속성 처리
// - 로그인/로그아웃 액션 제공
// =====================================================

import React, { createContext, useContext, useState, useCallback, useMemo } from 'react';
import { saveToken, saveUserInfo, clearAuthStorage, getToken, getUserInfo } from '../utils/storage.js';

/** 인증 컨텍스트 */
const AuthContext = createContext(null);

/**
 * 인증 상태 공급자 컴포넌트
 * 앱 최상단에 위치하여 인증 상태를 모든 자식 컴포넌트에 제공합니다.
 *
 * @param {{ children: React.ReactNode }} props
 */
export const AuthProvider = ({ children }) => {
  // localStorage에 저장된 토큰/사용자 정보로 초기 상태 복원
  const [user, setUser] = useState(() => getUserInfo());
  const [isAuthenticated, setIsAuthenticated] = useState(() => Boolean(getToken()));

  /**
   * 로그인 처리
   * - 토큰 및 사용자 정보를 localStorage에 저장
   * - 전역 인증 상태 업데이트
   *
   * @param {{ memberId: number, email: string, accessToken: string }} loginData
   */
  const login = useCallback((loginData) => {
    const { accessToken, memberId, email } = loginData;

    // 토큰 저장
    saveToken(accessToken);

    // 사용자 정보 저장 (민감 정보 제외)
    const userInfo = { memberId, email };
    saveUserInfo(userInfo);

    // 전역 상태 업데이트
    setUser(userInfo);
    setIsAuthenticated(true);
  }, []);

  /**
   * 로그아웃 처리
   * - localStorage의 모든 인증 데이터 제거
   * - 전역 인증 상태 초기화
   */
  const logout = useCallback(() => {
    clearAuthStorage();
    setUser(null);
    setIsAuthenticated(false);
  }, []);

  /**
   * 컨텍스트 값 메모이제이션
   * 불필요한 리렌더링 방지
   */
  const value = useMemo(
    () => ({
      user,
      isAuthenticated,
      login,
      logout,
    }),
    [user, isAuthenticated, login, logout],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

/**
 * 인증 컨텍스트 사용 커스텀 훅
 * AuthProvider 외부에서 사용 시 에러를 명시적으로 발생시킵니다.
 *
 * @returns {{ user: object, isAuthenticated: boolean, login: Function, logout: Function }}
 */
export const useAuthContext = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuthContext는 AuthProvider 내부에서만 사용할 수 있습니다.');
  }

  return context;
};
