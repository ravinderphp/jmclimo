import { NextRequest, NextResponse } from "next/server";
import { readFileSync, writeFileSync } from "fs";
import path from "path";

const DATA_PATH = path.join(process.cwd(), "data", "settings.json");

export async function GET() {
  const data = JSON.parse(readFileSync(DATA_PATH, "utf-8"));
  return NextResponse.json(data);
}

export async function PUT(req: NextRequest) {
  const body = await req.json();
  const existing = JSON.parse(readFileSync(DATA_PATH, "utf-8"));
  const updated = { ...existing, ...body };
  writeFileSync(DATA_PATH, JSON.stringify(updated, null, 2));
  return NextResponse.json(updated);
}
