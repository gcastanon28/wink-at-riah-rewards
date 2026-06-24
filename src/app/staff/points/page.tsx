"use client";

import { useEffect, useMemo, useState } from "react";
import { Search, Sparkles, UserPlus } from "lucide-react";

import {
  awardStaffPoints,
  searchStaffCustomers,
  supabase,
  type StaffAwardPointsResult,
  type StaffCustomerRow,
} from "@/app/lib/supabase";
import { AppSidebar } from "@/components/app-sidebar";
import { MobileBottomNav } from "@/components/mobile-bottom-nav";
import { Button } from "@/components/ui/button";
import { SidebarInset } from "@/components/ui/sidebar";
import { toast } from "@/hooks/use-toast";
import { useAuthGuard } from "@/hooks/use-auth-guard";
import { isStaffEmail } from "@/lib/staff";
import { cn } from "@/lib/utils";

const pointPresets = [
  { label: "Appointment", points: 10, reason: "Appointment points" },
  { label: "Fill", points: 15, reason: "Fill appointment" },
  { label: "Full Set", points: 25, reason: "Full set appointment" },
  { label: "Referral", points: 25, reason: "Referral bonus" },
  { label: "Birthday", points: 50, reason: "Birthday bonus" },
];

function displayCustomerName(customer: StaffCustomerRow) {
  return (
    customer.full_name?.trim() ||
    customer.email?.split("@")[0] ||
    "Unnamed Client"
  );
}

