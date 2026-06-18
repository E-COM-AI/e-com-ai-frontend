// =====================================================
// tailwind.config.js
// E-COM AI 디자인 시스템 커스텀 설정
// - 커스텀 컬러 팔레트
// - 3D/애니메이션 효과 정의
// =====================================================

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,jsx}',
  ],

  theme: {
    extend: {
      // ─── 컬러 팔레트 ─────────────────────────────────
      colors: {
        space: {
          950: '#030712',
          900: '#060d1f',
          800: '#0a1628',
          700: '#0f1f38',
        },
        indigo: {
          400: '#818cf8',
          500: '#6366f1',
          600: '#4f46e5',
        },
        cyan: {
          400: '#22d3ee',
          500: '#06b6d4',
        },
        emerald: {
          400: '#34d399',
          500: '#10b981',
        },
      },

      // ─── 배경 그라디언트 ──────────────────────────────
      backgroundImage: {
        'aurora': 'radial-gradient(ellipse at 20% 20%, rgba(99,102,241,0.25) 0%, transparent 50%), radial-gradient(ellipse at 80% 80%, rgba(34,211,238,0.2) 0%, transparent 50%), radial-gradient(ellipse at 50% 50%, rgba(16,185,129,0.1) 0%, transparent 70%)',
        'card-glow': 'linear-gradient(135deg, rgba(99,102,241,0.15) 0%, rgba(34,211,238,0.1) 100%)',
        'btn-primary': 'linear-gradient(135deg, #6366f1 0%, #22d3ee 100%)',
        'gradient-text': 'linear-gradient(135deg, #818cf8 0%, #22d3ee 50%, #34d399 100%)',
      },

      // ─── 폰트 ─────────────────────────────────────────
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },

      // ─── 키프레임 정의 ────────────────────────────────
      keyframes: {
        // 부유 애니메이션 (위아래)
        float: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '33%':       { transform: 'translateY(-20px) rotate(2deg)' },
          '66%':       { transform: 'translateY(-10px) rotate(-1deg)' },
        },
        floatReverse: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '33%':       { transform: 'translateY(20px) rotate(-2deg)' },
          '66%':       { transform: 'translateY(10px) rotate(1deg)' },
        },
        // 오로라 오브 이동
        drift: {
          '0%, 100%': { transform: 'translate(0, 0) scale(1)' },
          '25%':       { transform: 'translate(30px, -20px) scale(1.05)' },
          '50%':       { transform: 'translate(-20px, 30px) scale(0.95)' },
          '75%':       { transform: 'translate(20px, 20px) scale(1.02)' },
        },
        driftAlt: {
          '0%, 100%': { transform: 'translate(0, 0) scale(1)' },
          '25%':       { transform: 'translate(-30px, 20px) scale(0.98)' },
          '50%':       { transform: 'translate(20px, -30px) scale(1.04)' },
          '75%':       { transform: 'translate(-20px, -20px) scale(0.96)' },
        },
        // 글로우 펄스
        pulseGlow: {
          '0%, 100%': { opacity: '0.6', transform: 'scale(1)' },
          '50%':       { opacity: '1',   transform: 'scale(1.05)' },
        },
        // 스켈레톤 shimmer
        shimmer: {
          '0%':   { backgroundPosition: '-200% center' },
          '100%': { backgroundPosition:  '200% center' },
        },
        // 텍스트 그라디언트
        gradientShift: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%':       { backgroundPosition: '100% 50%' },
        },
        // 페이드인 위로 슬라이드
        fadeInUp: {
          '0%':   { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        // 회전 (느린)
        spinSlow: {
          '0%':   { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
        // 나타나기
        fadeIn: {
          '0%':   { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },

      // ─── 애니메이션 클래스 정의 ───────────────────────
      animation: {
        'float':           'float 6s ease-in-out infinite',
        'float-reverse':   'floatReverse 8s ease-in-out infinite',
        'float-slow':      'float 10s ease-in-out infinite',
        'drift':           'drift 20s ease-in-out infinite',
        'drift-alt':       'driftAlt 25s ease-in-out infinite',
        'pulse-glow':      'pulseGlow 3s ease-in-out infinite',
        'shimmer':         'shimmer 2s linear infinite',
        'gradient-shift':  'gradientShift 4s ease infinite',
        'fade-in-up':      'fadeInUp 0.6s ease-out forwards',
        'fade-in-up-200':  'fadeInUp 0.6s 0.2s ease-out forwards both',
        'fade-in-up-400':  'fadeInUp 0.6s 0.4s ease-out forwards both',
        'fade-in-up-600':  'fadeInUp 0.6s 0.6s ease-out forwards both',
        'spin-slow':       'spinSlow 20s linear infinite',
        'fade-in':         'fadeIn 0.4s ease-out forwards',
      },

      // ─── 블러 ─────────────────────────────────────────
      backdropBlur: {
        xs: '2px',
      },

      // ─── 박스 섀도우 ──────────────────────────────────
      boxShadow: {
        'glow-indigo': '0 0 30px rgba(99,102,241,0.4), 0 0 60px rgba(99,102,241,0.2)',
        'glow-cyan':   '0 0 30px rgba(34,211,238,0.4), 0 0 60px rgba(34,211,238,0.2)',
        'glow-sm':     '0 0 15px rgba(99,102,241,0.3)',
        'card-3d':     '0 20px 60px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.05)',
        'card-hover':  '0 30px 80px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.1), 0 0 40px rgba(99,102,241,0.2)',
        'btn-glow':    '0 4px 20px rgba(99,102,241,0.5), 0 0 40px rgba(34,211,238,0.3)',
        'inner-glow':  'inset 0 1px 0 rgba(255,255,255,0.1)',
      },
    },
  },

  plugins: [],
};
