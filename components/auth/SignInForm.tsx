"use client";

import { signInAction } from "@/actions/auth-actions";
import { AuthForm } from "./AuthForm";

const signInFields = [
  {
    name: "emailOrUsername",
    label: "Email or Username",
    type: "text",
    placeholder: "Enter your email or username",
  },
  {
    name: "password",
    label: "Password",
    type: "password",
    placeholder: "Enter your password",
  },
];

export default function SignInForm() {
  return <AuthForm fields={signInFields} action={signInAction} submitLabel="Sign In" />;
}
