// import { createClient } from "@/lib/server";
import DashboardPage from "./dashboard";

export default async function Dashboard() {
  // const supabase = await createClient();

  // // You can also use getUser() which will be slower.
  // const { data } = await supabase.auth.getClaims();
  // const user = data?.claims;

  return (
    <div className="">
      <DashboardPage/>
    </div>
  );
}
