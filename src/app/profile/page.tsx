"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { AppSidebar } from "@/components/app-sidebar";
import { SidebarInset } from "@/components/ui/sidebar";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";
import {
  AlertTriangle,
  Bell,
  Camera,
  LogOut,
  Mail,
  Phone,
  Save,
  Shield,
  Trash2,
  User,
} from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { useClientData } from "@/hooks/use-client-data";
import { useAuthGuard } from "@/hooks/use-auth-guard";
import { supabase } from "@/app/lib/supabase";
import { MobileBottomNav } from "@/components/mobile-bottom-nav";

export default function ProfilePage() {
  const { clientData } = useClientData();
  const { checkingAuth } = useAuthGuard();
  const router = useRouter();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [smsReminders, setSmsReminders] = useState(true);
  const [marketingOffers, setMarketingOffers] = useState(false);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [signingOut, setSigningOut] = useState(false);
  const [deletingAccount, setDeletingAccount] = useState(false);
  const [deleteConfirmation, setDeleteConfirmation] = useState("");
  const [avatarUrl, setAvatarUrl] = useState("");

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    setFullName(clientData?.name || "");
    setEmail(clientData?.email || "");
    setAvatarUrl(clientData?.avatar_url || "");
    setPhone(clientData?.phone || "");
    setEmailNotifications(clientData?.email_notifications ?? true);
    setSmsReminders(clientData?.sms_reminders ?? true);
    setMarketingOffers(clientData?.marketing_offers ?? false);
  }, [clientData]);

  const initials = (fullName || clientData?.name || "CL")
    .split(" ")
    .filter(Boolean)
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  if (checkingAuth) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center text-muted-foreground">
        Loading profile...
      </div>
    );
  }

  const handleSave = async () => {
    if (!clientData?.id) {
      toast({
        title: "Profile not loaded",
        description: "Please refresh and try again.",
      });
      return;
    }

    try {
      setSaving(true);

      const updates = {
        full_name: fullName,
        email,
        phone,
        avatar_url: avatarUrl,
        email_notifications: emailNotifications,
        sms_reminders: smsReminders,
        marketing_offers: marketingOffers,
      };

      const { error } = await supabase
        .from("profiles")
        .update(updates)
        .eq("id", clientData.id);

      if (error) throw error;

      toast({
        title: "Profile Updated",
        description: "Your changes have been saved successfully.",
      });
    } catch (error) {
      console.error(error);
      toast({
        title: "Save failed",
        description: "Something went wrong while saving your profile.",
      });
    } finally {
      setSaving(false);
    }
  };

  const handleAvatarUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    try {
      const file = event.target.files?.[0];
      if (!file || !clientData?.id) return;

      setUploading(true);

      const fileExt = file.name.split(".").pop();
      const filePath = `${clientData.id}/avatar-${Date.now()}.${fileExt}`;

      const { error: uploadError } = await supabase.storage
        .from("avatars")
        .upload(filePath, file, {
          upsert: true,
        });

      if (uploadError) throw uploadError;

      const { data } = supabase.storage.from("avatars").getPublicUrl(filePath);
      const publicUrl = data.publicUrl;

      setAvatarUrl(publicUrl);

      const { error: updateError } = await supabase
        .from("profiles")
        .update({ avatar_url: publicUrl })
        .eq("id", clientData.id);

      if (updateError) throw updateError;

      toast({
        title: "Profile photo updated",
        description: "Your new profile picture has been uploaded.",
      });
    } catch (error) {
      console.error(error);
      toast({
        title: "Upload failed",
        description: "Could not upload profile picture.",
      });
    } finally {
      setUploading(false);
    }
  };

  const handleSignOut = async () => {
    try {
      setSigningOut(true);
      const { error } = await supabase.auth.signOut();

      if (error) throw error;

      router.replace("/login");
    } catch (error) {
      console.error(error);
      toast({
        title: "Sign out failed",
        description: "Please try again.",
        variant: "destructive",
      });
    } finally {
      setSigningOut(false);
    }
  };

  const handleDeleteAccount = async () => {
    const normalizedEmail = email.trim().toLowerCase();
    const typedEmail = deleteConfirmation.trim().toLowerCase();

    if (!normalizedEmail || typedEmail !== normalizedEmail) {
      toast({
        title: "Email confirmation required",
        description: "Type your email address exactly to delete your account.",
        variant: "destructive",
      });
      return;
    }

    const confirmed = window.confirm(
      "Delete your Wink At Riah Rewards account? This permanently removes your login, profile, points, reward history, and profile photo."
    );

    if (!confirmed) return;

    try {
      setDeletingAccount(true);

      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session?.access_token) {
        throw new Error("Your session expired. Please log in and try again.");
      }

      const response = await fetch("/api/account/delete", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${session.access_token}`,
        },
      });

      const result = (await response.json()) as { error?: string };

      if (!response.ok) {
        throw new Error(result.error || "Could not delete account.");
      }

      await supabase.auth.signOut();
      router.replace("/signup");
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "Please contact support to delete your account.";

      toast({
        title: "Account deletion failed",
        description: message,
        variant: "destructive",
      });
    } finally {
      setDeletingAccount(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-background">
      <div className="hidden md:block">
        <AppSidebar />
      </div>

      <SidebarInset className="flex-1 overflow-y-auto p-6 pt-6 md:p-10 md:pt-10 lg:p-12">
        <div className="mx-auto max-w-3xl space-y-10 pb-28 md:pb-0">
          <header>
            <div className="flex items-center gap-2 text-primary font-bold mb-2 uppercase tracking-widest text-sm">
              <User className="h-4 w-4" />
              Account Settings
            </div>
            <h1 className="text-4xl md:text-5xl font-headline font-bold">
              Profile Details
            </h1>
            <p className="text-muted-foreground mt-2">
              Manage your personal information and preferences.
            </p>
          </header>

          <div className="flex justify-center">
            <div className="relative">
              <Avatar className="h-28 w-28 border-4 border-primary/30 shadow-xl">
                <AvatarImage src={avatarUrl || ""} />
                <AvatarFallback className="bg-primary text-white text-2xl font-bold">
                  {initials}
                </AvatarFallback>
              </Avatar>

              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="absolute bottom-0 right-0 flex h-10 w-10 items-center justify-center rounded-full bg-primary text-white shadow-lg hover:opacity-90"
              >
                <Camera className="h-5 w-5" />
              </button>

              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleAvatarUpload}
              />
            </div>
          </div>

          <p className="text-center text-sm text-muted-foreground">
            {uploading
              ? "Uploading profile picture..."
              : "Tap the camera icon to upload a profile picture."}
          </p>

          <Card className="border-none shadow-xl bg-card">
            <CardHeader>
              <CardTitle className="font-headline flex items-center gap-2">
                <Shield className="h-5 w-5 text-primary" />
                Personal Information
              </CardTitle>
              <CardDescription>
                This information is used for appointment reminders and tier
                calculations.
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label
                    htmlFor="name"
                    className="text-xs font-bold uppercase tracking-widest text-muted-foreground"
                  >
                    Full Name
                  </Label>
                  <div className="relative">
                    <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="name"
                      name="name"
                      autoComplete="name"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="pl-10 h-11 bg-muted/20 border-border/50 rounded-xl"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label
                    htmlFor="email"
                    className="text-xs font-bold uppercase tracking-widest text-muted-foreground"
                  >
                    Email Address
                  </Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      inputMode="email"
                      autoComplete="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="pl-10 h-11 bg-muted/20 border-border/50 rounded-xl"
                    />
                  </div>
                </div>

                <div className="space-y-2 md:col-span-2">
                  <Label
                    htmlFor="phone"
                    className="text-xs font-bold uppercase tracking-widest text-muted-foreground"
                  >
                    Phone Number
                  </Label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="phone"
                      name="tel"
                      type="tel"
                      inputMode="tel"
                      autoComplete="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="(555) 000-0000"
                      className="pl-10 h-11 bg-muted/20 border-border/50 rounded-xl"
                    />
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
              <CardDescription>
                Stay updated on rewards, tier changes, and special offers.
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-muted/20 rounded-2xl border border-border/50">
                <div className="space-y-0.5">
                  <p className="text-sm font-bold">Email Notifications</p>
                  <p className="text-xs text-muted-foreground">
                    Receive beauty tips and rewards updates.
                  </p>
                </div>
                <Switch
                  checked={emailNotifications}
                  onCheckedChange={setEmailNotifications}
                />
              </div>

              <div className="flex items-center justify-between p-4 bg-muted/20 rounded-2xl border border-border/50">
                <div className="space-y-0.5">
                  <p className="text-sm font-bold">SMS Appointment Reminders</p>
                  <p className="text-xs text-muted-foreground">
                    Get a text 24 hours before your session.
                  </p>
                </div>
                <Switch
                  checked={smsReminders}
                  onCheckedChange={setSmsReminders}
                />
              </div>

              <div className="flex items-center justify-between p-4 bg-muted/20 rounded-2xl border border-border/50">
                <div className="space-y-0.5">
                  <p className="text-sm font-bold">Marketing & Offers</p>
                  <p className="text-xs text-muted-foreground">
                    Exclusive birthday rewards and seasonal deals.
                  </p>
                </div>
                <Switch
                  checked={marketingOffers}
                  onCheckedChange={setMarketingOffers}
                />
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-end">
            <Button
              onClick={handleSave}
              size="lg"
              disabled={saving}
              className="bg-primary hover:bg-primary/90 text-white font-bold px-12 h-14 rounded-2xl shadow-lg"
            >
              <Save className="mr-2 h-5 w-5" />
              {saving ? "Saving..." : "Save Changes"}
            </Button>
          </div>

          <Card className="border border-red-500/30 bg-red-950/20 shadow-xl">
            <CardHeader>
              <CardTitle className="font-headline flex items-center gap-2 text-red-100">
                <AlertTriangle className="h-5 w-5 text-red-300" />
                Delete Account
              </CardTitle>
              <CardDescription className="text-red-100/70">
                Permanently remove your login, profile, points, reward history,
                and profile photo. This cannot be undone.
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label
                  htmlFor="delete-confirmation"
                  className="text-xs font-bold uppercase tracking-widest text-red-100/70"
                >
                  Type your email to confirm
                </Label>
                <Input
                  id="delete-confirmation"
                  type="email"
                  inputMode="email"
                  autoComplete="off"
                  value={deleteConfirmation}
                  onChange={(event) =>
                    setDeleteConfirmation(event.target.value)
                  }
                  placeholder={email || "your@email.com"}
                  className="h-11 rounded-xl border-red-400/30 bg-red-950/20 text-white placeholder:text-red-100/40"
                />
              </div>

              <Button
                type="button"
                variant="destructive"
                onClick={handleDeleteAccount}
                disabled={
                  deletingAccount ||
                  deleteConfirmation.trim().toLowerCase() !==
                    email.trim().toLowerCase()
                }
                className="h-12 w-full rounded-2xl font-bold md:w-auto"
              >
                <Trash2 className="mr-2 h-5 w-5" />
                {deletingAccount ? "Deleting..." : "Delete My Account"}
              </Button>
            </CardContent>
          </Card>

          <div className="md:hidden rounded-3xl border border-white/10 bg-card p-5 shadow-xl">
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground">
              Account Access
            </p>
            <Button
              type="button"
              variant="outline"
              onClick={handleSignOut}
              disabled={signingOut}
              className="h-14 w-full rounded-2xl border-white/10 bg-transparent text-base font-bold text-white hover:bg-white/5 hover:text-white"
            >
              <LogOut className="mr-2 h-5 w-5 text-primary" />
              {signingOut ? "Signing out..." : "Sign out"}
            </Button>
          </div>
        </div>
        <MobileBottomNav />
      </SidebarInset>
    </div>
  );
}
