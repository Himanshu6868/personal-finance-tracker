"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { DashboardTabs } from "../dashboard/nav-tabs";
import { LogoutButton } from "@/components/logout-button";

const monthlyData = [
  { month: "Jan", total: 0 },
  { month: "Feb", total: 0 },
  { month: "Mar", total: 0 },
  { month: "Apr", total: 0 },
  { month: "May", total: 0 },
  { month: "Jun", total: 0 },
  { month: "Jul", total: 0 },
  { month: "Aug", total: 0 },
  { month: "Sep", total: 0 },
  { month: "Oct", total: 0 },
  { month: "Nov", total: 0 },
  { month: "Dec", total: 0 },
];

const yearlyData = [
  { year: "2022", total: 0 },
  { year: "2023", total: 0 },
  { year: "2024", total: 0 },
  { year: "2025", total: 0 },
  { year: "2026", total: 0 },
];

export default function AnalyticsPage() {

   const pathname = usePathname();
  const router = useRouter();

  const value = pathname.startsWith("/analytics")
    ? "analytics"
    : "dashboard";

  return (
    <div className="p-6 space-y-6">

      <header className="flex items-center justify-between">
        <h1 className="text-xl font-semibold">FinanceTracker</h1>

        <div className="flex items-center gap-4">
          <span className="text-sm text-muted-foreground">
            Welcome, Himanshu
          </span>
          <LogoutButton/>
        </div>
      </header>

      {/* Tabs */}
      <DashboardTabs/>

      {/* Monthly Expenses */}
      <Card>
        <CardHeader>
          <CardTitle>Monthly Expenses (Current Year)</CardTitle>
          <p className="text-sm text-muted-foreground">
            Track your spending patterns month by month
          </p>
        </CardHeader>

        <CardContent className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="total" fill="#d4d4d4" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Yearly Expenses */}
      <Card>
        <CardHeader>
          <CardTitle>Yearly Expenses (Last 5 Years)</CardTitle>
          <p className="text-sm text-muted-foreground">
            Long-term spending overview
          </p>
        </CardHeader>

        <CardContent className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={yearlyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="year" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="total" fill="#d4d4d4" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
}
