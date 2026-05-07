
"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { supabase } from "@/app/lib/supabase"

export default function HomePage() {
  const router = useRouter()

  useEffect(() => {
    let active = true

    async function redirectForSession() {
      const {
        data: { session },
      } = await supabase.auth.getSession()

      if (!active) return

      router.replace(session ? "/dashboard" : "/login")
    }

    redirectForSession()

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      router.replace(session ? "/dashboard" : "/login")
    })

    return () => {
      active = false
      subscription.unsubscribe()
    }
  }, [router])

  return (
    <div className="min-h-screen flex items-center justify-center bg-background text-white">
      <div className="flex flex-col items-center gap-4">
        <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
        <p className="text-muted-foreground animate-pulse">Entering the glow up...</p>
      </div>
    </div>
  )
}
