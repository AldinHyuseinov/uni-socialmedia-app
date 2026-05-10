import Link from "next/link";
import { LeftArrowIcon, RightArrowIcon } from "./Icons";

export default function Pagination({
  currentPage,
  totalPages,
}: {
  currentPage: number;
  totalPages: number;
}) {
  if (totalPages <= 1) return null; // Don't show if there's only 1 page

  const prevPage = currentPage - 1;
  const nextPage = currentPage + 1;

  // Reusable button styles
  const btnStyle =
    "px-6 py-3 rounded-xl font-black uppercase text-xs tracking-widest transition-all shadow-sm flex items-center gap-2";
  const activeStyle = "bg-brand-navy text-white hover:bg-brand-accent hover:shadow-md";
  const disabledStyle = "bg-gray-100 text-gray-400 cursor-not-allowed pointer-events-none";

  return (
    <div className="flex items-center justify-center gap-4 mt-6 pt-8 border-t border-brand-primary/10">
      {/* PREVIOUS BUTTON */}
      {currentPage > 1 ? (
        <Link href={`/?page=${prevPage}`} className={`${btnStyle} ${activeStyle}`}>
          <LeftArrowIcon />
          Предишна
        </Link>
      ) : (
        <span className={`${btnStyle} ${disabledStyle}`}>
          <LeftArrowIcon />
          Предишна
        </span>
      )}

      {/* PAGE INDICATOR */}
      <span className="font-bold text-brand-cream uppercase tracking-widest text-xs px-4">
        Стр. {currentPage} от {totalPages}
      </span>

      {/* NEXT BUTTON */}
      {currentPage < totalPages ? (
        <Link href={`/?page=${nextPage}`} className={`${btnStyle} ${activeStyle}`}>
          Следваща
          <RightArrowIcon />
        </Link>
      ) : (
        <span className={`${btnStyle} ${disabledStyle}`}>
          Следваща
          <RightArrowIcon />
        </span>
      )}
    </div>
  );
}
