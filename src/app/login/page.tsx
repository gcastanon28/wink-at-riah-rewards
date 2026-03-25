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

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    setLoading(false);

    if (error) {
      alert(error.message);
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
              className="w-full rounded-xl bg-white/5 border border-white/10 px-4 py-3 text-white"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-sm mb-2">Password</label>
            <input
              type="password"
              className="w-full rounded-xl bg-white/5 border border-white/10 px-4 py-3 text-white"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-pink-500 px-4 py-3 font-semibold text-white"
          >
            {loading ? "Logging in..." : "Log In"}
          </button>
        </form>

        <p className="mt-6 text-sm text-white/70">
          Don’t have an account?{" "}
          <Link href="/signup" className="text-pink-400">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}