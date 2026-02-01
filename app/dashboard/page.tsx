import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import DashboardUI from "./dashboard";

// export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/auth/login");

  const { data: expenses } = await supabase
    .from("expenses")
    .select(
      `
    id,
    amount,
    description,
    expense_date,
    categories (
      id,
      name
    )
  `,
    )
    .order("expense_date", { ascending: false });

  const { data: categories } = await supabase.from("categories").select();

  const month = new Date().toISOString().slice(0, 7) + "-01";

  const { data: budgetRow } = await supabase
    .from("monthly_budgets")
    .select("budget_amount")
    .single()
    .eq("user_id", user.id)
    .eq("month", month);

  return (
    <DashboardUI
      user={user}
      initialExpenses={expenses ?? []}
      initialBudget={budgetRow?.budget_amount ?? 0}
      categories={categories ?? []}
    />
  );
}
