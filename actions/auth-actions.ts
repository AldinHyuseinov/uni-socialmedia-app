"use server";

import { validatedAction } from "@/lib/action-helpers";
import { auth } from "@/lib/auth";
import { UserSignUpSchema, UserSignInSchema } from "@/lib/types";
import { isAPIError } from "better-auth/api";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { z } from "zod";

export const signUpAction = validatedAction(UserSignUpSchema, async (data) => {
  const { email, password, name } = data;

  const generatedUsername = email.split("@")[0] + "_" + Math.floor(Math.random() * 100000);

  try {
    await auth.api.signUpEmail({
      headers: await headers(),
      body: {
        email,
        password,
        name,
        username: generatedUsername,
      },
    });
  } catch (error) {
    if (isAPIError(error)) {
      return { error: "Имейлът вече е регистриран" };
    }
    return { error: "Възникна грешка по време на регистрацията" };
  }
  redirect("/?signup-success=true");
});

export const signInAction = validatedAction(UserSignInSchema, async (data) => {
  const { emailOrUsername, password } = data;

  try {
    const isEmail = z.email().safeParse(emailOrUsername);

    if (isEmail.success) {
      await auth.api.signInEmail({
        headers: await headers(),
        body: {
          email: emailOrUsername,
          password,
        },
      });
    } else {
      await auth.api.signInUsername({
        headers: await headers(),
        body: {
          username: emailOrUsername,
          password,
        },
      });
    }
  } catch (error) {
    if (isAPIError(error)) {
      return { error: "Невалидни данни за вход" };
    }
    return { error: "Възникна грешка по време на входа" };
  }
  redirect("/?signin-success=true");
});

export async function signOutAction() {
  await auth.api.signOut({
    headers: await headers(),
  });
  redirect("/?signout-success=true");
}
