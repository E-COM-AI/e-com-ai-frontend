import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  MessageSquarePlus, ChevronRight, ChevronLeft,
  AlertCircle, Inbox, RefreshCw,
} from 'lucide-react';
import useInquiryList, { DIRECTION, STATUS_FILTER } from '../hooks/useInquiryList.js';

const getStatusStyle = (status) => {
  switch (status) {
    case 'OPEN':
      return { bg: 'rgba(245,158,11,0.12)', border: 'rgba(245,158,11,0.3)',  color: '#fbbf24' }; // 노란색
    case 'IN_PROGRESS':
      return { bg: 'rgba(99,102,241,0.12)', border: 'rgba(99,102,241,0.3)',  color: '#818cf8' }; // 파란색
    case 'CLOSED':
      return { bg: 'rgba(16,185,129,0.12)', border: 'rgba(16,185,129,0.3)', color: '#34d399' }; // 초록색
    default:
      return { bg: 'rgba(255,255,255,0.06)', border: 'rgba(255,255,255,0.1)', color: '#94a3b8' };
  }
};

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

const Pagination = ({ page, totalPages, onPageChange }) => {
  if (totalPages <= 1) return null;

  const getPageNumbers = () => {
    const delta = 2;
    const range = [];
    for (let i = Math.max(0, page - delta); i <= Math.min(totalPages - 1, page + delta); i++) {
      range.push(i);
    }
    return range;
  };

  return (
    <div className="flex items-center justify-center gap-1.5 mt-6">
      <button
        onClick={() => onPageChange(page - 1)}
        disabled={page === 0}
        className="w-8 h-8 flex items-center justify-center rounded-lg transition-all duration-200 disabled:opacity-30 disabled:cursor-not-allowed"
        style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', color: '#94a3b8' }}
      >
        <ChevronLeft size={14} />
      </button>
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
      <span className="text-xs text-slate-600 font-mono w-8 shrink-0">#{item.inquiryId}</span>
      <span className="flex-1 text-sm font-medium text-slate-300 group-hover:text-white transition-colors truncate">
        {item.title}
      </span>
      <StatusBadge status={item.status} statusDisplay={item.statusDisplay} />
      <span className="text-xs text-slate-600 shrink-0 hidden sm:block">{item.createdAt}</span>
      <ChevronRight size={15} className="text-slate-700 group-hover:text-slate-400 transition-colors shrink-0" />
    </button>
  );
};

const InquiryListPage = () => {
  const navigate = useNavigate();

  const {
    data,
    isLoading,
    error,
    page,
    direction,
    statusFilter,
    setPage,
    setDirection,
    setStatusFilter,
    refetch,
  } = useInquiryList();  // ← 훅은 반드시 이렇게 구조분해해서 사용

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
        <div className="flex items-center gap-2">
          <FilterTab label="전체"      value={STATUS_FILTER.ALL}    current={statusFilter} onClick={setStatusFilter} />
          <FilterTab label="답변 대기" value={STATUS_FILTER.OPEN}   current={statusFilter} onClick={setStatusFilter} />
          <FilterTab label="처리중"   value={STATUS_FILTER.IN_PROGRESS} current={statusFilter} onClick={setStatusFilter} />
          <FilterTab label="답변 완료" value={STATUS_FILTER.CLOSED} current={statusFilter} onClick={setStatusFilter} />
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center rounded-lg overflow-hidden" style={{ border: '1px solid rgba(255,255,255,0.08)' }}>
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
          >
            <RefreshCw size={13} className={isLoading ? 'animate-spin' : ''} />
          </button>
        </div>
      </div>

      {/* 콘텐츠 */}
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
            <AlertCircle size={28} style={{ color: '#f43f5e' }} />
            <p className="text-white font-semibold">목록을 불러오지 못했습니다</p>
            <p className="text-slate-500 text-sm">{error}</p>
            <button onClick={refetch} className="btn-primary text-sm px-6 py-2.5">다시 시도</button>
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
            <p className="text-white font-semibold">
              {statusFilter === STATUS_FILTER.OPEN   && '답변 대기 중인 문의가 없습니다.'}
              {statusFilter === STATUS_FILTER.IN_PROGRESS && '처리 중인 문의가 없습니다.'}
              {statusFilter === STATUS_FILTER.CLOSED && '답변 완료된 문의가 없습니다.'}
              {statusFilter === STATUS_FILTER.ALL    && '문의 내역이 없습니다.'}
            </p>
            {statusFilter === STATUS_FILTER.ALL && (
              <button
                onClick={() => navigate('/inquiry/new')}
                className="btn-primary text-sm px-6 py-2.5 flex items-center gap-2"
              >
                <MessageSquarePlus size={14} />
                문의하기
              </button>
            )}
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
            <Pagination page={page} totalPages={data.totalPages} onPageChange={setPage} />
          </>
        )}
      </div>
    </div>
  );
};

export default InquiryListPage;