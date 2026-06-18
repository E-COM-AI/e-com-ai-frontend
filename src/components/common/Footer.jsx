// =====================================================
// src/components/common/Footer.jsx
// 글로벌 푸터 컴포넌트
//
// - 브랜드 로고 + 서비스 설명
// - 빠른 링크
// - 저작권 + API 상태 표시
// =====================================================

import React from 'react';
import { NavLink } from 'react-router-dom';
import { Zap, ExternalLink } from 'lucide-react';

// ─── 링크 그룹 정의 ──────────────────────────────────
const LINK_GROUPS = [
  {
    title: '서비스',
    links: [
      { label: '대시보드',   to: '/',    internal: true },
      // { label: '분석',      to: '/analytics', internal: true }, // 추후 활성화
      // { label: '설정',      to: '/settings',  internal: true },
    ],
  },
  {
    title: '지원',
    links: [
      { label: '이용약관',         href: '#' },
      { label: '개인정보처리방침', href: '#' },
      { label: '고객센터',         href: '#' },
    ],
  },
];

/**
 * 글로벌 푸터 컴포넌트
 * DashboardLayout 하단에 위치합니다.
 */
const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      className="relative z-10 w-full mt-16"
      style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}
    >
      {/* 상단 그라디언트 라인 */}
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{
          background:
            'linear-gradient(90deg, transparent, rgba(99,102,241,0.4), rgba(34,211,238,0.3), transparent)',
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

        {/* ─── 메인 영역 ─── */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pb-8" style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>

          {/* 브랜드 소개 */}
          <div className="md:col-span-1 space-y-4">
            {/* 로고 */}
            <div className="flex items-center gap-2.5">
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center text-white font-bold text-xs shrink-0"
                style={{ background: 'linear-gradient(135deg, #6366f1, #22d3ee)' }}
              >
                AI
              </div>
              <span className="font-bold text-white text-sm tracking-tight">E-COM AI</span>
              <div
                className="flex items-center gap-0.5 text-xs font-semibold px-1.5 py-0.5 rounded-full"
                style={{
                  background: 'rgba(99,102,241,0.12)',
                  border: '1px solid rgba(99,102,241,0.25)',
                  color: '#818cf8',
                }}
              >
                <Zap size={9} />
                Beta
              </div>
            </div>

            {/* 서비스 설명 */}
            <p className="text-slate-500 text-sm leading-relaxed max-w-xs">
              NLP 기반 AI 분석으로 이커머스 고객 문의를
              자동 분류하고 운영 효율을 향상시킵니다.
            </p>

            {/* 기술 배지 */}
            <div className="flex flex-wrap gap-2">
              {['NLP', 'Machine Learning', 'Real-time'].map((tag) => (
                <span
                  key={tag}
                  className="text-xs px-2.5 py-1 rounded-full font-medium"
                  style={{
                    background: 'rgba(255,255,255,0.04)',
                    border: '1px solid rgba(255,255,255,0.08)',
                    color: '#64748b',
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* 링크 그룹 */}
          <div className="md:col-span-2 grid grid-cols-2 sm:grid-cols-2 gap-6">
            {LINK_GROUPS.map((group) => (
              <div key={group.title} className="space-y-3">
                <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-widest">
                  {group.title}
                </h4>
                <ul className="space-y-2.5">
                  {group.links.map((link) => (
                    <li key={link.label}>
                      {link.internal ? (
                        <NavLink
                          to={link.to}
                          end
                          className="text-sm text-slate-500 hover:text-slate-300 transition-colors duration-150 flex items-center gap-1.5"
                        >
                          {link.label}
                        </NavLink>
                      ) : (
                        <a
                          href={link.href}
                          target={link.href !== '#' ? '_blank' : undefined}
                          rel={link.href !== '#' ? 'noreferrer' : undefined}
                          className="text-sm text-slate-500 hover:text-slate-300 transition-colors duration-150 flex items-center gap-1.5"
                        >
                          {link.label}
                          {link.href !== '#' && <ExternalLink size={11} className="opacity-50" />}
                        </a>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* ─── 하단: 저작권 + API 상태 ─── */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">

          {/* 저작권 */}
          <p className="text-xs text-slate-600 order-2 sm:order-1">
            © {currentYear} E-COM AI. All rights reserved.
          </p>

          {/* API 상태 뱃지 */}
          <div className="flex items-center gap-3 order-1 sm:order-2">
            <ApiStatusBadge />
          </div>
        </div>
      </div>
    </footer>
  );
};

// ─── API 상태 뱃지 ────────────────────────────────────

/**
 * API 상태 표시 뱃지
 * 추후 실제 Health Check API와 연동 가능
 */
const ApiStatusBadge = () => (
  <div
    className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium"
    style={{
      background: 'rgba(16,185,129,0.08)',
      border: '1px solid rgba(16,185,129,0.2)',
      color: '#34d399',
    }}
  >
    {/* 상태 점 — 녹색 점멸 */}
    <span
      className="w-1.5 h-1.5 rounded-full inline-block"
      style={{
        background: '#10b981',
        boxShadow: '0 0 6px rgba(16,185,129,0.8)',
        animation: 'pulseGlow 2s ease-in-out infinite',
      }}
    />
    All systems operational
  </div>
);

export default Footer;
