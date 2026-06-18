// =====================================================
// src/components/common/LoadingSpinner.jsx
// 로딩 스피너 컴포넌트 (lucide-react 기반)
// =====================================================

import React from 'react';
import { Loader2 } from 'lucide-react';

/**
 * 로딩 스피너
 * @param {{ size?: 'sm'|'md'|'lg', fullPage?: boolean, label?: string }} props
 */
const LoadingSpinner = ({ size = 'md', fullPage = false, label = '로딩 중...' }) => {
  const sizeMap = {
    sm: { icon: 16, text: 'text-xs' },
    md: { icon: 24, text: 'text-sm' },
    lg: { icon: 36, text: 'text-base' },
  };

  const { icon, text } = sizeMap[size] || sizeMap.md;

  const spinner = (
    <div className="flex flex-col items-center gap-2.5">
      <Loader2
        size={icon}
        className="animate-spin"
        style={{ color: '#6366f1' }}
      />
      {label && (
        <span className={`${text} text-slate-400 font-medium`}>{label}</span>
      )}
    </div>
  );

  if (fullPage) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-space-950/80 backdrop-blur-sm">
        {spinner}
      </div>
    );
  }

  return spinner;
};

export default LoadingSpinner;
