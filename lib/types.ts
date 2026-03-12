import * as z from "zod";

export type ActionState = {
  error?: string;
  fieldErrors?: Record<string, string>;
  success?: string;
  values?: Record<string, string>;
};

export const UserSignUpSchema = z.object({
  name: z
    .string("Името е задължително")
    .min(2, "Името трябва да бъде поне 2 символа")
    .max(30, "Името трябва да бъде по-малко от 30 символа"),
  email: z.email("Невалиден имейл адрес"),
  password: z
    .string("Паролата е задължителна")
    .min(8, "Паролата трябва да бъде поне 8 символа")
    .max(20, "Паролата трябва да бъде по-малко от 20 символа")
    .refine((password) => /[A-Z]/.test(password), {
      message: "Паролата трябва да съдържа поне една главна буква",
    })
    .refine((password) => /[a-z]/.test(password), {
      message: "Паролата трябва да съдържа поне една малка буква",
    })
    .refine((password) => /[0-9]/.test(password), {
      message: "Паролата трябва да съдържа поне едно число",
    })
    .refine((password) => /[!@#$%^&*]/.test(password), {
      message: "Паролата трябва да съдържа поне един специален символ",
    }),
});

export const UserSignInSchema = z.object({
  emailOrUsername: z.string().min(1, "Имейлът или потребителското име е задължително"),
  password: z.string().min(1, "Паролата е задължителна"),
});

interface Field {
  name: string;
  label: string;
  type?: string;
  placeholder?: string;
}

export interface AuthFormProps {
  fields: Field[];
  action: (prevState: ActionState, formData: FormData) => Promise<ActionState>;
  submitLabel: string;
}

export interface FormFieldProps {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
  value?: string;
  error?: string;
}
