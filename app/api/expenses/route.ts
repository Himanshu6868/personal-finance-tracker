"use server";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { NextResponse } from "next/server";

export async function FetchExpenses(): Promise<Event[]> {
  const supabase = createClient();

  const {
    data: { user },
    error: userError,
  } = await (await supabase).auth.getUser();

  if (userError || !user) throw new Error("User not logged in");

  const { data, error } = await (await supabase)
    .from("expenses")
    .select("*")
    .order("expense_date", { ascending: false })
    .limit(10);

  if (error) {
    throw new Error("Error fetching events: " + error.message);
  }

  return data || [];
}

export async function AddExpense(fromData: FormData): Promise<void> {
  const supabase = await createClient();
  const body = Object.fromEntries(fromData);

  const { amount, category_id, description } = body;

  const { error } = await supabase.from("expenses").insert({
    amount,
    category_id,
    description,
    expense_date: new Date(),
  });

  if (error) {
    throw new Error("Error creating registration: " + error.message);
  }

  redirect("/dashboard");
}
