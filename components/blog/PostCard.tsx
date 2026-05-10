import Link from "next/link";
import { DocIcon, UserIcon } from "@/components/Icons";
import { formatDate } from "@/lib/utils";
import Image from "next/image";
import { PostProps } from "@/lib/types";

export default function PostCard({ id, title, content, createdAt, author }: PostProps) {
  // Extract the first image from the HTML to use as a cover photo
  const imgMatch = content.match(/<img[^>]+src="([^">]+)"/);
  const coverImage = imgMatch ? imgMatch[1] : null;

  return (
    <article className="bg-white rounded-2xl shadow-md border-2 border-transparent hover:border-brand-accent/50 transition-all duration-300 flex flex-col overflow-hidden group">
      {/* Cover Image */}
      {coverImage && (
        <div className="w-full h-48 overflow-hidden bg-gray-100 relative border-b border-gray-100">
          <Image
            width={800}
            height={400}
            src={coverImage}
            alt={title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        </div>
      )}

      {/* Card Header: Date */}
      <div className="bg-brand-navy px-6 py-3 flex justify-between items-center text-white">
        <span className="text-blue-200 text-[10px] font-bold uppercase tracking-widest">
          {formatDate(createdAt)}
        </span>
      </div>

      {/* Card Body */}
      <div className="p-6 flex-1 flex flex-col">
        {/* Title (Will take up remaining space if there is an image to keep footer at bottom) */}
        <h2
          className={`text-xl md:text-2xl font-black text-gray-800 uppercase tracking-wide leading-tight group-hover:text-brand-primary transition-colors ${coverImage ? "mb-6 flex-1" : "mb-4"}`}
        >
          {title}
        </h2>

        {/* RICH TEXT PREVIEW - ONLY SHOW IF THERE IS NO IMAGE */}
        {!coverImage && (
          <div className="relative flex-1 mb-6">
            <div
              className="prose prose-sm prose-blue max-w-none text-gray-600 h-18 overflow-hidden prose-img:hidden prose-headings:text-base prose-headings:m-0 prose-p:m-0 space-y-1"
              dangerouslySetInnerHTML={{ __html: content }}
            />

            {/* The White Fade-Out Mask */}
            <div className="absolute bottom-0 left-0 right-0 h-8 bg-linear-to-t from-white to-transparent pointer-events-none" />
          </div>
        )}

        {/* Footer: Author & Read Action */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-100 mt-auto">
          <div className="flex items-center gap-2">
            <div className="bg-brand-primary/10 p-1.5 rounded-full text-brand-primary">
              <UserIcon className="w-4 h-4" />
            </div>
            <span className="text-gray-700 font-bold text-xs uppercase tracking-wider truncate max-w-30">
              {author.name || "Анонимен"}
            </span>
          </div>

          <Link
            href={`/blog/post/${id}`}
            className="flex items-center gap-2 bg-brand-primary/10 text-brand-primary hover:bg-brand-primary hover:text-white px-4 py-2 rounded-xl font-black text-[10px] uppercase tracking-widest transition-all shrink-0"
          >
            <DocIcon />
            Отвори
          </Link>
        </div>
      </div>
    </article>
  );
}
