// =====================================================
// src/components/common/Header.jsx
// 글로벌 헤더 (고객용)
//
// - 알림 없음 (미구현 기능 제거)
// - 네비게이션: 홈, 1:1 문의
// - 사용자 드롭다운 + 로그아웃
// =====================================================

import React, { useState, useRef, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { Home, MessageSquarePlus, LogOut, ChevronDown, Zap } from 'lucide-react';
import { useAuthContext } from '../../context/AuthContext.jsx';
import useAuth from '../../hooks/useAuth.js';

const NAV_ITEMS = [
  { label: '홈',       path: '/',        Icon: Home,               end: true },
  { label: '1:1 문의', path: '/inquiry', Icon: MessageSquarePlus,  end: false },
];

const Header = () => {
  const { user }         = useAuthContext();
  const { logoutAction } = useAuth();
  const location         = useLocation();

  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isLoggingOut,   setIsLoggingOut]   = useState(false);
  const userMenuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (userMenuRef.current && !userMenuRef.current.contains(e.target)) {
        setIsUserMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

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
        background: 'rgba(3,7,18,0.88)',
        backdropFilter: 'blur(24px)',
        WebkitBackdropFilter: 'blur(24px)',
        borderBottom: '1px solid rgba(255,255,255,0.07)',
      }}
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="h-16 flex items-center justify-between gap-6">

          {/* 로고 + 네비게이션 */}
          <div className="flex items-center gap-6">
            <NavLink to="/" className="flex items-center gap-2.5 shrink-0 group">
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center text-white font-bold text-xs transition-transform duration-200 group-hover:scale-105"
                style={{ background: 'linear-gradient(135deg, #6366f1, #22d3ee)' }}
              >
                AI
              </div>
              <div className="hidden sm:flex items-center gap-1.5">
                <span className="font-bold text-white text-sm">E-COM AI</span>
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

            <div className="hidden sm:block w-px h-5 bg-white/10" />

            <nav className="hidden sm:flex items-center gap-1">
              {NAV_ITEMS.map(({ label, path, Icon, end }) => (
                <NavLink
                  key={path}
                  to={path}
                  end={end}
                  className={({ isActive }) =>
                    `flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 ${
                      isActive ? 'text-white' : 'text-slate-500 hover:text-slate-300'
                    }`
                  }
                  style={({ isActive }) =>
                    isActive
                      ? { background: 'rgba(99,102,241,0.15)', border: '1px solid rgba(99,102,241,0.25)' }
                      : { background: 'transparent', border: '1px solid transparent' }
                  }
                >
                  <Icon size={13} />
                  {label}
                </NavLink>
              ))}
            </nav>
          </div>

          {/* 사용자 메뉴 */}
          <div className="relative" ref={userMenuRef}>
            <button
              onClick={() => setIsUserMenuOpen((p) => !p)}
              className="flex items-center gap-2 px-2.5 py-1.5 rounded-xl transition-all duration-200"
              style={{
                background: isUserMenuOpen ? 'rgba(99,102,241,0.12)' : 'rgba(255,255,255,0.03)',
                border: isUserMenuOpen ? '1px solid rgba(99,102,241,0.3)' : '1px solid rgba(255,255,255,0.08)',
              }}
              aria-expanded={isUserMenuOpen}
            >
              <div
                className="w-7 h-7 rounded-full flex items-center justify-center text-white text-xs font-semibold shrink-0"
                style={{ background: 'linear-gradient(135deg, rgba(99,102,241,0.8), rgba(34,211,238,0.8))' }}
              >
                {initial}
              </div>
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

            {isUserMenuOpen && (
              <div
                className="absolute right-0 top-full mt-2 w-52 rounded-2xl py-1.5 z-50"
                style={{
                  background: 'rgba(10,14,40,0.97)',
                  backdropFilter: 'blur(20px)',
                  WebkitBackdropFilter: 'blur(20px)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  boxShadow: '0 20px 60px rgba(0,0,0,0.6)',
                  animation: 'fadeInUp 0.15s ease-out forwards',
                }}
              >
                <div className="px-4 py-3 border-b border-white/[0.07]">
                  <p className="text-sm text-white font-medium truncate">
                    {user?.email?.split('@')[0] ?? '사용자'}
                  </p>
                  <p className="text-xs text-slate-500 truncate mt-0.5">{user?.email ?? ''}</p>
                </div>
                <div className="px-1.5 py-1.5">
                  <button
                    onClick={handleLogout}
                    disabled={isLoggingOut}
                    className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-sm transition-all duration-150 disabled:opacity-50"
                    style={{ color: '#f43f5e' }}
                    onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(244,63,94,0.1)'; }}
                    onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; }}
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
    </header>
  );
};

export default Header;