"use client";

import { usePathname, useSearchParams } from "next/navigation";
import AlertBanner from "./AlertBanner";

export default function Toast() {
  const searchParams = useSearchParams();
  const pathname = usePathname();

  if (pathname !== "/") return null;

  const params = [
    { key: "signup-success", msg: "Успешно създадохте вашият профил!", type: "success" },
    { key: "signin-success", msg: "Успешно влезнахте в профила!", type: "success" },
    { key: "google-success", msg: "Успешно се вписахте с вашия Google профил!", type: "success" },
    { key: "signout-success", msg: "Успешно излезнахте от профила!", type: "success" },
    { key: "publish-success", msg: "Успешно направихте блог публикация!", type: "success" },
    { key: "delete-success", msg: "Успешно изтрихте публикацията!", type: "success" },
  ] as const;

  const activeParam = params.find((p) => searchParams.get(p.key) === "true");

  if (!activeParam) return null;

  return (
    <AlertBanner key={activeParam.key} type={activeParam.type} isToast={true}>
      {activeParam.msg}
    </AlertBanner>
  );
}
