import { NextRequest, NextResponse } from "next/server";
import { readFileSync, writeFileSync } from "fs";
import path from "path";

const DATA_PATH = path.join(process.cwd(), "data", "fleet.json");

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const body = await req.json();
  const data = JSON.parse(readFileSync(DATA_PATH, "utf-8"));
  const idx = data.vehicles.findIndex((v: { id: string }) => v.id === id);
  if (idx === -1) return NextResponse.json({ error: "Not found" }, { status: 404 });
  data.vehicles[idx] = { ...data.vehicles[idx], ...body };
  writeFileSync(DATA_PATH, JSON.stringify(data, null, 2));
  return NextResponse.json(data.vehicles[idx]);
}

export async function DELETE(_: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const data = JSON.parse(readFileSync(DATA_PATH, "utf-8"));
  data.vehicles = data.vehicles.filter((v: { id: string }) => v.id !== id);
  writeFileSync(DATA_PATH, JSON.stringify(data, null, 2));
  return NextResponse.json({ success: true });
}
