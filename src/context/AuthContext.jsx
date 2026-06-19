// =====================================================
// src/context/AuthContext.jsx
// =====================================================

import React, { createContext, useContext, useState, useCallback, useMemo } from 'react';
import {
  saveToken, saveUserInfo, clearAuthStorage,
  getToken, getUserInfo, decodeJwt,
} from '../utils/storage.js';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user,            setUser]            = useState(() => getUserInfo());
  const [isAuthenticated, setIsAuthenticated] = useState(() => Boolean(getToken()));

  /**
   * 로그인 처리
   * accessToken에서 role 디코딩하여 user에 포함
   */
  const login = useCallback((loginData) => {
    const { accessToken, memberId, email } = loginData;

    saveToken(accessToken);
    saveUserInfo({ memberId, email }, accessToken); // accessToken 전달해서 role 추출

    const decoded  = decodeJwt(accessToken);
    const userInfo = {
      memberId,
      email,
      role: decoded?.role ?? null,
    };

    setUser(userInfo);
    setIsAuthenticated(true);
  }, []);

  const logout = useCallback(() => {
    clearAuthStorage();
    setUser(null);
    setIsAuthenticated(false);
  }, []);

  const value = useMemo(
    () => ({
      user,            // { memberId, email, role }
      isAuthenticated,
      login,
      logout,
      isAdmin: user?.role === 'ROLE_ADMIN',   // 관리자 여부
      isUser:  user?.role === 'ROLE_USER',    // 일반 사용자 여부
    }),
    [user, isAuthenticated, login, logout],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuthContext는 AuthProvider 내부에서만 사용할 수 있습니다.');
  }
  return context;
};