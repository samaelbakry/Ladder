
"use client";

import { useMemo, useState } from "react";
import {
  AlertTriangle,
  BriefcaseBusiness,
  CheckCircle2,
  CircleX,
  TrendingUp,
  MapPin,
  CalendarDays,
  ArrowUpRight,
} from "lucide-react";

import CardSkeleton from "@/components/skeletons/CardSkeleton";
import { useFetch } from "@/hooks/useFetch";
import {
  getEmployerJobStats,
  getEmployerJobs,
} from "@/services/employer";
import { useAppSelector } from "@/store/hooks/redux-hooks";

import JobStatusCard from "./JobStatusCard";

type JobFilter = "all" | "open" | "closed";

const filterTitles = {
  all: "All Jobs",
  open: "Active Jobs",
  closed: "Closed Jobs",
};

export default function JobStatus() {
  const [selectedFilter, setSelectedFilter] = useState<JobFilter>("all");

  const activeCompanyId = useAppSelector(
    (state) => state.activeCompany.activeCompanyId,
  );

  const {
    data: stats,
    isLoading: statsLoading,
    error: statsError,
  } = useFetch({
    queryFn: () => getEmployerJobStats(activeCompanyId!),
    queryKey: ["employerJobStats", activeCompanyId!],
    enabled: !!activeCompanyId,
  });

  const {
    data: jobs,
    isLoading: jobsLoading,
    error: jobsError,
  } = useFetch({
    queryFn: () => getEmployerJobs(activeCompanyId!),
    queryKey: ["employerJobs", activeCompanyId!],
    enabled: !!activeCompanyId,
  });

  const isLoading = statsLoading || jobsLoading;
  const error = statsError || jobsError;

  const filteredJobs = useMemo(() => {
    const allJobs = jobs ?? [];

    if (selectedFilter === "all") return allJobs;

    return allJobs.filter(
      (job) => job.status === selectedFilter,
    );
  }, [jobs, selectedFilter]);

  const statCards = [
    {
      id: "all" as const,
      title: "Total Jobs",
      count: stats?.totalJobs ?? 0,
      description: "All job posts created",
      icon: <BriefcaseBusiness className="size-5" />,
      accent: "violet" as const,
    },
    {
      id: "open" as const,
      title: "Active Jobs",
      count: stats?.activeJobs ?? 0,
      description: "Currently open listings",
      icon: <CheckCircle2 className="size-5" />,
      accent: "emerald" as const,
    },
    {
      id: "closed" as const,
      title: "Closed Jobs",
      count: stats?.closedJobs ?? 0,
      description: "Filled or ended listings",
      icon: <CircleX className="size-5" />,
      accent: "amber" as const,
    },
  ];

  return (
    <section className="my-10 space-y-6">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-sm font-semibold text-violet-600 dark:text-violet-400">
            <TrendingUp className="size-4" />
            <span>Recruitment overview</span>
          </div>

          <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-3xl">
            Job Postings
            <span className="text-slate-400 dark:text-slate-500">
              {" "}& Status
            </span>
          </h2>

          <p className="max-w-xl text-sm leading-6 text-slate-500 dark:text-slate-400">
            Keep track of your vacancies and monitor your
            company&apos;s hiring activity.
          </p>
        </div>

        {!isLoading && !error && stats && (
          <div className="flex w-fit items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-2 text-xs font-medium text-slate-600 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300">
            <span className="size-2 rounded-full bg-emerald-500" />
            <span>{stats.activeJobs} active vacancies</span>
          </div>
        )}
      </div>

      {!activeCompanyId ? (
        <div className="rounded-2xl border border-slate-200 bg-white p-6 text-center text-sm text-slate-500 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-400">
          Select a company to view its job statistics.
        </div>
      ) : error ? (
        <div
          role="alert"
          className="flex items-start gap-3 rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-700 dark:border-red-900/50 dark:bg-red-950/20 dark:text-red-400"
        >
          <AlertTriangle className="mt-0.5 size-5 shrink-0" />
          <div>
            <p className="font-semibold">
              Unable to load job statistics
            </p>
            <p className="mt-1 opacity-80">
              Please try again later.
            </p>
          </div>
        </div>
      ) : (
        <>
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {isLoading
              ? Array.from({ length: 3 }).map((_, index) => (
                  <CardSkeleton key={index} />
                ))
              : statCards.map((stat) => (
                  <JobStatusCard
                    key={stat.id}
                    title={stat.title}
                    count={stat.count}
                    description={stat.description}
                    icon={stat.icon}
                    accent={stat.accent}
                    isSelected={selectedFilter === stat.id}
                    onClick={() => setSelectedFilter(stat.id)}
                  />
                ))}
          </div>

          {!isLoading && (
            <div className="space-y-5">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                    {filterTitles[selectedFilter]}
                  </h3>
                  <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                    {filteredJobs.length}{" "}
                    {filteredJobs.length === 1 ? "job" : "jobs"} found
                  </p>
                </div>
              </div>

              {filteredJobs.length === 0 ? (
                <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50/70 px-6 py-12 text-center dark:border-slate-700 dark:bg-slate-900/50">
                  <div className="mx-auto flex size-12 items-center justify-center rounded-2xl bg-violet-100 text-violet-600 dark:bg-violet-500/10 dark:text-violet-400">
                    <BriefcaseBusiness className="size-6" />
                  </div>

                  <h4 className="mt-4 font-semibold text-slate-900 dark:text-white">
                    No {selectedFilter === "open" ? "active" : selectedFilter === "closed" ? "closed" : ""} jobs found
                  </h4>

                  <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                    There are no jobs in this category yet.
                  </p>
                </div>
              ) : (
                <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                  {filteredJobs.map((job) => (
                    <article
                      key={job.id}
                      className="group rounded-2xl border border-slate-200 bg-white p-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg dark:border-slate-800 dark:bg-slate-900"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="min-w-0">
                          <h4 className="truncate font-semibold text-slate-900 dark:text-white">
                            {job.title}
                          </h4>

                          <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                            {job.employment_type || "Job opening"}
                          </p>
                        </div>

                        <span
                          className={`shrink-0 rounded-full px-2.5 py-1 text-xs font-medium ${
                            job.status === "open"
                              ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400"
                              : "bg-amber-50 text-amber-700 dark:bg-amber-500/10 dark:text-amber-400"
                          }`}
                        >
                          {job.status === "open" ? "Active" : "Closed"}
                        </span>
                      </div>

                      {job.location && (
                        <div className="mt-4 flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
                          <MapPin className="size-4 shrink-0" />
                          <span className="truncate">{job.location}</span>
                        </div>
                      )}

                      <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-3 dark:border-slate-800">
                        <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                          <CalendarDays className="size-4" />
                          {job.created_at
                            ? new Date(job.created_at).toLocaleDateString()
                            : "Recently posted"}
                        </div>

                        <ArrowUpRight className="size-4 text-slate-400 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                      </div>
                    </article>
                  ))}
                </div>
              )}
            </div>
          )}
        </>
      )}
    </section>
  );
}
