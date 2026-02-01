"use server";

import { createClient } from "@/utils/supabase/server";
import { encodedRedirect } from "@/utils/utils";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export const signInAction = async () => {
  const supabase = await createClient();
  const origin = (await headers()).get("origin");

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: `http://localhost:3000/auth/callback`,
    },
  }); 

  if (data.url) {
    redirect(data.url); // use the redirect API for your server framework
  }

  if (error) {
    return encodedRedirect("error", "/auth/login", error.message);
  }

  return redirect("/dashboard");
};
