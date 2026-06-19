// =====================================================
// src/pages/InquiryListPage.jsx
// 내 문의 목록 페이지
//
// - 상태 필터: 전체 / 답변 대기 / 답변 완료
// - 정렬: 최신순(DESC) / 등록순(ASC)
// - 페이지네이션
// =====================================================

import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  MessageSquarePlus, ChevronRight, ChevronLeft,
  AlertCircle, Inbox, Loader2, RefreshCw,
} from 'lucide-react';
import useInquiryList, { DIRECTION, STATUS_FILTER } from '../hooks/useInquiryList.js';

// ─── 상태 배지 ────────────────────────────────────────

/** OPEN 여부에 따라 배지 스타일 반환 */
const getStatusStyle = (status) =>
  status === 'OPEN'
    ? { bg: 'rgba(245,158,11,0.12)', border: 'rgba(245,158,11,0.3)', color: '#fbbf24' }
    : { bg: 'rgba(16,185,129,0.12)', border: 'rgba(16,185,129,0.3)', color: '#34d399' };

const StatusBadge = ({ status, statusDisplay }) => {
  const s = getStatusStyle(status);
  return (
    <span
      className="inline-flex items-center text-xs font-medium px-2.5 py-1 rounded-full shrink-0"
      style={{ background: s.bg, border: `1px solid ${s.border}`, color: s.color }}
    >
      {statusDisplay || status}
    </span>
  );
};

// ─── 탭 버튼 ──────────────────────────────────────────

const FilterTab = ({ label, value, current, onClick }) => {
  const isActive = current === value;
  return (
    <button
      onClick={() => onClick(value)}
      className="px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200"
      style={
        isActive
          ? { background: 'rgba(99,102,241,0.2)', border: '1px solid rgba(99,102,241,0.4)', color: '#818cf8' }
          : { background: 'transparent', border: '1px solid rgba(255,255,255,0.08)', color: '#64748b' }
      }
    >
      {label}
    </button>
  );
};

// ─── 페이지네이션 ─────────────────────────────────────

