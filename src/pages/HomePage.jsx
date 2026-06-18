// =====================================================
// src/pages/HomePage.jsx
// 홈 대시보드 페이지 — DashboardLayout의 Outlet으로 렌더링됨
// 헤더는 DashboardLayout이 담당 (중복 없음)
// =====================================================

import React, { useRef, useCallback } from 'react';
import {
  BarChart2, Clock, CheckCircle2, AlertTriangle,
  MessageSquare, Frown, Smile, Shield,
  Tag, Users, TrendingUp, Timer, AlertCircle, Pin,
  RefreshCw, Inbox,
} from 'lucide-react';
import { useAuthContext } from '../context/AuthContext.jsx';
import useHome from '../hooks/useHome.js';
import LoadingSpinner from '../components/common/LoadingSpinner.jsx';

// ─── 아이콘 매핑 ──────────────────────────────────────

const ICON_MAP = [
  { keywords: ['total', '전체', 'count', '건수'],      Icon: BarChart2,    color: '#6366f1' },
  { keywords: ['pending', '대기', 'queue', '큐'],      Icon: Clock,        color: '#f59e0b' },
  { keywords: ['resolved', '처리', 'complete', '완료'], Icon: CheckCircle2, color: '#10b981' },
  { keywords: ['urgent', '긴급', 'priority', '우선'],   Icon: AlertTriangle, color: '#f43f5e' },
  { keywords: ['sentiment', '감정', 'emotion'],         Icon: MessageSquare, color: '#8b5cf6' },
  { keywords: ['negative', '부정', 'complaint'],        Icon: Frown,         color: '#ef4444' },
  { keywords: ['positive', '긍정'],                     Icon: Smile,         color: '#22d3ee' },
  { keywords: ['profanity', '욕설', 'abuse'],           Icon: Shield,        color: '#f97316' },
  { keywords: ['category', '분류', 'classified'],       Icon: Tag,           color: '#06b6d4' },
  { keywords: ['user', '사용자', 'member'],             Icon: Users,         color: '#a78bfa' },
  { keywords: ['rate', '비율', 'percent'],              Icon: TrendingUp,    color: '#34d399' },
  { keywords: ['time', '시간', 'duration', '응답'],     Icon: Timer,         color: '#facc15' },
  { keywords: ['error', '오류', 'fail'],                Icon: AlertCircle,   color: '#f43f5e' },
];

const getIconForKey = (key) => {
  const lower = key.toLowerCase();
  return ICON_MAP.find(({ keywords }) => keywords.some((kw) => lower.includes(kw)))
    ?? { Icon: Pin, color: '#94a3b8' };
};

// ─── 유틸 ─────────────────────────────────────────────

const formatLabel = (key) =>
  key.replace(/([A-Z])/g, ' $1').replace(/_/g, ' ').replace(/^\w/, (c) => c.toUpperCase()).trim();

const formatValue = (value) => {
  if (typeof value !== 'number' || !Number.isFinite(value)) return String(value);
  if (value >= 1_000_000) return `${(value / 1_000_000).toFixed(1)}M`;
  if (value >= 1_000)     return value.toLocaleString('ko-KR');
  if (Number.isInteger(value)) return value.toLocaleString('ko-KR');
  return value.toFixed(2);
};

// ─── 메트릭 카드 ──────────────────────────────────────

