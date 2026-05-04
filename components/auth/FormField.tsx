import { FormFieldProps } from "@/lib/types";
import AlertBanner from "../notification/AlertBanner";

export function FormField({
  label,
  name,
  type = "text",
  placeholder,
  value,
  error,
  icon,
}: FormFieldProps) {
  return (
    <div className="mb-4 relative">
      <label htmlFor={name} className="sr-only">
        {label}
      </label>

      {error && (
        <div className="mb-1.5">
          <AlertBanner type="warning">{error}</AlertBanner>
        </div>
      )}

      <div className="relative">
        {icon && (
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-blue-200/60">
            {icon}
          </div>
        )}

        <input
          type={type}
          id={name}
          name={name}
          defaultValue={value || ""}
          className={`w-full bg-brand-navy text-white placeholder-white/70 rounded-xl py-3.5 ${icon ? "pl-12" : "pl-4"} pr-4 focus:outline-none focus:ring-2 ${error ? "focus:ring-brand-error ring-1 ring-brand-error/50" : "focus:ring-brand-accent/50"} font-bold uppercase tracking-wide transition-all`}
          placeholder={placeholder}
        />
      </div>
    </div>
  );
}