const Pagination = ({ page, totalPages, onPageChange }) => {
  if (totalPages <= 1) return null;

  // 표시할 페이지 번호 범위 (현재 페이지 중심 최대 5개)
  const getPageNumbers = () => {
    const delta = 2;
    const range = [];
    for (
      let i = Math.max(0, page - delta);
      i <= Math.min(totalPages - 1, page + delta);
      i++
    ) {
      range.push(i);
    }
    return range;
  };

  return (
    <div className="flex items-center justify-center gap-1.5 mt-6">
      {/* 이전 */}
      <button
        onClick={() => onPageChange(page - 1)}
        disabled={page === 0}
        className="w-8 h-8 flex items-center justify-center rounded-lg transition-all duration-200 disabled:opacity-30 disabled:cursor-not-allowed"
        style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', color: '#94a3b8' }}
      >
        <ChevronLeft size={14} />
      </button>

      {/* 페이지 번호 */}
      {getPageNumbers().map((p) => (
        <button
          key={p}
          onClick={() => onPageChange(p)}
          className="w-8 h-8 flex items-center justify-center rounded-lg text-xs font-medium transition-all duration-200"
          style={
            p === page
              ? { background: 'rgba(99,102,241,0.2)', border: '1px solid rgba(99,102,241,0.4)', color: '#818cf8' }
              : { background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', color: '#64748b' }
          }
        >
          {p + 1}
        </button>
      ))}

      {/* 다음 */}
      <button
        onClick={() => onPageChange(page + 1)}
        disabled={page >= totalPages - 1}
        className="w-8 h-8 flex items-center justify-center rounded-lg transition-all duration-200 disabled:opacity-30 disabled:cursor-not-allowed"
        style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', color: '#94a3b8' }}
      >
        <ChevronRight size={14} />
      </button>
    </div>
  );
};

// ─── 메인 페이지 ──────────────────────────────────────

const InquiryListPage = () => {
  const navigate = useNavigate();
  const {
    data, isLoading, error,
    page, direction, statusFilter,
    setPage, setDirection, setStatusFilter,
    refetch,
  } = useInquiryList();

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

      {/* 헤더 */}
      <div className="flex items-center justify-between gap-4 mb-6 animate-fade-in-up flex-wrap">
        <div>
          <h1 className="text-xl font-bold text-white">내 문의 목록</h1>
          {data && (
            <p className="text-slate-500 text-sm mt-0.5">
              총 <span className="text-slate-300 font-medium">{data.totalElements}</span>건
            </p>
          )}
        </div>
        <button
          onClick={() => navigate('/inquiry/new')}
          className="btn-primary flex items-center gap-2 text-sm px-5 py-2.5"
        >
          <MessageSquarePlus size={15} />
          문의하기
        </button>
      </div>

      {/* 필터 + 정렬 바 */}
      <div className="flex items-center justify-between gap-3 mb-4 flex-wrap animate-fade-in-up-200">
        {/* 상태 필터 탭 */}
        <div className="flex items-center gap-2">
          <FilterTab label="전체"       value={STATUS_FILTER.ALL}    current={statusFilter} onClick={setStatusFilter} />
          <FilterTab label="답변 대기"  value={STATUS_FILTER.OPEN}   current={statusFilter} onClick={setStatusFilter} />
          <FilterTab label="답변 완료"  value={STATUS_FILTER.CLOSED} current={statusFilter} onClick={setStatusFilter} />
        </div>

        {/* 정렬 + 새로고침 */}
        <div className="flex items-center gap-2">
          <div
            className="flex items-center rounded-lg overflow-hidden"
            style={{ border: '1px solid rgba(255,255,255,0.08)' }}
          >
            {[
              { label: '최신순', value: DIRECTION.DESC },
              { label: '등록순', value: DIRECTION.ASC  },
            ].map(({ label, value }) => (
              <button
                key={value}
                onClick={() => setDirection(value)}
                className="px-3 py-1.5 text-xs font-medium transition-all duration-200"
                style={
                  direction === value
                    ? { background: 'rgba(99,102,241,0.2)', color: '#818cf8' }
                    : { background: 'transparent', color: '#64748b' }
                }
              >
                {label}
              </button>
            ))}
          </div>

          <button
            onClick={refetch}
            disabled={isLoading}
            className="w-8 h-8 flex items-center justify-center rounded-lg transition-all duration-200 disabled:opacity-50"
            style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', color: '#64748b' }}
            aria-label="새로고침"
          >
            <RefreshCw size={13} className={isLoading ? 'animate-spin' : ''} />
          </button>
        </div>
      </div>

      {/* 콘텐츠 영역 */}
      <div className="animate-fade-in-up-200">

        {/* 로딩 */}
        {isLoading && (
          <div className="flex flex-col gap-3">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="glass-card p-4 flex items-center gap-4">
                <div className="skeleton h-4 w-1/2 rounded" />
                <div className="skeleton h-6 w-16 rounded-full ml-auto" />
                <div className="skeleton h-4 w-24 rounded" />
              </div>
            ))}
          </div>
        )}

        {/* 에러 */}
        {!isLoading && error && (
          <div className="glass-card p-8 flex flex-col items-center text-center gap-4">
            <div
              className="w-12 h-12 rounded-xl flex items-center justify-center"
              style={{ background: 'rgba(244,63,94,0.1)', border: '1px solid rgba(244,63,94,0.2)' }}
            >
              <AlertCircle size={22} style={{ color: '#f43f5e' }} />
            </div>
            <div>
              <p className="text-white font-semibold">목록을 불러오지 못했습니다</p>
              <p className="text-slate-500 text-sm mt-1">{error}</p>
            </div>
            <button onClick={refetch} className="btn-primary text-sm px-6 py-2.5">
              다시 시도
            </button>
          </div>
        )}

        {/* 빈 상태 */}
        {!isLoading && !error && data?.items?.length === 0 && (
          <div className="glass-card p-12 flex flex-col items-center text-center gap-4">
            <div
              className="w-14 h-14 rounded-2xl flex items-center justify-center"
              style={{ background: 'rgba(99,102,241,0.1)', border: '1px solid rgba(99,102,241,0.2)' }}
            >
              <Inbox size={26} style={{ color: '#6366f1' }} />
            </div>
            <div>
              <p className="text-white font-semibold">문의 내역이 없습니다</p>
              <p className="text-slate-500 text-sm mt-1">
                {statusFilter ? '해당 상태의 문의가 없습니다.' : '첫 번째 문의를 남겨보세요.'}
              </p>
            </div>
            <button
              onClick={() => navigate('/inquiry/new')}
              className="btn-primary text-sm px-6 py-2.5 flex items-center gap-2"
            >
              <MessageSquarePlus size={14} />
              문의하기
            </button>
          </div>
        )}

        {/* 목록 */}
        {!isLoading && !error && data?.items?.length > 0 && (
          <>
            <div className="flex flex-col gap-2">
              {data.items.map((item, idx) => (
                <InquiryItem key={item.inquiryId} item={item} index={idx} />
              ))}
            </div>

            {/* 페이지네이션 */}
            <Pagination
              page={page}
              totalPages={data.totalPages}
              onPageChange={setPage}
            />
          </>
        )}
      </div>
    </div>
  );
};

// ─── 목록 아이템 ──────────────────────────────────────

const InquiryItem = ({ item, index }) => {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate(`/inquiry/${item.inquiryId}`)}
      className="w-full text-left glass-card px-5 py-4 flex items-center gap-4 group"
      style={{
        animation: 'fadeInUp 0.4s ease-out forwards',
        opacity: 0,
        animationDelay: `${index * 50}ms`,
        borderRadius: '1rem',
      }}
    >
      {/* 문의 번호 */}
      <span className="text-xs text-slate-600 font-mono w-8 shrink-0">
        #{item.inquiryId}
      </span>

      {/* 제목 */}
      <span className="flex-1 text-sm font-medium text-slate-300 group-hover:text-white transition-colors truncate">
        {item.title}
      </span>

      {/* 상태 배지 */}
      <StatusBadge status={item.status} statusDisplay={item.statusDisplay} />

      {/* 날짜 */}
      <span className="text-xs text-slate-600 shrink-0 hidden sm:block">
        {item.createdAt}
      </span>

      {/* 화살표 */}
      <ChevronRight
        size={15}
        className="text-slate-700 group-hover:text-slate-400 transition-colors shrink-0"
      />
    </button>
  );
};

export default InquiryListPage;
