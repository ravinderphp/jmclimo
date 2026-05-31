import { NextRequest, NextResponse } from "next/server";
import { readFileSync, writeFileSync } from "fs";
import path from "path";

const DATA_PATH = path.join(process.cwd(), "data", "services.json");

export async function GET() {
  const data = JSON.parse(readFileSync(DATA_PATH, "utf-8"));
  return NextResponse.json(data);
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const data = JSON.parse(readFileSync(DATA_PATH, "utf-8"));
  const newItem = { ...body, id: Date.now().toString(), order: data.services.length + 1 };
  data.services.push(newItem);
  writeFileSync(DATA_PATH, JSON.stringify(data, null, 2));
  return NextResponse.json(newItem, { status: 201 });
}
