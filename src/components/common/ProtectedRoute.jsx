// =====================================================
// src/components/common/ProtectedRoute.jsx
// 보호된 라우트 컴포넌트
//
// createBrowserRouter의 중첩 라우트 방식에 맞게
// children 대신 <Outlet />을 사용합니다.
// 미인증 시 /login으로 리다이렉트합니다.
// =====================================================

import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuthContext } from '../../context/AuthContext.jsx';

/**
 * 인증 보호 라우트
 * 인증된 경우 → <Outlet /> (하위 라우트 렌더링)
 * 미인증 경우 → /login 리다이렉트 (원래 경로 state로 전달)
 */
const ProtectedRoute = () => {
  const { isAuthenticated } = useAuthContext();
  const location = useLocation();

  if (!isAuthenticated) {
    return (
      <Navigate
        to="/login"
        replace
        state={{ from: location.pathname }}
      />
    );
  }

  return <Outlet />;
};

export default ProtectedRoute;
