// =====================================================
// src/pages/HomePage.jsx
// 고객용 메인 홈화면
//
// - 백엔드 API 호출 없음 (순수 프론트)
// - 가짜 데이터 없음
// - 고객센터 1:1 문의 서비스 안내 및 CTA
// =====================================================

import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  MessageSquarePlus,
  ClipboardList,
  Clock,
  CheckCircle2,
  ChevronRight,
  HeadphonesIcon,
} from 'lucide-react';
import { useAuthContext } from '../context/AuthContext.jsx';

/** 문의 서비스 안내 카드 목록 (정적 콘텐츠) */
const GUIDE_ITEMS = [
  {
    Icon: MessageSquarePlus,
    color: '#818cf8',
    title: '1:1 문의 등록',
    desc: '궁금한 점이나 불편한 사항을 직접 문의하세요. 담당자가 빠르게 답변드립니다.',
  },
  {
    Icon: ClipboardList,
    color: '#22d3ee',
    title: '내 문의 목록',
    desc: '접수한 문의 내역을 확인하고 진행 상태를 실시간으로 확인할 수 있습니다.',
  },
];

const HomePage = () => {
  const { user } = useAuthContext();
  const navigate = useNavigate();

  const userName = user?.email?.split('@')[0] ?? '고객';

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">

      {/* ── 웰컴 섹션 ── */}
      <div className="mb-10 animate-fade-in-up">
        <p className="text-slate-500 text-sm mb-1">
          {new Date().toLocaleDateString('ko-KR', {
            year: 'numeric', month: 'long', day: 'numeric', weekday: 'long',
          })}
        </p>
        <h1 className="text-3xl sm:text-4xl font-bold text-white">
          안녕하세요,{' '}
          <span className="gradient-text">{userName}</span>님 👋
        </h1>
        <p className="mt-2 text-slate-400 text-base">
          무엇을 도와드릴까요? 고객센터에 문의하시면 신속하게 답변드리겠습니다.
        </p>
      </div>

      {/* ── 메인 CTA 카드 ── */}
      <div
        className="relative rounded-2xl p-8 mb-6 overflow-hidden animate-fade-in-up-200"
        style={{
          background: 'linear-gradient(135deg, rgba(99,102,241,0.2) 0%, rgba(34,211,238,0.1) 100%)',
          border: '1px solid rgba(99,102,241,0.3)',
          boxShadow: '0 20px 60px rgba(99,102,241,0.15)',
        }}
      >
        {/* 배경 글로우 */}
        <div
          className="absolute top-0 right-0 w-64 h-64 rounded-full pointer-events-none"
          style={{
            background: 'radial-gradient(circle, rgba(34,211,238,0.15), transparent 70%)',
            filter: 'blur(40px)',
            transform: 'translate(30%, -30%)',
          }}
        />

        <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="flex items-start gap-4">
            <div
              className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
              style={{
                background: 'rgba(99,102,241,0.2)',
                border: '1px solid rgba(99,102,241,0.4)',
              }}
            >
              <HeadphonesIcon size={22} style={{ color: '#818cf8' }} />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">고객센터 1:1 문의</h2>
              <p className="mt-1 text-slate-400 text-sm leading-relaxed">
                주문, 배송, 환불 등 궁금한 사항을 문의해주세요.
                <br className="hidden sm:block" />
                담당자가 확인 후 빠르게 답변드립니다.
              </p>
            </div>
          </div>

          <div className="flex gap-3 shrink-0 w-full sm:w-auto">
            <button
              onClick={() => navigate('/inquiry/new')}
              className="btn-primary flex-1 sm:flex-none flex items-center justify-center gap-2 text-sm px-5 py-2.5"
            >
              <MessageSquarePlus size={15} />
              문의하기
            </button>
            <button
              onClick={() => navigate('/inquiry')}
              className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium transition-all duration-200"
              style={{
                color: '#94a3b8',
                background: 'rgba(255,255,255,0.06)',
                border: '1px solid rgba(255,255,255,0.12)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = '#fff';
                e.currentTarget.style.background = 'rgba(255,255,255,0.1)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = '#94a3b8';
                e.currentTarget.style.background = 'rgba(255,255,255,0.06)';
              }}
            >
              <ClipboardList size={15} />
              내 문의 목록
            </button>
          </div>
        </div>
      </div>

      {/* ── 서비스 안내 카드 그리드 ── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 animate-fade-in-up-400">
        {GUIDE_ITEMS.map(({ Icon, color, title, desc }, idx) => (
          <GuideCard
            key={title}
            Icon={Icon}
            color={color}
            title={title}
            desc={desc}
            delay={idx * 80}
          />
        ))}
      </div>

    </div>
  );
};

/** 안내 카드 */
const GuideCard = ({ Icon, color, title, desc, delay }) => (
  <div
    className="glass-card p-5 flex gap-4"
    style={{
      animation: 'fadeInUp 0.5s ease-out forwards',
      opacity: 0,
      animationDelay: `${delay}ms`,
    }}
  >
    <div
      className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0 mt-0.5"
      style={{
        background: `${color}18`,
        border: `1px solid ${color}30`,
      }}
    >
      <Icon size={16} style={{ color }} />
    </div>
    <div>
      <h3 className="text-sm font-semibold text-white">{title}</h3>
      <p className="mt-1 text-xs text-slate-500 leading-relaxed">{desc}</p>
    </div>
  </div>
);

export default HomePage;