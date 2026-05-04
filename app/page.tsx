import Toast from "@/components/notification/Toast";
import { Suspense } from "react";

export default function Home() {
  return (
    <main className="w-full flex flex-col items-center mt-2">
      <Suspense fallback={null}>
        <Toast />
      </Suspense>

      <section className="mt-50">
        <p>Why are you here?</p>
      </section>
    </main>
  );
}
