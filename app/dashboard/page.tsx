import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import DashboardUI from "../../components/dashboard";

export default async function DashboardPage({
  searchParams,
}: {
  searchParams: { page?: string };
}) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/");

  // const PAGE_SIZE = 10;

  // const page = Number(searchParams.page ?? 1);
  // const from = (page - 1) * PAGE_SIZE;
  // const to = from + PAGE_SIZE - 1;

  const { data: expenses } = await supabase
    .from("expenses")
    .select(
      `
    id,
    amount,
    description,
    expense_date,
    categories(name)
  `,
      // ,
      // { count: "exact" },
    )
    .order("expense_date", { ascending: false });
  // .range(from, to);

  const { data: categories } = await supabase.from("categories").select();

  const month = new Date().toISOString().slice(0, 7) + "-01";

  const { data: budgetRow } = await supabase
    .from("monthly_budgets")
    .select("budget_amount")
    .eq("user_id", user.id)
    .eq("month", month)
    .single();

  return (
    <DashboardUI
      user={user}
      initialExpenses={expenses ?? []}
      // totalCount={count ?? 0}
      // currentPage={page}
      initialBudget={budgetRow?.budget_amount ?? 0}
      categories={categories ?? []}
    />
  );
}
