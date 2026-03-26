
"use client"

import { AppSidebar } from "@/components/app-sidebar"
import { SidebarInset } from "@/components/ui/sidebar"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { User, Mail, Phone, Bell, Shield, Save } from "lucide-react"
import { toast } from "@/hooks/use-toast"
import { useClientData } from "@/hooks/use-client-data"

export default function ProfilePage() {
  const { clientData } = useClientData();
  const handleSave = () => {
    toast({
      title: "Profile Updated",
      description: "Your changes have been saved successfully, beauty!"
    })
  }

  return (
    <div className="flex min-h-screen bg-background">
      <AppSidebar />
      <SidebarInset className="flex-1 p-6 md:p-10 lg:p-12 overflow-y-auto">
        <div className="max-w-3xl mx-auto space-y-12">
          <header>
            <div className="flex items-center gap-2 text-primary font-bold mb-2 uppercase tracking-widest text-xs">
              <User className="h-4 w-4" />
              Account Settings
            </div>
            <h1 className="text-4xl md:text-5xl font-headline font-bold">Profile Details</h1>
            <p className="text-muted-foreground mt-2">Manage your personal information and preferences.</p>
          </header>

          <div className="space-y-8">
            <Card className="border-none shadow-xl bg-card">
              <CardHeader>
                <CardTitle className="font-headline flex items-center gap-2">
                  <Shield className="h-5 w-5 text-primary" />
                  Personal Information
                </CardTitle>
                <CardDescription>This information is used for appointment reminders and tier calculations.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Full Name</Label>
                    <div className="relative">
                      <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input id="name" defaultValue={clientData.name} className="pl-10 h-11 bg-muted/20 border-border/50 rounded-xl" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Email Address</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input id="email" defaultValue={clientData.email} className="pl-10 h-11 bg-muted/20 border-border/50 rounded-xl" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone" className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Phone Number</Label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input id="phone" placeholder="(555) 000-0000" className="pl-10 h-11 bg-muted/20 border-border/50 rounded-xl" />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-none shadow-xl bg-card">
              <CardHeader>
                <CardTitle className="font-headline flex items-center gap-2">
                  <Bell className="h-5 w-5 text-primary" />
                  Communication Preferences
                </CardTitle>
                <CardDescription>Stay updated on rewards, tier changes, and special offers.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-muted/20 rounded-2xl border border-border/50">
                  <div className="space-y-0.5">
                    <p className="text-sm font-bold">Email Notifications</p>
                    <p className="text-xs text-muted-foreground">Receive beauty tips and rewards updates.</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between p-4 bg-muted/20 rounded-2xl border border-border/50">
                  <div className="space-y-0.5">
                    <p className="text-sm font-bold">SMS Appointment Reminders</p>
                    <p className="text-xs text-muted-foreground">Get a text 24 hours before your session.</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between p-4 bg-muted/20 rounded-2xl border border-border/50">
                  <div className="space-y-0.5">
                    <p className="text-sm font-bold">Marketing & Offers</p>
                    <p className="text-xs text-muted-foreground">Exclusive birthday rewards and seasonal deals.</p>
                  </div>
                  <Switch />
                </div>
              </CardContent>
            </Card>

            <div className="flex justify-end pt-4">
              <Button onClick={handleSave} size="lg" className="bg-primary hover:bg-primary/90 text-white font-bold px-12 h-14 rounded-2xl shadow-lg shadow-primary/20">
                <Save className="mr-2 h-5 w-5" />
                Save Changes
              </Button>
            </div>
          </div>
        </div>
      </SidebarInset>
    </div>
  )
}
