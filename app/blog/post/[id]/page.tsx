import { prisma } from "@/lib/prisma";
import { formatDate } from "@/lib/utils";
import { notFound } from "next/navigation";

export default async function ViewBlogPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const id = resolvedParams.id;

  const post = await prisma.posts.findUnique({
    where: { id: id },
    include: { author: true },
  });

  if (!post) {
    return notFound();
  }

  return (
    <main className="min-h-screen bg-brand-primary/5 py-12 px-4 sm:px-6">
      <article className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl p-8 md:p-12 border border-gray-100">
        {/* Header Metadata */}
        <div className="mb-8 border-b border-gray-100 pb-8">
          <h1 className="text-4xl md:text-5xl font-black text-brand-navy uppercase tracking-wide leading-tight mb-4">
            {post.title}
          </h1>
          <p className="text-gray-500 font-bold uppercase text-xs tracking-wider mb-1">
            Публикувано от: {post.author.name}
          </p>
          <p className="text-gray-500 font-bold uppercase text-xs tracking-wider">
            Дата: {formatDate(post.createdAt)}
          </p>
        </div>

        {/* HTML Content Render */}
        <div
          className="prose prose-lg prose-blue max-w-none text-gray-800"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
      </article>
    </main>
  );
}
