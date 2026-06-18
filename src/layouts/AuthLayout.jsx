// =====================================================
// src/layouts/AuthLayout.jsx
// 인증 페이지 공통 레이아웃
//
// - 왼쪽: Aurora 애니메이션 배경 + 브랜딩 패널
// - 오른쪽: <Outlet /> (LoginPage / SignupPage 렌더링)
// =====================================================

import React from 'react';
import { Outlet } from 'react-router-dom';
import { Brain, MessageSquare, AlertTriangle, Shield, Zap } from 'lucide-react';

/** 브랜드 특징 포인트 */
const FEATURES = [
  {
    Icon:  Brain,
    title: 'AI 문의 자동 분류',
    desc:  'NLP 기반 실시간 카테고리 분류',
    color: '#818cf8',
  },
  {
    Icon:  MessageSquare,
    title: '감정 분석',
    desc:  '고객 감정 상태 즉각 파악',
    color: '#22d3ee',
  },
  {
    Icon:  AlertTriangle,
    title: '민원 우선순위 자동화',
    desc:  '중요 민원 자동 감지 및 에스컬레이션',
    color: '#f43f5e',
  },
  {
    Icon:  Shield,
    title: '욕설 탐지',
    desc:  '유해 콘텐츠 자동 필터링',
    color: '#34d399',
  },
];

/**
 * 인증 레이아웃
 * LoginPage / SignupPage가 <Outlet />으로 렌더링됩니다.
 */
const AuthLayout = () => {
  return (
    <div className="min-h-screen flex" style={{ background: '#030712' }}>

      {/* ─────────────────────────────────────────────
          왼쪽 패널 — 브랜딩 & 애니메이션 배경
          ───────────────────────────────────────────── */}
      <div className="hidden lg:flex lg:w-1/2 xl:w-3/5 relative flex-col justify-between overflow-hidden p-12">

        {/* Aurora 오브 */}
        <div
          className="absolute w-[520px] h-[520px] rounded-full opacity-20 animate-drift"
          style={{
            top: '-120px', left: '-120px',
            background: 'radial-gradient(circle, #6366f1, transparent 70%)',
            filter: 'blur(60px)',
          }}
        />
        <div
          className="absolute w-[420px] h-[420px] rounded-full opacity-15 animate-drift-alt"
          style={{
            bottom: '-80px', right: '-60px',
            background: 'radial-gradient(circle, #22d3ee, transparent 70%)',
            filter: 'blur(50px)',
          }}
        />
        <div
          className="absolute w-[300px] h-[300px] rounded-full opacity-10"
          style={{
            top: '45%', left: '55%',
            background: 'radial-gradient(circle, #10b981, transparent 70%)',
            filter: 'blur(40px)',
            animation: 'drift 28s ease-in-out infinite reverse',
          }}
        />

        {/* 격자 패턴 */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(99,102,241,0.5) 1px, transparent 1px),
              linear-gradient(90deg, rgba(99,102,241,0.5) 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px',
          }}
        />

        {/* 컨텐츠 레이어 */}
        <div className="relative z-10 flex items-center gap-3 animate-fade-in-up">
          <LogoMark />
          <span className="text-white font-semibold text-lg tracking-tight">E-COM AI</span>
        </div>

        <div className="relative z-10 space-y-8">
          {/* 헤드라인 */}
          <div className="animate-fade-in-up-200">
            <p className="text-slate-500 text-xs font-semibold uppercase tracking-widest mb-4 flex items-center gap-2">
              <Zap size={12} className="text-indigo-400" />
              AI-Powered Customer Intelligence
            </p>
            <h1 className="text-5xl xl:text-6xl font-black leading-[1.1] text-white">
              고객 문의를{' '}
              <br />
              <span className="gradient-text">AI가 분석</span>
              <br />
              합니다
            </h1>
            <p className="mt-5 text-slate-400 text-lg leading-relaxed max-w-md">
              NLP 기반 실시간 분석으로 문의 분류부터
              <br />
              감정 감지, 우선순위 배분까지 자동화합니다.
            </p>
          </div>

          {/* 특징 포인트 */}
          <div className="grid grid-cols-2 gap-3 max-w-md animate-fade-in-up-400">
            {FEATURES.map((feature, i) => (
              <FeatureCard key={i} {...feature} />
            ))}
          </div>
        </div>

        {/* 하단 배지 */}
        <div className="relative z-10 flex gap-8 animate-fade-in-up-600">
          {[
            { value: 'NLP',       label: '자연어 처리 엔진' }
          ].map((stat) => (
            <div key={stat.label}>
              <p className="text-xl font-black font-mono" style={{ color: '#818cf8' }}>
                {stat.value}
              </p>
              <p className="text-xs text-slate-600 mt-0.5">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ─────────────────────────────────────────────
          오른쪽 패널 — 페이지 콘텐츠 (Outlet)
          ───────────────────────────────────────────── */}
      <div className="w-full lg:w-1/2 xl:w-2/5 flex items-center justify-center p-6 sm:p-10 relative">

        {/* 배경 미세 오브 */}
        <div
          className="absolute top-1/3 right-1/3 w-60 h-60 rounded-full opacity-[0.05] animate-pulse-glow pointer-events-none"
          style={{
            background: 'radial-gradient(circle, #6366f1, transparent)',
            filter: 'blur(40px)',
          }}
        />

        {/* 모바일 로고 */}
        <div className="absolute top-6 left-6 lg:hidden flex items-center gap-2.5">
          <LogoMark size="sm" />
          <span className="text-white font-semibold">E-COM AI</span>
        </div>

        {/* Outlet: LoginPage 또는 SignupPage */}
        <div className="w-full max-w-md relative z-10">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

// ─── 서브 컴포넌트 ────────────────────────────────────

/** 브랜드 로고마크 */
const LogoMark = ({ size = 'md' }) => {
  const sizeClass = size === 'sm' ? 'w-8 h-8 text-xs' : 'w-10 h-10 text-sm';
  return (
    <div
      className={`${sizeClass} rounded-xl flex items-center justify-center text-white font-bold shrink-0`}
      style={{ background: 'linear-gradient(135deg, #6366f1, #22d3ee)' }}
    >
      AI
    </div>
  );
};

/** 특징 포인트 카드 */
const FeatureCard = ({ Icon, title, desc, color }) => (
  <div className="glass-card p-3.5 rounded-xl">
    <Icon size={16} style={{ color }} />
    <p className="mt-2 text-white text-xs font-semibold">{title}</p>
    <p className="mt-0.5 text-slate-500 text-xs leading-relaxed">{desc}</p>
  </div>
);

export default AuthLayout;
