"use client";

import { useActionState, useState } from "react";
import { useFormStatus } from "react-dom";

import {
  loginWithEmailAction,
  signupWithEmailAction,
  type AuthActionState,
} from "@/actions/auth";
import { Alert } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const initialState: AuthActionState = {};

function SubmitButton({ isSignup }: { isSignup: boolean }) {
  const { pending } = useFormStatus();

  return (
    <Button className="w-full" disabled={pending} type="submit">
      {pending ? (
        <span className="flex items-center gap-2">
          <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
          Memproses...
        </span>
      ) : isSignup ? (
        "Daftar Akun Baru"
      ) : (
        "Masuk"
      )}
    </Button>
  );
}

export function EmailPasswordForm({ next = "/dashboard" }: { next?: string }) {
  const [isSignup, setIsSignup] = useState(false);
  const [loginState, loginAction] = useActionState(
    loginWithEmailAction,
    initialState,
  );
  const [signupState, signupAction] = useActionState(
    signupWithEmailAction,
    initialState,
  );
  const state = isSignup ? signupState : loginState;
  const action = isSignup ? signupAction : loginAction;

  return (
    <div className="space-y-5">
      {state.error ? (
        <Alert className="border-red-200 bg-red-50 text-red-700">
          {state.error}
        </Alert>
      ) : null}
      {state.success ? (
        <Alert className="border-emerald-200 bg-emerald-50 text-emerald-700">
          {state.success}
        </Alert>
      ) : null}

      <form action={action} className="space-y-4">
        <input name="next" type="hidden" value={next} />
        {isSignup ? (
          <div className="space-y-2">
            <Label htmlFor="fullName">Nama Lengkap</Label>
            <Input
              autoComplete="name"
              id="fullName"
              name="fullName"
              placeholder="Budi Santoso"
              required
            />
          </div>
        ) : null}
        <div className="space-y-2">
          <Label htmlFor="identifier">
            Email atau NIM (Nomor Induk Mahasiswa)
          </Label>
          <Input
            autoComplete="username"
            id="identifier"
            name="identifier"
            placeholder="budi@gmail.com atau 202401001"
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <Input
            autoComplete={isSignup ? "new-password" : "current-password"}
            id="password"
            minLength={8}
            name="password"
            placeholder="Minimal 8 karakter"
            required
            type="password"
          />
        </div>
        <SubmitButton isSignup={isSignup} />
      </form>

      <button
        className="w-full text-sm text-muted-foreground underline-offset-4 hover:underline"
        onClick={() => setIsSignup((current) => !current)}
        type="button"
      >
        {isSignup
          ? "Sudah punya akun? Masuk"
          : "Belum punya akun? Daftar Akun Baru"}
      </button>
    </div>
  );
}
