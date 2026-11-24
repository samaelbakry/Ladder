"use client";

import AuthLayout from "@/components/ui/authUI/AuthLayout";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { UserCheck, Building2, ArrowRight, CheckCircle2 } from "lucide-react";
import PageTransition from "@/components/shared/PageTransition";

type Role = "job_seeker" | "employer";

const ROLES: {
  id: Role;
  title: string;
  description: string;
  icon: typeof UserCheck;
}[] = [
  {
    id: "job_seeker",
    title: "I'm looking for a job",
    description:
      "Track job applications, organize interview pipelines, and land your next role.",
    icon: UserCheck,
  },
  {
    id: "employer",
    title: "I'm hiring candidates",
    description:
      "Post open job opportunities, review applications, and discover top tech talent.",
    icon: Building2,
  },
];

export default function SelectRole() {
  const router = useRouter();
  const [selectedRole, setSelectedRole] = useState<Role>("job_seeker");
  const [isLeaving, setIsLeaving] = useState(false);

  const handleContinue = () => {
    if (isLeaving) return;
    setIsLeaving(true);
    setTimeout(() => {
      router.replace(`/register?role=${selectedRole}`);
    }, 200);
  };

  return (
    <AuthLayout
      title="Choose how you'll use Ladder"
      subtitle="Select your account type to personalize your workspace experience."
    >
      <PageTransition auth isLeaving={isLeaving}>
        <div className="space-y-6">
          <div className="space-y-3" role="radiogroup" aria-label="Account type">
            {ROLES.map(({ id, title, description, icon: Icon }) => {
              const isSelected = selectedRole === id;

              return (
                <button
                  key={id}
                  type="button"
                  role="radio"
                  aria-checked={isSelected}
                  onClick={() => setSelectedRole(id)}
                  className={`group relative w-full text-left p-5 rounded-2xl border-2 transition-all duration-200 cursor-pointer flex items-start gap-4 focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 focus-visible:ring-offset-2 ${
                    isSelected
                      ? "border-violet-600 bg-violet-50/60 shadow-sm shadow-violet-600/10"
                      : "border-slate-200 bg-white hover:border-violet-200 hover:bg-slate-50/70"
                  }`}
                >
                  <div
                    className={`p-3 rounded-xl transition-all duration-200 shrink-0 ${
                      isSelected
                        ? "bg-linear-to-br from-violet-500 via-violet-600 to-indigo-700 text-white shadow-md shadow-violet-600/25"
                        : "bg-slate-100 text-slate-600 group-hover:bg-violet-100/70 group-hover:text-violet-700"
                    }`}
                  >
                    <Icon size={22} />
                  </div>

                  <div className="flex-1 pr-6">
                    <p className="font-semibold text-slate-900 text-base">
                      {title}
                    </p>
                    <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                      {description}
                    </p>
                  </div>

                  <div className="absolute top-5 right-5">
                    <div
                      className={`w-5 h-5 rounded-full border flex items-center justify-center transition-all ${
                        isSelected
                          ? "border-violet-600 bg-violet-600 text-white"
                          : "border-slate-300 bg-transparent group-hover:border-violet-300"
                      }`}
                    >
                      {isSelected && <CheckCircle2 size={14} />}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          <button
            type="button"
            onClick={handleContinue}
            disabled={isLeaving}
            className="w-full py-2.5 px-4 bg-linear-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 disabled:opacity-70 text-white font-semibold text-sm rounded-xl shadow-lg shadow-violet-600/25 active:scale-[0.99] transition-all flex items-center justify-center gap-2 group cursor-pointer"
          >
            <span>Continue</span>
            <ArrowRight
              size={16}
              className="group-hover:translate-x-0.5 transition-transform"
            />
          </button>
        </div>
      </PageTransition>
    </AuthLayout>
  );
}