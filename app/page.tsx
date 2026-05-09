import { getPosts } from "@/actions/blog-actions";
import PostCard from "@/components/blog/PostCard";
import Link from "next/link";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { Suspense } from "react";
import Toast from "@/components/notification/Toast";
import Loader from "@/components/Loader";

export default async function MainFeedPage() {
  const [session, posts] = await Promise.all([
    auth.api.getSession({ headers: await headers() }),
    getPosts(),
  ]);

  return (
    <Suspense
      fallback={
        <Loader size="xl" color="white" variant="fullscreen" text="Зареждане на публикациите..." />
      }
    >
      <main className="min-h-screen bg-brand-primary flex flex-col">
        <Toast />

        <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 flex flex-col lg:flex-row gap-8">
          {/* LEFT SIDEBAR: Navigation & Actions */}
          <aside className="w-full lg:w-64 shrink-0 space-y-6">
            {/* Create Post Button */}
            {session ? (
              <Link
                href="/blog/create"
                className="w-full bg-brand-accent hover:bg-yellow-300 text-brand-navy font-black uppercase tracking-widest py-4 px-4 rounded-xl flex items-center justify-center shadow-lg transition-transform active:scale-95"
              >
                + Публикувай
              </Link>
            ) : (
              <div className="bg-brand-navy rounded-xl p-6 text-center shadow-lg border border-white/10">
                <p className="text-white text-sm font-bold uppercase tracking-wider mb-4">
                  Влезте, за да публикувате материали
                </p>
                <Link
                  href="/signin"
                  className="text-brand-accent hover:text-white font-black uppercase text-xs tracking-widest underline"
                >
                  Вход в системата
                </Link>
              </div>
            )}
          </aside>

          {/* MAIN FEED: Materials Grid */}
          <section className="flex-1">
            <div className="mb-6 flex items-center justify-between">
              <h1 className="text-brand-cream text-3xl font-black uppercase tracking-wide">
                Публикации
              </h1>
            </div>

            {posts.length === 0 ? (
              <div className="bg-brand-navy/50 border border-brand-accent/20 rounded-2xl p-12 text-center text-white">
                <p className="font-black uppercase tracking-widest text-lg mb-2">
                  Няма намерени материали
                </p>
                <p className="text-blue-200 text-sm">Бъдете първия, който да направи публикация!</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {posts.map((post) => (
                  <PostCard
                    key={post.id}
                    id={post.id}
                    title={post.title}
                    content={post.content}
                    createdAt={post.createdAt}
                    author={post.author}
                  />
                ))}
              </div>
            )}
          </section>
        </div>
      </main>
    </Suspense>
  );
}
