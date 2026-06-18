// =====================================================
// src/App.jsx
// 애플리케이션 루트 컴포넌트
//
// AuthProvider로 전역 인증 상태 제공 후
// Router 컴포넌트에 라우팅 위임
// =====================================================

import React from 'react';
import { AuthProvider } from './context/AuthContext.jsx';
import Router from './router/Router.jsx';

/**
 * 앱 루트
 * - AuthProvider: 전역 인증 상태 (isAuthenticated, user, login, logout)
 * - Router: createBrowserRouter 기반 라우트 정의
 */
const App = () => (
  <AuthProvider>
    <Router />
  </AuthProvider>
);

export default App;