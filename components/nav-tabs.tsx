"use client";

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { usePathname, useRouter } from "next/navigation";

export function DashboardTabs() {
  const pathname = usePathname();
  const router = useRouter();

  const value = pathname.startsWith("/analytics")
    ? "analytics"
    : "dashboard";

  return (
    <Tabs value={value}>
      <TabsList>
        <TabsTrigger
          value="dashboard"
          onClick={() => router.push("/dashboard")}
        >
          Dashboard
        </TabsTrigger>

        <TabsTrigger
          value="analytics"
          onClick={() => router.push("/analytics")}
        >
          Analytics
        </TabsTrigger>
      </TabsList>
    </Tabs>
  );
}
