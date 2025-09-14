# AI/ML Mock (Development Only)

Replaceable by setting AIML_API_URL.

## Endpoints

- POST /safetyScore

Request:
{
  "userId": "t123",
  "locationHistory": [ {"lat": 26.8467, "lng": 80.9462, "timestamp": "..."} ],
  "itinerary": []
}

Response:
{
  "score": 72,
  "factors": ["visited_high_risk_zone","odd_stops"],
  "advice": "Avoid night travel in X area"
}

- POST /detectAnomaly

Request:
{
  "userId": "t123",
  "recentLocations": []
}

Response:
{
  "anomalies": [ { "type": "prolonged_inactivity", "start": "...", "lat": 26.8467, "lng": 80.9462, "severity": "high" } ]
}

## Run

pnpm run dev:aiml

## Swap to real service

Set AIML_API_URL to your provider base URL; backend forwards requests via /api/bridge/aiml/*.
