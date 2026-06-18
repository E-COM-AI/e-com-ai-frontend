import MainLayout from "../layouts/MainLayout";
import { useNavigate } from "react-router-dom";
import {
    Brain,
    MessageSquareWarning,
    BarChart3,
    Sparkles,
    ArrowRight,
    Zap
} from "lucide-react";

export default function HomePage() {
    const navigate = useNavigate();

    const features = [
        {
            icon: Brain,
            title: "문의 자동 분류",
            description: "AI가 고객 문의를 자동 분류하여 상담 업무를 효율화합니다.",
            glow: "group-hover:shadow-[0_0_30px_rgba(59,130,246,0.5)]",
            border: "group-hover:border-blue-500",
            iconColor: "text-blue-400"
        },
        {
            icon: Sparkles,
            title: "감정 분석",
            description: "고객 감정을 분석하여 우선 대응이 필요한 문의를 식별합니다.",
            glow: "group-hover:shadow-[0_0_30px_rgba(236,72,153,0.5)]",
            border: "group-hover:border-pink-500",
            iconColor: "text-pink-400"
        },
        {
            icon: MessageSquareWarning,
            title: "악성 민원 탐지",
            description: "욕설 및 공격적 표현을 탐지하여 리스크를 줄입니다.",
            glow: "group-hover:shadow-[0_0_30px_rgba(245,158,11,0.5)]",
            border: "group-hover:border-amber-500",
            iconColor: "text-amber-400"
        },
        {
            icon: BarChart3,
            title: "우선순위 예측",
            description: "문의 중요도를 예측하여 상담 처리 순서를 최적화합니다.",
            glow: "group-hover:shadow-[0_0_30px_rgba(168,85,247,0.5)]",
            border: "group-hover:border-purple-500",
            iconColor: "text-purple-400"
        },
    ];

    return (
        <MainLayout>
            {/* ── 1. 화려한 Dark Aurora (배경 조명 레이어) ── */}
            {/* 바탕을 아주 어두운 남색/검은색으로 깔아줍니다 */}
            <div className="fixed inset-0 -z-10 overflow-hidden bg-slate-950">
                {/* 배경 위로 지나가는 웅장한 오로라 빛망울들 */}
                <div className="absolute left-[-20%] top-[-10%] h-[800px] w-[800px] rounded-full bg-fuchsia-600/20 blur-[150px] animate-pulse" style={{ animationDuration: '7s' }} />
                <div className="absolute right-[-20%] bottom-[-20%] h-[800px] w-[800px] rounded-full bg-blue-600/20 blur-[150px] animate-pulse" style={{ animationDuration: '11s' }} />
                <div className="absolute left-[20%] top-[30%] h-[600px] w-[600px] rounded-full bg-indigo-600/20 blur-[120px] animate-pulse" style={{ animationDuration: '9s' }} />
                
                {/* 사이버펑크 느낌을 더해주는 미세한 격자무늬 패턴 (선택사항) */}
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay"></div>
            </div>

            {/* ── 2. Hero Section (화려한 텍스트와 버튼) ── */}
            <section className="px-6 pt-32 pb-20 relative z-10">
                <div className="mx-auto max-w-4xl text-center">
                    
                    {/* 상단 네온 반짝이 배지 */}
                    <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-fuchsia-500/30 bg-fuchsia-500/10 px-5 py-2 text-xs font-bold tracking-widest text-fuchsia-400 shadow-[0_0_15px_rgba(217,70,239,0.2)] backdrop-blur-md">
                        <Zap size={14} className="animate-pulse text-fuchsia-300" />
                        NEXT-GEN AI SUPPORT
                    </div>

                    {/* 메인 타이틀 (홀로그램 그라데이션) */}
                    <h1 className="mb-8 text-6xl font-black tracking-tight text-white md:text-8xl drop-shadow-2xl">
                        E-COM <span className="bg-gradient-to-r from-blue-400 via-fuchsia-400 to-indigo-400 bg-clip-text text-transparent filter drop-shadow-[0_0_20px_rgba(192,38,211,0.4)]">AI</span>
                    </h1>

                    {/* 메인 설명 글 */}
                    <p className="mx-auto mb-14 max-w-2xl text-xl font-medium leading-relaxed text-slate-300">
                        문의 분류부터 감정 분석, 악성 민원 제어까지 <br />
                        스마트한 <span className="text-white font-bold">AI 신경망</span>으로 최적의 고객 상담 경험을 설계하세요.
                    </p>

                    {/* 버튼 컨트롤 영역 */}
                    <div className="flex flex-col sm:flex-row justify-center items-center gap-6">
                        {/* 화려한 메인 액션 버튼 */}
                        <button
                            onClick={() => navigate("/login")}
                            className="group relative flex w-full sm:w-auto items-center justify-center gap-2 overflow-hidden rounded-2xl bg-gradient-to-r from-blue-600 to-fuchsia-600 px-10 py-5 font-bold text-white shadow-[0_0_30px_rgba(192,38,211,0.4)] transition-all duration-300 hover:scale-105 hover:shadow-[0_0_50px_rgba(192,38,211,0.6)] active:scale-95"
                        >
                            <span className="relative z-10 flex items-center gap-2 text-lg">
                                무료로 시작하기
                                <ArrowRight size={20} className="transition-transform duration-300 group-hover:translate-x-2" />
                            </span>
                            {/* 버튼 내부 빛 번짐 효과 */}
                            <div className="absolute inset-0 bg-white/20 blur-md transition-opacity opacity-0 group-hover:opacity-100"></div>
                        </button>
                    </div>
                </div>
            </section>

            {/* ── 3. Features Grid Section (Neon Hover Cards) ── */}
            <section className="px-6 pb-32 relative z-10">
                <div className="mx-auto grid max-w-6xl gap-6 sm:grid-cols-2 lg:grid-cols-4">
                    {features.map((feature) => {
                        const Icon = feature.icon;

                        return (
                            <div
                                key={feature.title}
                                className={`group relative rounded-3xl border border-slate-800 bg-slate-900/60 p-8 backdrop-blur-xl transition-all duration-500 hover:-translate-y-3 ${feature.glow} ${feature.border}`}
                            >
                                {/* 네온 아이콘 박스 */}
                                <div className="mb-6 inline-flex rounded-2xl bg-slate-800 p-4 shadow-inner transition-transform duration-500 group-hover:scale-110 group-hover:bg-slate-700">
                                    <Icon size={28} className={`${feature.iconColor} drop-shadow-[0_0_10px_currentColor]`} />
                                </div>

                                <h3 className="mb-4 text-xl font-bold text-white tracking-wide">
                                    {feature.title}
                                </h3>

                                <p className="text-base font-medium leading-relaxed text-slate-400 group-hover:text-slate-300 transition-colors">
                                    {feature.description}
                                </p>
                                
                                {/* 카드 내부 은은한 반사광 */}
                                <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-white/5 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100 pointer-events-none"></div>
                            </div>
                        );
                    })}
                </div>
            </section>
        </MainLayout>
    );
}