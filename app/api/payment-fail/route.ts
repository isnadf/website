import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  // Read the raw body
  const raw = await req.text();
  const data = Object.fromEntries(new URLSearchParams(raw));

  console.log("❌ Payment Failed Response:", data);

  // Log all relevant error information
  console.log("Error details:", {
    ProcReturnCode: data.ProcReturnCode,
    ErrorMessage: data.ErrorMessage,
    "3DStatus": data["3DStatus"],
    TransId: data.TransId,
    HostRefNum: data.HostRefNum
  });

  return new NextResponse("Payment failed", { status: 200 });
} 