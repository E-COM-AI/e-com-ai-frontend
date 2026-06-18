import { Link } from "react-router-dom";

/**
 * 홈 화면 이동 카드 (Dark High-Tech Style)
 *
 * 재사용 가능한 네비게이션 카드
 */
export default function NavigationCard({
    title,
    description,
    to,
}) {
    return (
        <Link
            to={to}
            className="
                group
                relative
                block
                overflow-hidden
                rounded-3xl
                border
                border-slate-800
                bg-slate-900/60
                p-6
                backdrop-blur-xl
                transition-all
                duration-500
                hover:-translate-y-3
                hover:border-fuchsia-500/50
                hover:bg-slate-800/80
                hover:shadow-[0_0_30px_rgba(192,38,211,0.2)]
            "
        >
            {/* ── 카드 내부에 은은하게 스쳐 지나가는 빛 반사 효과 ── */}
            <div className="absolute -inset-full top-0 block h-full w-1/2 -skew-x-12 transform bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0 transition-all duration-700 group-hover:left-full group-hover:opacity-100" />

            <h3
                className="
                    mb-3
                    text-xl
                    font-bold
                    text-slate-200
                    transition-colors
                    duration-300
                    group-hover:text-fuchsia-400
                "
            >
                {title}
            </h3>

            <p className="text-sm font-medium text-slate-400 transition-colors duration-300 group-hover:text-slate-300">
                {description}
            </p>
        </Link>
    );
}