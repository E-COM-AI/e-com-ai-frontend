// =====================================================
// src/router/Router.jsx
// 라우터 설정 파일
//
// createBrowserRouter 기반 중첩 라우트 구성:
// - 인증 필요 라우트 → ProtectedRoute → DashboardLayout → 페이지
// - 비인증 라우트    → AuthLayout → 페이지
// - 404             → / 리다이렉트
// =====================================================

import React from 'react';
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';

import AuthLayout      from '../layouts/AuthLayout.jsx';
import DashboardLayout from '../layouts/DashboardLayout.jsx';
import ProtectedRoute  from '../components/common/ProtectedRoute.jsx';

import LoginPage  from '../pages/LoginPage.jsx';
import SignupPage from '../pages/SignupPage.jsx';
import HomePage   from '../pages/HomePage.jsx';

/**
 * 라우트 정의
 *
 * 구조:
 * /           → ProtectedRoute → DashboardLayout → HomePage
 * /login      → AuthLayout    → LoginPage
 * /signup     → AuthLayout    → SignupPage
 * *           → /로 리다이렉트
 */
const router = createBrowserRouter([
  // ─── 인증 필요 라우트 그룹 ──────────────────────────
  {
    element: <ProtectedRoute />, // 미인증 시 /login으로 리다이렉트 (내부에서 Outlet 렌더링)
    children: [
      {
        element: <DashboardLayout />, // 헤더 + Outlet
        children: [
          { path: '/', element: <HomePage /> },

          // 추후 페이지 추가 시 여기에 작성
          // { path: '/analytics', element: <AnalyticsPage /> },
          // { path: '/settings',  element: <SettingsPage /> },
        ],
      },
    ],
  },

  // ─── 비인증 라우트 그룹 ─────────────────────────────
  {
    element: <AuthLayout />, // 브랜딩 패널 + Outlet
    children: [
      { path: '/login',  element: <LoginPage /> },
      { path: '/signup', element: <SignupPage /> },
    ],
  },

  // ─── 404 처리 ────────────────────────────────────────
  { path: '*', element: <Navigate to="/" replace /> },
]);

/**
 * 라우터 Provider 컴포넌트
 * App.jsx에서 단일 컴포넌트로 사용
 */
const Router = () => <RouterProvider router={router} />;

export default Router;
