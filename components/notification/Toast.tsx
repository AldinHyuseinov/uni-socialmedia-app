"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { useState } from "react";
import AlertBanner from "./AlertBanner";

export default function Toast() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const [isVisible, setIsVisible] = useState(true);

  const succesfullLogin = searchParams.get("signin-success") === "true";
  const succesfullRegister = searchParams.get("signup-success") === "true";
  const succesfullSignout = searchParams.get("signout-success") === "true";

  if (!isVisible || (!succesfullLogin && !succesfullRegister && !succesfullSignout)) {
    return null;
  }

  const handleClose = () => {
    setIsVisible(false);
  };

  if (pathname === "/") {
    if (succesfullRegister) {
      return (
        <AlertBanner type="success" onClose={handleClose}>
          Успешно създадохте вашият профил!
        </AlertBanner>
      );
    } else if (succesfullLogin) {
      return (
        <AlertBanner type="success" onClose={handleClose}>
          <span>Успешно влезнахте в профила!</span>
        </AlertBanner>
      );
    } else if (succesfullSignout) {
      return (
        <AlertBanner type="success" onClose={handleClose}>
          <span>Успешно излезнахте от профила!</span>
        </AlertBanner>
      );
    }
  }

  return null;
}
