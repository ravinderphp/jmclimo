import { NextRequest, NextResponse } from "next/server";
import { readFileSync, writeFileSync } from "fs";
import path from "path";

const DATA_PATH = path.join(process.cwd(), "data", "banners.json");

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const body = await req.json();
  const data = JSON.parse(readFileSync(DATA_PATH, "utf-8"));
  const idx = data.slides.findIndex((s: { id: number | string }) => String(s.id) === id);
  if (idx === -1) return NextResponse.json({ error: "Slide not found" }, { status: 404 });
  data.slides[idx] = { ...data.slides[idx], ...body };
  writeFileSync(DATA_PATH, JSON.stringify(data, null, 2));
  return NextResponse.json(data.slides[idx]);
}
