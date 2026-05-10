import Image from "@tiptap/extension-image";
import { Plugin, PluginKey } from "@tiptap/pm/state";
import { EditorView } from "prosemirror-view";

const handleFile = async (file: File, view: EditorView, coordinates?: { pos: number }) => {
  if (!file.type.includes("image/")) return;

  // OPTIONAL: Insert a temporary "loading" placeholder image here if you want

  // 1. Send the file to our Sharp API route
  const formData = new FormData();
  formData.append("file", file);

  const response = await fetch("/api/files/upload", {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    alert("Грешка при качването на изображението.");
    return;
  }

  // 2. Get the tiny, compressed Base64 WebP string
  const data = await response.json();
  const compressedBase64Url = data.url;

  // 3. Insert the compressed image into the Tiptap editor
  const { schema } = view.state;
  const node = schema.nodes.image.create({ src: compressedBase64Url });
  const transaction = view.state.tr.insert(coordinates?.pos || view.state.selection.from, node);

  view.dispatch(transaction);
};

export const ImageUploadExtension = Image.extend({
  addAttributes() {
    return {
      ...this.parent?.(),
      align: {
        default: "center",
        parseHTML: (element) => element.getAttribute("data-align") || "center",
      },
      width: {
        default: "50%",
        parseHTML: (element) => element.getAttribute("data-width") || "50%",
      },
    };
  },

  // Overwrite how the image is rendered to the DOM to apply the styles
  renderHTML({ HTMLAttributes }) {
    const align = HTMLAttributes.align || "center";
    const width = HTMLAttributes.width || "50%";

    let styles = `width: ${width}; transition: all 0.3s ease;`;
    const classes = "rounded-xl shadow-lg border border-gray-100 cursor-pointer ";

    // Apply Float logic
    if (align === "left") {
      styles += " float: left; margin-right: 1.5rem; margin-bottom: 1rem;";
    } else if (align === "right") {
      styles += " float: right; margin-left: 1.5rem; margin-bottom: 1rem;";
    } else {
      styles +=
        " display: block; margin-left: auto; margin-right: auto; margin-top: 1.5rem; margin-bottom: 1.5rem; clear: both;";
    }

    return [
      "img",
      {
        ...HTMLAttributes,
        "data-align": align,
        "data-width": width,
        style: styles,
        class: classes,
      },
    ];
  },

  addProseMirrorPlugins() {
    return [
      new Plugin({
        key: new PluginKey("imageDropPlugin"),
        props: {
          // Handle Drag and Drop
          handleDrop(view, event, slice, moved) {
            if (
              !moved &&
              event.dataTransfer &&
              event.dataTransfer.files &&
              event.dataTransfer.files[0]
            ) {
              event.preventDefault();
              const file = event.dataTransfer.files[0];
              const coordinates = view.posAtCoords({ left: event.clientX, top: event.clientY });
              handleFile(file, view, coordinates || undefined);
              return true;
            }
            return false;
          },

          // Handle Copy and Paste
          handlePaste(view, event) {
            if (event.clipboardData && event.clipboardData.files && event.clipboardData.files[0]) {
              event.preventDefault();
              const file = event.clipboardData.files[0];
              handleFile(file, view);
              return true;
            }
            return false;
          },
        },
      }),
    ];
  },
});
