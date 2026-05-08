import { NextResponse } from "next/server";
import sharp from "sharp";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    // Convert the incoming file into a Node.js Buffer
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // COMPRESS WITH SHARP
    // 1. Resize to max 1200px width (keeps it crisp but limits huge dimensions)
    // 2. Convert to WebP format (industry standard for web, incredibly small)
    // 3. Set quality to 80% (invisible to the human eye, but cuts file size by 80%)
    const compressedBuffer = await sharp(buffer)
      .resize({ width: 1200, withoutEnlargement: true })
      .webp({ quality: 80 })
      .toBuffer();

    // Convert the compressed buffer back into a Base64 string
    const base64Image = `data:image/webp;base64,${compressedBuffer.toString("base64")}`;

    return NextResponse.json({ url: base64Image });
  } catch (error) {
    console.error("Compression error:", error);
    return NextResponse.json({ error: "Compression failed" }, { status: 500 });
  }
}
