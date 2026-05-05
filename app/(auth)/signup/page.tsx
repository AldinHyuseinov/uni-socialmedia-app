import AuthPage from "@/components/auth/AuthPage";
import SignUpForm from "@/components/auth/SignUpForm";
import { auth } from "@/lib/auth";
import { Metadata } from "next";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Stud SU | Регистрация",
};

export default async function SignUp() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (session) {
    redirect("/");
  }

  return (
    <AuthPage title="Регистрирай се!">
      <SignUpForm />
    </AuthPage>
  );
}
