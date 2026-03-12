"use server";

import { validatedAction } from "@/lib/action-helpers";
import { auth } from "@/lib/auth";
import { UserSignUpSchema, UserSignInSchema } from "@/lib/types";
import { isAPIError } from "better-auth/api";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import z from "zod";

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
  const { emailOrUsername, password } = data;

  try {
    const isEmail = z.email().safeParse(emailOrUsername);

    if (isEmail.success) {
      await auth.api.signInEmail({
        body: {
          email: emailOrUsername,
          password,
        },
      });
    } else {
      await auth.api.signInUsername({
        body: {
          username: emailOrUsername,
          password,
        },
      });
    }
  } catch (error) {
    console.log(error);
    if (isAPIError(error)) {
      return { error: "Невалидни данни" };
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