const MetricCard = ({ label, value, type, index }) => {
  const cardRef = useRef(null);
  const { Icon, color } = getIconForKey(label);

  const handleMouseMove = useCallback((e) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const rotateX = (((e.clientY - rect.top)  / rect.height) - 0.5) * -14;
    const rotateY = (((e.clientX - rect.left) / rect.width)  - 0.5) *  14;
    card.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px)`;
  }, []);

  const handleMouseLeave = useCallback(() => {
    if (cardRef.current)
      cardRef.current.style.transform = 'perspective(800px) rotateX(0deg) rotateY(0deg) translateZ(0)';
  }, []);

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="glass-card p-5 cursor-default"
      style={{
        transition: 'transform 0.15s ease, box-shadow 0.3s ease',
        animation: 'fadeInUp 0.5s ease-out forwards',
        opacity: 0,
        animationDelay: `${index * 60}ms`,
      }}
    >
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs font-medium text-slate-500 uppercase tracking-wider">
          {formatLabel(label)}
        </span>
        <div
          className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
          style={{ background: `${color}18`, border: `1px solid ${color}30` }}
        >
          <Icon size={14} style={{ color }} />
        </div>
      </div>

      {type === 'number' && (
        <p className="text-2xl font-black font-mono leading-none" style={{ color }}>
          {formatValue(value)}
        </p>
      )}
      {type === 'string' && (
        <p className="text-base font-semibold text-white leading-snug break-words">{String(value)}</p>
      )}
      {type === 'boolean' && (
        <p className="text-base font-semibold" style={{ color: value ? '#10b981' : '#f43f5e' }}>
          {value ? '활성' : '비활성'}
        </p>
      )}

      <div
        className="mt-4 h-0.5 rounded-full opacity-40"
        style={{ background: `linear-gradient(90deg, ${color}, transparent)` }}
      />
    </div>
  );
};

// ─── 스켈레톤 ─────────────────────────────────────────

const SkeletonCard = () => (
  <div className="glass-card p-5">
    <div className="flex items-center justify-between mb-3">
      <div className="skeleton h-3 w-24 rounded" />
      <div className="skeleton w-8 h-8 rounded-lg" />
    </div>
    <div className="skeleton h-7 w-16 rounded mt-3" />
    <div className="skeleton h-0.5 w-full rounded-full mt-4" />
  </div>
);

// ─── 빈 상태 ──────────────────────────────────────────

const EmptyState = () => (
  <div className="flex flex-col items-center justify-center py-24 text-center">
    <div
      className="w-16 h-16 rounded-2xl flex items-center justify-center mb-5 animate-float"
      style={{ background: 'rgba(99,102,241,0.1)', border: '1px solid rgba(99,102,241,0.2)' }}
    >
      <Inbox size={28} style={{ color: '#6366f1' }} />
    </div>
    <h3 className="text-white font-semibold text-lg mb-2">아직 표시할 데이터가 없습니다</h3>
    <p className="text-slate-500 text-sm max-w-xs leading-relaxed">
      고객 문의가 수집되면 이 화면에 AI 분석 결과가 표시됩니다.
    </p>
  </div>
);

// ─── 에러 상태 ────────────────────────────────────────

const ErrorState = ({ message, onRetry }) => (
  <div className="flex flex-col items-center justify-center py-24 text-center">
    <div
      className="w-14 h-14 rounded-2xl flex items-center justify-center mb-5"
      style={{ background: 'rgba(244,63,94,0.1)', border: '1px solid rgba(244,63,94,0.2)' }}
    >
      <AlertCircle size={24} style={{ color: '#f43f5e' }} />
    </div>
    <h3 className="text-white font-semibold text-lg mb-2">데이터를 불러오지 못했습니다</h3>
    <p className="text-slate-500 text-sm mb-6 max-w-xs">{message}</p>
    <button onClick={onRetry} className="btn-primary text-sm px-6 py-2.5">다시 시도</button>
  </div>
);

// ─── 데이터 렌더러 ────────────────────────────────────

const DataRenderer = ({ data }) => {
  if (!data || typeof data !== 'object') return <EmptyState />;

  const entries = Object.entries(data);
  if (entries.length === 0) return <EmptyState />;

  const cardEntries    = [];
  const sectionEntries = [];

  entries.forEach(([key, value]) => {
    if (['number', 'string', 'boolean'].includes(typeof value)) {
      cardEntries.push([key, value, typeof value]);
    } else if (Array.isArray(value)) {
      cardEntries.push([key, value.length, 'number']);
    } else if (value !== null && typeof value === 'object') {
      sectionEntries.push([key, value]);
    }
  });

  return (
    <div className="space-y-8">
      {cardEntries.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {cardEntries.map(([key, value, type], idx) => (
            <MetricCard key={key} label={key} value={value} type={type} index={idx} />
          ))}
        </div>
      )}
      {sectionEntries.map(([key, value]) => (
        <div key={key}>
          <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-3 flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full inline-block" style={{ background: '#6366f1' }} />
            {formatLabel(key)}
          </h3>
          <DataRenderer data={value} />
        </div>
      ))}
    </div>
  );
};

// ─── 메인 페이지 ──────────────────────────────────────

const HomePage = () => {
  const { user }                        = useAuthContext();
  const { data, isLoading, error, refetch } = useHome();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">

      {/* 환영 배너 */}
      <div className="mb-8 flex items-start justify-between gap-4 flex-wrap animate-fade-in-up">
        <div>
          <p className="text-slate-500 text-sm font-medium">
            {new Date().toLocaleDateString('ko-KR', {
              year: 'numeric', month: 'long', day: 'numeric', weekday: 'long',
            })}
          </p>
          <h1 className="mt-1 text-2xl sm:text-3xl font-bold text-white">
            안녕하세요,{' '}
            <span className="gradient-text">{user?.email?.split('@')[0] ?? '사용자'}</span>님 👋
          </h1>
          <p className="mt-1.5 text-slate-500 text-sm">AI 분석 대시보드에 오신 것을 환영합니다.</p>
        </div>

        {!isLoading && (
          <button
            onClick={refetch}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 shrink-0"
            style={{ color: '#94a3b8', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background    = 'rgba(99,102,241,0.1)';
              e.currentTarget.style.borderColor   = 'rgba(99,102,241,0.3)';
              e.currentTarget.style.color         = '#818cf8';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background    = 'rgba(255,255,255,0.04)';
              e.currentTarget.style.borderColor   = 'rgba(255,255,255,0.08)';
              e.currentTarget.style.color         = '#94a3b8';
            }}
            aria-label="데이터 새로고침"
          >
            <RefreshCw size={13} />
            새로고침
          </button>
        )}
      </div>

      {/* 구분선 */}
      <div
        className="mb-8 h-px"
        style={{ background: 'linear-gradient(90deg, rgba(99,102,241,0.4), transparent)' }}
      />

      {/* 데이터 영역 */}
      <div className="animate-fade-in-up-200">
        {isLoading && (
          <div>
            <div className="flex items-center gap-2.5 mb-6">
              <LoadingSpinner size="sm" label="" />
              <span className="text-sm text-slate-500">데이터를 불러오는 중...</span>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {Array.from({ length: 8 }).map((_, i) => <SkeletonCard key={i} />)}
            </div>
          </div>
        )}
        {!isLoading && error  && <ErrorState message={error} onRetry={refetch} />}
        {!isLoading && !error && <DataRenderer data={data} />}
      </div>
    </div>
  );
};

export default HomePage;
