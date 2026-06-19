import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  ArrowLeft, Pencil, Trash2, Save, X,
  AlertCircle, Loader2, CheckCircle2,
} from 'lucide-react';
import useInquiryDetail from '../hooks/useInquiryDetail.js';

const TITLE_MAX   = 255;
const CONTENT_MAX = 5000;

const StatusBadge = ({ status, statusDisplay }) => {
  const getStyle = () => {
    switch (status) {
      case 'OPEN':
        return { bg: 'rgba(245,158,11,0.12)', border: 'rgba(245,158,11,0.3)',   color: '#fbbf24' };
      case 'IN_PROGRESS':
        return { bg: 'rgba(99,102,241,0.12)', border: 'rgba(99,102,241,0.3)',   color: '#818cf8' };
      case 'CLOSED':
        return { bg: 'rgba(16,185,129,0.12)', border: 'rgba(16,185,129,0.3)',  color: '#34d399' };
      default:
        return { bg: 'rgba(255,255,255,0.06)', border: 'rgba(255,255,255,0.1)', color: '#94a3b8' };
    }
  };

  const s = getStyle();
  return (
    <span
      className="inline-flex items-center text-xs font-semibold px-3 py-1 rounded-full"
      style={{ background: s.bg, border: `1px solid ${s.border}`, color: s.color }}
    >
      {statusDisplay || status}
    </span>
  );
};

