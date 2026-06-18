import axios from 'axios';

/**
 * 공통 Axios 인스턴스
 * 환경변수 기반 API URL 사용
 */
const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,

    headers: {
        'Content-Type': 'application/json',
    },
});

/**
 * 요청 인터셉터
 * JWT 토큰 자동 추가
 */
axiosInstance.interceptors.request.use((config) => {
    const accessToken = localStorage.getItem('accessToken');

    if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`;
    }

    return config;
});

export default axiosInstance;