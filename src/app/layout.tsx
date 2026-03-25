
import type { Metadata } from "next"
import "./globals.css"
import { SidebarProvider } from "@/components/ui/sidebar"
import { Toaster } from "@/components/ui/toaster"
import { FirebaseClientProvider } from "@/firebase"

export const metadata: Metadata = {
  title: "Wink At Riah Rewards | Luxury Lash Loyalty",
  description: "Luxury lash loyalty app",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="font-body antialiased">
        <FirebaseClientProvider>
          <SidebarProvider>
            {children}
            <Toaster />
          </SidebarProvider>
        </FirebaseClientProvider>
      </body>
    </html>
  )
}
