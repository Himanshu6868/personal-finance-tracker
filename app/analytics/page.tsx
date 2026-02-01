import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import AnalyticsPage from "./analytics";

export default async function Analytics() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/auth/login");

  const now = new Date();
  const currentYear = now.getFullYear();
  const currentMonth = now.getMonth();

  const monthStart = new Date(currentYear, currentMonth, 1).toISOString();

  const nextMonthStart = new Date(
    currentYear,
    currentMonth + 1,
    1,
  ).toISOString();

  const { data: dailyRaw } = await supabase
    .from("expenses")
    .select("expense_date, amount")
    .gte("expense_date", monthStart)
    .lt("expense_date", nextMonthStart);

  // days in month
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

  const dailyData = Array.from({ length: daysInMonth }, (_, i) => ({
    day: i + 1,
    total: 0,
  }));

  dailyRaw?.forEach((e) => {
    const day = new Date(e.expense_date).getDate();

    // 🛡️ defensive guard (extra safety)
    if (day >= 1 && day <= daysInMonth) {
      dailyData[day - 1].total += Number(e.amount);
    }
  });

  // ---------- MONTHLY DATA (CURRENT YEAR) ----------
  const yearStart = `${currentYear}-01-01`;
  const yearEnd = `${currentYear}-12-31`;

  const { data: monthlyRaw } = await supabase
    .from("expenses")
    .select("expense_date, amount")
    .gte("expense_date", yearStart)
    .lte("expense_date", yearEnd);

  const monthlyData = Array.from({ length: 12 }, (_, i) => ({
    month: new Date(0, i).toLocaleString("en-US", { month: "short" }),
    total: 0,
  }));

  monthlyRaw?.forEach((e) => {
    const m = new Date(e.expense_date).getMonth();
    monthlyData[m].total += e.amount;
  });

  return (
    <AnalyticsPage
      user={user}
      dailyData={dailyData}
      monthlyData={monthlyData}
    />
  );
}
