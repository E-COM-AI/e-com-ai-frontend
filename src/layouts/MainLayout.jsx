/**
 * 공통 레이아웃
 *
 * 현재는 최소 구조만 적용
 * 향후 Header, Footer 추가 예정
 */
export default function MainLayout({ children }) {
    return (
        <div className="min-h-screen bg-slate-50">
            {children}
        </div>
    );
}