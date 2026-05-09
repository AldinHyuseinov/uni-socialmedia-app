"use client";

import { useRef, useState } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import TextAlign from "@tiptap/extension-text-align";
import Highlight from "@tiptap/extension-highlight";
import { ImageUploadExtension } from "@/lib/editor/ImageEditorExtension";
import { RichTextEditorProps } from "@/lib/types";
import {
  ListBulletIcon,
  ListOrderedIcon,
  QuoteIcon,
  ImageIcon,
  UndoIcon,
  RedoIcon,
  SpinnerIcon,
  HorizontalRuleIcon,
  AlignJustifyIcon,
  AlignRightIcon,
  AlignCenterIcon,
  AlignLeftIcon,
  HighlightIcon,
} from "@/components/Icons";

export default function RichTextEditor({ content, onChange }: RichTextEditorProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [, setForceUpdate] = useState(0);

  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit,
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
      Highlight.configure({
        multicolor: false,
      }),
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
    onTransaction: () => setForceUpdate((prev) => prev + 1),
    onUpdate: ({ editor }) => onChange(editor.getHTML()),
  });

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file || !editor) return;
    setIsUploading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);
      const response = await fetch("/api/files/upload", { method: "POST", body: formData });
      if (!response.ok) throw new Error("Грешка при компресията");
      const data = await response.json();
      editor.chain().focus().setImage({ src: data.url }).run();
    } catch (error) {
      console.error(error);
      alert("Възникна грешка при качването на изображението.");
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  if (!editor) return null;

  const btnClass = (isActive: boolean) =>
    `p-2 rounded-lg transition-colors flex items-center justify-center ${
      isActive ? "bg-brand-navy text-white shadow-sm" : "text-gray-600 hover:bg-gray-200"
    }`;

  return (
    <div className="flex flex-col flex-1 border border-gray-200 rounded-2xl focus-within:border-brand-primary/50 focus-within:ring-4 focus-within:ring-brand-primary/10 transition-all bg-white relative">
      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        onChange={handleImageUpload}
        className="hidden"
      />

      {/* TOOLBAR */}
      <div className="bg-gray-50 border-b border-gray-200 p-2 flex flex-wrap gap-1 gap-y-2 items-center sticky top-16 z-30 rounded-t-2xl shadow-sm">
        {/* Headings */}
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          className={btnClass(editor.isActive("heading", { level: 2 }))}
        >
          <span className="font-black text-sm w-5 text-center">H1</span>
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
          className={btnClass(editor.isActive("heading", { level: 3 }))}
        >
          <span className="font-black text-sm w-5 text-center">H2</span>
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleHeading({ level: 4 }).run()}
          className={btnClass(editor.isActive("heading", { level: 4 }))}
        >
          <span className="font-black text-sm w-5 text-center">H3</span>
        </button>

        <div className="w-px h-6 bg-gray-300 mx-1 hidden sm:block" />

        {/* Basic Formatting */}
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={btnClass(editor.isActive("bold"))}
        >
          <span className="font-serif font-bold w-5 text-center">B</span>
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={btnClass(editor.isActive("italic"))}
        >
          <span className="font-serif italic w-5 text-center">I</span>
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleStrike().run()}
          className={btnClass(editor.isActive("strike"))}
        >
          <span className="font-serif line-through w-5 text-center">S</span>
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleHighlight().run()}
          className={btnClass(editor.isActive("highlight"))}
        >
          <HighlightIcon />
        </button>

        <div className="w-px h-6 bg-gray-300 mx-1 hidden sm:block" />

        <button
          type="button"
          onClick={() => editor.chain().focus().setTextAlign("left").run()}
          className={btnClass(editor.isActive({ textAlign: "left" }))}
        >
          <AlignLeftIcon />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().setTextAlign("center").run()}
          className={btnClass(editor.isActive({ textAlign: "center" }))}
        >
          <AlignCenterIcon />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().setTextAlign("right").run()}
          className={btnClass(editor.isActive({ textAlign: "right" }))}
        >
          <AlignRightIcon />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().setTextAlign("justify").run()}
          className={btnClass(editor.isActive({ textAlign: "justify" }))}
        >
          <AlignJustifyIcon />
        </button>

        <div className="w-px h-6 bg-gray-300 mx-1 hidden md:block" />

        {/* Lists & Blocks */}
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={btnClass(editor.isActive("bulletList"))}
        >
          <ListBulletIcon />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={btnClass(editor.isActive("orderedList"))}
        >
          <ListOrderedIcon />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          className={btnClass(editor.isActive("blockquote"))}
        >
          <QuoteIcon />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().setHorizontalRule().run()}
          className="p-2 rounded-lg text-gray-600 hover:bg-gray-200 transition-colors flex items-center justify-center"
        >
          <HorizontalRuleIcon />
        </button>

        <div className="w-px h-6 bg-gray-300 mx-1 hidden md:block" />

        {/* Image Upload */}
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          disabled={isUploading}
          className="p-2 rounded-lg text-brand-primary hover:bg-brand-primary/10 transition-colors flex items-center gap-2 disabled:opacity-50"
        >
          {isUploading ? <SpinnerIcon /> : <ImageIcon />}
        </button>

        <div className="flex-1 min-w-5" />

        {/* Undo/Redo */}
        <div className="flex">
          <button
            type="button"
            onClick={() => editor.chain().focus().undo().run()}
            disabled={!editor.can().undo()}
            className="p-2 text-gray-500 hover:text-gray-800 disabled:opacity-30 transition-colors"
          >
            <UndoIcon />
          </button>
          <button
            type="button"
            onClick={() => editor.chain().focus().redo().run()}
            disabled={!editor.can().redo()}
            className="p-2 text-gray-500 hover:text-gray-800 disabled:opacity-30 transition-colors"
          >
            <RedoIcon />
          </button>
        </div>
      </div>

      <div className="flex-1 cursor-text" onClick={() => editor.commands.focus()}>
        <EditorContent editor={editor} />
      </div>
    </div>
  );
}
