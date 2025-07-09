import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  // Read the raw body
  const raw = await req.text();
  const data = Object.fromEntries(new URLSearchParams(raw));

  console.log("✅ Payment Success:", data);

  if (data.ProcReturnCode === "00") {
    return new NextResponse("Payment successful", { status: 200 });
  }

  return new NextResponse("Unexpected payment status", { status: 400 });
} 