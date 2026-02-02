"use server";

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";

export async function addCategory(formData: FormData) {
  const name = formData.get("name") as string;

  console.log("Adding category with name:", name);

  if (!name || !name.trim()) {
    throw new Error("Category name required");
  }

  const supabase = await createClient();

  const { error } = await supabase.from("categories").insert({
    user_id: (await supabase.auth.getUser()).data.user?.id,
    name: name.trim(),
  });

  if (error) {
    throw new Error(error.message);
  }

  // refresh dashboard (categories list)
  revalidatePath("/dashboard");
}
