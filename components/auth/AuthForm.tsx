"use client";

import { FormField } from "./FormField";
import { ActionState, AuthFormProps } from "@/lib/types";
import { useActionState } from "react";
import { GoogleSignInButton } from "./GoogleSignInButton";
import AlertBanner from "../notification/AlertBanner";
import Loader from "../Loader";
import { useSearchParams } from "next/navigation";

export function AuthForm({ fields, action, submitLabel }: AuthFormProps) {
  const [state, formAction, pending] = useActionState<ActionState, FormData>(action, {});
  const searchParams = useSearchParams();
  const notAuthorized = searchParams.get("signin-required") === "true";

  return (
    <div className="w-full space-y-4">
      {pending ? (
        <Loader size="lg" color="white" variant="centered" text="Моля изчакайте..." />
      ) : (
        <form action={formAction} className="space-y-4">
          {notAuthorized && <AlertBanner>Трябва да се впишете, за да продължите</AlertBanner>}
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