const InquiryDetailPage = () => {
  const { id }   = useParams();
  const navigate = useNavigate();
  const {
    data, isLoading, error,
    isUpdating, isDeleting, actionError,
    update, remove,
  } = useInquiryDetail(id);

  const [isEditMode,        setIsEditMode]        = useState(false);
  const [editForm,          setEditForm]          = useState({ title: '', content: '' });
  const [editErrors,        setEditErrors]        = useState({});
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [showSuccess,       setShowSuccess]       = useState(false);

  const isOpen = data?.status === 'OPEN';

  useEffect(() => {
    if (isEditMode && data) {
      setEditForm({ title: data.title, content: data.content });
      setEditErrors({});
    }
  }, [isEditMode, data]);

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditForm((prev) => ({ ...prev, [name]: value }));
    if (editErrors[name]) setEditErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const validateEdit = () => {
    const errs = {};
    if (!editForm.title.trim())
      errs.title = '제목을 입력해주세요.';
    else if (editForm.title.trim().length > TITLE_MAX)
      errs.title = `제목은 최대 ${TITLE_MAX}자까지 입력 가능합니다.`;
    if (!editForm.content.trim())
      errs.content = '내용을 입력해주세요.';
    else if (editForm.content.trim().length > CONTENT_MAX)
      errs.content = `내용은 최대 ${CONTENT_MAX}자까지 입력 가능합니다.`;
    setEditErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleUpdateSubmit = async () => {
    if (!validateEdit()) return;
    const ok = await update({ title: editForm.title.trim(), content: editForm.content.trim() });
    if (ok) {
      setIsEditMode(false);
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    }
  };

  const handleDeleteConfirm = async () => {
    const ok = await remove();
    if (ok) navigate('/inquiry', { replace: true });
  };

  if (isLoading) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="glass-card p-8 space-y-4">
          <div className="skeleton h-4 w-20 rounded" />
          <div className="skeleton h-7 w-2/3 rounded" />
          <div className="skeleton h-4 w-32 rounded" />
          <div className="skeleton h-40 w-full rounded-xl mt-4" />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="glass-card p-10 flex flex-col items-center text-center gap-4">
          <AlertCircle size={28} style={{ color: '#f43f5e' }} />
          <p className="text-white font-semibold">문의를 불러오지 못했습니다</p>
          <p className="text-slate-500 text-sm">{error}</p>
          <button onClick={() => navigate('/inquiry')} className="btn-primary text-sm px-6 py-2.5">
            목록으로
          </button>
        </div>
      </div>
    );
  }

  if (!data) return null;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

      {/* 뒤로가기 */}
      <div className="flex items-center gap-3 mb-6 animate-fade-in-up">
        <button
          onClick={() => navigate('/inquiry')}
          className="flex items-center gap-1.5 text-slate-400 hover:text-white transition-colors text-sm"
        >
          <ArrowLeft size={16} />
          내 문의 목록
        </button>
      </div>

      {/* 수정 성공 토스트 */}
      {showSuccess && (
        <div className="mb-4 p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center gap-2.5 animate-fade-in">
          <CheckCircle2 size={15} className="text-emerald-400 shrink-0" />
          <p className="text-emerald-400 text-sm">문의가 수정되었습니다.</p>
        </div>
      )}

      {/* 액션 에러 */}
      {actionError && (
        <div className="mb-4 p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/20 flex items-center gap-2.5">
          <AlertCircle size={15} className="text-rose-400 shrink-0" />
          <p className="text-rose-400 text-sm">{actionError}</p>
        </div>
      )}

      {/* 상세 카드 */}
      <div className="glass-card p-6 sm:p-8 animate-fade-in-up-200">

        {/* 상단: 상태 배지 + 버튼 */}
        <div className="flex items-center justify-between gap-4 mb-6 flex-wrap">
          <div className="flex items-center gap-3">
            <StatusBadge status={data.status} statusDisplay={data.statusDisplay} />
            <span className="text-xs text-slate-600">#{data.inquiryId}</span>
          </div>

          {isOpen && !isEditMode && (
            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsEditMode(true)}
                className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all duration-200"
                style={{ color: '#818cf8', background: 'rgba(99,102,241,0.1)', border: '1px solid rgba(99,102,241,0.25)' }}
                onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(99,102,241,0.2)'; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(99,102,241,0.1)'; }}
              >
                <Pencil size={12} />
                수정
              </button>
              <button
                onClick={() => setShowDeleteConfirm(true)}
                className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all duration-200"
                style={{ color: '#f43f5e', background: 'rgba(244,63,94,0.08)', border: '1px solid rgba(244,63,94,0.2)' }}
                onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(244,63,94,0.15)'; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(244,63,94,0.08)'; }}
              >
                <Trash2 size={12} />
                삭제
              </button>
            </div>
          )}
        </div>

        {/* 삭제 확인 */}
        {showDeleteConfirm && (
          <div
            className="mb-6 p-4 rounded-xl flex items-center justify-between gap-4 flex-wrap"
            style={{ background: 'rgba(244,63,94,0.08)', border: '1px solid rgba(244,63,94,0.2)' }}
          >
            <p className="text-rose-300 text-sm font-medium">정말 이 문의를 삭제하시겠습니까?</p>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setShowDeleteConfirm(false)}
                className="px-3.5 py-1.5 rounded-lg text-xs font-medium"
                style={{ color: '#94a3b8', background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)' }}
              >
                취소
              </button>
              <button
                onClick={handleDeleteConfirm}
                disabled={isDeleting}
                className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-medium disabled:opacity-50"
                style={{ color: '#fff', background: '#f43f5e', border: 'none' }}
              >
                {isDeleting ? <Loader2 size={12} className="animate-spin" /> : <Trash2 size={12} />}
                {isDeleting ? '삭제 중...' : '삭제 확인'}
              </button>
            </div>
          </div>
        )}

        {/* 보기 모드 */}
        {!isEditMode && (
          <>
            <h2 className="text-xl font-bold text-white mb-3 leading-snug">{data.title}</h2>
            <p className="text-xs text-slate-500 mb-6">
              등록일: {data.createdAt}
              {data.updatedAt && ` · 수정일: ${data.updatedAt}`}
            </p>
            <div
              className="text-slate-300 text-sm leading-relaxed whitespace-pre-wrap p-5 rounded-xl"
              style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)', minHeight: '160px' }}
            >
              {data.content}
            </div>
          </>
        )}

        {/* 수정 모드 */}
        {isEditMode && (
          <div className="flex flex-col gap-5">
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-sm font-medium text-slate-300">제목</label>
                <span className={`text-xs ${editForm.title.length > TITLE_MAX - 20 ? 'text-rose-400' : 'text-slate-500'}`}>
                  {editForm.title.length} / {TITLE_MAX}
                </span>
              </div>
              <input
                type="text"
                name="title"
                value={editForm.title}
                onChange={handleEditChange}
                maxLength={TITLE_MAX}
                className={`input-field ${editErrors.title ? 'error' : ''}`}
                disabled={isUpdating}
              />
              {editErrors.title && (
                <p className="mt-1.5 text-xs text-rose-400 flex items-center gap-1">
                  <AlertCircle size={11} /> {editErrors.title}
                </p>
              )}
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-sm font-medium text-slate-300">내용</label>
                <span className={`text-xs ${editForm.content.length > CONTENT_MAX - 100 ? 'text-rose-400' : 'text-slate-500'}`}>
                  {editForm.content.length} / {CONTENT_MAX}
                </span>
              </div>
              <textarea
                name="content"
                value={editForm.content}
                onChange={handleEditChange}
                maxLength={CONTENT_MAX}
                rows={10}
                className={`input-field resize-none leading-relaxed ${editErrors.content ? 'error' : ''}`}
                style={{ minHeight: '200px' }}
                disabled={isUpdating}
              />
              {editErrors.content && (
                <p className="mt-1.5 text-xs text-rose-400 flex items-center gap-1">
                  <AlertCircle size={11} /> {editErrors.content}
                </p>
              )}
            </div>

            <div className="flex gap-3 pt-1">
              <button
                onClick={() => { setIsEditMode(false); setEditErrors({}); }}
                disabled={isUpdating}
                className="btn-secondary flex items-center gap-2 text-sm px-5 py-2.5"
              >
                <X size={14} />
                취소
              </button>
              <button
                onClick={handleUpdateSubmit}
                disabled={isUpdating}
                className="btn-primary flex-1 flex items-center justify-center gap-2 text-sm py-2.5"
              >
                {isUpdating
                  ? <><Loader2 size={15} className="animate-spin" /> 저장 중...</>
                  : <><Save size={15} /> 저장</>
                }
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default InquiryDetailPage;