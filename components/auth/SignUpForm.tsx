"use client";

import { signUpAction } from "@/actions/auth-actions";
import { AuthForm } from "./AuthForm";
import { LockIcon, MailIcon, UserIcon } from "../Icons";

const signUpFields = [
  {
    name: "name",
    label: "Name", // Kept for accessibility
    type: "text",
    placeholder: "ИМЕ",
    icon: <UserIcon />,
  },
  {
    name: "email",
    label: "Email",
    type: "email",
    placeholder: "Е-ПОЩА",
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

export default function SignUpForm() {
  return <AuthForm fields={signUpFields} action={signUpAction} submitLabel="РЕГИСТРАЦИЯ" />;
}
