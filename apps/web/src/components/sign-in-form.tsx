"use client";

import { useAuthActions } from "@convex-dev/auth/react";
import { FormEvent, useState } from "react";

export function SignInForm() {
  const { signIn } = useAuthActions();
  const [flow, setFlow] = useState<"signIn" | "signUp">("signIn");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setSubmitting(true);

    const formData = new FormData(event.currentTarget);
    formData.set("flow", flow);

    try {
      await signIn("password", formData);
    } catch {
      setError(
        flow === "signIn"
          ? "Could not sign in. Check your email and password."
          : "Could not sign up. Try a different email or a longer password.",
      );
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="mx-auto flex w-full max-w-sm flex-col gap-6 rounded-xl border border-zinc-200 bg-white p-6 shadow-sm">
      <div>
        <h1 className="text-lg font-semibold">
          {flow === "signIn" ? "Sign in" : "Create an account"}
        </h1>
        <p className="mt-1 text-sm text-zinc-500">
          Your personal calendar, synced everywhere.
        </p>
      </div>

      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <label className="flex flex-col gap-1 text-sm font-medium text-zinc-700">
          Email
          <input
            className="rounded-md border border-zinc-300 px-3 py-2 text-sm focus:border-zinc-500 focus:outline-none"
            type="email"
            name="email"
            autoComplete="email"
            required
          />
        </label>

        <label className="flex flex-col gap-1 text-sm font-medium text-zinc-700">
          Password
          <input
            className="rounded-md border border-zinc-300 px-3 py-2 text-sm focus:border-zinc-500 focus:outline-none"
            type="password"
            name="password"
            autoComplete={
              flow === "signIn" ? "current-password" : "new-password"
            }
            minLength={8}
            required
          />
        </label>

        {error && <p className="text-sm text-red-600">{error}</p>}

        <button
          type="submit"
          disabled={submitting}
          className="rounded-md bg-zinc-900 px-3 py-2 text-sm font-medium text-white disabled:opacity-50"
        >
          {flow === "signIn" ? "Sign in" : "Sign up"}
        </button>
      </form>

      <button
        type="button"
        className="text-sm text-zinc-500 underline underline-offset-2"
        onClick={() => {
          setError(null);
          setFlow(flow === "signIn" ? "signUp" : "signIn");
        }}
      >
        {flow === "signIn"
          ? "Need an account? Sign up"
          : "Already have an account? Sign in"}
      </button>
    </div>
  );
}
