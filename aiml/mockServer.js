const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

app.post('/safetyScore', (req, res) => {
  res.json({
    score: 72,
    factors: ["visited_high_risk_zone", "odd_stops"],
    advice: "Avoid night travel in X area"
  });
});

app.post('/detectAnomaly', (req, res) => {
  res.json({
    anomalies: [
      { type: 'prolonged_inactivity', start: new Date(Date.now() - 3600e3).toISOString(), lat: 26.8467, lng: 80.9462, severity: 'high' }
    ]
  });
});

const PORT = process.env.PORT || 5003;
app.listen(PORT, () => console.log(`[aiml-mock] listening on ${PORT}`));
