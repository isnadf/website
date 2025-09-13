import { NextRequest, NextResponse } from "next/server";
import { getPaymentStats } from "@/lib/payment-logger";

// CORS headers for admin dashboard integration
const corsHeaders = {
  'Access-Control-Allow-Origin': process.env.ADMIN_DASHBOARD_URL || 'http://localhost:3000',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  'Access-Control-Allow-Credentials': 'true',
};

// Handle preflight requests
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function OPTIONS(_request: NextRequest) {
  return new NextResponse(null, {
    status: 200,
    headers: corsHeaders,
  });
}

// GET /api/admin/stats - Get payment statistics
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function GET(_request: NextRequest) {
  try {
    const stats = await getPaymentStats();

    return NextResponse.json({
      success: true,
      data: stats
    }, {
      headers: corsHeaders
    });
  } catch (error) {
    console.error("Error fetching payment stats:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500, headers: corsHeaders }
    );
  }
}
