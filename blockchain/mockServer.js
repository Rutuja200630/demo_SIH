const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

app.post('/createID', (req, res) => {
  const { userId, name } = req.body || {};
  res.json({
    blockchainId: 'bc_0xabc123',
    qr: 'data:image/png;base64,iVBORw0KGgo=',
    status: 'created',
    expiresAt: new Date(Date.now() + 5 * 24 * 3600 * 1000).toISOString(),
    userId,
    name
  });
});

app.get('/verifyID', (req, res) => {
  const blockchainId = req.query.blockchainId || 'bc_0xabc123';
  res.json({
    blockchainId,
    userId: 't123',
    valid: true,
    issuedAt: new Date(Date.now() - 2 * 24 * 3600 * 1000).toISOString(),
    expiresAt: new Date(Date.now() + 3 * 24 * 3600 * 1000).toISOString()
  });
});

const PORT = process.env.PORT || 5002;
app.listen(PORT, () => console.log(`[blockchain-mock] listening on ${PORT}`));
