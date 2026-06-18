// =====================================================
// src/pages/LoginPage.jsx
// 로그인 페이지 — AuthLayout의 Outlet으로 렌더링됨
// =====================================================

import React from 'react';
import LoginForm from '../components/auth/LoginForm.jsx';

const LoginPage = () => (
  <>
    <div className="mb-8 animate-fade-in-up">
      <h2 className="text-2xl sm:text-3xl font-bold text-white">다시 돌아오셨군요</h2>
      <p className="mt-2 text-slate-400 text-sm">계정에 로그인하여 AI 분석 대시보드에 접속하세요.</p>
    </div>
    <LoginForm />
  </>
);

export default LoginPage;
