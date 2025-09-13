import { NextResponse } from "next/server";
import { cancelPendingPayments } from "@/lib/payment-logger";

async function runCleanup(source: string) {
  try {
    const cancelled = await cancelPendingPayments(5);
    return NextResponse.json({
      success: true,
      cancelled,
      message: `Cancelled ${cancelled} stale pending payments [${source}]`,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error(`Payment cleanup error [${source}]:`, error);
    return NextResponse.json(
      { error: "Internal server error", source },
      { status: 500 }
    );
  }
}

// Vercel Cron → always GET
export async function GET() {
  return runCleanup("cron GET");
}

// Manual testing (e.g. Postman)
export async function POST() {
  return runCleanup("manual POST");
}
