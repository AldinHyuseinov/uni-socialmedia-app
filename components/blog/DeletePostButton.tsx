"use client";

import { useTransition } from "react";
import { deletePostAction } from "@/actions/blog-actions";
import { BinIcon } from "../Icons";
import Loader from "../Loader";

export default function DeletePostButton({ postId }: { postId: string }) {
  const [isPending, startTransition] = useTransition();

  const handleDelete = () => {
    // Ask for confirmation before deleting
    if (
      window.confirm(
        "Сигурни ли сте, че искате да изтриете тази публикация? Това действие е необратимо.",
      )
    ) {
      startTransition(async () => {
        const result = await deletePostAction(postId);

        // If there's an error (e.g. unauthorized), alert the user
        if (result?.error) {
          alert(result.error);
        }
      });
    }
  };

  return (
    <button
      onClick={handleDelete}
      disabled={isPending}
      className="flex items-center gap-2 px-4 py-2 text-xs font-black tracking-widest uppercase transition-all border-2 rounded-xl border-brand-error/20 text-brand-error hover:bg-brand-error hover:text-white disabled:opacity-50 disabled:cursor-not-allowed"
    >
      {isPending ? (
        <Loader size="sm" color="primary" text="Изтриване..." />
      ) : (
        <>
          <BinIcon />
          Изтрий
        </>
      )}
    </button>
  );
}
