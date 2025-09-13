import { NextResponse } from "next/server";
import { cancelPendingPayments } from "@/lib/payment-logger";

export async function POST() {
  try {
    console.log("Starting payment cleanup job...");

    const cancelled = await cancelPendingPayments(5);

    console.log(`Payment cleanup completed. Cancelled ${cancelled} payments.`);

    return NextResponse.json({
      success: true,
      cancelled,
      message: `Cancelled ${cancelled} stale pending payments`,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error("Payment cleanup error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({
    message: "Payment cleanup endpoint - use POST method",
    usage: "POST /api/admin/cleanup-payments",
  });
}
