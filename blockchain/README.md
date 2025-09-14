# Blockchain Mock (Development Only)

Replaceable by setting BLOCKCHAIN_API_URL.

## Endpoints

- POST /createID

Request:
{
  "userId": "t123",
  "name": "Alice Kumar",
  "kycHash": "sha256:...",
  "itinerary": [],
  "validUntil": "2025-09-20T00:00:00Z"
}

Response:
{
  "blockchainId": "bc_0xabc123",
  "qr": "data:image/png;base64,...",
  "status": "created",
  "expiresAt": "2025-09-20T00:00:00Z"
}

- GET /verifyID?blockchainId=bc_0xabc123

Response:
{
  "blockchainId": "bc_0xabc123",
  "userId": "t123",
  "valid": true,
  "issuedAt": "2025-09-15T00:00:00Z",
  "expiresAt": "2025-09-20T00:00:00Z"
}

## Run

pnpm run dev:blockchain

## Swap to real service

Set BLOCKCHAIN_API_URL to your provider base URL; backend forwards requests via /api/bridge/blockchain/*.
