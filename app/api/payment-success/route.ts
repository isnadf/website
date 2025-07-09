import { NextResponse } from "next/server";

export async function POST(request: Request) {
  // ... your payment logic ...
  return NextResponse.redirect(new URL("/successful-payment", request.url), 302);
} 