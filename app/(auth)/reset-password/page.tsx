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
import { Eye, EyeOff, AlertCircle } from "lucide-react";
import { Logo } from "@/components/Brand/Logo";

export default function ResetPasswordPage() {
  const [showPassword, setShowPassword] = React.useState(false);
  const [showConfirm, setShowConfirm] = React.useState(false);
  const [password, setPassword] = React.useState("");
  const [confirm, setConfirm] = React.useState("");
  const passwordsMismatch = confirm.length > 0 && confirm !== password;

  const passwordRules = React.useMemo(() => {
    const hasMinLength = password.length >= 8;
    const hasUpper = /[A-Z]/.test(password);
    const hasLower = /[a-z]/.test(password);
    const hasNumber = /\d/.test(password);
    const hasSymbol = /[^A-Za-z0-9\s]/.test(password);
    const startsOrEndsWithSpace = /^(\s).*(\S)|.*(\s)$/.test(password);

    const categoriesMet = [hasUpper, hasLower, hasNumber, hasSymbol].filter(
      Boolean
    ).length;
    const baseStrength = hasMinLength ? categoriesMet : 0; // 0-4

    return {
      hasMinLength,
      hasUpper,
      hasLower,
      hasNumber,
      hasSymbol,
      startsOrEndsWithSpace,
      strength: Math.min(4, baseStrength),
    } as const;
  }, [password]);

  const strengthColors = [
    "bg-red-500",
    "bg-yellow-500",
    "bg-blue-500",
    "bg-green-600",
  ];

  return (
    <div className="min-h-screen w-full bg-[radial-gradient(1200px_800px_at_70%_0%,theme(colors.slate.950/.92),transparent_80%),radial-gradient(1200px_800px_at_0%_100%,theme(colors.sky.950/.96),transparent_80%),linear-gradient(to_bottom_right,theme(colors.slate.950),theme(colors.sky.950))]">
      <div className="relative z-10 flex min-h-screen items-stretch justify-stretch px-0 md:px-4 md:items-center md:justify-center">
        <div className="w-full max-w-md space-y-6">
          <Card className="shadow-lg w-full h-full md:h-auto md:w-auto rounded-none md:rounded-md">
            <CardHeader className="space-y-6">
              <div className="flex items-center gap-2">
                <Logo size={20} />
                <span className="text-base font-semibold">olloo</span>
              </div>
              <div className="space-y-1">
                <h1 className="text-2xl font-semibold">
                  Reset account password
                </h1>
                <p className="text-sm text-muted-foreground">
                  For the account lidiya@refero.design
                </p>
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">New password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder=""
                    className="pr-10"
                  />
                  <button
                    type="button"
                    aria-label={
                      showPassword ? "Hide password" : "Show password"
                    }
                    onClick={() => setShowPassword((s) => !s)}
                    className="absolute inset-y-0 right-0 grid w-10 place-items-center text-muted-foreground hover:text-foreground"
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </div>

                {/* Strength bar */}
                <div className="mt-2 grid grid-cols-4 gap-1">
                  {Array.from({ length: 4 }).map((_, idx) => (
                    <div
                      key={idx}
                      className={`h-1.5 ${
                        idx < passwordRules.strength
                          ? strengthColors[
                              Math.max(0, passwordRules.strength - 1)
                            ]
                          : "bg-muted"
                      }`}
                    />
                  ))}
                </div>

                {/* Requirements text */}
                <p className="text-xs text-muted-foreground mt-2">
                  Your password must be at least 8 characters, include upper and
                  lower case letters, a number, and a symbol, and can’t begin or
                  end with a space.
                </p>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="password-confirm">Confirm password</Label>
                <div className="relative">
                  <Input
                    id="password-confirm"
                    type={showConfirm ? "text" : "password"}
                    value={confirm}
                    onChange={(e) => setConfirm(e.target.value)}
                    placeholder=""
                    className={`pr-10 ${
                      passwordsMismatch
                        ? "border-red-500 bg-red-50 text-red-900 placeholder:text-red-700 focus-visible:ring-0 focus-visible:ring-transparent"
                        : ""
                    }`}
                  />
                  <button
                    type="button"
                    aria-label={showConfirm ? "Hide password" : "Show password"}
                    onClick={() => setShowConfirm((s) => !s)}
                    className="absolute inset-y-0 right-0 grid w-10 place-items-center text-muted-foreground hover:text-foreground"
                  >
                    {showConfirm ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </div>
                {passwordsMismatch && (
                  <div className="flex items-start gap-2 text-xs text-red-700">
                    <AlertCircle className="h-4 w-4 mt-0.5" />
                    <p>
                      Password confirmation does not match. Re-enter your
                      password.
                    </p>
                  </div>
                )}
              </div>

              <Button className="w-full">Reset password</Button>

              {/* <Button variant="outline" className="w-full gap-2">
                <KeyRound className="h-4 w-4" /> Sign in with passkey
              </Button> */}
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
