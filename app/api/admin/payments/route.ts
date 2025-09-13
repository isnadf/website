import { NextRequest, NextResponse } from "next/server";
import { getPayments, getPaymentStats, PaymentRecord } from "@/lib/payment-logger";

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

// GET /api/admin/payments - Get paginated payments with filters
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    
    // Parse query parameters
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '20');
    const status = searchParams.get('status') as PaymentRecord['status'] | null;
    const paymentMethod = searchParams.get('paymentMethod') as PaymentRecord['paymentMethod'] | null;
    const startDate = searchParams.get('startDate');
    const endDate = searchParams.get('endDate');

    // Validate parameters
    if (page < 1) {
      return NextResponse.json({ error: "Page must be greater than 0" }, { status: 400 });
    }
    
    if (limit < 1 || limit > 100) {
      return NextResponse.json({ error: "Limit must be between 1 and 100" }, { status: 400 });
    }

    // Get payments with filters
    const result = getPayments({
      page,
      limit,
      status: status || undefined,
      paymentMethod: paymentMethod || undefined,
      startDate: startDate || undefined,
      endDate: endDate || undefined
    });

    return NextResponse.json({
      success: true,
      data: result
    }, {
      headers: corsHeaders
    });
  } catch (error) {
    console.error("Error fetching payments:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500, headers: corsHeaders }
    );
  }
}
