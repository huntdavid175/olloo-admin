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
import { Eye, EyeOff, ChevronDown } from "lucide-react";
import { Logo } from "@/components/Brand/Logo";

export default function LoginPage() {
  const [showPassword, setShowPassword] = React.useState(false);
  const [password, setPassword] = React.useState("");
  const [country, setCountry] = React.useState("GH");

  const passwordRules = React.useMemo(() => {
    const hasMinLength = password.length >= 8;
    const hasUpper = /[A-Z]/.test(password);
    const hasLower = /[a-z]/.test(password);
    const hasNumber = /\d/.test(password);
    const hasSymbol = /[^A-Za-z0-9\s]/.test(password);
    const categoriesMet = [hasUpper, hasLower, hasNumber, hasSymbol].filter(
      Boolean
    ).length;
    const strength = hasMinLength ? Math.min(4, categoriesMet) : 0; // 0-4
    return { strength } as const;
  }, [password]);

  const strengthPct = (passwordRules.strength / 4) * 100;
  const strengthLabel = ["very weak", "weak", "fair", "good", "strong"][
    passwordRules.strength
  ];
  const strengthColor = [
    "bg-red-500",
    "bg-orange-500",
    "bg-yellow-500",
    "bg-blue-500",
    "bg-green-600",
  ][passwordRules.strength];

  const selectedLabel = country === "GH" ? "🇬🇭 Ghana" : "🇳🇬 Nigeria";

  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      <video
        className="absolute inset-0 h-full w-full object-cover"
        autoPlay
        loop
        muted
        playsInline
        poster="https://cdn.shopify.com/static/images/identity/merchant-moving-bg.webp"
      >
        <source
          src="https://cdn.shopify.com/static/videos/identity/merchant-moving-bg.mp4"
          type="video/mp4"
        />
      </video>
      <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(0,0,0,1)_0%,rgba(0,0,0,1)_50%,rgba(0,0,0,.65)_80%,rgba(0,0,0,.25)_100%)]" />
      <svg
        className="pointer-events-none absolute inset-0 opacity-45 mix-blend-overlay"
        aria-hidden="true"
      >
        <filter id="noise">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="1.6"
            numOctaves="6"
            stitchTiles="stitch"
          />
        </filter>
        <rect width="100%" height="100%" filter="url(#noise)" />
      </svg>
      <div className="absolute left-4 top-4 z-10 flex items-center gap-2 text-white">
        <Logo size={20} />
        <span className="text-sm font-semibold">olloo</span>
      </div>
      <div className="relative z-10 flex min-h-screen items-stretch justify-stretch px-0 md:px-4 md:items-center md:justify-center">
        <div className="w-full max-w-md space-y-6">
          <Card className="shadow-lg w-full h-full md:h-auto md:w-auto rounded-none md:rounded-md">
            <CardHeader className="space-y-6">
              <div className="flex justify-start">
                <div className="relative inline-flex items-center">
                  <select
                    aria-label="Country"
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    className="appearance-none border bg-secondary text-sm px-2 py-1 pr-8 rounded-md leading-none cursor-pointer"
                  >
                    <option value="GH">🇬🇭 Ghana</option>
                    <option value="NG">🇳🇬 Nigeria</option>
                  </select>
                  <ChevronDown className="pointer-events-none absolute right-2 h-4 w-4 text-muted-foreground" />
                </div>
              </div>
              <div className="space-y-1">
                <h1 className="text-2xl font-semibold">
                  Start your free trial
                </h1>
                <p className="text-sm text-muted-foreground">
                  Get 3 days free, then 3 months for €1/month
                </p>
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  defaultValue="lidiya@refero.design"
                />
                <p className="text-xs text-muted-foreground">
                  Did you mean{" "}
                  <Link href="#" className="text-blue-600 hover:text-blue-700">
                    lidiya@refero.de?
                  </Link>
                </p>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
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
                <div className="mt-2 grid grid-cols-4 gap-1">
                  {Array.from({ length: 4 }).map((_, idx) => (
                    <div
                      key={idx}
                      className={`h-1.5 ${
                        idx < passwordRules.strength
                          ? strengthColor
                          : "bg-muted"
                      }`}
                    />
                  ))}
                </div>
                <p className="text-xs text-muted-foreground mt-2">
                  Your password must be at least 8 characters, include upper and
                  lower case letters, a number, and a symbol, and can’t begin or
                  end with a space.
                </p>
              </div>

              <Button className="w-full">Create Shopify account</Button>

              <div className="flex items-center gap-4">
                <div className="h-px flex-1 bg-border" />
                <span className="text-xs text-muted-foreground">or</span>
                <div className="h-px flex-1 bg-border" />
              </div>

              <div className="text-sm text-center">
                Already have a Shopify account?{" "}
                <Link
                  href="/login"
                  className="text-blue-600 hover:text-blue-700"
                >
                  Log in →
                </Link>
              </div>

              <p className="text-[11px] leading-relaxed text-muted-foreground">
                By proceeding, you agree to the{" "}
                <Link href="#" className="underline underline-offset-2">
                  Terms and Conditions
                </Link>{" "}
                and{" "}
                <Link href="#" className="underline underline-offset-2">
                  Privacy Policy
                </Link>
              </p>
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
