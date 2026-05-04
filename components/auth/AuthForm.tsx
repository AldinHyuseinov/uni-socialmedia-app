"use client";

import { FormField } from "./FormField";
import { ActionState, AuthFormProps } from "@/lib/types";
import { useActionState } from "react";
import { GoogleSignInButton } from "./GoogleSignInButton";
import AlertBanner from "../notification/AlertBanner";

export function AuthForm({ fields, action, submitLabel }: AuthFormProps) {
  const [state, formAction, pending] = useActionState<ActionState, FormData>(action, {});

  return (
    <div className="w-full space-y-4">
      {pending ? (
        <p className="text-white font-bold text-center mb-4">Моля, изчакайте...</p>
      ) : (
        <form action={formAction} className="space-y-4">
          {state.error && <AlertBanner type="error">{state.error}</AlertBanner>}

          {fields.map((field) => (
            <FormField
              key={field.name}
              name={field.name}
              label={field.label}
              type={field.type}
              placeholder={field.placeholder}
              value={state.values?.[field.name] as string}
              error={state.fieldErrors?.[field.name]}
              icon={field.icon}
            />
          ))}

          {/* Submit Button */}
          <button type="submit" className="btn w-full">
            {submitLabel}
          </button>

          <GoogleSignInButton />
        </form>
      )}
    </div>
  );
}
