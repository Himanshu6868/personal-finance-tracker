"use client";

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BarChart3, LayoutDashboard } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";

export function DashboardTabs() {
  const pathname = usePathname();
  const router = useRouter();

  const value = pathname.startsWith("/analytics") ? "analytics" : "dashboard";

  return (
    <Tabs value={value}>
      <TabsList className="grid w-full max-w-sm grid-cols-2 rounded-xl bg-white p-1 shadow-sm">
        <TabsTrigger
          value="dashboard"
          onClick={() => router.push("/dashboard")}
          className="gap-2 rounded-lg data-[state=active]:bg-indigo-500 data-[state=active]:text-white"
        >
          <LayoutDashboard className="h-4 w-4" /> Dashboard
        </TabsTrigger>

        <TabsTrigger
          value="analytics"
          onClick={() => router.push("/analytics")}
          className="gap-2 rounded-lg data-[state=active]:bg-indigo-500 data-[state=active]:text-white"
        >
          <BarChart3 className="h-4 w-4" /> Analytics
        </TabsTrigger>
      </TabsList>
    </Tabs>
  );
}
