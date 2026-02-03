"use client";

import { LogoutButton } from "@/components/logout-button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { User } from "@supabase/supabase-js";
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { DashboardTabs } from "./nav-tabs";
import { CategoryChart } from "./category-chart";
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
  return (
    <div className="p-6 space-y-6">
      <header className="flex items-center justify-between">
        <h1 className="text-lg sm:text-xl font-semibold">
          Finance Tracker
        </h1>

        <div className="flex items-center justify-between sm:justify-end gap-3">
          <span className="hidden sm:block text-sm sm:text-base truncate max-w-[180px]">
            Hey, {user?.user_metadata?.full_name}
          </span>

          {/* Mobile: show avatar */}
          <Image
            src={
              user?.user_metadata?.avatar_url ??
              "/avatar-placeholder.png"
            }
            width={32}
            height={32}
            alt="User avatar"
            className="sm:hidden w-8 h-8 rounded-full object-cover"
            referrerPolicy="no-referrer"
          />

          <LogoutButton />
        </div>
      </header>

      <DashboardTabs />

      <CategoryChart data={categoryChartData} />

      {/* DAILY – CURRENT MONTH */}
      <Card>
        <CardHeader>
          <CardTitle>Daily Expenses (Current Month)</CardTitle>
        </CardHeader>

        <CardContent className="h-[300px]">
          <div className="relative -mx-2 sm:mx-0">
            <div className="overflow-x-auto">
              <div className="min-w-[700px] sm:min-w-full h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={dailyData} barSize={18}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis
                      dataKey="day"
                      interval={0}
                      // angle={-35}
                      textAnchor="end"
                      height={60}
                      tick={{ fontSize: 12 }}
                    />
                    <YAxis tick={{ fontSize: 12 }} />
                    <Tooltip cursor={{ fill: "#fafafa" }} />
                    <Bar dataKey="total" fill="#d4d4d4" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>


      {/* MONTHLY – CURRENT YEAR */}
      <Card>
        <CardHeader>
          <CardTitle>Monthly Expenses (Current Year)</CardTitle>
        </CardHeader>

        <CardContent className="h-[300px]">
          <div className="relative -mx-2 sm:mx-0">
            <div className="overflow-x-auto">
              <div className="min-w-[520px] sm:min-w-full h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={monthlyData} barSize={24}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis
                      dataKey="month"
                      interval={0}
                      tick={{ fontSize: 12 }}
                    />
                    <YAxis tick={{ fontSize: 12 }} />
                    <Tooltip cursor={{ fill: "#fafafa" }} />
                    <Bar dataKey="total" fill="#d4d4d4" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

    </div>
  );
}
