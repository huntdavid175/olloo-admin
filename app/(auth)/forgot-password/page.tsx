"use client";

import * as React from "react";
import { ForgotPasswordForm } from "@/components/Forms/ForgotPasswordForm";

export default function ForgotPasswordPage() {
  return (
    <div className="relative min-h-screen w-full bg-[radial-gradient(1200px_800px_at_70%_0%,theme(colors.slate.950/.92),transparent_80%),radial-gradient(1200px_800px_at_0%_100%,theme(colors.sky.950/.96),transparent_80%),linear-gradient(to_bottom_right,theme(colors.slate.950),theme(colors.sky.950))]">
      <div className="relative z-10 flex min-h-screen items-stretch justify-stretch px-0 md:px-4 md:items-center md:justify-center">
        <div className="w-full max-w-md space-y-6">
          <ForgotPasswordForm />
        </div>
      </div>
    </div>
  );
}
