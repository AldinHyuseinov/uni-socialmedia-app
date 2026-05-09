"use client";

import { useEffect, useState } from "react";
import { AlertBannerProps } from "@/lib/types";
import { CrossIcon, WarningIcon, CheckIcon } from "@/components/Icons";

export default function AlertBanner({
  type = "warning",
  children,
  onClose,
  isToast,
}: AlertBannerProps) {
  const [isExiting, setIsExiting] = useState(false);
  const [isRendered, setIsRendered] = useState(true);

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
      Icon: WarningIcon,
    },
    success: {
      container: "bg-emerald-950/40 border-emerald-400/30",
      iconBg: "bg-emerald-400 text-brand-navy",
      text: "text-emerald-400",
      Icon: CheckIcon,
    },
  }[type];

  // Logic to handle exit animation then unmount
  const handleDismiss = () => {
    setIsExiting(true);
    setTimeout(() => {
      setIsRendered(false);
      onClose?.();
    }, 400);
  };

  useEffect(() => {
    if (!isToast || !isRendered) return;

    const exitTimer = setTimeout(() => setIsExiting(true), 4100);
    const unmountTimer = setTimeout(() => setIsRendered(false), 4500);

    return () => {
      clearTimeout(exitTimer);
      clearTimeout(unmountTimer);
    };
  }, [isToast, isRendered]);

  if (!isRendered) return null;

  const { Icon } = config;
  const layoutClasses = isToast
    ? "fixed top-16 left-1/2 -translate-x-1/2 z-50 shadow-2xl w-full max-w-sm"
    : "shadow-sm";
  const animationClass = isToast ? (isExiting ? "animate-toast-out" : "animate-toast-in") : "";

  return (
    <div
      className={`border rounded-xl p-3 flex items-center gap-3 transition-all ${layoutClasses} ${config.container} ${animationClass}`}
    >
      <div className={`rounded-full p-0.5 shrink-0 ${config.iconBg}`}>
        <Icon />
      </div>
      <div
        className={`flex-1 font-black uppercase text-xs tracking-widest leading-relaxed ${config.text}`}
      >
        {children}
      </div>
      {onClose && (
        <button
          onClick={handleDismiss}
          className={`shrink-0 p-1 rounded-md opacity-60 hover:opacity-100 hover:bg-black/10 transition-all cursor-pointer ${config.text}`}
          type="button"
          title="Затвори"
        >
          <CrossIcon className="w-4 h-4" />
        </button>
      )}
    </div>
  );
}
