import { NextRequest, NextResponse } from "next/server";
import { findPaymentByOrderId } from "@/lib/payment-logger";

// CORS headers for admin dashboard integration
const corsHeaders = {
  'Access-Control-Allow-Origin': process.env.ADMIN_DASHBOARD_URL || 'http://localhost:3000',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  'Access-Control-Allow-Credentials': 'true',
};

// Handle preflight requests
export async function OPTIONS(request: NextRequest) {
  return new NextResponse(null, {
    status: 200,
    headers: corsHeaders,
  });
}

// GET /api/admin/payments/[orderId] - Get specific payment by order ID
export async function GET(
  request: NextRequest,
  context: { params: Promise<{ orderId: string }> }
) {
  try {
    const { orderId } = await context.params;

    if (!orderId) {
      return NextResponse.json({ error: "Order ID is required" }, { status: 400, headers: corsHeaders });
    }

    const payment = await findPaymentByOrderId(orderId);

    if (!payment) {
      return NextResponse.json({ error: "Payment not found" }, { status: 404, headers: corsHeaders });
    }

    return NextResponse.json({
      success: true,
      data: payment
    }, {
      headers: corsHeaders
    });
  } catch (error) {
    console.error("Error fetching payment:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500, headers: corsHeaders }
    );
  }
}
