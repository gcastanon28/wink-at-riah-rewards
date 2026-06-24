"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { supabase } from "@/app/lib/supabase"

export default function ResetPasswordPage() {
  const router = useRouter()
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [message, setMessage] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const [checkingSession, setCheckingSession] = useState(true)
  const [hasRecoverySession, setHasRecoverySession] = useState(false)

  useEffect(() => {
    let mounted = true

    const checkSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession()

      if (!mounted) return
      setHasRecoverySession(Boolean(session))
      setCheckingSession(false)
    }

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === "PASSWORD_RECOVERY" || session) {
        setHasRecoverySession(true)
        setCheckingSession(false)
      }
    })

    checkSession()

    return () => {
      mounted = false
      subscription.unsubscribe()
    }
  }, [])

  const handleReset = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setError("")
    setMessage("")

    if (password.length < 6) {
      setError("Password must be at least 6 characters.")
      return
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.")
      return
    }

    try {
      setLoading(true)
      const { error } = await supabase.auth.updateUser({ password })

      if (error) throw error

      setMessage("Password updated. You can log in with your new password now.")
      setPassword("")
      setConfirmPassword("")

      setTimeout(() => {
        router.push("/login")
      }, 1200)
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Could not update password."
      setError(message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-6">
      <div className="w-full max-w-md rounded-3xl border border-border bg-card p-8 shadow-2xl">
        <h1 className="text-3xl font-headline font-bold text-white mb-3">
          Choose New Password
        </h1>
        <p className="mb-6 text-sm text-white/70">
          Enter a new password for your Wink At Riah rewards account.
        </p>

        {checkingSession ? (
          <p className="text-sm text-white/70">Checking reset link...</p>
        ) : hasRecoverySession ? (
          <form onSubmit={handleReset} className="space-y-4">
            <input
              type="password"
              name="new-password"
              autoComplete="new-password"
              placeholder="New password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className="w-full rounded-2xl bg-muted px-4 py-4 text-white outline-none"
              required
              minLength={6}
            />

            <input
              type="password"
              name="confirm-password"
              autoComplete="new-password"
              placeholder="Confirm new password"
              value={confirmPassword}
              onChange={(event) => setConfirmPassword(event.target.value)}
              className="w-full rounded-2xl bg-muted px-4 py-4 text-white outline-none"
              required
              minLength={6}
            />

            {message && <p className="text-green-400 text-sm">{message}</p>}
            {error && <p className="text-red-400 text-sm">{error}</p>}

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-2xl bg-pink-500 py-4 font-bold text-white disabled:opacity-60"
            >
              {loading ? "Updating..." : "Update Password"}
            </button>
          </form>
        ) : (
          <div className="space-y-4">
            <p className="text-sm text-red-300">
              This reset link is missing or expired. Send a new password reset
              email and open the latest link.
            </p>
            <Link
              href="/forgot-password"
              className="block w-full rounded-2xl bg-pink-500 py-4 text-center font-bold text-white"
            >
              Send New Reset Email
            </Link>
          </div>
        )}

        <p className="mt-4 text-sm">
          <Link href="/login" className="text-pink-400">
            Back to login
          </Link>
        </p>
      </div>
    </div>
  )
}
