import { createClient } from "@/lib/server";
import { NextResponse } from "next/server";

export async function GET() {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("expenses")
    .select("id, amount, description, expense_date, categories(name)")
    .order("expense_date", { ascending: false })
    .limit(10);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data);
}

export async function POST(req: Request) {
  const supabase = await createClient();
  const body = await req.json();

  const { amount, category_id, description } = body;

  const { error } = await supabase.from("expenses").insert({
    amount,
    category_id,
    description,
    expense_date: new Date(),
  });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
