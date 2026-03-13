"use client";

import { DashboardTabs } from "@/components/nav-tabs";
import { LogoutButton } from "@/components/logout-button";
import { AnimatedContainer } from "@/components/ui/AnimatedContainer";
import { Card } from "@/components/ui/Card";
import type { User } from "@supabase/supabase-js";
import { BarChart3, PieChart, UserCircle2 } from "lucide-react";
import Image from "next/image";

export default function AnalyticsUI({
  user,
  dailyData,
  monthlyData,
  categoryChartData,
}: {
  user: User;
  dailyData: { day: number; total: number }[];
  monthlyData: { month: string; total: number }[];
  categoryChartData: { category: string; total: number }[];
}) {
  const topCategories = categoryChartData.slice(0, 4);

  return (
    <div className="min-h-screen bg-slate-50 p-4 sm:p-6 lg:p-8">
      <div className="mx-auto max-w-7xl space-y-6">
        <header className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-200 pb-4">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Finance Tracker</h1>
            <p className="text-sm text-slate-500">Analytics overview</p>
          </div>

          <div className="flex items-center gap-3">
            <span className="hidden items-center gap-1 text-sm font-medium text-slate-600 sm:inline-flex">
              <UserCircle2 className="h-4 w-4" />
              Hey, {user?.user_metadata?.full_name}
            </span>
            <Image
              src={user?.user_metadata?.avatar_url ?? "/avatar-placeholder.png"}
              width={36}
              height={36}
              alt="User avatar"
              className="h-9 w-9 rounded-full border border-slate-200 object-cover"
              referrerPolicy="no-referrer"
            />
            <LogoutButton />
          </div>
        </header>

        <DashboardTabs />

        <div className="grid grid-cols-12 gap-6">
          <AnimatedContainer className="col-span-12 lg:col-span-8" delay={80} hoverLift>
            <Card className="h-full">
              <div className="mb-4 flex items-center gap-2">
                <BarChart3 className="h-5 w-5 text-indigo-500" />
                <h2 className="text-lg font-semibold text-slate-900">Expense Chart</h2>
              </div>
              <div className="flex h-72 items-center justify-center rounded-xl border border-dashed border-slate-200 bg-slate-50">
                <p className="text-center text-sm text-slate-500">
                  Chart placeholder • {dailyData.length} daily points • {monthlyData.length} monthly points
                </p>
              </div>
            </Card>
          </AnimatedContainer>

          <AnimatedContainer className="col-span-12 lg:col-span-4" delay={140} hoverLift>
            <Card className="h-full">
              <div className="mb-4 flex items-center gap-2">
                <PieChart className="h-5 w-5 text-indigo-500" />
                <h2 className="text-lg font-semibold text-slate-900">Category Breakdown</h2>
              </div>
              <div className="space-y-3">
                {topCategories.length === 0 ? (
                  <p className="text-sm text-slate-500">No category data available yet.</p>
                ) : (
                  topCategories.map((item) => (
                    <div
                      key={item.category}
                      className="flex items-center justify-between rounded-lg border border-slate-100 bg-slate-50 px-3 py-2"
                    >
                      <span className="text-sm font-medium text-slate-700">{item.category}</span>
                      <span className="text-sm font-semibold text-slate-900">₹ {item.total}</span>
                    </div>
                  ))
                )}
              </div>
            </Card>
          </AnimatedContainer>
        </div>
      </div>
    </div>
  );
}
