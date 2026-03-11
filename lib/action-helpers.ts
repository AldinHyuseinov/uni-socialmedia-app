/* eslint-disable @typescript-eslint/no-explicit-any */
import { z } from "zod";
import { ActionState } from "./types";

type ValidatedActionFunction<S extends z.ZodType<any, any>, T> = (
  data: z.infer<S>,
  formData: FormData,
) => Promise<T>;

export function validatedAction<S extends z.ZodType<any, any>, T>(
  schema: S,
  action: ValidatedActionFunction<S, T>,
) {
  return async (prevState: ActionState, formData: FormData): Promise<T> => {
    const formDataObj = Object.fromEntries(formData);
    const result = schema.safeParse(formDataObj);

    if (!result.success) {
      const errorMessages: Record<string, string> = {};

      result.error.issues.forEach((issue) => {
        const field = String(issue.path[0]);

        if (!errorMessages[field]) {
          errorMessages[field] = issue.message;
        }
      });

      return { fieldErrors: errorMessages, values: formDataObj } as T;
    }

    return action(result.data, formData);
  };
}
