type LogoProps = {
  iconOnly?: boolean;
  className?: string;
  size?: "sm" | "md" | "lg";
};

const sizeMap = {
  sm: { box: "size-8 rounded-lg", icon: 18, text: "text-lg", gap: "gap-2" },
  md: { box: "size-10 rounded-xl", icon: 22, text: "text-xl", gap: "gap-2.5" },
  lg: { box: "size-12 rounded-2xl", icon: 26, text: "text-2xl", gap: "gap-3" },
};

export default function Logo({
  iconOnly = false,
  className = "",
  size = "md",
}: LogoProps) {
  const s = sizeMap[size];

  return (
    <div
      className={`group inline-flex items-center select-none ${s.gap} ${className}`}
    >
      <div
        className={`relative flex shrink-0 items-center justify-center overflow-hidden bg-linear-to-br from-violet-500 via-violet-600 to-indigo-700 text-white shadow-lg shadow-violet-600/25 ring-1 ring-white/20 transition-transform duration-300 group-hover:scale-105 ${s.box}`}
      >
        <div className="pointer-events-none absolute inset-0 bg-linear-to-tr from-transparent via-white/10 to-white/25" />

        <svg
          width={s.icon}
          height={s.icon}
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="relative z-10"
          aria-hidden="true"
        >
          <rect
            x="4"
            y="16"
            width="6"
            height="2.6"
            rx="1.3"
            fill="currentColor"
            fillOpacity="0.55"
          />
          <rect
            x="7"
            y="10.7"
            width="8"
            height="2.6"
            rx="1.3"
            fill="currentColor"
            fillOpacity="0.8"
          />
          <rect
            x="10"
            y="5.4"
            width="10"
            height="2.6"
            rx="1.3"
            fill="currentColor"
          />

          <path
            d="M17.5 4.5L20.5 4.5L20.5 7.5"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          />
        </svg>
      </div>

      {!iconOnly && (
        <div className="flex flex-col leading-none">
          <span
            className={`font-extrabold tracking-tight text-slate-900 dark:text-white ${s.text}`}
          >
            LADD
            <span className="bg-linear-to-r from-violet-600 to-indigo-500 bg-clip-text text-transparent dark:from-violet-400 dark:to-indigo-400">
              ER
            </span>
          </span>
        </div>
      )}
    </div>
  );
}