import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  // Read the raw body
  const raw = await req.text();
  const data = Object.fromEntries(new URLSearchParams(raw));

  console.log("❌ Payment Failed:", data);

  return new NextResponse("Payment failed", { status: 200 });
} 