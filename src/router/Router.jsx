// =====================================================
// src/router/Router.jsx
// 라우터 설정
// =====================================================

import React from 'react';
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';

import AuthLayout        from '../layouts/AuthLayout.jsx';
import DashboardLayout   from '../layouts/DashboardLayout.jsx';
import ProtectedRoute    from '../components/common/ProtectedRoute.jsx';

import LoginPage         from '../pages/LoginPage.jsx';
import SignupPage        from '../pages/SignupPage.jsx';
import HomePage          from '../pages/HomePage.jsx';
import InquiryListPage   from '../pages/InquiryListPage.jsx';
import InquiryNewPage    from '../pages/InquiryNewPage.jsx';
import InquiryDetailPage from '../pages/InquiryDetailPage.jsx';

const router = createBrowserRouter([
  // ─── 인증 필요 라우트 ─────────────────────────────
  {
    element: <ProtectedRoute />,
    children: [
      {
        element: <DashboardLayout />,
        children: [
          { path: '/',               element: <HomePage /> },
          { path: '/inquiry',        element: <InquiryListPage /> },
          { path: '/inquiry/new',    element: <InquiryNewPage /> },
          { path: '/inquiry/:id',    element: <InquiryDetailPage /> },
        ],
      },
    ],
  },

  // ─── 비인증 라우트 ────────────────────────────────
  {
    element: <AuthLayout />,
    children: [
      { path: '/login',  element: <LoginPage /> },
      { path: '/signup', element: <SignupPage /> },
    ],
  },

  // ─── 404 ──────────────────────────────────────────
  { path: '*', element: <Navigate to="/" replace /> },
]);

const Router = () => <RouterProvider router={router} />;

export default Router;