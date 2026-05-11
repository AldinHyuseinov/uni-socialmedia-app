import { prisma } from "@/lib/prisma";
import { formatDate } from "@/lib/utils";
import { notFound } from "next/navigation";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import DeletePostButton from "@/components/blog/DeletePostButton";
import { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const resolvedParams = await params;
  const id = resolvedParams.id;

  // Fetch the post just for the metadata
  const post = await prisma.posts.findUnique({
    where: { id: id },
    include: { author: true },
  });

  // Fallback if post doesn't exist
  if (!post) {
    return {
      title: "Stud SU | Публикацията не е намерена",
      description: "Тази публикация не съществува или е изтрита.",
    };
  }

  // Strip HTML tags to create a clean SEO description (max ~160 chars)
  const plainTextExcerpt = post.content
    .replace(/<[^>]*>?/gm, " ")
    .replace(/\s+/g, " ")
    .trim();
  const description =
    plainTextExcerpt.length > 160 ? `${plainTextExcerpt.substring(0, 157)}...` : plainTextExcerpt;

  return {
    title: `Stud SU | ${post.title}`,
    description: description,
    authors: [{ name: post.author.name || "Анонимен" }],
    openGraph: {
      title: post.title,
      description: description,
      siteName: "Stud SU",
      type: "article",
      publishedTime: post.createdAt.toISOString(),
      authors: [post.author.name || "Анонимен"],
    },
  };
}

export default async function ViewBlogPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const id = resolvedParams.id;

  const [post, session] = await Promise.all([
    prisma.posts.findUnique({
      where: { id: id },
      include: { author: true },
    }),
    auth.api.getSession({ headers: await headers() }),
  ]);

  if (!post) {
    return notFound();
  }

  // Check if the current logged-in user is the author of this post
  const isAuthor = session?.user?.id === post.authorId;

  return (
    <main className="min-h-screen bg-brand-primary/5 py-12 px-4 sm:px-6">
      <article className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl p-8 md:p-12 border border-gray-100">
        {/* Header Metadata */}
        <div className="mb-8 border-b border-gray-100 pb-8 flex flex-col md:flex-row md:justify-between md:items-start gap-4">
          <div>
            <h1 className="text-4xl md:text-5xl font-black text-brand-navy tracking-wide leading-tight mb-4 break-all">
              {post.title}
            </h1>
            <p className="text-gray-500 font-bold text-xs tracking-wider mb-1">
              Публикувано от: {post.author.name}
            </p>
            <p className="text-gray-500 font-bold text-xs tracking-wider">
              Дата: {formatDate(post.createdAt)}
            </p>
          </div>

          {/* Render the Delete Button ONLY if the user is the author */}
          {isAuthor && (
            <div className="shrink-0 mt-2 md:mt-0">
              <DeletePostButton postId={post.id} />
            </div>
          )}
        </div>

        {/* HTML Content Render */}
        <div
          className="prose prose-lg prose-blue max-w-none text-gray-800 flow-root"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
      </article>
    </main>
  );
}
