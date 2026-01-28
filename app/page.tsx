import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center">
      <div className="flex-1 w-full flex flex-col gap-20 items-center">
        <Button>
          <Link href="/auth/login">Login</Link>
        </Button>
      </div>
    </main>
  );
}
