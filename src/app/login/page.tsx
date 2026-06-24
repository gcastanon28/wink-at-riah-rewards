"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { supabase } from "@/app/lib/supabase";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [resending, setResending] = useState(false);
  const [message, setMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [showResendConfirmation, setShowResendConfirmation] = useState(false);

  const confirmationRedirectTo =
    typeof window !== "undefined" ? `${window.location.origin}/login` : undefined;

  const resendConfirmation = async () => {
    if (!email) {
      setErrorMessage("Enter your email first.");
      return;
    }

    try {
      setResending(true);
      setErrorMessage("");
      setMessage("");

      const { error } = await supabase.auth.resend({
        type: "signup",
        email,
        options: {
          emailRedirectTo: confirmationRedirectTo,
        },
      });

      if (error) {
        throw error;
      }

      setMessage("Confirmation email resent. Check your inbox and spam folder.");
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "Could not resend confirmation email.";
      setErrorMessage(message);
    } finally {
      setResending(false);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    setErrorMessage("");
    setShowResendConfirmation(false);

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    setLoading(false);

    if (error) {
      setErrorMessage(error.message);
      setShowResendConfirmation(
        error.message.toLowerCase().includes("email not confirmed")
      );
      return;
    }

    router.push("/dashboard");
    router.refresh();
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-6">
      <div className="w-full max-w-md rounded-[2rem] border border-white/10 bg-card p-8 text-white shadow-xl">
        <h1 className="text-4xl font-bold mb-2">Welcome Back</h1>
        <p className="text-white/70 mb-6">Log in to your Wink At Riah rewards account.</p>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-sm mb-2">Email</label>
            <input
              type="email"
              name="email"
              autoComplete="email"
              inputMode="email"
              className="w-full rounded-xl bg-white/5 border border-white/10 px-4 py-3 text-white"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <div className="mb-2 flex items-center justify-between gap-4">
              <label className="block text-sm">Password</label>
              <Link href="/forgot-password" className="text-xs text-pink-300 hover:text-pink-200">
                Forgot password?
              </Link>
            </div>
            <input
              type="password"
              name="current-password"
              autoComplete="current-password"
              className="w-full rounded-xl bg-white/5 border border-white/10 px-4 py-3 text-white"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {message && <p className="text-sm text-green-400">{message}</p>}
          {errorMessage && <p className="text-sm text-red-400">{errorMessage}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-pink-500 px-4 py-3 font-semibold text-white disabled:opacity-60"
          >
            {loading ? "Logging in..." : "Log In"}
          </button>

          {showResendConfirmation && (
            <button
              type="button"
              onClick={resendConfirmation}
              disabled={resending || !email}
              className="w-full rounded-xl border border-pink-400/50 px-4 py-3 font-semibold text-pink-200 transition hover:border-pink-300 hover:bg-pink-500/10 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {resending ? "Resending..." : "Resend Confirmation Email"}
            </button>
          )}
        </form>

        <p className="mt-6 text-sm text-white/70">
          Don’t have an account?{" "}
          <Link href="/signup" className="text-pink-400">
            Sign up
          </Link>
        </p>

        <nav className="mt-4 flex flex-wrap gap-4 text-xs text-white/50">
          <Link href="/privacy" className="hover:text-pink-400">
            Privacy
          </Link>
          <Link href="/terms" className="hover:text-pink-400">
            Terms
          </Link>
          <Link href="/support" className="hover:text-pink-400">
            Support
          </Link>
          <Link href="/contact" className="hover:text-pink-400">
            Contact
          </Link>
        </nav>
      </div>
    </div>
  );
}
