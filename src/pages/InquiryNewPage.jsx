// =====================================================
// src/pages/InquiryNewPage.jsx
// 1:1 문의 등록 페이지
//
// - 제목 (최대 255자)
// - 내용 (최대 5000자)
// - 등록 성공 시 생성된 문의 상세 페이지로 이동
// =====================================================

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Send, AlertCircle, Loader2 } from 'lucide-react';
import { createInquiry } from '../api/inquiryApi.js';

const TITLE_MAX   = 255;
const CONTENT_MAX = 5000;

const InquiryNewPage = () => {
  const navigate = useNavigate();

  const [formData, setFormData]   = useState({ title: '', content: '' });
  const [errors,   setErrors]     = useState({});
  const [apiError, setApiError]   = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  /** 입력 변경 */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }));
    if (apiError)     setApiError(null);
  };

  /** 유효성 검사 */
  const validate = () => {
    const errs = {};
    if (!formData.title.trim())
      errs.title = '제목을 입력해주세요.';
    else if (formData.title.trim().length > TITLE_MAX)
      errs.title = `제목은 최대 ${TITLE_MAX}자까지 입력 가능합니다.`;

    if (!formData.content.trim())
      errs.content = '내용을 입력해주세요.';
    else if (formData.content.trim().length > CONTENT_MAX)
      errs.content = `내용은 최대 ${CONTENT_MAX}자까지 입력 가능합니다.`;

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  /** 제출 */
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setIsLoading(true);
    setApiError(null);
    try {
      const data = await createInquiry({
        title:   formData.title.trim(),
        content: formData.content.trim(),
      });
      // 등록 성공 → 생성된 문의 상세로 이동
      navigate(`/inquiry/${data.inquiryId}`, { replace: true });
    } catch (err) {
      setApiError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const titleRemain   = TITLE_MAX   - formData.title.length;
  const contentRemain = CONTENT_MAX - formData.content.length;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

      {/* 뒤로가기 + 타이틀 */}
      <div className="flex items-center gap-3 mb-8 animate-fade-in-up">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-1.5 text-slate-400 hover:text-white transition-colors text-sm"
        >
          <ArrowLeft size={16} />
          뒤로
        </button>
        <div className="w-px h-4 bg-white/10" />
        <h1 className="text-xl font-bold text-white">1:1 문의 등록</h1>
      </div>

      {/* API 에러 */}
      {apiError && (
        <div className="mb-6 p-4 rounded-xl bg-rose-500/10 border border-rose-500/20 flex items-center gap-2.5">
          <AlertCircle size={16} className="text-rose-400 shrink-0" />
          <p className="text-rose-400 text-sm">{apiError}</p>
        </div>
      )}

      {/* 폼 카드 */}
      <div className="glass-card p-6 sm:p-8 animate-fade-in-up-200">
        <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-6">

          {/* 제목 */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-sm font-medium text-slate-300" htmlFor="title">
                제목 <span className="text-rose-400">*</span>
              </label>
              <span className={`text-xs ${titleRemain < 20 ? 'text-rose-400' : 'text-slate-500'}`}>
                {formData.title.length} / {TITLE_MAX}
              </span>
            </div>
            <input
              id="title"
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="문의 제목을 입력해주세요."
              maxLength={TITLE_MAX}
              className={`input-field ${errors.title ? 'error' : ''}`}
              disabled={isLoading}
            />
            {errors.title && (
              <p className="mt-1.5 text-xs text-rose-400 flex items-center gap-1">
                <AlertCircle size={11} /> {errors.title}
              </p>
            )}
          </div>

          {/* 내용 */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-sm font-medium text-slate-300" htmlFor="content">
                내용 <span className="text-rose-400">*</span>
              </label>
              <span className={`text-xs ${contentRemain < 100 ? 'text-rose-400' : 'text-slate-500'}`}>
                {formData.content.length} / {CONTENT_MAX}
              </span>
            </div>
            <textarea
              id="content"
              name="content"
              value={formData.content}
              onChange={handleChange}
              placeholder="문의 내용을 자세히 입력해주세요."
              maxLength={CONTENT_MAX}
              rows={10}
              disabled={isLoading}
              className={`input-field resize-none leading-relaxed ${errors.content ? 'error' : ''}`}
              style={{ minHeight: '240px' }}
            />
            {errors.content && (
              <p className="mt-1.5 text-xs text-rose-400 flex items-center gap-1">
                <AlertCircle size={11} /> {errors.content}
              </p>
            )}
          </div>

          {/* 버튼 영역 */}
          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={() => navigate(-1)}
              disabled={isLoading}
              className="btn-secondary flex-1 sm:flex-none sm:w-28 text-sm py-3"
            >
              취소
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="btn-primary flex-1 flex items-center justify-center gap-2 text-sm py-3"
            >
              {isLoading ? (
                <><Loader2 size={15} className="animate-spin" /> 등록 중...</>
              ) : (
                <><Send size={15} /> 문의 등록</>
              )}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default InquiryNewPage;
