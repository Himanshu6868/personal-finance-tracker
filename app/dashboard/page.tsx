import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import DashboardUI from "./dashboard";

// export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  const supabase = await createClient();

  const { data: { user } } = await supabase.auth.getUser();
  // if (!user) redirect("/auth/login");

  const { data: expenses, error } = await supabase
    .from('expenses')
    .select()
  // .order("expense_date", { ascending: false });

  console.log('Expenses:', expenses);

  const month = new Date().toISOString().slice(0, 7) + "-01";

  const { data: budgetRow } = await supabase
    .from("monthly_budgets")
    .select("budget_amount")
    .eq("month", month)
    .single();

  return (
    <DashboardUI
      user={user}
      initialExpenses={expenses ?? []}
      initialBudget={budgetRow?.budget_amount ?? 0}
    />
  );
}
