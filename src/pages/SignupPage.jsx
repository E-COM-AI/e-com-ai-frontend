// =====================================================
// src/pages/SignupPage.jsx
// 회원가입 페이지 — AuthLayout의 Outlet으로 렌더링됨
// =====================================================

import React from 'react';
import SignupForm from '../components/auth/SignupForm.jsx';

const SignupPage = () => (
  <>
    <div className="mb-8 animate-fade-in-up">
      <h2 className="text-2xl sm:text-3xl font-bold text-white">계정 만들기</h2>
      <p className="mt-2 text-slate-400 text-sm">E-COM AI로 고객 문의 분석을 시작하세요.</p>
    </div>
    <SignupForm />
  </>
);

export default SignupPage;
