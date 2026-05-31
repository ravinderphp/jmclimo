import { NextRequest, NextResponse } from "next/server";
import { readFileSync, writeFileSync } from "fs";
import path from "path";

const DATA_PATH = path.join(process.cwd(), "data", "services.json");

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const body = await req.json();
  const data = JSON.parse(readFileSync(DATA_PATH, "utf-8"));
  const idx = data.services.findIndex((s: { id: string }) => s.id === id);
  if (idx === -1) return NextResponse.json({ error: "Not found" }, { status: 404 });
  data.services[idx] = { ...data.services[idx], ...body };
  writeFileSync(DATA_PATH, JSON.stringify(data, null, 2));
  return NextResponse.json(data.services[idx]);
}

export async function DELETE(_: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const data = JSON.parse(readFileSync(DATA_PATH, "utf-8"));
  data.services = data.services.filter((s: { id: string }) => s.id !== id);
  writeFileSync(DATA_PATH, JSON.stringify(data, null, 2));
  return NextResponse.json({ success: true });
}
