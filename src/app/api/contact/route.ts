import { NextRequest, NextResponse } from "next/server";
import { readFileSync, writeFileSync } from "fs";
import path from "path";

const DATA_PATH = path.join(process.cwd(), "data", "inquiries.json");

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, phone, service, date, message } = body;

    if (!name || !phone) {
      return NextResponse.json({ error: "Name and phone are required" }, { status: 400 });
    }

    const data = JSON.parse(readFileSync(DATA_PATH, "utf-8"));
    const newInquiry = {
      id: Date.now().toString(),
      name, email, phone, service, date, message,
      status: "new",
      createdAt: new Date().toISOString(),
    };
    data.inquiries.unshift(newInquiry);
    writeFileSync(DATA_PATH, JSON.stringify(data, null, 2));

    return NextResponse.json({ success: true, id: newInquiry.id });
  } catch {
    return NextResponse.json({ error: "Failed to save inquiry" }, { status: 500 });
  }
}
