"use client";

import { AlertBannerProps } from "@/lib/types";
import { CrossIcon, WarningIcon, CheckIcon } from "@/components/Icons";

export default function AlertBanner({ type = "warning", children, onClose }: AlertBannerProps) {
  const config = {
    error: {
      container: "bg-brand-error-bg border-brand-error/30",
      iconBg: "bg-brand-error text-brand-navy",
      text: "text-brand-error",
      Icon: CrossIcon,
    },
    warning: {
      container: "bg-amber-950/40 border-amber-400/30",
      iconBg: "bg-amber-400 text-brand-navy",
      text: "text-amber-400",
      Icon: WarningIcon, // Uses the ! warning icon
    },
    success: {
      container: "bg-emerald-950/40 border-emerald-400/30",
      iconBg: "bg-emerald-400 text-brand-navy",
      text: "text-emerald-400",
      Icon: CheckIcon, // Uses the checkmark icon
    },
  }[type];

  // Destructure the chosen Icon component
  const { Icon } = config;

  return (
    <div
      className={`border rounded-xl p-3 flex items-center gap-3 animate-in fade-in zoom-in-95 duration-300 shadow-sm ${config.container}`}
    >
      {/* Icon Pill */}
      <div className={`rounded-full p-0.5 shrink-0 ${config.iconBg}`}>
        <Icon />
      </div>

      {/* Content */}
      <div
        className={`flex-1 font-black uppercase text-xs tracking-widest leading-relaxed ${config.text}`}
      >
        {children}
      </div>

      {/* Close Button */}
      {onClose && (
        <button
          onClick={onClose}
          className={`shrink-0 p-1 rounded-md opacity-60 hover:opacity-100 hover:bg-black/10 transition-all cursor-pointer ${config.text}`}
          title="Затвори"
          type="button"
        >
          <CrossIcon className="w-4 h-4" />
        </button>
      )}
    </div>
  );
}
