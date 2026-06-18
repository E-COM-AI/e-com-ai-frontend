// =====================================================
// src/components/auth/SignupForm.jsx
// 회원가입 폼 컴포넌트 (lucide-react 적용)
// =====================================================

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { User, Mail, Lock, Eye, EyeOff, AlertCircle, CheckCircle2, Loader2, UserPlus } from 'lucide-react';
import useAuth from '../../hooks/useAuth.js';

const SignupForm = () => {
  const { signupAction, isLoading, error, clearError } = useAuth();

  const [formData, setFormData] = useState({
    name: '', email: '', password: '', passwordConfirm: '',
  });
  const [fieldErrors, setFieldErrors]               = useState({});
  const [showPassword, setShowPassword]             = useState(false);
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);

  const passwordStrength = getPasswordStrength(formData.password);

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
    if (!formData.name.trim())                           errors.name            = '이름을 입력해주세요.';
    else if (formData.name.trim().length < 2)            errors.name            = '이름은 최소 2자 이상이어야 합니다.';
    if (!formData.email)                                 errors.email           = '이메일을 입력해주세요.';
    else if (!emailRegex.test(formData.email))           errors.email           = '올바른 이메일 형식이 아닙니다.';
    if (!formData.password)                              errors.password        = '비밀번호를 입력해주세요.';
    else if (formData.password.length < 8)               errors.password        = '비밀번호는 최소 8자 이상이어야 합니다.';
    if (!formData.passwordConfirm)                       errors.passwordConfirm = '비밀번호 확인을 입력해주세요.';
    else if (formData.password !== formData.passwordConfirm) errors.passwordConfirm = '비밀번호가 일치하지 않습니다.';
    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    await signupAction({
      name: formData.name.trim(),
      email: formData.email.trim(),
      password: formData.password,
      passwordConfirm: formData.passwordConfirm,
    });
  };

  const passwordsMatch =
    formData.passwordConfirm &&
    !fieldErrors.passwordConfirm &&
    formData.password === formData.passwordConfirm;

  return (
    <div className="animate-fade-in-up-200">

      {error && (
        <div className="mb-5 p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/20 flex items-center gap-2.5">
          <AlertCircle size={15} className="text-rose-400 shrink-0" />
          <p className="text-rose-400 text-sm">{error}</p>
        </div>
      )}

      <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4">

        {/* 이름 */}
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-1.5" htmlFor="name">이름</label>
          <div className="relative">
            <User size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none" />
            <input
              id="name" type="text" name="name" autoComplete="name"
              value={formData.name} onChange={handleChange} placeholder="홍길동"
              className={`input-field pl-10 ${fieldErrors.name ? 'error' : ''}`}
              disabled={isLoading}
            />
          </div>
          {fieldErrors.name && (
            <p className="mt-1.5 text-xs text-rose-400 flex items-center gap-1">
              <AlertCircle size={11} /> {fieldErrors.name}
            </p>
          )}
        </div>

        {/* 이메일 */}
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-1.5" htmlFor="signup-email">이메일</label>
          <div className="relative">
            <Mail size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none" />
            <input
              id="signup-email" type="email" name="email" autoComplete="email"
              value={formData.email} onChange={handleChange} placeholder="user@example.com"
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
          <label className="block text-sm font-medium text-slate-300 mb-1.5" htmlFor="signup-password">비밀번호</label>
          <div className="relative">
            <Lock size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none" />
            <input
              id="signup-password" type={showPassword ? 'text' : 'password'}
              name="password" autoComplete="new-password"
              value={formData.password} onChange={handleChange} placeholder="최소 8자 이상"
              className={`input-field pl-10 pr-12 ${fieldErrors.password ? 'error' : ''}`}
              disabled={isLoading}
            />
            <button
              type="button" onClick={() => setShowPassword((p) => !p)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 transition-colors"
              tabIndex={-1} aria-label={showPassword ? '비밀번호 숨기기' : '비밀번호 보기'}
            >
              {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
            </button>
          </div>
          {fieldErrors.password && (
            <p className="mt-1.5 text-xs text-rose-400 flex items-center gap-1">
              <AlertCircle size={11} /> {fieldErrors.password}
            </p>
          )}
          {formData.password && <PasswordStrengthBar strength={passwordStrength} />}
        </div>

        {/* 비밀번호 확인 */}
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-1.5" htmlFor="passwordConfirm">비밀번호 확인</label>
          <div className="relative">
            <Lock size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none" />
            <input
              id="passwordConfirm" type={showPasswordConfirm ? 'text' : 'password'}
              name="passwordConfirm" autoComplete="new-password"
              value={formData.passwordConfirm} onChange={handleChange} placeholder="비밀번호 재입력"
              className={`input-field pl-10 pr-12 ${fieldErrors.passwordConfirm ? 'error' : ''}`}
              disabled={isLoading}
            />
            <button
              type="button" onClick={() => setShowPasswordConfirm((p) => !p)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 transition-colors"
              tabIndex={-1} aria-label={showPasswordConfirm ? '비밀번호 숨기기' : '비밀번호 보기'}
            >
              {showPasswordConfirm ? <EyeOff size={15} /> : <Eye size={15} />}
            </button>
          </div>
          {fieldErrors.passwordConfirm && (
            <p className="mt-1.5 text-xs text-rose-400 flex items-center gap-1">
              <AlertCircle size={11} /> {fieldErrors.passwordConfirm}
            </p>
          )}
          {passwordsMatch && (
            <p className="mt-1.5 text-xs text-emerald-400 flex items-center gap-1">
              <CheckCircle2 size={11} /> 비밀번호가 일치합니다.
            </p>
          )}
        </div>

        {/* 제출 버튼 */}
        <button
          type="submit" disabled={isLoading}
          className="btn-primary w-full mt-2 flex items-center justify-center gap-2"
        >
          {isLoading ? (
            <><Loader2 size={16} className="animate-spin" /><span>가입 처리 중...</span></>
          ) : (
            <><UserPlus size={16} /><span>회원가입</span></>
          )}
        </button>
      </form>

      <p className="mt-6 text-center text-sm text-slate-500">
        이미 계정이 있으신가요?{' '}
        <Link
          to="/login"
          className="font-medium transition-colors"
          style={{ color: '#818cf8' }}
          onMouseEnter={(e) => { e.target.style.color = '#22d3ee'; }}
          onMouseLeave={(e) => { e.target.style.color = '#818cf8'; }}
        >
          로그인
        </Link>
      </p>
    </div>
  );
};

// ─── 비밀번호 강도 유틸 ──────────────────────────────

function getPasswordStrength(password) {
  if (!password) return { level: 0, label: '', color: '' };
  let score = 0;
  if (password.length >= 8)           score++;
  if (password.length >= 12)          score++;
  if (/[A-Z]/.test(password))         score++;
  if (/[0-9]/.test(password))         score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;
  if (score <= 1) return { level: 1, label: '매우 약함', color: '#f43f5e' };
  if (score === 2) return { level: 2, label: '약함',     color: '#fb923c' };
  if (score === 3) return { level: 3, label: '보통',     color: '#facc15' };
  if (score === 4) return { level: 4, label: '강함',     color: '#34d399' };
  return               { level: 5, label: '매우 강함', color: '#22d3ee' };
}

const PasswordStrengthBar = ({ strength }) => (
  <div className="mt-2">
    <div className="flex gap-1">
      {Array.from({ length: 5 }).map((_, i) => (
        <div
          key={i}
          className="flex-1 h-1 rounded-full transition-all duration-300"
          style={{ background: i < strength.level ? strength.color : 'rgba(255,255,255,0.1)' }}
        />
      ))}
    </div>
    <p className="mt-1 text-xs" style={{ color: strength.color }}>
      비밀번호 강도: {strength.label}
    </p>
  </div>
);

export default SignupForm;
