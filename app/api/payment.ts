import type { NextApiRequest, NextApiResponse } from "next";
import crypto from "crypto";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") return res.status(405).end();

  const { orderId, amount } = req.body as { orderId: string; amount: string };

  // Validate inputs
  if (!amount || isNaN(parseFloat(amount)) || parseFloat(amount) <= 0) {
    return res.status(400).json({ error: "Invalid amount" });
  }

  if (!orderId || orderId.length < 3) {
    return res.status(400).json({ error: "Invalid order ID" });
  }

  // Validate environment variables
  const clientId = process.env.MERCHANT_ID;
  const storeKey = process.env.STORE_KEY;
  const okUrl = process.env.OK_URL;
  const failUrl = process.env.FAIL_URL;

  if (!clientId || !storeKey || !okUrl || !failUrl) {
    console.error("Missing payment configuration");
    return res.status(500).json({ error: "Payment configuration error" });
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
    .map(([key, val]) => `<input type="hidden" name="${escapeHtml(key)}" value="${escapeHtml(val)}" />`)
    .join("");

  const html = `
    <html>
      <body onload="document.forms[0].submit()">
        <form method="post" action="https://vpos.ziraatkatilim.com.tr/MPI/Default.aspx">
          ${formInputs}
        </form>
      </body>
    </html>
  `;

  res.setHeader("Content-Type", "text/html");
  res.end(html);
}
