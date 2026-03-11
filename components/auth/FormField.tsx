import { FormFieldProps } from "@/lib/types";

export function FormField({
  label,
  name,
  type = "text",
  placeholder,
  value,
  error,
}: FormFieldProps) {
  return (
    <div className="mb-4">
      <label htmlFor={name} className="block text-gray-700 font-medium mb-2">
        {label}
      </label>
      {error && <p className="text-red-500 text-sm mb-1">{error}</p>}
      <input
        type={type}
        id={name}
        name={name}
        defaultValue={value || ""}
        className="border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder={placeholder}
      />
    </div>
  );
}