export default function StaffPointsPage() {
  const { checkingAuth } = useAuthGuard();
  const [staffEmail, setStaffEmail] = useState("");
  const [search, setSearch] = useState("");
  const [customers, setCustomers] = useState<StaffCustomerRow[]>([]);
  const [selectedCustomer, setSelectedCustomer] =
    useState<StaffCustomerRow | null>(null);
  const [selectedPreset, setSelectedPreset] = useState(pointPresets[0]);
  const [customPoints, setCustomPoints] = useState("");
  const [customReason, setCustomReason] = useState("");
  const [loadingCustomers, setLoadingCustomers] = useState(false);
  const [saving, setSaving] = useState(false);
  const [lastAward, setLastAward] = useState<StaffAwardPointsResult | null>(
    null
  );
  const [error, setError] = useState("");

  const isStaff = useMemo(() => isStaffEmail(staffEmail), [staffEmail]);

  useEffect(() => {
    let active = true;

    async function loadSession() {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!active) return;

      setStaffEmail(session?.user.email ?? "");
    }

    loadSession();

    return () => {
      active = false;
    };
  }, []);

  useEffect(() => {
    if (checkingAuth || !isStaff) return;

    let active = true;
    const timer = window.setTimeout(async () => {
      try {
        setLoadingCustomers(true);
        setError("");

        const results = await searchStaffCustomers(search);

        if (!active) return;

        setCustomers(results);

        setSelectedCustomer((current) =>
          current && !results.some((customer) => customer.id === current.id)
            ? null
            : current
        );
      } catch (error) {
        if (!active) return;

        const message =
          error instanceof Error ? error.message : "Could not load customers.";
        setError(message);
      } finally {
        if (active) {
          setLoadingCustomers(false);
        }
      }
    }, 250);

    return () => {
      active = false;
      window.clearTimeout(timer);
    };
  }, [checkingAuth, isStaff, search]);

  const pointsToAward =
    customPoints.trim() === ""
      ? selectedPreset.points
      : Number.parseInt(customPoints, 10);

  const reasonToUse =
    customReason.trim() === "" ? selectedPreset.reason : customReason.trim();

  async function handleAwardPoints() {
    if (!selectedCustomer) {
      setError("Select a customer first.");
      return;
    }

    if (!Number.isFinite(pointsToAward) || pointsToAward <= 0) {
      setError("Points must be greater than zero.");
      return;
    }

    try {
      setSaving(true);
      setError("");
      setLastAward(null);

      const result = await awardStaffPoints(
        selectedCustomer.id,
        pointsToAward,
        reasonToUse
      );

      setLastAward(result);
      setCustomers((current) =>
        current.map((customer) =>
          customer.id === result.user_id
            ? { ...customer, points: result.points_after }
            : customer
        )
      );
      setSelectedCustomer((current) =>
        current && current.id === result.user_id
          ? { ...current, points: result.points_after }
          : current
      );
      setCustomPoints("");
      setCustomReason("");

      toast({
        title: "Points added",
        description: `${result.points_change} points added. New balance: ${result.points_after}.`,
      });
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Could not add points.";
      setError(message);
    } finally {
      setSaving(false);
    }
  }

  if (checkingAuth || !staffEmail) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center text-muted-foreground">
        Loading staff tools...
      </div>
    );
  }

  if (!isStaff) {
    return (
      <div className="flex min-h-screen bg-background">
        <div className="hidden md:block">
          <AppSidebar />
        </div>
        <SidebarInset className="flex-1 p-6 pt-24 md:p-10">
          <section className="mx-auto max-w-2xl rounded-3xl border border-white/10 bg-card p-8 text-white shadow-xl">
            <h1 className="text-4xl font-bold">Staff Access Required</h1>
            <p className="mt-4 text-lg text-muted-foreground">
              This page is only available to the Wink At Riah owner account.
            </p>
          </section>
        </SidebarInset>
        <MobileBottomNav />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-background">
      <div className="hidden md:block">
        <AppSidebar />
      </div>

      <SidebarInset className="flex-1 overflow-y-auto p-4 pb-28 pt-24 md:p-8 md:pb-8">
        <div className="mx-auto max-w-6xl space-y-6">
          <section className="space-y-3">
            <div className="flex items-center gap-3 text-primary">
              <Sparkles className="h-6 w-6" />
              <p className="text-sm font-bold uppercase tracking-[0.25em]">
                Staff Tools
              </p>
            </div>
            <div className="grid gap-4 lg:grid-cols-[1fr_auto] lg:items-end">
              <div>
                <h1 className="text-4xl font-bold text-white md:text-5xl">
                  Add Client Points
                </h1>
                <p className="mt-3 max-w-2xl text-lg text-muted-foreground">
                  Search a client after their appointment, choose the reward
                  reason, and update their balance instantly.
                </p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-card px-5 py-4">
                <p className="text-sm text-muted-foreground">Signed in as</p>
                <p className="font-semibold text-white">{staffEmail}</p>
              </div>
            </div>
          </section>

          <section className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_420px]">
            <div className="rounded-3xl border border-white/10 bg-card p-5 shadow-xl md:p-6">
              <label className="text-sm font-semibold text-white">
                Find Customer
              </label>
              <div className="mt-3 flex items-center gap-3 rounded-2xl border border-white/10 bg-background px-4 py-3">
                <Search className="h-5 w-5 text-pink-400" />
                <input
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  placeholder="Search name, email, or phone"
                  className="w-full bg-transparent text-white outline-none placeholder:text-white/40"
                />
              </div>

              <div className="mt-5 space-y-3">
                {loadingCustomers ? (
                  <p className="text-muted-foreground">Loading customers...</p>
                ) : customers.length === 0 ? (
                  <div className="rounded-2xl border border-dashed border-white/10 p-6 text-center text-muted-foreground">
                    No customers found.
                  </div>
                ) : (
                  customers.map((customer) => {
                    const selected = selectedCustomer?.id === customer.id;

                    return (
                      <button
                        key={customer.id}
                        type="button"
                        onClick={() => setSelectedCustomer(customer)}
                        className={cn(
                          "flex w-full items-center justify-between gap-4 rounded-2xl border p-4 text-left transition",
                          selected
                            ? "border-pink-400 bg-pink-500/10"
                            : "border-white/10 bg-background hover:border-pink-400/50"
                        )}
                      >
                        <div className="min-w-0">
                          <p className="truncate text-lg font-semibold text-white">
                            {displayCustomerName(customer)}
                          </p>
                          <p className="truncate text-sm text-muted-foreground">
                            {customer.email || "No email"}
                          </p>
                          {customer.phone && (
                            <p className="truncate text-sm text-muted-foreground">
                              {customer.phone}
                            </p>
                          )}
                        </div>
                        <div className="shrink-0 text-right">
                          <p className="text-3xl font-bold text-primary">
                            {customer.points}
                          </p>
                          <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                            Points
                          </p>
                        </div>
                      </button>
                    );
                  })
                )}
              </div>
            </div>

            <div className="rounded-3xl border border-white/10 bg-card p-5 shadow-xl md:p-6">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-pink-500 text-white">
                  <UserPlus className="h-5 w-5" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-white">
                    Award Points
                  </h2>
                  <p className="text-sm text-muted-foreground">
                    {selectedCustomer
                      ? displayCustomerName(selectedCustomer)
                      : "Select a customer"}
                  </p>
                </div>
              </div>

              {selectedCustomer && (
                <div className="mt-5 rounded-2xl bg-background p-4">
                  <p className="text-sm text-muted-foreground">
                    Current Balance
                  </p>
                  <p className="text-5xl font-bold text-primary">
                    {selectedCustomer.points}
                  </p>
                </div>
              )}

              <div className="mt-5 grid grid-cols-2 gap-3">
                {pointPresets.map((preset) => (
                  <button
                    key={preset.label}
                    type="button"
                    onClick={() => setSelectedPreset(preset)}
                    className={cn(
                      "rounded-2xl border px-4 py-3 text-left transition",
                      selectedPreset.label === preset.label &&
                        customPoints.trim() === ""
                        ? "border-pink-400 bg-pink-500/15"
                        : "border-white/10 bg-background hover:border-pink-400/50"
                    )}
                  >
                    <p className="font-semibold text-white">{preset.label}</p>
                    <p className="text-sm text-primary">
                      +{preset.points} Points
                    </p>
                  </button>
                ))}
              </div>

              <div className="mt-5 space-y-4">
                <div>
                  <label className="text-sm font-semibold text-white">
                    Custom Points
                  </label>
                  <input
                    type="number"
                    min={1}
                    inputMode="numeric"
                    value={customPoints}
                    onChange={(event) => setCustomPoints(event.target.value)}
                    placeholder={`Default: ${selectedPreset.points}`}
                    className="mt-2 w-full rounded-2xl border border-white/10 bg-background px-4 py-3 text-white outline-none placeholder:text-white/40"
                  />
                </div>

                <div>
                  <label className="text-sm font-semibold text-white">
                    Reason
                  </label>
                  <input
                    value={customReason}
                    onChange={(event) => setCustomReason(event.target.value)}
                    placeholder={selectedPreset.reason}
                    className="mt-2 w-full rounded-2xl border border-white/10 bg-background px-4 py-3 text-white outline-none placeholder:text-white/40"
                  />
                </div>
              </div>

              {error && (
                <p className="mt-4 rounded-2xl border border-red-500/30 bg-red-500/10 p-3 text-sm text-red-200">
                  {error}
                </p>
              )}

              {lastAward && (
                <div className="mt-4 rounded-2xl border border-green-500/30 bg-green-500/10 p-3 text-sm text-green-200">
                  Added {lastAward.points_change} points. Balance changed from{" "}
                  {lastAward.points_before} to {lastAward.points_after}.
                </div>
              )}

              <Button
                type="button"
                disabled={saving || !selectedCustomer}
                onClick={handleAwardPoints}
                className="mt-5 h-14 w-full rounded-2xl text-lg font-bold"
              >
                {saving
                  ? "Adding Points..."
                  : `Add ${
                      Number.isFinite(pointsToAward) ? pointsToAward : 0
                    } Points`}
              </Button>
            </div>
          </section>
        </div>
      </SidebarInset>

      <MobileBottomNav />
    </div>
  );
}
