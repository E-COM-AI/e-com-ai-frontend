import Header from "../components/common/Header";
import Footer from "../components/common/Footer";

/**
 * 공통 레이아웃 (Dark High-Tech Style)
 */
export default function MainLayout({ children }) {
    return (
        <div className="flex min-h-screen flex-col bg-slate-950 text-slate-200 selection:bg-fuchsia-500/30 selection:text-fuchsia-200">
            {/* 1. bg-slate-950: 전체 도화지를 가장 어두운 남색으로 칠함
              2. text-slate-200: 텍스트 기본 색상을 밝은 회색으로 설정해 가독성 확보
              3. selection:*: 마우스로 글자를 드래그할 때의 색상을 네온 핑크로 설정 
            */}
            
            <Header />

            {/* 메인 콘텐츠 영역 (자식 컴포넌트가 들어오는 곳) */}
            <main className="relative flex-1 flex flex-col">
                {children}
            </main>

            <Footer />
        </div>
    );
}