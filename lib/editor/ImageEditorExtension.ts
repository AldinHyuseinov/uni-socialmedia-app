import Image from "@tiptap/extension-image";
import { Plugin, PluginKey } from "@tiptap/pm/state";
import { processAndInsertImages } from "./uploadUtils";

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
      id: { default: null },
      "data-loading": { default: null },
    };
  },

  // Overwrite how the image is rendered to the DOM to apply the styles
  renderHTML({ HTMLAttributes }) {
    const align = HTMLAttributes.align || "center";
    const width = HTMLAttributes.width || "50%";
    const isLoading = HTMLAttributes["data-loading"] === "true";

    let styles = `width: ${width}; transition: all 0.3s ease;`;
    let classes = "rounded-xl shadow-lg border border-gray-100 cursor-pointer ";

    if (isLoading) {
      classes += " animate-pulse blur-[2px] opacity-60 grayscale-[30%] ";
    }

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
              event.dataTransfer.files.length > 0
            ) {
              event.preventDefault();
              const coordinates = view.posAtCoords({ left: event.clientX, top: event.clientY });
              processAndInsertImages({
                files: event.dataTransfer.files,
                view,
                coordinates: coordinates || undefined,
              });
              return true;
            }
            return false;
          },

          // Handle Copy and Paste
          handlePaste(view, event) {
            if (
              event.clipboardData &&
              event.clipboardData.files &&
              event.clipboardData.files.length > 0
            ) {
              event.preventDefault();
              processAndInsertImages({ files: event.clipboardData.files, view });
              return true;
            }
            return false;
          },
        },
      }),
    ];
  },
});
