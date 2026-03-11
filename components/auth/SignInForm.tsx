"use client";

import { signInAction } from "@/actions/auth-actions";
import { AuthForm } from "./AuthForm";

const signInFields = [
  {
    name: "email",
    label: "Email",
    type: "email",
    placeholder: "Enter your email",
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
