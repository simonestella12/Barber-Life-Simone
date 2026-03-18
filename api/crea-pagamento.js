const stripe = require(‘stripe’)(‘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’);

module.exports = async (req, res) => {
res.setHeader(‘Access-Control-Allow-Origin’, ‘*’);
res.setHeader(‘Access-Control-Allow-Methods’, ‘POST, OPTIONS’);
res.setHeader(‘Access-Control-Allow-Headers’, ‘Content-Type’);
if (req.method === ‘OPTIONS’) return res.status(200).end();
if (req.method !== ‘POST’) return res.status(405).json({ error: ‘Method not allowed’ });

try {
const { servizio, importoTotale, nome, email } = req.body;
const caparra = Math.round((importoTotale / 2) * 100);

```
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
