"use server";
import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";

export async function updateBudgetAction(formData: FormData) {
  const supabase = await createClient();

  const budgetAmount = Number(formData.get("budget_amount"));

  if (!budgetAmount || budgetAmount <= 0) {
    throw new Error("Invalid budget amount");
  }

  console.log("Updating budget to:", budgetAmount);

  // first day of current month (YYYY-MM-01)
  const month = new Date().toISOString().slice(0, 7) + "-01";

  const { error } = await supabase
    .from("monthly_budgets")
    .update({
      month,

      // user_id: (await supabase.auth.getUser()).data.user?.id,
      budget_amount: budgetAmount,
    })
    .eq("user_id", (await supabase.auth.getUser()).data.user?.id);

  if (error) {
    throw new Error(error.message);
  }

  // 🔑 refresh server data
  revalidatePath("/dashboard");
}

export async function CreateBudgetForTheMonth(formData: FormData) {
  const supabase = await createClient();

  const budgetAmount = Number(formData.get("budget_amount"));

  if (!budgetAmount || budgetAmount <= 0) {
    throw new Error("Invalid budget amount");
  }

  // first day of current month (YYYY-MM-01)
  const month = new Date().toISOString().slice(0, 7) + "-01";

  const { error } = await supabase.from("monthly_budgets").insert({
    month,
    user_id: (await supabase.auth.getUser()).data.user?.id,
    budget_amount: budgetAmount,
  });
  // .eq("user_id", (await supabase.auth.getUser()).data.user?.id);

  // console.log("Adding budget to:", budget);

  if (error) {
    throw new Error(error.message);
  }

  // 🔑 refresh server data
  revalidatePath("/dashboard");
}
