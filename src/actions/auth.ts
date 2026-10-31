"use server";

import { createServerClient } from "@supabase/ssr";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { z } from "zod";

import type { Database } from "@/types/database.types";

export type AuthActionState = {
  error?: string;
  success?: string;
};

const credentialsSchema = z.object({
  identifier: z.string().trim().min(3, "Email atau NIM minimal 3 karakter."),
  password: z.string().min(8, "Password minimal 8 karakter."),
});

const signupSchema = credentialsSchema.extend({
  fullName: z.string().trim().min(2, "Nama lengkap minimal 2 karakter."),
});

function getEmail(identifier: string): string {
  const normalizedIdentifier = identifier.trim();
  return normalizedIdentifier.includes("@")
    ? normalizedIdentifier
    : `${normalizedIdentifier}@student.ac.id`;
}

function getFormValue(formData: FormData, name: string): string {
  const value = formData.get(name);
  return typeof value === "string" ? value : "";
}

async function createActionClient() {
  const cookieStore = await cookies();
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey =
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ??
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseKey) {
    throw new Error(
      "Missing NEXT_PUBLIC_SUPABASE_URL and Supabase publishable key.",
    );
  }

  return createServerClient<Database>(supabaseUrl, supabaseKey, {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value, options }) => {
          cookieStore.set(name, value, options);
        });
      },
    },
  });
}

function getValidationError(
  result: { error: z.ZodError },
): AuthActionState {
  return {
    error: result.error.issues[0]?.message ?? "Data yang dikirim tidak valid.",
  };
}

function getNextPath(formData: FormData): string {
  const next = getFormValue(formData, "next");
  return next.startsWith("/") && !next.startsWith("//") ? next : "/dashboard";
}

export async function loginWithEmailAction(
  _prevState: unknown,
  formData: FormData,
): Promise<AuthActionState> {
  const result = credentialsSchema.safeParse({
    identifier: getFormValue(formData, "identifier"),
    password: getFormValue(formData, "password"),
  });

  if (!result.success) {
    return getValidationError(result);
  }

  const supabase = await createActionClient();
  const { error } = await supabase.auth.signInWithPassword({
    email: getEmail(result.data.identifier),
    password: result.data.password,
  });

  if (error) {
    return { error: "Email/NIM atau password tidak valid." };
  }

  revalidatePath("/", "layout");
  redirect(getNextPath(formData));
}

export async function signupWithEmailAction(
  _prevState: unknown,
  formData: FormData,
): Promise<AuthActionState> {
  const result = signupSchema.safeParse({
    identifier: getFormValue(formData, "identifier"),
    password: getFormValue(formData, "password"),
    fullName: getFormValue(formData, "fullName"),
  });

  if (!result.success) {
    return getValidationError(result);
  }

  const supabase = await createActionClient();
  const { data, error } = await supabase.auth.signUp({
    email: getEmail(result.data.identifier),
    password: result.data.password,
    options: {
      data: { full_name: result.data.fullName },
    },
  });

  if (error) {
    return { error: error.message };
  }

  revalidatePath("/", "layout");
  if (data.session) {
    redirect(getNextPath(formData));
  }

  return {
    success: "Akun berhasil dibuat. Silakan verifikasi email sebelum masuk.",
  };
}

export async function signOutAction(): Promise<never> {
  const supabase = await createActionClient();
  const { error } = await supabase.auth.signOut();

  if (error) {
    throw new Error(`Gagal keluar dari sesi: ${error.message}`);
  }

  revalidatePath("/", "layout");
  redirect("/login");
}
