"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import { ImageUploadExtension } from "@/lib/editor/ImageEditorExtension";
import { RichTextEditorProps } from "@/lib/types";

export default function RichTextEditor({ content, onChange }: RichTextEditorProps) {
  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit,

      ImageUploadExtension.configure({
        HTMLAttributes: {
          class: "rounded-xl max-w-full h-auto my-6 shadow-lg border border-gray-100",
        },
      }),
      Placeholder.configure({
        placeholder: "Започнете да пишете... (Можете да влачите и пускате снимки тук!)",
        emptyEditorClass:
          "cursor-text before:content-[attr(data-placeholder)] before:text-gray-400 before:absolute before:pointer-events-none",
      }),
    ],
    content: content,
    editorProps: {
      attributes: {
        class:
          "prose prose-blue max-w-none w-full min-h-[400px] focus:outline-none text-gray-800 p-6 md:p-8",
      },
    },
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
  });

  if (!editor) return null;

  return (
    <div className="flex flex-col flex-1 border border-gray-200 rounded-2xl overflow-hidden focus-within:border-brand-primary/50 focus-within:ring-4 focus-within:ring-brand-primary/10 transition-all bg-white relative">
      {/* TOOLBAR */}
      <div className="bg-gray-50 border-b border-gray-200 p-2 flex flex-wrap gap-1 items-center sticky top-0 z-10">
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          className={`p-2 rounded-lg font-black text-sm transition-colors ${editor.isActive("heading", { level: 2 }) ? "bg-brand-navy text-white" : "text-gray-600 hover:bg-gray-200"}`}
        >
          H1
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
          className={`p-2 rounded-lg font-black text-sm transition-colors ${editor.isActive("heading", { level: 3 }) ? "bg-brand-navy text-white" : "text-gray-600 hover:bg-gray-200"}`}
        >
          H2
        </button>
        <div className="w-px h-6 bg-gray-300 mx-2" /> {/* Divider */}
        {/* Formatting */}
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={`p-2 rounded-lg font-bold transition-colors ${editor.isActive("bold") ? "bg-brand-navy text-white" : "text-gray-600 hover:bg-gray-200"}`}
        >
          <span className="font-serif font-bold">B</span>
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={`p-2 rounded-lg italic transition-colors ${editor.isActive("italic") ? "bg-brand-navy text-white" : "text-gray-600 hover:bg-gray-200"}`}
        >
          <span className="font-serif">I</span>
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={`p-2 rounded-lg transition-colors ${editor.isActive("bulletList") ? "bg-brand-navy text-white" : "text-gray-600 hover:bg-gray-200"}`}
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16M8 6h.01M8 12h.01M8 18h.01"
            />
          </svg>
        </button>
      </div>

      {/* WRITING CANVAS */}
      <div className="flex-1 cursor-text" onClick={() => editor.commands.focus()}>
        <EditorContent editor={editor} />
      </div>
    </div>
  );
}
