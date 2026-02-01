"use client";

import { LogoutButton } from "@/components/logout-button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { DashboardTabs } from "../dashboard/nav-tabs";

export default function AnalyticsUI({
  user,
  dailyData,
  monthlyData,
}: {
  user: any;
  dailyData: { day: number; total: number }[];
  monthlyData: { month: string; total: number }[];
}) {
  return (
    <div className="p-6 space-y-6">
      <header className="flex items-center justify-between">
        <h1 className="text-xl font-semibold">FinanceTracker</h1>
        <div className="flex items-center gap-4">
          Hey, {user?.user_metadata?.full_name}
          <LogoutButton />
        </div>
      </header>

      <DashboardTabs />

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
              <Tooltip />
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
              <Tooltip />
              <Bar dataKey="total" fill="#d4d4d4" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
}
