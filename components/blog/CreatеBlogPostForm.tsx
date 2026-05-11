"use client";

import { useActionState, useState } from "react";
import { ActionState } from "@/lib/types";
import AlertBanner from "@/components/notification/AlertBanner";
import RichTextEditor from "./RichTextEditor";
import { createPostAction } from "@/actions/blog-actions";
import Loader from "../Loader";

export default function CreateMaterialForm() {
  const [state, formAction, pending] = useActionState<ActionState, FormData>(createPostAction, {});
  const [htmlContent, setHtmlContent] = useState("");
  const [titleLength, setTitleLength] = useState((state.values?.title as string)?.length || 0);

  // Check if we have any field errors to display in the top summary
  const hasFieldErrors = state.fieldErrors && Object.keys(state.fieldErrors).length > 0;

  return (
    <form action={formAction} className="flex flex-col h-full relative">
      {(state.error || hasFieldErrors) && (
        <div className="mb-8 bg-brand-primary p-4 md:p-6 rounded-2xl border border-brand-error/30 shadow-inner animate-in fade-in slide-in-from-top-4 duration-500">
          <div className="space-y-3">
            {/* 1. GLOBAL ERROR */}
            {state.error && <AlertBanner type="error">{state.error}</AlertBanner>}

            {/* 2. FIELD ERRORS SUMMARY */}
            {hasFieldErrors && (
              <>
                {Object.entries(state.fieldErrors!).map(([field, message]) => (
                  <AlertBanner key={field} type="error">
                    {message}
                  </AlertBanner>
                ))}
              </>
            )}
          </div>
        </div>
      )}

      {/* Title Input */}
      <div className="mb-6">
        <input
          type="text"
          name="title"
          maxLength={50}
          defaultValue={state.values?.title as string}
          onChange={(e) => setTitleLength(e.target.value.length)}
          placeholder="Заглавие на публикацията..."
          className="w-full text-3xl md:text-5xl font-black text-brand-navy placeholder-gray-300 focus:outline-none bg-transparent pr-16"
        />
        {/* Character Counter */}
        <div
          className={`absolute top-2 right-2 text-xs font-bold ${titleLength >= 50 ? "text-brand-error animate-pulse" : "text-gray-400"}`}
        >
          {titleLength}/50
        </div>
      </div>

      {/* RICH TEXT EDITOR */}
      <div className="flex-1 flex flex-col min-h-125">
        <input type="hidden" name="content" value={htmlContent} />
        <RichTextEditor
          content={(state.values?.content as string) || ""}
          onChange={setHtmlContent}
        />
      </div>

      <div className="mt-8 pt-6 flex justify-end">
        <button
          type="submit"
          disabled={pending}
          className="bg-brand-primary hover:bg-brand-navy text-white font-black uppercase tracking-widest py-4 px-10 rounded-xl transition-all shadow-lg active:scale-95 disabled:opacity-50 flex items-center gap-3"
        >
          {pending ? <Loader size="sm" color="white" text="Публикуване..." /> : "Публикувай"}
        </button>
      </div>
    </form>
  );
}
