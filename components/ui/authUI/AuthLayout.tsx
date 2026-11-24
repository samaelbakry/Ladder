import Link from "next/link";
import {
  ArrowLeft,
  CheckCircle2,
  Star,
  Sparkles,
} from "lucide-react";
import Logo from "../Logo";

interface AuthLayoutProps {
  children: React.ReactNode;
  title: string;
  subtitle: string;
}

const HIGHLIGHTS = [
  "Smart Reminders",
  "Kanban Board",
  "Analytics Dashboard",
];

export default function AuthLayout({
  children,
  title,
  subtitle,
}: AuthLayoutProps) {
  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-12 bg-slate-50 font-sans selection:bg-violet-500/20 selection:text-violet-900">
      {/* Left Brand & Social Proof Panel */}
      <div className="hidden lg:col-span-5 xl:col-span-6 lg:flex flex-col justify-between p-12 bg-slate-950 text-white relative overflow-hidden">
        {/* Dot Matrix Grid */}
        <div
          className="absolute inset-0 opacity-[0.16] pointer-events-none"
          style={{
            backgroundImage: `radial-gradient(circle, rgba(196, 181, 253, 0.55) 1px, transparent 1px)`,
            backgroundSize: "32px 32px",
          }}
        />

        {/* Ambient Violet & Indigo Glows */}
        <div className="absolute -top-28 -right-28 w-[28rem] h-[28rem] bg-violet-600/25 rounded-full blur-[130px] pointer-events-none" />
        <div className="absolute -bottom-28 -left-24 w-[24rem] h-[24rem] bg-indigo-600/20 rounded-full blur-[110px] pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-purple-500/10 rounded-full blur-[100px] pointer-events-none" />

        {/* Top Brand Mark */}
        <div className="relative z-10 flex items-center justify-between">
          <Link
            href="/"
            className="inline-flex items-center gap-3 group focus:outline-none"
          >
            <Logo size="md" />
          </Link>

          <span className="text-[11px] font-semibold uppercase tracking-wider px-2.5 py-1 rounded-full bg-violet-500/10 text-violet-300 border border-violet-400/20">
            Career OS
          </span>
        </div>

        {/* Center Testimonial Card */}
        <div className="relative z-10 max-w-lg my-auto py-8">
          <div className="p-8 rounded-2xl bg-gradient-to-b from-white/[0.06] to-white/[0.02] backdrop-blur-xl border border-violet-400/15 shadow-2xl shadow-black/40 relative overflow-hidden">
            {/* Subtle top highlight line */}
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-violet-400/50 to-transparent" />

            <div className="absolute top-0 right-0 p-6 text-violet-400/10 pointer-events-none">
              <Sparkles size={84} />
            </div>

            <div className="relative z-10 space-y-6">
              <div className="flex items-center gap-1 text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={16} className="fill-amber-400" />
                ))}
              </div>

              <blockquote className="text-lg font-medium leading-relaxed text-slate-100">
                “Ladder completely transformed my job search. I went from
                scattered spreadsheets to landing my dream senior role in less
                than 30 days.”
              </blockquote>

              <div className="flex items-center gap-3.5 pt-4 border-t border-white/10">
                <div className="w-10 h-10 rounded-full bg-linear-to-br from-violet-500 via-violet-600 to-indigo-700 ring-1 ring-violet-300/30 flex items-center justify-center font-bold text-sm text-white shadow-md shadow-violet-950/60 shrink-0">
                  EK
                </div>
                <div>
                  <p className="text-sm font-semibold text-white">
                    Elena Rostova
                  </p>
                  <p className="text-xs text-violet-200/65">
                    Senior Product Designer at Vercel
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="relative z-10 pt-6 border-t border-white/10 grid grid-cols-3 gap-3">
          {HIGHLIGHTS.map((feature) => (
            <div
              key={feature}
              className="flex items-center gap-2 text-xs font-medium text-slate-300"
            >
              <div className="w-5 h-5 rounded-full bg-violet-500/15 border border-violet-400/25 flex items-center justify-center text-violet-300 shrink-0">
                <CheckCircle2 size={12} />
              </div>
              <span className="truncate">{feature}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="lg:col-span-7 xl:col-span-6 flex flex-col justify-between p-6 sm:p-12 lg:p-16 relative bg-gradient-to-b from-white via-slate-50 to-violet-50/30">
        <div className="flex items-center justify-between w-full">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs font-semibold text-slate-600 hover:text-violet-700 transition-colors group px-3 py-1.5 rounded-lg hover:bg-violet-50"
          >
            <ArrowLeft
              size={15}
              className="group-hover:-translate-x-1 transition-transform text-violet-600"
            />
            Back to website
          </Link>

          <Link href="/" className="flex items-center lg:hidden">
            <Logo size="sm" />
          </Link>
        </div>

        <div className="max-w-md w-full mx-auto my-auto py-10 space-y-8">
          <div className="space-y-2.5">
            <div className="h-1 w-10 rounded-full bg-gradient-to-r from-violet-600 to-indigo-500" />
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
              {title}
            </h1>
            <p className="text-sm text-slate-500 leading-relaxed">{subtitle}</p>
          </div>

          <div className="space-y-4">{children}</div>
        </div>

        <div className="text-xs text-slate-400 text-center lg:text-left pt-6 border-t border-slate-200/70">
          © {new Date().getFullYear()} Ladder Inc. All rights reserved.
        </div>
      </div>
    </div>
  );
}