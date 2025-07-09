import { NextResponse } from "next/server";

export async function POST(request: Request) {
  // ... your payment logic ...
  return NextResponse.redirect(new URL("/failed-payment", request.url), 302);
} 