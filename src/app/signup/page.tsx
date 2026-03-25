"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { supabase } from "@/app/lib/supabase";

export default function SignupPage() {
  const router = useRouter();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignup = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      setLoading(true);

      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName,
          },
        },
      });

      if (error) {
        throw error;
      }

      const user = data.user;

      if (!user) {
        throw new Error("User was created, but no user ID was returned.");
      }

      const { error: profileError } = await supabase.from("profiles").upsert(
        [
          {
            id: user.id,
            email,
            full_name: fullName,
            points: 0,
            tier: "New Member",
          },
        ],
        { onConflict: "id" }
      );

      if (profileError) {
        throw profileError;
      }

      alert("Signup successful! You can now log in.");
      router.push("/login");
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Signup failed.";
      alert(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-6">
      <div className="w-full max-w-md rounded-[2rem] border border-white/10 bg-card p-8 text-white shadow-xl">
        <h1 className="text-4xl font-bold mb-2">Create Account</h1>
        <p className="text-white/70 mb-6">Join Wink At Riah rewards.</p>

        <form onSubmit={handleSignup} className="space-y-4">
          <div>
            <label className="block text-sm mb-2">Full Name</label>
            <input
              type="text"
              className="w-full rounded-xl bg-white/5 border border-white/10 px-4 py-3 text-white outline-none"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-sm mb-2">Email</label>
            <input
              type="email"
              className="w-full rounded-xl bg-white/5 border border-white/10 px-4 py-3 text-white outline-none"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-sm mb-2">Password</label>
            <input
              type="password"
              className="w-full rounded-xl bg-white/5 border border-white/10 px-4 py-3 text-white outline-none"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={6}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-pink-500 px-4 py-3 font-semibold text-white disabled:opacity-60"
          >
            {loading ? "Creating account..." : "Sign Up"}
          </button>
        </form>

        <p className="mt-6 text-sm text-white/70">
          Already have an account?{" "}
          <Link href="/login" className="text-pink-400">
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
}