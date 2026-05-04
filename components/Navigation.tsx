import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import Link from "next/link";
import { signOutAction } from "@/actions/auth-actions";

export default async function Navigation() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  return (
    <nav className="bg-brand-primary border-b border-brand-accent/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="shrink-0 flex items-center">
            <Link
              href="/"
              className="flex items-center gap-2 text-2xl font-black text-white tracking-widest uppercase hover:text-blue-200 transition-colors duration-300"
            >
              {/* Simple Grad Cap SVG Icon */}
              <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 3L1 9l4 2.18v6L12 21l7-3.82v-6l2-1.09V17h2V9L12 3zm6.82 6L12 12.72 5.18 9 12 5.28 18.82 9zM17 15.99l-5 2.73-5-2.73v-3.72L12 15l5-2.73v3.72z" />
              </svg>
              STUDSU
            </Link>
          </div>

          {session ? (
            <>
              <div className="flex items-center space-x-4">
                <span className="text-white font-bold">{session.user?.name}</span>
              </div>
              <form action={signOutAction}>
                <button
                  type="submit"
                  className="bg-brand-navy hover:bg-blue-900 text-white px-6 py-2 rounded-lg font-bold uppercase tracking-wider text-sm transition-colors duration-300 shadow-sm"
                >
                  Изход
                </button>
              </form>
            </>
          ) : (
            <div className="flex items-center space-x-4">
              <Link
                href="/signup"
                className="bg-brand-navy hover:bg-brand-navy-dark text-white px-6 py-2 rounded-xl font-bold uppercase tracking-wider text-sm transition-colors duration-300 shadow-sm"
              >
                Регистрация
              </Link>

              <Link
                href="/signin"
                className="bg-brand-navy hover:bg-brand-navy-dark text-white px-6 py-2 rounded-xl font-bold uppercase tracking-wider text-sm transition-colors duration-300 shadow-sm"
              >
                Вписване
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
