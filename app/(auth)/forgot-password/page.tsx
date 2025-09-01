"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardHeader,
  CardFooter,
} from "@/components/ui/card";
import { Logo } from "@/components/Brand/Logo";

export default function ForgotPasswordPage() {
  return (
    <div className="relative min-h-screen w-full bg-[radial-gradient(1200px_800px_at_70%_0%,theme(colors.slate.950/.92),transparent_80%),radial-gradient(1200px_800px_at_0%_100%,theme(colors.sky.950/.96),transparent_80%),linear-gradient(to_bottom_right,theme(colors.slate.950),theme(colors.sky.950))]">
      <div className="relative z-10 flex min-h-screen items-stretch justify-stretch px-0 md:px-4 md:items-center md:justify-center">
        <div className="w-full max-w-md space-y-6">
          <Card className="shadow-lg w-full h-full md:h-auto md:w-auto rounded-none md:rounded-md">
            <CardHeader className="space-y-6">
              <div className="flex items-center gap-2">
                <Logo size={20} />
                <span className="text-base font-semibold">olloo</span>
              </div>
              <div className="space-y-1">
                <h1 className="text-2xl font-semibold">Forgot password</h1>
                <p className="text-sm text-muted-foreground">
                  Enter your email and we&apos;ll send you a reset link
                </p>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="you@example.com" />
              </div>
              <Button className="w-full">Send reset link</Button>
              <div className="text-sm">
                <Link
                  href="/login"
                  className="text-blue-600 hover:text-blue-700 underline-offset-4 hover:underline"
                >
                  Back to login
                </Link>
              </div>
            </CardContent>
            <CardFooter className="justify-center">
              <div className="flex items-center justify-center gap-4 text-xs text-muted-foreground w-full">
                <Link href="#" className="hover:text-foreground">
                  Help
                </Link>
                <Link href="#" className="hover:text-foreground">
                  Privacy
                </Link>
                <Link href="#" className="hover:text-foreground">
                  Terms
                </Link>
              </div>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
}
