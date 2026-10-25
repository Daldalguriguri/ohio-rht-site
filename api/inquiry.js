const SB_URL = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
const SB_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_SECRET_KEY;
const clip = (v, n) => String(v ?? '').trim().slice(0, n);
const sbHeaders = () => ({
  apikey: SB_KEY,
  ...(String(SB_KEY).startsWith('eyJ') ? { Authorization: `Bearer ${SB_KEY}` } : {}),
  'Content-Type': 'application/json',
});

module.exports = async (req, res) => {
  if (req.method !== 'POST') return res.status(405).json({ error: 'POST only.' });
  if (!SB_URL || !SB_KEY) return res.status(500).json({ error: 'Booking is not connected yet. Please try again later.' });
  let b = req.body || {};
  if (typeof b === 'string') { try { b = JSON.parse(b); } catch { b = {}; } }
  if (b.website) return res.status(200).json({ ok: true }); // 스팸 함정 칸(사람에게는 안 보임)
  const row = { name: clip(b.name, 50), contact: clip(b.contact, 100), preferred: clip(b.preferred, 200), consent: b.consent === true };
  if (!row.name || !row.contact) return res.status(400).json({ error: 'Please enter your name and contact details.' });
  if (!row.consent) return res.status(400).json({ error: 'Please agree to the use of your personal information.' });
  const r = await fetch(`${SB_URL}/rest/v1/inquiries`, { method: 'POST', headers: { ...sbHeaders(), Prefer: 'return=minimal' }, body: JSON.stringify(row) });
  if (!r.ok) return res.status(500).json({ error: "We couldn't save your request. Please try again in a moment." });
  return res.status(200).json({ ok: true });
};
