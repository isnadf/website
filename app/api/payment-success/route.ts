import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  // Read the raw body
  const raw = await req.text();
  const data = Object.fromEntries(new URLSearchParams(raw));

  console.log("✅ Payment Success Response:", data);

  // Check 3D Secure status first
  if (data["3DStatus"] !== "1") {
    console.log("❌ 3D Secure verification failed");
    return new NextResponse("3D Secure verification failed", { status: 400 });
  }

  // Check payment status
  if (data.ProcReturnCode === "00") {
    console.log("✅ Payment successful - AuthCode:", data.AuthCode, "TransId:", data.TransId);
    return new NextResponse("Payment successful", { status: 200 });
  }

  console.log("❌ Payment failed - ProcReturnCode:", data.ProcReturnCode, "ErrorMessage:", data.ErrorMessage);
  return new NextResponse("Payment failed", { status: 400 });
} 