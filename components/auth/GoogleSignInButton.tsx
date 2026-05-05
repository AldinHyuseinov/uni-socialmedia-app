"use client";

import { useState } from "react";
import { authClient } from "@/lib/auth-client";
import { GoogleIcon } from "../Icons";
import Loader from "../Loader";

export function GoogleSignInButton() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGoogleSignIn = async () => {
    setIsLoading(true);
    setError(null);
    try {
      await authClient.signIn.social({ provider: "google", callbackURL: "/?google-success=true" });
    } catch (err) {
      console.log(err);
      setError("Нещо се обърка. Моля, опитайте отново.");
      setIsLoading(false);
    }
  };

  return (
    <>
      {error && <p className="text-red-300 font-medium text-sm text-center">{error}</p>}
      <button
        onClick={handleGoogleSignIn}
        disabled={isLoading}
        className="w-full bg-white hover:bg-gray-200 text-gray-700 font-bold py-3.5 px-4 rounded-xl transition-colors duration-300 shadow-sm flex items-center justify-center gap-3 cursor-pointer"
      >
        <GoogleIcon />
        {isLoading ? (
          <Loader size="sm" color="primary" text="Моля изчакайте..." />
        ) : (
          "Продължи с Google"
        )}
      </button>
    </>
  );
}
