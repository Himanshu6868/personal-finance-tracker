import { createClient } from "@/utils/supabase/server";
import { NextResponse } from "next/server";

export async function GET() {
  const supabase = await createClient();

  const month = new Date().toISOString().slice(0, 7) + "-01";

  const { data } = await supabase
    .from("monthly_budgets")
    .select("budget_amount")
    .eq("month", month)
    .single();

  return NextResponse.json(data);
}

export async function POST(req: Request) {
  const supabase = await createClient();
  const { budget_amount } = await req.json();

  const month = new Date().toISOString().slice(0, 7) + "-01";

  const { error } = await supabase
    .from("monthly_budgets")
    .upsert({ month, budget_amount });

  if (error)
    return NextResponse.json({ error: error.message }, { status: 500 });

  return NextResponse.json({ success: true });
}
