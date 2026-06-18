// =====================================================
// src/components/common/Header.jsx
// 글로벌 헤더 컴포넌트
//
// - 브랜드 로고 + 네비게이션 메뉴
// - 알림 벨
// - 사용자 아바타 + 이메일 정보
// - 로그아웃 버튼
// =====================================================

import React, { useState, useRef, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  BarChart2,
  Settings,
  Bell,
  LogOut,
  ChevronDown,
  Zap,
} from 'lucide-react';
import { useAuthContext } from '../../context/AuthContext.jsx';
import useAuth from '../../hooks/useAuth.js';

// ─── 네비게이션 메뉴 정의 ─────────────────────────────
// 추후 페이지 추가 시 여기에만 항목을 추가하면 됩니다.
const NAV_ITEMS = [
  { label: '대시보드', path: '/',          Icon: LayoutDashboard },
  // { label: '분석',     path: '/analytics', Icon: BarChart2 },      // 추후 활성화
  // { label: '설정',     path: '/settings',  Icon: Settings },       // 추후 활성화
];

/**
 * 글로벌 헤더 컴포넌트
 * DashboardLayout에서 사용합니다.
 */
const Header = () => {
  const { user }            = useAuthContext();
  const { logoutAction }    = useAuth();
  const location            = useLocation();

  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isLoggingOut,   setIsLoggingOut]   = useState(false);
  const [hasNotification, setHasNotification] = useState(false); // 추후 알림 API 연동

  const userMenuRef = useRef(null);

  /** 외부 클릭 시 드롭다운 닫기 */
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (userMenuRef.current && !userMenuRef.current.contains(e.target)) {
        setIsUserMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  /** 라우트 변경 시 드롭다운 닫기 */
  useEffect(() => {
    setIsUserMenuOpen(false);
  }, [location.pathname]);

  const handleLogout = () => {
    if (isLoggingOut) return;
    setIsLoggingOut(true);
    setIsUserMenuOpen(false);
    logoutAction();
  };

  const initial = user?.email?.charAt(0).toUpperCase() ?? '?';

  return (
    <header
      className="sticky top-0 z-40 w-full"
      style={{
        background: 'rgba(3, 7, 18, 0.88)',
        backdropFilter: 'blur(24px)',
        WebkitBackdropFilter: 'blur(24px)',
        borderBottom: '1px solid rgba(255,255,255,0.07)',
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="h-16 flex items-center justify-between gap-6">

          {/* ─── 왼쪽: 로고 + 네비게이션 ─── */}
          <div className="flex items-center gap-6">

            {/* 브랜드 로고 */}
            <NavLink to="/" className="flex items-center gap-2.5 shrink-0 group">
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center text-white font-bold text-xs transition-transform duration-200 group-hover:scale-105"
                style={{ background: 'linear-gradient(135deg, #6366f1, #22d3ee)' }}
              >
                AI
              </div>
              <div className="hidden sm:flex items-center gap-1.5">
                <span className="font-bold text-white text-sm tracking-tight">
                  E-COM AI
                </span>
                <div
                  className="flex items-center gap-0.5 text-xs font-semibold px-1.5 py-0.5 rounded-full"
                  style={{
                    background: 'rgba(99,102,241,0.15)',
                    border: '1px solid rgba(99,102,241,0.3)',
                    color: '#818cf8',
                  }}
                >
                  <Zap size={9} />
                  Beta
                </div>
              </div>
            </NavLink>

            {/* 구분선 */}
            <div className="hidden sm:block w-px h-5 bg-white/10" />

            {/* 네비게이션 메뉴 */}
            <nav className="hidden sm:flex items-center gap-1">
              {NAV_ITEMS.map(({ label, path, Icon }) => (
                <NavLink
                  key={path}
                  to={path}
                  end
                  className={({ isActive }) =>
                    `flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 ${
                      isActive
                        ? 'text-white'
                        : 'text-slate-500 hover:text-slate-300'
                    }`
                  }
                  style={({ isActive }) =>
                    isActive
                      ? {
                          background: 'rgba(99,102,241,0.15)',
                          border: '1px solid rgba(99,102,241,0.25)',
                        }
                      : {
                          background: 'transparent',
                          border: '1px solid transparent',
                        }
                  }
                >
                  <Icon size={13} />
                  {label}
                </NavLink>
              ))}
            </nav>
          </div>

          {/* ─── 오른쪽: 알림 + 사용자 메뉴 ─── */}
          <div className="flex items-center gap-2">

            {/* 알림 버튼 */}
            <button
              className="relative w-9 h-9 flex items-center justify-center rounded-lg transition-all duration-200"
              style={{
                color: '#64748b',
                background: 'rgba(255,255,255,0.03)',
                border: '1px solid rgba(255,255,255,0.07)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(99,102,241,0.1)';
                e.currentTarget.style.borderColor = 'rgba(99,102,241,0.25)';
                e.currentTarget.style.color = '#818cf8';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgba(255,255,255,0.03)';
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)';
                e.currentTarget.style.color = '#64748b';
              }}
              aria-label="알림"
            >
              <Bell size={15} />
              {/* 알림 뱃지 — 추후 알림 API 연동 시 hasNotification 조건으로 표시 */}
              {hasNotification && (
                <span
                  className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full border-2"
                  style={{
                    background: '#f43f5e',
                    borderColor: '#030712',
                  }}
                />
              )}
            </button>

            {/* 사용자 드롭다운 */}
            <div className="relative" ref={userMenuRef}>
              <button
                onClick={() => setIsUserMenuOpen((p) => !p)}
                className="flex items-center gap-2 px-2.5 py-1.5 rounded-xl transition-all duration-200"
                style={{
                  background: isUserMenuOpen
                    ? 'rgba(99,102,241,0.12)'
                    : 'rgba(255,255,255,0.03)',
                  border: isUserMenuOpen
                    ? '1px solid rgba(99,102,241,0.3)'
                    : '1px solid rgba(255,255,255,0.08)',
                }}
                aria-label="사용자 메뉴"
                aria-expanded={isUserMenuOpen}
              >
                {/* 아바타 */}
                <div
                  className="w-7 h-7 rounded-full flex items-center justify-center text-white text-xs font-semibold shrink-0"
                  style={{
                    background:
                      'linear-gradient(135deg, rgba(99,102,241,0.8), rgba(34,211,238,0.8))',
                  }}
                >
                  {initial}
                </div>

                {/* 이메일 (md 이상) */}
                <div className="hidden md:flex flex-col items-start">
                  <span className="text-xs text-white font-medium leading-none">
                    {user?.email?.split('@')[0] ?? '사용자'}
                  </span>
                  <span className="text-xs text-slate-500 mt-0.5 leading-none max-w-[130px] truncate">
                    {user?.email ?? ''}
                  </span>
                </div>

                <ChevronDown
                  size={12}
                  className="text-slate-500 hidden md:block transition-transform duration-200"
                  style={{ transform: isUserMenuOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}
                />
              </button>

              {/* 드롭다운 메뉴 */}
              {isUserMenuOpen && (
                <div
                  className="absolute right-0 top-full mt-2 w-56 rounded-2xl py-1.5 z-50"
                  style={{
                    background: 'rgba(10, 14, 40, 0.96)',
                    backdropFilter: 'blur(20px)',
                    WebkitBackdropFilter: 'blur(20px)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    boxShadow: '0 20px 60px rgba(0,0,0,0.6), 0 0 0 1px rgba(99,102,241,0.1)',
                    animation: 'fadeInUp 0.15s ease-out forwards',
                  }}
                >
                  {/* 사용자 정보 섹션 */}
                  <div className="px-4 py-3 border-b border-white/[0.07]">
                    <div className="flex items-center gap-2.5">
                      <div
                        className="w-9 h-9 rounded-full flex items-center justify-center text-white text-sm font-semibold shrink-0"
                        style={{
                          background:
                            'linear-gradient(135deg, rgba(99,102,241,0.8), rgba(34,211,238,0.8))',
                        }}
                      >
                        {initial}
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm text-white font-medium truncate">
                          {user?.email?.split('@')[0] ?? '사용자'}
                        </p>
                        <p className="text-xs text-slate-500 truncate">{user?.email ?? ''}</p>
                      </div>
                    </div>
                  </div>

                  {/* 메뉴 항목들 */}
                  <div className="px-1.5 py-1.5">
                    {/* 추후 메뉴 추가 가능 */}
                    {/* <DropdownItem icon={Settings} label="계정 설정" onClick={() => {}} /> */}

                    {/* 로그아웃 */}
                    <button
                      onClick={handleLogout}
                      disabled={isLoggingOut}
                      className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-sm transition-all duration-150 disabled:opacity-50"
                      style={{ color: '#f43f5e' }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = 'rgba(244,63,94,0.1)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = 'transparent';
                      }}
                    >
                      <LogOut size={14} />
                      {isLoggingOut ? '로그아웃 중...' : '로그아웃'}
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
