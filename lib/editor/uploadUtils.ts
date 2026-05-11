import { UploadOptions } from "../types";

export const processAndInsertImages = async ({
  files,
  view,
  coordinates,
  onStart,
  onEnd,
}: UploadOptions) => {
  const editorState = view.state;
  const { schema } = editorState;

  // --- 1. CAPACITY LIMIT CHECK ---
  let currentImagesCount = 0;
  editorState.doc.descendants((node) => {
    if (node.type.name === "image") currentImagesCount++;
  });

  const remainingSlots = 30 - currentImagesCount;
  if (remainingSlots <= 0) {
    alert("Достигнахте лимита от 30 изображения на публикация.");
    if (onEnd) onEnd();
    return;
  }

  // --- 2. FILE SIZE LIMIT CHECK (5MB) ---
  const MAX_SIZE_MB = 5;
  let validFiles = Array.from(files).filter((file) => {
    if (!file.type.includes("image/")) return false;
    if (file.size > MAX_SIZE_MB * 1024 * 1024) {
      alert(`Файлът "${file.name}" е твърде голям. Максималният размер е 5MB.`);
      return false;
    }
    return true;
  });

  if (validFiles.length > remainingSlots) {
    alert(`Можете да добавите още само ${remainingSlots} изображения.`);
    validFiles = validFiles.slice(0, remainingSlots);
  }

  if (validFiles.length === 0) {
    if (onEnd) onEnd();
    return;
  }

  if (onStart) onStart();

  // --- 3. CREATE INSTANT PREVIEWS ---
  const uploadTasks = validFiles.map((file) => ({
    file,
    tempId: Math.random().toString(36).substring(7),
    objectUrl: URL.createObjectURL(file),
  }));

  let insertPos = coordinates?.pos || editorState.selection.from;
  let tr = editorState.tr;

  const imageNodes = uploadTasks.map((task) =>
    schema.nodes.image.create({ src: task.objectUrl, id: task.tempId, "data-loading": "true" }),
  );

  imageNodes.forEach((node) => {
    tr = tr.insert(insertPos, node);
    insertPos += node.nodeSize;
  });

  view.dispatch(tr);

  // --- 4. ASYNC UPLOAD AND SWAP ---
  await Promise.all(
    uploadTasks.map(async (task) => {
      try {
        const formData = new FormData();
        formData.append("file", task.file);

        const response = await fetch("/api/files/upload", { method: "POST", body: formData });
        if (!response.ok) throw new Error("Compression failed");

        const data = await response.json();

        const currentState = view.state;
        let updateTr = currentState.tr;
        let nodeFound = false;

        currentState.doc.descendants((node, pos) => {
          if (node.type.name === "image" && node.attrs.id === task.tempId) {
            updateTr = updateTr.setNodeMarkup(pos, undefined, {
              ...node.attrs,
              src: data.url,
              "data-loading": null,
              id: null,
            });
            nodeFound = true;
          }
        });

        if (nodeFound) view.dispatch(updateTr);
      } catch (error) {
        console.error(error);
        const currentState = view.state;
        let deleteTr = currentState.tr;

        currentState.doc.descendants((node, pos) => {
          if (node.type.name === "image" && node.attrs.id === task.tempId) {
            deleteTr = deleteTr.delete(pos, pos + node.nodeSize);
          }
        });
        view.dispatch(deleteTr);
      } finally {
        URL.revokeObjectURL(task.objectUrl);
      }
    }),
  );

  if (onEnd) onEnd();
};
