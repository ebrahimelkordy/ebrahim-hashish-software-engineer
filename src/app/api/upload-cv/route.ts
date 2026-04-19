import { NextRequest, NextResponse } from "next/server";
import { writeFile } from "fs/promises";
import path from "path";
import prisma from "@/lib/prisma";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    if (file.type !== "application/pdf") {
      return NextResponse.json({ error: "Only PDF files are allowed" }, { status: 400 });
    }

    // Save to /public/cv.pdf (overwrites the old one automatically)
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const filePath = path.join(process.cwd(), "public", "cv.pdf");
    await writeFile(filePath, buffer);

    // Update the cvUrl in the database using the same pattern as actions.ts
    const existing = await prisma.about.findFirst();
    if (existing) {
      await prisma.about.update({
        where: { id: existing.id },
        data: { cvUrl: "/cv.pdf" },
      });
    } else {
      await prisma.about.create({ data: { cvUrl: "/cv.pdf" } as any });
    }

    return NextResponse.json({ success: true, url: "/cv.pdf" });
  } catch (err) {
    console.error("CV upload failed:", err);
    return NextResponse.json({ error: "Upload failed" }, { status: 500 });
  }
}
