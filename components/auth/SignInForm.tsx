"use client";

import { signInAction } from "@/actions/auth-actions";
import { AuthForm } from "./AuthForm";
import { LockIcon, MailIcon } from "../Icons";

const signInFields = [
  {
    name: "emailOrUsername",
    label: "Email", // Kept for accessibility but hidden in UI
    type: "text",
    placeholder: "Е-ПОЩА ИЛИ ПОТРЕБИТЕЛСКО ИМЕ",
    icon: <MailIcon />,
  },
  {
    name: "password",
    label: "Password",
    type: "password",
    placeholder: "ПАРОЛА",
    icon: <LockIcon />,
  },
];

export default function SignInForm() {
  return <AuthForm fields={signInFields} action={signInAction} submitLabel="ПРОДЪЛЖИ" />;
}
