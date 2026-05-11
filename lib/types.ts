import { ReactNode } from "react";
import * as z from "zod";
import { EditorView } from "@tiptap/pm/view";

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
    .refine((password) => /[^A-Za-z0-9]/.test(password), {
      message: "Паролата трябва да съдържа поне един специален символ",
    }),
});

export const UserSignInSchema = z.object({
  emailOrUsername: z.string().min(1, "Имейлът или потребителското име е задължително"),
  password: z.string().min(1, "Паролата е задължителна"),
});

export const PostCreateSchema = z.object({
  title: z
    .string()
    .min(2, "Заглавието трябва да е поне 2 символа.")
    .max(50, "Заглавието не може да бъде по-дълго от 50 символа."),
  content: z.string().min(2, "Съдържанието трябва да е поне 2 символа."),
});

interface Field {
  name: string;
  label: string;
  type?: string;
  placeholder?: string;
  icon?: React.ReactNode;
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
  icon?: React.ReactNode;
}

export interface IconProps {
  className?: string;
}

export interface LoaderProps {
  size?: "sm" | "md" | "lg" | "xl";
  color?: "white" | "primary" | "navy" | "accent";
  text?: string;
  variant?: "inline" | "centered" | "fullscreen";
}

export interface RichTextEditorProps {
  content: string;
  onChange: (html: string) => void;
}

export interface PostProps {
  id: string;
  title: string;
  content: string;
  createdAt: Date;
  author: { name: string; image?: string | null };
}

export interface UploadOptions {
  files: FileList | File[];
  view: EditorView;
  coordinates?: { pos: number };
  onStart?: () => void;
  onEnd?: () => void;
}

export type AlertBannerProps = {
  type?: "warning" | "success" | "error";
  children: ReactNode;
  onClose?: () => void;
  isToast?: boolean;
};
