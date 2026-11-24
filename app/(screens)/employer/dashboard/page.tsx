import CandidateStatus from "@/components/dashboard/employer/CandidateStatus";
import EmployerCompanyHeader from "@/components/dashboard/employer/EmployerCompanyHeader";
import HiringAnalytics from "@/components/dashboard/employer/HiringAnalytics";
import JobStatus from "@/components/dashboard/employer/JobStatus";

export default function Dashboard() {
  return (
    <main className="min-h-screen bg-slate-50/70 dark:bg-slate-950 text-slate-900 dark:text-slate-100">
      <div className="container">
        <EmployerCompanyHeader />
        <JobStatus />
        <HiringAnalytics />
        <CandidateStatus />
      </div>
    </main>
  );
}
