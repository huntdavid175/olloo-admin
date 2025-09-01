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
import { Eye, EyeOff, KeyRound, Apple, Facebook, Chrome } from "lucide-react";
import { Logo } from "@/components/Brand/Logo";

export default function LoginPage() {
  const [showPassword, setShowPassword] = React.useState(false);
  const [password, setPassword] = React.useState("");

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
                <h1 className="text-2xl font-semibold">Log in</h1>
                <p className="text-sm text-muted-foreground">
                  Continue to Olloo
                </p>
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <div className="flex items-center gap-2">
                  <Input
                    id="email"
                    type="email"
                    defaultValue="lidiya@refero.design"
                    className="flex-1"
                  />
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
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
              </div>

              <div className="flex items-center justify-between">
                <Link
                  href="#"
                  className="text-sm text-blue-600 hover:text-blue-700 underline-offset-4 hover:underline"
                >
                  Forgot password?
                </Link>
              </div>

              <Button className="w-full">Log in</Button>

              <div className="flex items-center gap-4">
                <div className="h-px flex-1 bg-border" />
                <span className="text-xs text-muted-foreground">or</span>
                <div className="h-px flex-1 bg-border" />
              </div>

              <div className="grid grid-cols-3 gap-3">
                <Button
                  variant="secondary"
                  className="h-12 w-full justify-center"
                >
                  <Apple className="h-5 w-5" />
                </Button>
                <Button
                  variant="secondary"
                  className="h-12 w-full justify-center"
                >
                  <Facebook className="h-5 w-5" />
                </Button>
                <Button
                  variant="secondary"
                  className="h-12 w-full justify-center"
                >
                  <Chrome className="h-5 w-5" />
                </Button>
              </div>

              <div className="pt-2 text-sm">
                <span className="text-muted-foreground">New to Olloo?</span>{" "}
                <Link
                  href="/signup"
                  className="font-medium hover:underline underline-offset-4 text-blue-600 hover:text-blue-700"
                >
                  Get started →
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
