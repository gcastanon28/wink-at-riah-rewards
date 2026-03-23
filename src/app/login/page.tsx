"use client"

import { useRouter } from "next/navigation"

export default function SignupPage() {
  const router = useRouter()

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div>
        <h1>Coming Soon</h1>
        <button
          onClick={() => router.push("/dashboard")}
          className="bg-pink-500 text-white px-6 py-3 rounded-xl"
        >
          Continue to App
        </button>
      </div>
    </div>
  )
}