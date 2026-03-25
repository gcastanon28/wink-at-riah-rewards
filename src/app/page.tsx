
"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useUser } from "@/firebase"

export default function HomePage() {
  const router = useRouter()
  const { user, loading } = useUser()

  useEffect(() => {
    if (loading) return

    if (user) {
      router.push("/dashboard")
    } else {
      router.push("/login")
    }
  }, [user, loading, router])

  return (
    <div className="min-h-screen flex items-center justify-center bg-background text-white">
      <div className="flex flex-col items-center gap-4">
        <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
        <p className="text-muted-foreground animate-pulse">Entering the glow up...</p>
      </div>
    </div>
  )
}
