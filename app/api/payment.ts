import type { NextApiRequest, NextApiResponse } from 'next';
import crypto from 'crypto';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).end();

  const { orderId, amount } = req.body as { orderId: string; amount: string };

  const merchantId = process.env.MERCHANT_ID!;
  const storeKey = process.env.STORE_KEY!;
  const userName = process.env.API_USERNAME!;
  const userPassword = process.env.API_PASSWORD!;
  const okUrl = process.env.OK_URL!;
  const failUrl = process.env.FAIL_URL!;
  const rnd = Date.now().toString();
  const currency = '949'; // TL
  const storeType = '3d_pay_hosting';

  const hashString = merchantId + orderId + amount + okUrl + failUrl + rnd + storeKey;
  const hash = crypto.createHash('sha1').update(hashString).digest('base64');

  const fields: Record<string, string> = {
    clientid: merchantId,
    amount,
    oid: orderId,
    okUrl,
    failUrl,
    rnd,
    currency,
    storetype: storeType,
    hash,
    lang: 'tr',
    userName,
    password: userPassword,
  };

  const formInputs = Object.entries(fields)
    .map(([key, val]) => `<input type="hidden" name="${key}" value="${val}" />`)
    .join('');

  const html = `
    <html>
      <body onload="document.forms[0].submit()">
        <form method="post" action="https://vpos.ziraatkatilim.com.tr/MPI/Default.aspx">
          ${formInputs}
        </form>
      </body>
    </html>
  `;

  res.setHeader('Content-Type', 'text/html');
  res.end(html);
}
