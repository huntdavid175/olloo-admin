"use client";

import * as React from "react";
import Link from "next/link";
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

export function ForgotPasswordForm() {
  return (
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
  );
}
