export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const N8N_REPORT_URL = process.env.N8N_REPORT_URL;

  if (!N8N_REPORT_URL) {
    return res.status(200).json({ queued: true });
  }

  try {
    await fetch(N8N_REPORT_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(req.body),
    });
    return res.status(200).json({ sent: true });
  } catch (err) {
    return res.status(200).json({ queued: true });
  }
}