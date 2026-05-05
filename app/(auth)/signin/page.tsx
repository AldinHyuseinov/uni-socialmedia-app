import AuthPage from "@/components/auth/AuthPage";
import SignInForm from "@/components/auth/SignInForm";
import { auth } from "@/lib/auth";
import { Metadata } from "next";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Stud SU | Вписване",
};

export default async function SignIn() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (session) {
    redirect("/");
  }

  return (
    <AuthPage title="Впиши се!">
      <SignInForm />
    </AuthPage>
  );
}
