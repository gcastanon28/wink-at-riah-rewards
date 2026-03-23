"use client"

import { useState } from "react"
import Link from "next/link"
import { sendPasswordResetEmail } from "firebase/auth"
import { auth } from "@/app/firebase"

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("")
  const [message, setMessage] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")
    setMessage("")

    try {
      await sendPasswordResetEmail(auth, email)
      setMessage("Password reset email sent.")
    } catch (error: any) {
      setError(error.message || "Could not send reset email")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-6">
      <div className="w-full max-w-md rounded-3xl border border-border bg-card p-8 shadow-2xl">
        <h1 className="text-3xl font-headline font-bold text-white mb-6">
          Reset Password
        </h1>

        <form onSubmit={handleReset} className="space-y-4">
          <input
            type="email"
            placeholder="Your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-2xl bg-muted px-4 py-4 text-white outline-none"
            required
          />

          {message && <p className="text-green-400 text-sm">{message}</p>}
          {error && <p className="text-red-400 text-sm">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-2xl bg-pink-500 py-4 font-bold text-white"
          >
            {loading ? "Sending..." : "Send Reset Email"}
          </button>
        </form>

        <p className="mt-4 text-sm">
          <Link href="/login" className="text-pink-400">
            Back to login
          </Link>
        </p>
      </div>
    </div>
  )
}