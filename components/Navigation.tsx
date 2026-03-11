import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import Link from "next/link";
import { signOutAction } from "@/actions/auth-actions";

export default async function Navigation() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="shrink-0">
            <Link
              href="/"
              className="text-2xl font-bold text-gray-800 hover:text-blue-600 transition-colors duration-300"
            >
              Home
            </Link>
          </div>

          {session ? (
            <>
              <div className="flex items-center space-x-4">
                <span className="text-gray-800">{session.user?.name}</span>
              </div>
              <form action={signOutAction}>
                <button
                  type="submit"
                  className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg font-medium transition-colors duration-300 shadow-sm"
                >
                  Sign Out
                </button>
              </form>
            </>
          ) : (
            <div className="flex items-center space-x-4">
              <Link
                href="/signin"
                className="text-gray-600 hover:text-blue-600 font-medium transition-colors duration-300"
              >
                Sign In
              </Link>
              <Link
                href="/signup"
                className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg font-medium transition-colors duration-300 shadow-sm"
              >
                Sign Up
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
