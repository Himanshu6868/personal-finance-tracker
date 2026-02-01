"use server";
import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";
export async function addExpense(formData: FormData): Promise<void> {
  const supabase = await createClient();

  const amount = formData.get("amount") as string;
  const description = formData.get("description") as string;
  const category_id = formData.get("category_id") as string;

  const { data, error } = await supabase.from("expenses").insert({
    amount,
    description,
    category_id,
    user_id: (await supabase.auth.getUser()).data.user?.id,
    expense_date: new Date(),
  });

  if (error) {
    throw new Error("Error creating event: " + error.message);
  }

  revalidatePath("/dashboard");
  // if (error) {
  //   return NextResponse.json({ error: error.message }, { status: 500 });
  // }

  // return NextResponse.json({ success: true });sss
}
