"use client";

import { signInAction } from "@/app/actions";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { createClient } from "@/utils/supabase/client";
import { useState } from "react";

export default function HomeClient() {
  const [open, setOpen] = useState(false);
  const supabase = createClient();

  const handleGoogleLogin = async () => {
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${location.origin}/dashboard`,
      },
    });
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-background">
      <div className="max-w-xl text-center space-y-6 px-6">
        {/* Logo / Title */}
        <h1 className="text-4xl font-semibold tracking-tight">
          FinanceTracker
        </h1>

        {/* Subtitle */}
        <p className="text-muted-foreground text-lg">
          Track your daily expenses. See where your money goes.
        </p>

        {/* CTA */}
        <Button size="lg" onClick={() => setOpen(true)}>
          Login
        </Button>
      </div>

      {/* Login Modal */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-[380px]">
          <DialogHeader>
            <DialogTitle className="text-center">
              Sign in to FinanceTracker
            </DialogTitle>
          </DialogHeader>

          <div className="mt-6">
            <Button className="w-full" variant="outline" onClick={signInAction}>
              Continue with Google
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </main>
  );
}
