"use client";

import { useEffect, useRef, useState } from "react";
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
import { User, Mail, Phone, Bell, Shield, Save, Camera } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { useClientData } from "@/hooks/use-client-data";
import { supabase } from "@/app/lib/supabase";
import { MobileBottomNav } from "@/components/mobile-bottom-nav";

export default function ProfilePage() {
  const { clientData } = useClientData();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [smsReminders, setSmsReminders] = useState(true);
  const [marketingOffers, setMarketingOffers] = useState(false);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
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

      window.location.reload();
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

      window.location.reload();
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

  return (
    <div className="flex min-h-screen bg-background">
      <div className="hidden md:block">
        <AppSidebar />
      </div>

      <SidebarInset className="flex-1 overflow-y-auto p-6 pt-6 md:p-10 md:pt-10 lg:p-12">
        <div className="mx-auto max-w-3xl space-y-10">
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
        </div>
        <MobileBottomNav />
      </SidebarInset>
    </div>
  );
}