/**
 * 공통 Footer (Dark High-Tech Style)
 */
export default function Footer() {
    return (
        <footer className="relative z-10 border-t border-slate-800/60 bg-slate-950/50 backdrop-blur-md">
            {/* 반투명한 배경과 어두운 테두리로 뒤쪽의 오로라 불빛이 은은하게 비치도록 설정 */}
            <div className="mx-auto max-w-7xl px-6 py-6 text-center text-sm font-medium tracking-widest text-slate-500 transition-colors duration-300 hover:text-slate-400">
                © 2026 E-COM AI. ALL RIGHTS RESERVED.
            </div>
        </footer>
    );
}