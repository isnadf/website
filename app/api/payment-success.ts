import type { NextApiRequest, NextApiResponse } from 'next';

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const chunks: Uint8Array[] = [];
  for await (const chunk of req) {
    chunks.push(chunk);
  }

  const raw = Buffer.concat(chunks).toString();
  const data = Object.fromEntries(new URLSearchParams(raw));

  console.log('✅ Payment Success:', data);

  if (data.ProcReturnCode === '00') {
    return res.status(200).send('Payment successful');
  }

  return res.status(400).send('Unexpected payment status');
}
