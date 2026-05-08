import CreateMaterialForm from "@/components/blog/CreatеBlogPostForm";
import Link from "next/link";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export default async function CreatePage() {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) {
    redirect("/signin?signin-required=true");
  }

  return (
    <main className="min-h-screen bg-brand-primary/5 pb-12 flex flex-col">
      {/* Minimal Header */}
      <header className="bg-brand-navy text-white px-6 py-4 flex justify-between items-center shadow-md sticky top-0 z-10">
        <div className="flex items-center gap-4">
          <Link
            href="/"
            className="opacity-70 hover:opacity-100 transition-opacity flex items-center gap-2 font-bold uppercase text-xs tracking-widest"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
            Назад
          </Link>
        </div>
        <div className="font-black tracking-widest uppercase text-sm text-brand-accent">
          Нова Публикация
        </div>
      </header>

      {/* Editor Canvas (The "Paper") */}
      <div className="flex-1 w-full max-w-7xl mx-auto mt-8 px-4 sm:px-6">
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8 md:p-12 min-h-[75vh]">
          <CreateMaterialForm />
        </div>
      </div>
    </main>
  );
}
