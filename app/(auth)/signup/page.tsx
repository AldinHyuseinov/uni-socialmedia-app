import AuthPage from "@/components/auth/AuthPage";
import SignUpForm from "@/components/auth/SignUpForm";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export default async function SignUp() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (session) {
    redirect("/");
  }

  return (
    <AuthPage title="Sign Up">
      <SignUpForm />
    </AuthPage>
  );
}
