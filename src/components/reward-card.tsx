"use client";

import Link from "next/link";

import { Button } from "@/components/ui/button";

type RewardCardProps = {
  title: string;
  description: string;
  image: string;
  imageAlt?: string;
  buttonLabel: string;
  disabled?: boolean;
  fallbackImage?: string;
  href?: string;
  onClick?: () => void;
};

export function RewardCard({
  title,
  description,
  image,
  imageAlt,
  buttonLabel,
  disabled = false,
  fallbackImage = "/logo-full.png",
  href,
  onClick,
}: RewardCardProps) {
  return (
    <div className="rounded-3xl overflow-hidden border border-white/10 bg-card shadow-xl">
      <img
        src={image}
        alt={imageAlt || title}
        className="h-56 w-full object-cover"
        onError={(event) => {
          event.currentTarget.src = fallbackImage;
        }}
      />

      <div className="p-6 space-y-4">
        <div>
          <h3 className="text-3xl font-bold">{title}</h3>
          <p className="text-xl text-muted-foreground">{description}</p>
        </div>

        {href && !disabled ? (
          <Button
            asChild
            className="w-full h-14 rounded-2xl text-xl font-semibold"
          >
            <Link href={href}>{buttonLabel}</Link>
          </Button>
        ) : (
          <Button
            type="button"
            onClick={onClick}
            disabled={disabled}
            className="w-full h-14 rounded-2xl text-xl font-semibold"
          >
            {buttonLabel}
          </Button>
        )}
      </div>
    </div>
  );
}
