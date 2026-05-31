import { NextRequest, NextResponse } from "next/server";
import { readFileSync, writeFileSync } from "fs";
import path from "path";

const DATA_PATH = path.join(process.cwd(), "data", "inquiries.json");

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const body = await req.json();
  const data = JSON.parse(readFileSync(DATA_PATH, "utf-8"));
  const idx = data.inquiries.findIndex((i: { id: string }) => i.id === id);
  if (idx === -1) return NextResponse.json({ error: "Not found" }, { status: 404 });
  data.inquiries[idx] = { ...data.inquiries[idx], ...body };
  writeFileSync(DATA_PATH, JSON.stringify(data, null, 2));
  return NextResponse.json(data.inquiries[idx]);
}

export async function DELETE(_: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const data = JSON.parse(readFileSync(DATA_PATH, "utf-8"));
  data.inquiries = data.inquiries.filter((i: { id: string }) => i.id !== id);
  writeFileSync(DATA_PATH, JSON.stringify(data, null, 2));
  return NextResponse.json({ success: true });
}
