"use client";

import { FormField } from "./FormField";
import { ActionState, AuthFormProps } from "@/lib/types";
import { useActionState } from "react";

export function AuthForm({ fields, action, submitLabel }: AuthFormProps) {
  const [state, formAction, pending] = useActionState<ActionState, FormData>(action, {});

  return (
    <>
      {pending ? (
        <p className="text-gray-500 text-center mb-4">Processing...</p>
      ) : (
        <form action={formAction}>
          {state.error && <p className="text-red-500 text-sm mb-4">{state.error}</p>}
          {fields.map((field) => (
            <FormField
              key={field.name}
              name={field.name}
              label={field.label}
              type={field.type}
              placeholder={field.placeholder}
              value={state.values?.[field.name] as string}
              error={state.fieldErrors?.[field.name]}
            />
          ))}

          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 mb-4 rounded-md transition-colors duration-300 shadow-sm"
          >
            {submitLabel}
          </button>
        </form>
      )}
    </>
  );
}
