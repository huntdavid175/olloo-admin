"use server";

import { createClient } from "@/utils/supabase/server";

export type SignupPayload = {
  email: string;
  password: string;
  first_name?: string;
  last_name?: string;
  country?: string;
};

export type SignupResult =
  | { ok: true; userId: string | null }
  | { ok: false; message: string };

export async function signupAction(
  payload: SignupPayload
): Promise<SignupResult> {
  try {
    const { email, password, first_name, last_name, country } = payload;
    if (!email || !password) {
      return { ok: false, message: "Email and password are required" };
    }

    const supabase = await createClient();

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          first_name: first_name || null,
          last_name: last_name || null,
          country: country || null,
        },
      },
    });

    if (error) {
      return { ok: false, message: error.message };
    }

    return { ok: true, userId: data.user?.id ?? null };
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return { ok: false, message };
  }
}

export type SignupFormState = { message?: string } | undefined;

export async function signupWithForm(
  _prevState: SignupFormState,
  formData: FormData
): Promise<SignupFormState> {
  const email = String(formData.get("email") || "").trim();
  const password = String(formData.get("password") || "");
  const first_name =
    String(formData.get("first_name") || "").trim() || undefined;
  const last_name = String(formData.get("last_name") || "").trim() || undefined;
  const country = String(formData.get("country") || "").trim() || undefined;

  const res = await signupAction({
    email,
    password,
    first_name,
    last_name,
    country,
  });
  if (!res.ok) {
    return { message: res.message };
  }
  return undefined;
}
