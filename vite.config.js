// =====================================================
// vite.config.js
// Vite 설정 파일
// - 로컬 개발 시 CORS 방지를 위한 Proxy 설정 포함
// - /api 로 시작하는 모든 요청을 Spring Boot 백엔드로 우회
// =====================================================

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],

  server: {
    port: 3000,

    proxy: {
      // /api 로 시작하는 모든 요청을 백엔드 서버로 프록시
      '/api': {
        target: 'http://localhost:8081', // Spring Boot 백엔드 서버 주소
        changeOrigin: true,              // CORS 우회를 위해 Origin 헤더 변경
        secure: false,                   // 로컬 자체 서명 인증서 허용

        // 프록시 요청/응답 로깅 (개발 환경 디버깅용)
        configure: (proxy) => {
          proxy.on('error', (err) => {
            console.error('[Proxy Error]', err.message);
          });
          proxy.on('proxyReq', (_, req) => {
            console.log('[Proxy →]', req.method, req.url);
          });
        },
      },
    },
  },

  build: {
    outDir: 'dist',
    sourcemap: false, // 운영 배포 시 소스맵 비활성화 (보안)
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      output: {
        // 벤더 청크 분리로 캐싱 효율화
        manualChunks: {
          vendor: ['react', 'react-dom'],
          router: ['react-router-dom'],
          http: ['axios'],
        },
      },
    },
  },
});
