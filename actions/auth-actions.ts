"use server";

import { validatedAction } from "@/lib/action-helpers";
import { auth } from "@/lib/auth";
import { UserSignUpSchema, UserSignInSchema } from "@/lib/types";
import { isAPIError } from "better-auth/api";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export const signUpAction = validatedAction(UserSignUpSchema, async (data) => {
  const { email, password, name } = data;

  try {
    await auth.api.signUpEmail({
      body: {
        email,
        password,
        name,
      },
    });
  } catch (error) {
    if (isAPIError(error)) {
      return { error: "Имейлът вече е регистриран" };
    }
    return { error: "Възникна грешка по време на регистрацията" };
  }
  redirect("/");
});

export const signInAction = validatedAction(UserSignInSchema, async (data) => {
  const { email, password } = data;

  try {
    await auth.api.signInEmail({
      body: {
        email,
        password,
      },
    });
  } catch (error) {
    if (isAPIError(error)) {
      return { error: "Невалиден имейл или парола" };
    }
    return { error: "Възникна грешка по време на входа" };
  }
  redirect("/");
});

export async function signOutAction() {
  await auth.api.signOut({
    headers: await headers(),
  });
}
