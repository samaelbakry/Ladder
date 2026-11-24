
import React from "react";
import { ArrowUpRight } from "lucide-react";

type JobStatusCardProps = {
  title: string;
  count: number;
  description?: string;
  icon?: React.ReactNode;
  accent?: "violet" | "emerald" | "amber";
  isSelected?: boolean;
  onClick?: () => void;
};

const accents = {
  violet: {
    icon: "bg-violet-50 text-violet-600 dark:bg-violet-500/10 dark:text-violet-400",
    line: "bg-violet-500",
    glow: "hover:shadow-violet-500/5",
    selected: "border-violet-500 ring-2 ring-violet-500/15",
  },
  emerald: {
    icon: "bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400",
    line: "bg-emerald-500",
    glow: "hover:shadow-emerald-500/5",
    selected: "border-emerald-500 ring-2 ring-emerald-500/15",
  },
  amber: {
    icon: "bg-amber-50 text-amber-600 dark:bg-amber-500/10 dark:text-amber-400",
    line: "bg-amber-500",
    glow: "hover:shadow-amber-500/5",
    selected: "border-amber-500 ring-2 ring-amber-500/15",
  },
};

export default function JobStatusCard({
  title,
  count,
  description,
  icon,
  accent = "violet",
  isSelected = false,
  onClick,
}: JobStatusCardProps) {
  const style = accents[accent];

  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={isSelected}
      className={`group relative w-full overflow-hidden rounded-2xl border bg-white p-5 text-left transition-all duration-300 hover:-translate-y-1 hover:shadow-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 dark:bg-slate-900 ${
        isSelected
          ? style.selected
          : "border-slate-200/80 dark:border-slate-800"
      } ${style.glow}`}
    >
      <div
        className={`absolute inset-x-0 top-0 h-1 ${style.line} transition-transform duration-300 ${
          isSelected
            ? "scale-x-100"
            : "origin-left scale-x-0 group-hover:scale-x-100"
        }`}
      />

      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
            {title}
          </p>

          <p className="mt-4 text-4xl font-bold tracking-tight text-slate-900 dark:text-white">
            {count.toLocaleString()}
          </p>
        </div>

        {icon && (
          <div
            className={`flex size-11 shrink-0 items-center justify-center rounded-xl transition-transform duration-300 group-hover:scale-110 ${style.icon}`}
          >
            {icon}
          </div>
        )}
      </div>

      {description && (
        <div className="mt-5 flex items-center justify-between gap-2 border-t border-slate-100 pt-3 dark:border-slate-800">
          <p className="text-xs leading-5 text-slate-500 dark:text-slate-400">
            {description}
          </p>

          <ArrowUpRight
            className={`size-4 shrink-0 text-slate-400 transition-transform ${
              isSelected
                ? "-translate-y-0.5 translate-x-0.5"
                : "group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
            }`}
          />
        </div>
      )}
    </button>
  );
}
