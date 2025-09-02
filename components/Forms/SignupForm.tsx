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
import { Eye, EyeOff, ChevronDown } from "lucide-react";
import { useActionState } from "react";
import { signupWithForm } from "@/app/actions/signupAction";
import { useRouter } from "next/navigation";

export function SignupForm() {
  const [showPassword, setShowPassword] = React.useState(false);
  const [password, setPassword] = React.useState("");
  const [country, setCountry] = React.useState("GH");
  const [passwordInteracted, setPasswordInteracted] = React.useState(false);
  const router = useRouter();

  const [state, formAction, pending] = useActionState<any, FormData>(
    signupWithForm,
    undefined
  );

  const [submitted, setSubmitted] = React.useState(false);
  React.useEffect(() => {
    if (submitted && !pending && !state?.message) {
      router.push("/onboarding");
    }
  }, [submitted, pending, state, router]);

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

  const strengthColor = [
    "bg-red-500",
    "bg-orange-500",
    "bg-yellow-500",
    "bg-blue-500",
    "bg-green-600",
  ][passwordRules.strength];

  return (
    <form action={formAction} noValidate onSubmit={() => setSubmitted(true)}>
      <Card className="shadow-lg w-full h-full md:h-auto md:w-auto rounded-none md:rounded-md flex flex-col">
        <CardHeader className="space-y-6 pt-24 md:pt-6">
          <div className="flex justify-start">
            <div className="relative inline-flex items-center">
              <select
                aria-label="Country"
                name="country"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                className="appearance-none border bg-secondary text-base md:text-sm px-2 py-1 pr-8 rounded-md leading-none cursor-pointer"
              >
                <option value="GH">🇬🇭 Ghana</option>
                <option value="NG">🇳🇬 Nigeria</option>
              </select>
              <ChevronDown className="pointer-events-none absolute right-2 h-4 w-4 text-muted-foreground" />
            </div>
          </div>
          <div className="space-y-1">
            <h1 className="text-2xl font-semibold">Start your free trial</h1>
            <p className="text-sm text-muted-foreground">
              Get 3 days free, then 3 months for €1/month
            </p>
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" name="email" type="email" required />
          </div>
        </CardHeader>
        <CardContent className="space-y-6 flex-1 flex flex-col">
          <div className="space-y-2">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="first_name">First name</Label>
                <Input
                  id="first_name"
                  name="first_name"
                  autoComplete="given-name"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="last_name">Last name</Label>
                <Input
                  id="last_name"
                  name="last_name"
                  autoComplete="family-name"
                />
              </div>
            </div>
            <p className="text-xs text-muted-foreground">
              Enter your first and last name as they appear on your
              government-issued ID.
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <div className="relative">
              <Input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onFocus={() => setPasswordInteracted(true)}
                className="pr-10"
                required
              />
              <button
                type="button"
                aria-label={showPassword ? "Hide password" : "Show password"}
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
            {passwordInteracted && (
              <>
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
              </>
            )}
          </div>

          {state?.message && (
            <p className="text-xs text-red-600">{state.message}</p>
          )}

          <Button className="w-full" type="submit" disabled={pending}>
            {pending ? "Creating account…" : "Create Olloo account"}
          </Button>

          <div className="flex items-center gap-4">
            <div className="h-px flex-1 bg-border" />
            <span className="text-xs text-muted-foreground">or</span>
            <div className="h-px flex-1 bg-border" />
          </div>

          <div className="text-sm text-center">
            Already have a Olloo account?{" "}
            <Link href="/login" className="text-blue-600 hover:text-blue-700">
              Log in →
            </Link>
          </div>

          <div className="mt-auto" />

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
    </form>
  );
}
