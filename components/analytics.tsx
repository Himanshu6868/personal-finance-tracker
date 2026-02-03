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
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={dailyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip cursor={{ fill: "#fafafa" }} // off-white
              // contentStyle={{
              //   backgroundColor: "white",
              //   border: "1px solid #e5e7eb",
              //   fontSize: "12px",
              // }} 
              />
              <Bar dataKey="total" fill="#d4d4d4" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* MONTHLY – CURRENT YEAR */}
      <Card>
        <CardHeader>
          <CardTitle>Monthly Expenses (Current Year)</CardTitle>
        </CardHeader>
        <CardContent className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip cursor={{ fill: "#fafafa" }}

              />
              <Bar dataKey="total" fill="#d4d4d4" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
}
