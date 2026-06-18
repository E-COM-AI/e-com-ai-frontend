// =====================================================
// src/components/auth/LoginForm.jsx
// 로그인 폼 컴포넌트 (lucide-react 적용)
// =====================================================

import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff, AlertCircle, CheckCircle2, Loader2, LogIn } from 'lucide-react';
import useAuth from '../../hooks/useAuth.js';

const LoginForm = () => {
  const location = useLocation();
  const { loginAction, isLoading, error, clearError } = useAuth();

  const successMessage = location.state?.message ?? null;

  const [formData, setFormData] = useState({ email: '', password: '' });
  const [fieldErrors, setFieldErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (error) setFieldErrors({});
  }, [error]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (fieldErrors[name]) setFieldErrors((prev) => ({ ...prev, [name]: '' }));
    if (error) clearError();
  };

  const validate = () => {
    const errors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email)                    errors.email    = '이메일을 입력해주세요.';
    else if (!emailRegex.test(formData.email)) errors.email = '올바른 이메일 형식이 아닙니다.';
    if (!formData.password)                 errors.password = '비밀번호를 입력해주세요.';
    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    await loginAction({ email: formData.email.trim(), password: formData.password });
  };

  return (
    <div className="animate-fade-in-up-200">

      {/* 성공 메시지 */}
      {successMessage && (
        <div className="mb-5 p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center gap-2.5">
          <CheckCircle2 size={15} className="text-emerald-400 shrink-0" />
          <p className="text-emerald-400 text-sm">{successMessage}</p>
        </div>
      )}

      {/* API 에러 */}
      {error && (
        <div className="mb-5 p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/20 flex items-center gap-2.5">
          <AlertCircle size={15} className="text-rose-400 shrink-0" />
          <p className="text-rose-400 text-sm">{error}</p>
        </div>
      )}

      <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4">

        {/* 이메일 */}
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-1.5" htmlFor="email">
            이메일
          </label>
          <div className="relative">
            <Mail size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none" />
            <input
              id="email"
              type="email"
              name="email"
              autoComplete="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="user@example.com"
              className={`input-field pl-10 ${fieldErrors.email ? 'error' : ''}`}
              disabled={isLoading}
            />
          </div>
          {fieldErrors.email && (
            <p className="mt-1.5 text-xs text-rose-400 flex items-center gap-1">
              <AlertCircle size={11} /> {fieldErrors.email}
            </p>
          )}
        </div>

        {/* 비밀번호 */}
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-1.5" htmlFor="password">
            비밀번호
          </label>
          <div className="relative">
            <Lock size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none" />
            <input
              id="password"
              type={showPassword ? 'text' : 'password'}
              name="password"
              autoComplete="current-password"
              value={formData.password}
              onChange={handleChange}
              placeholder="비밀번호 입력"
              className={`input-field pl-10 pr-12 ${fieldErrors.password ? 'error' : ''}`}
              disabled={isLoading}
            />
            <button
              type="button"
              onClick={() => setShowPassword((p) => !p)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 transition-colors"
              tabIndex={-1}
              aria-label={showPassword ? '비밀번호 숨기기' : '비밀번호 보기'}
            >
              {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
            </button>
          </div>
          {fieldErrors.password && (
            <p className="mt-1.5 text-xs text-rose-400 flex items-center gap-1">
              <AlertCircle size={11} /> {fieldErrors.password}
            </p>
          )}
        </div>

        {/* 제출 버튼 */}
        <button
          type="submit"
          disabled={isLoading}
          className="btn-primary w-full mt-2 flex items-center justify-center gap-2"
        >
          {isLoading ? (
            <><Loader2 size={16} className="animate-spin" /><span>로그인 중...</span></>
          ) : (
            <><LogIn size={16} /><span>로그인</span></>
          )}
        </button>
      </form>

      <p className="mt-6 text-center text-sm text-slate-500">
        계정이 없으신가요?{' '}
        <Link
          to="/signup"
          className="font-medium transition-colors"
          style={{ color: '#818cf8' }}
          onMouseEnter={(e) => { e.target.style.color = '#22d3ee'; }}
          onMouseLeave={(e) => { e.target.style.color = '#818cf8'; }}
        >
          회원가입
        </Link>
      </p>
    </div>
  );
};

export default LoginForm;
