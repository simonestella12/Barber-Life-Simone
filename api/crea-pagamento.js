const stripe = require(‘stripe’)(process.env.STRIPE_SECRET_KEY);

module.exports = async (req, res) => {
res.setHeader(‘Access-Control-Allow-Origin’, ‘*’);
res.setHeader(‘Access-Control-Allow-Methods’, ‘POST, OPTIONS’);
res.setHeader(‘Access-Control-Allow-Headers’, ‘Content-Type’);
if (req.method === ‘OPTIONS’) return res.status(200).end();
if (req.method !== ‘POST’) return res.status(405).json({ error: ‘Method not allowed’ });

try {
const { servizio, importoTotale, nome, email } = req.body;

```
// Calcola 50% arrotondato ai centesimi
const caparra = Math.round((importoTotale / 2) * 100); // in centesimi

const paymentIntent = await stripe.paymentIntents.create({
  amount: caparra,
  currency: 'eur',
  metadata: { servizio, nome, email },
  description: `Caparra 50% - ${servizio} - ${nome}`,
  receipt_email: email,
});

res.status(200).json({
  clientSecret: paymentIntent.client_secret,
  importoCaparra: caparra / 100,
  importoTotale: importoTotale
});
```

} catch (err) {
console.error(err);
res.status(500).json({ error: err.message });
}
};
