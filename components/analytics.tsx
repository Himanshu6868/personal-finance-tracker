"use client";

import { DashboardTabs } from "@/components/nav-tabs";
import { LogoutButton } from "@/components/logout-button";
import { AnimatedContainer } from "@/components/ui/AnimatedContainer";
import { Card } from "@/components/ui/Card";
import type { User } from "@supabase/supabase-js";
import { BarChart3, CalendarDays, PieChart, UserCircle2 } from "lucide-react";
import Image from "next/image";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart as RechartsPieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

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
  const pieColors = ["#6366f1", "#8b5cf6", "#ec4899", "#06b6d4", "#14b8a6", "#f59e0b"];
  const formatCurrency = (value: unknown) => {
    const normalized = Array.isArray(value) ? value[0] : value;
    const numericValue = Number(normalized ?? 0);

    return `₹ ${Number.isNaN(numericValue) ? 0 : numericValue.toLocaleString()}`;
  };

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
                <h2 className="text-lg font-semibold text-slate-900">Daily Expense Trend</h2>
              </div>
              <div className="h-72 rounded-xl border border-slate-100 bg-white p-3">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={dailyData} margin={{ top: 10, right: 16, left: -12, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                    <XAxis dataKey="day" tick={{ fontSize: 12 }} stroke="#64748b" />
                    <YAxis tick={{ fontSize: 12 }} stroke="#64748b" />
                    <Tooltip formatter={(value) => formatCurrency(value)} labelFormatter={(day) => `Day ${day}`} />
                    <Line
                      name="Expense"
                      type="monotone"
                      dataKey="total"
                      stroke="#6366f1"
                      strokeWidth={3}
                      dot={{ r: 2 }}
                      activeDot={{ r: 5 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </Card>
          </AnimatedContainer>

          <AnimatedContainer className="col-span-12 lg:col-span-4" delay={120} hoverLift>
            <Card className="h-full">
              <div className="mb-4 flex items-center gap-2">
                <PieChart className="h-5 w-5 text-indigo-500" />
                <h2 className="text-lg font-semibold text-slate-900">Category Breakdown</h2>
              </div>
              <div className="h-72 rounded-xl border border-slate-100 bg-white p-3">
                {categoryChartData.length === 0 ? (
                  <p className="flex h-full items-center justify-center text-sm text-slate-500">
                    No category data available yet.
                  </p>
                ) : (
                  <ResponsiveContainer width="100%" height="100%">
                    <RechartsPieChart>
                      <Pie
                        data={categoryChartData}
                        dataKey="total"
                        nameKey="category"
                        cx="50%"
                        cy="48%"
                        outerRadius={88}
                        label={({ name, percent }) => `${name ?? "Category"} ${((percent ?? 0) * 100).toFixed(0)}%`}
                        labelLine={false}
                      >
                        {categoryChartData.map((entry, index) => (
                          <Cell key={entry.category} fill={pieColors[index % pieColors.length]} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value) => formatCurrency(value)} />
                      <Legend verticalAlign="bottom" height={28} wrapperStyle={{ fontSize: 12 }} />
                    </RechartsPieChart>
                  </ResponsiveContainer>
                )}
              </div>
            </Card>
          </AnimatedContainer>

          <AnimatedContainer className="col-span-12" delay={160} hoverLift>
            <Card className="h-full">
              <div className="mb-4 flex items-center gap-2">
                <CalendarDays className="h-5 w-5 text-indigo-500" />
                <h2 className="text-lg font-semibold text-slate-900">Monthly Spend Overview</h2>
              </div>
              <div className="h-72 rounded-xl border border-slate-100 bg-white p-3">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={monthlyData} margin={{ top: 10, right: 16, left: -12, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                    <XAxis dataKey="month" tick={{ fontSize: 12 }} stroke="#64748b" />
                    <YAxis tick={{ fontSize: 12 }} stroke="#64748b" />
                    <Tooltip formatter={(value) => formatCurrency(value)} />
                    <Bar name="Monthly total" dataKey="total" fill="#8b5cf6" radius={[8, 8, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              <div className="mt-4 grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-4">
                {topCategories.length === 0 ? (
                  <p className="text-sm text-slate-500">No category data available yet.</p>
                ) : (
                  topCategories.map((item) => (
                    <div
                      key={item.category}
                      className="rounded-lg border border-slate-100 bg-slate-50 px-3 py-2"
                    >
                      <p className="text-xs text-slate-500">{item.category}</p>
                      <p className="text-sm font-semibold text-slate-900">₹ {item.total.toLocaleString()}</p>
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
