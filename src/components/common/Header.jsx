import { Link } from "react-router-dom";

/**
 * 공통 Header
 *
 * Dark High-Tech (AI SaaS 스타일)
 */
export default function Header() {
    return (
        <header
            className="
                sticky
                top-0
                z-50
                border-b
                border-slate-800/60
                bg-slate-950/50
                backdrop-blur-xl
                transition-all
                duration-300
            "
        >
            <div
                className="
                    mx-auto
                    flex
                    h-20
                    max-w-7xl
                    items-center
                    justify-between
                    px-6
                "
            >
                {/* Logo */}
                <Link
                    to="/"
                    className="
                        group
                        flex
                        items-center
                        gap-3
                    "
                >
                    {/* 네온 글로우 로고 아이콘 */}
                    <div
                        className="
                            flex
                            h-10
                            w-10
                            items-center
                            justify-center
                            rounded-2xl
                            bg-gradient-to-br
                            from-blue-600
                            to-fuchsia-600
                            text-white
                            font-bold
                            shadow-[0_0_15px_rgba(192,38,211,0.5)]
                            transition-transform
                            duration-300
                            group-hover:scale-110
                        "
                    >
                        AI
                    </div>

                    <div>
                        <h1
                            className="
                                text-xl
                                font-black
                                tracking-tight
                                text-white
                                drop-shadow-md
                            "
                        >
                            E-COM AI
                        </h1>

                        <p
                            className="
                                text-xs
                                font-medium
                                text-slate-400
                                group-hover:text-fuchsia-400
                                transition-colors
                            "
                        >
                            Customer Service Intelligence
                        </p>
                    </div>
                </Link>

                {/* Navigation */}
                <nav className="flex items-center gap-3">

                    <Link
                        to="/login"
                        className="
                            rounded-2xl
                            px-5
                            py-3
                            font-medium
                            text-slate-300
                            transition-all
                            duration-300
                            hover:bg-slate-800/80
                            hover:text-white
                        "
                    >
                        로그인
                    </Link>

                    {/* 네온 글로우 회원가입 버튼 */}
                    <Link
                        to="/signup"
                        className="
                            rounded-2xl
                            bg-gradient-to-r
                            from-blue-600
                            to-fuchsia-600
                            px-6
                            py-3
                            font-bold
                            text-white
                            shadow-[0_0_15px_rgba(192,38,211,0.3)]
                            transition-all
                            duration-300
                            hover:scale-105
                            hover:shadow-[0_0_25px_rgba(192,38,211,0.6)]
                        "
                    >
                        회원가입
                    </Link>

                </nav>
            </div>
        </header>
    );
}