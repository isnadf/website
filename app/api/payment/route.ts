import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";

export async function POST(req: NextRequest) {
  const { orderId, amount } = await req.json();

  // Validate inputs
  if (!amount || isNaN(parseFloat(amount)) || parseFloat(amount) <= 0) {
    return NextResponse.json({ error: "Invalid amount" }, { status: 400 });
  }

  if (!orderId || orderId.length < 3) {
    return NextResponse.json({ error: "Invalid order ID" }, { status: 400 });
  }

  // Validate environment variables
  const clientId = process.env.MERCHANT_ID;
  const storeKey = process.env.STORE_KEY;
  const okUrl = process.env.OK_URL;
  const failUrl = process.env.FAIL_URL;

  if (!clientId || !storeKey || !okUrl || !failUrl) {
    console.error("Missing payment configuration");
    return NextResponse.json({ error: "Payment configuration error" }, { status: 500 });
  }

  const rnd = Date.now().toString();
  const currency = "949";
  const storeType = "3d_pay_hosting";
  const lang = "tr";

  const hashString = clientId + orderId + amount + okUrl + failUrl + rnd + storeKey;
  const hash = crypto.createHash("sha1").update(hashString).digest("base64");

  const fields: Record<string, string> = {
    clientid: clientId,
    amount,
    oid: orderId,
    okUrl,
    failUrl,
    rnd,
    currency,
    storetype: storeType,
    lang,
    hash,
  };

  // Escape HTML values to prevent XSS
  const escapeHtml = (str: string) => str.replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

  const formInputs = Object.entries(fields)
    .map(([key, val]) => `<input type=\"hidden\" name=\"${escapeHtml(key)}\" value=\"${escapeHtml(val)}\" />`)
    .join("");

  const html = `
    <html>
      <body onload=\"document.forms[0].submit()\">
        <form method=\"post\" action=\"https://vpos.ziraatkatilim.com.tr/MPI/Default.aspx\">
          ${formInputs}
        </form>
      </body>
    </html>
  `;

  return new NextResponse(html, {
    headers: { "Content-Type": "text/html" },
  });
} 