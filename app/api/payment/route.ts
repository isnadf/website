import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { createPaymentRecord } from "@/lib/payment-logger";

export async function GET() {
  // Test endpoint to check if API is working and env vars are set
  const clientId = process.env.MERCHANT_ID;
  const storeKey = process.env.STORE_KEY;
  const okUrl = process.env.OK_URL;
  const failUrl = process.env.FAIL_URL;

  return NextResponse.json({
    status: "API is working",
    envVars: {
      hasClientId: !!clientId,
      hasStoreKey: !!storeKey,
      hasOkUrl: !!okUrl,
      hasFailUrl: !!failUrl
    }
  });
}

export async function POST(req: NextRequest) {
  try {
    const { orderId, amount, paymentMethod, customerInfo } = await req.json();

    console.log("Payment request received:", { orderId, amount, paymentMethod, amountType: typeof amount });

    // Validate inputs
    if (!amount || isNaN(parseFloat(amount)) || parseFloat(amount) <= 0) {
      return NextResponse.json({ error: "Invalid amount" }, { status: 400 });
    }

    if (!orderId || orderId.length < 3) {
      return NextResponse.json({ error: "Invalid order ID" }, { status: 400 });
    }

    // Validate environment variables
    const merchantId = process.env.MERCHANT_ID;
    const merchantPass = process.env.STORE_KEY;
    const okUrl = process.env.OK_URL;
    const failUrl = process.env.FAIL_URL;

    console.log("Environment variables check:", {
      hasMerchantId: !!merchantId,
      hasMerchantPass: !!merchantPass,
      hasOkUrl: !!okUrl,
      hasFailUrl: !!failUrl
    });

    if (!merchantId || !merchantPass || !okUrl || !failUrl) {
      console.error("Missing payment configuration:", {
        MERCHANT_ID: !!merchantId,
        STORE_KEY: !!merchantPass,
        OK_URL: !!okUrl,
        FAIL_URL: !!failUrl
      });
      return NextResponse.json({ error: "Payment configuration error" }, { status: 500 });
    }

    // Create payment record in database as pending (will be updated by payment gateway callbacks)
    const paymentRecord = await createPaymentRecord({
      orderId,
      amount: parseFloat(amount),
      currency: 'TRY',
      status: 'pending', // Start as pending, will be updated by payment gateway callbacks
      paymentMethod: paymentMethod || 'card',
      customerInfo
    });

    console.log("Payment record created:", paymentRecord.id);

    // Ziraat 3D Host payment configuration
    const mbrId = "12"; // Kurum Kodu
    const userCode = "apiısnad"; // From your credentials
    const secureType = "3DHost";
    const txnType = "Auth";
    const installmentCount = "0";
    const currency = "949";
    const lang = "TR";
    const orgOrderId = ""; // Empty for new transactions
    const rnd = Date.now().toString();

    // Format amount for Ziraat: remove decimal separator to match PHP example format
    // PHP example shows $PurchAmount="1" for 1 TRY (no decimal separator)
    // Example: "10.00" → "10" 
    // For TRY currency (949), bank expects amount as integer string without decimal point
    const numericAmount = parseFloat(amount);
    const formattedAmount = Math.round(numericAmount).toString();
    
    console.log("Amount formatting:", { 
      original: amount, 
      numeric: numericAmount, 
      formatted: formattedAmount 
    });
    
    // Correct Ziraat hash calculation - use formatted amount (must match PurchAmount exactly)
    const hashString = mbrId + orderId + formattedAmount + okUrl + failUrl + txnType + installmentCount + rnd + merchantPass;
    const hash = crypto.createHash("sha1").update(hashString).digest("base64");

    const fields: Record<string, string> = {
      MbrId: mbrId,
      MerchantID: merchantId,
      UserCode: userCode,
      SecureType: secureType,
      TxnType: txnType,
      InstallmentCount: installmentCount,
      Currency: currency,
      OkUrl: okUrl,
      FailUrl: failUrl,
      OrderId: orderId,
      OrgOrderId: orgOrderId,
      PurchAmount: formattedAmount,
      Lang: lang,
      Rnd: rnd,
      Hash: hash,
    };

    // Escape HTML values to prevent XSS
    const escapeHtml = (str: string) => str.replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

    const formInputs = Object.entries(fields)
      .map(([key, val]) => `<input type=\"hidden\" name=\"${escapeHtml(key)}\" value=\"${escapeHtml(val)}\" />`)
      .join("");

    const html = `
      <html>
        <body onload=\"document.forms[0].submit()\">
          <form method=\"post\" action=\"https://vpos.ziraatkatilim.com.tr/Mpi/3DHost.aspx\">
            ${formInputs}
          </form>
        </body>
      </html>
    `;

    return new NextResponse(html, {
      headers: { "Content-Type": "text/html" },
    });
  } catch (error) {
    console.error("Payment API error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
} 