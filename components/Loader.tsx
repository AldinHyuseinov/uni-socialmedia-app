import { LoaderProps } from "@/lib/types";

export default function Loader({
  size = "md",
  color = "primary",
  text,
  variant = "inline",
}: LoaderProps) {
  // 1. Map sizes to exact pixel/rem dimensions
  const sizeMap = {
    sm: "w-4 h-4 border-2", // Fits perfectly inside buttons
    md: "w-8 h-8 border-3", // Good for small widgets/cards
    lg: "w-12 h-12 border-4", // Good for page sections
    xl: "w-16 h-16 border-[5px]", // Good for full screen loading
  };

  // 2. Map colors to your specific @theme variables
  // We use border-b-transparent to create the spinning gap
  const colorMap = {
    white: "border-white/20 border-b-white text-white",
    primary: "border-brand-primary/20 border-b-brand-primary text-brand-primary",
    navy: "border-brand-navy/20 border-b-brand-navy text-brand-navy",
    accent: "border-brand-accent/20 border-b-brand-accent text-brand-accent",
  };

  // The actual spinning circle
  const spinner = (
    <div
      className={`animate-spin rounded-full ${sizeMap[size]} ${colorMap[color].split(" ").slice(0, 2).join(" ")}`}
      role="status"
      aria-label="Loading"
    />
  );

  // The text label (if provided)
  const label = text && (
    <p
      className={`font-black uppercase tracking-widest text-xs mt-3 animate-pulse ${colorMap[color].split(" ")[2]}`}
    >
      {text}
    </p>
  );

  // 3. Render based on layout variant
  if (variant === "fullscreen") {
    return (
      <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-brand-primary/95 backdrop-blur-sm">
        {spinner}
        {label}
      </div>
    );
  }

  if (variant === "centered") {
    return (
      <div className="flex flex-col items-center justify-center w-full min-h-50 p-6">
        {spinner}
        {label}
      </div>
    );
  }

  // "inline" variant (default)
  return (
    <div className="flex items-center gap-2">
      {spinner}
      {/* For inline, we put text next to the spinner instead of below it */}
      {text && (
        <span
          className={`font-black uppercase tracking-widest text-xs ${colorMap[color].split(" ")[2]}`}
        >
          {text}
        </span>
      )}
    </div>
  );
}
