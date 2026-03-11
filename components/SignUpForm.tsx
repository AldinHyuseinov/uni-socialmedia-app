"use client";

import { signUpAction } from "@/actions/auth-actions";
import { AuthForm } from "./auth/AuthForm";

const signUpFields = [
  {
    name: "name",
    label: "Name",
    type: "text",
    placeholder: "Enter your name",
  },
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

export default function SignUpForm() {
  return <AuthForm fields={signUpFields} action={signUpAction} submitLabel="Sign Up" />;
}
