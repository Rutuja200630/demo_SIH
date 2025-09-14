import "dotenv/config";
import express from "express";
import cors from "cors";
import { handleDemo } from "./routes/demo";
import path from "path";
import fs from "fs";

// Simple in-memory stores for dev phase
type Alert = {
  alertId: string;
  userId: string;
  type: string;
  location: { lat: number; lng: number };
  severity: string;
  status: string;
  timestamp: string;
  acknowledgedBy?: string;
};

let alerts: Alert[] = [];
type Tourist = {
  _id: string;
  name: string;
  email: string;
  phone?: string;
  itinerary?: string;
  emergencyName?: string;
  emergencyPhone?: string;
  documentType?: "aadhaar" | "passport";
  documentNumber?: string;
  documentFileName?: string;
  verificationStatus: "pending" | "verified" | "rejected";
  blockchainId?: string;
  applicationDate?: string;
};
let tourists: Tourist[] = [];

function loadSeedData() {
  try {
    const seedPath = path.join(process.cwd(), "seed_data", "tourists.json");
    if (fs.existsSync(seedPath)) {
      const raw = fs.readFileSync(seedPath, "utf-8");
      tourists = JSON.parse(raw);
    }
  } catch (e) {
    // ignore seed load errors in dev
  }
}

export function createServer() {
  const app = express();

  // Middleware
  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  loadSeedData();

  // Example API routes
  app.get("/api/ping", (_req, res) => {
    const ping = process.env.PING_MESSAGE ?? "ping";
    res.json({ message: ping });
  });

  app.get("/api/demo", handleDemo);

  // Auth (mocked)
  app.post("/api/auth/register", (req, res) => {
    const { name, email, phone, password, itinerary, emergencyName, emergencyPhone, documentType, documentNumber, documentFileName } = req.body ?? {};
    if (!name || !email) return res.status(400).json({ error: "invalid_input" });
    const userId = `t${Date.now()}`;
    const record: Tourist = {
      _id: userId,
      name,
      email,
      phone,
      itinerary,
      emergencyName,
      emergencyPhone,
      documentType,
      documentNumber,
      documentFileName,
      verificationStatus: "pending",
      applicationDate: new Date().toISOString(),
    };
    tourists.push(record);
    res.json({ success: true, userId, status: "pending_verification" });
  });

  app.post("/api/auth/login", (req, res) => {
    const { email } = req.body ?? {};
    const user = tourists.find((t) => t.email === email) ?? tourists[0];
    res.json({ token: "dev_token", refreshToken: "dev_refresh", role: "tourist", userId: user?._id ?? "t000" });
  });

  // Tourists
  app.get("/api/tourists", (_req, res) => {
    res.json({ data: tourists, total: tourists.length });
  });

  app.get("/api/tourists/:id", (req, res) => {
    const t = tourists.find((x) => String(x._id) === String(req.params.id));
    if (!t) return res.status(404).json({ error: "not_found" });
    res.json({ ...t });
  });

  // Alerts
  app.get("/api/alerts", (_req, res) => {
    res.json({ data: alerts.slice(-100).reverse() });
  });

  app.post("/api/alerts/panic", (req, res) => {
    const { userId, location, timestamp, notes } = req.body ?? {};
    const id = `a_${Date.now()}`;
    const t = tourists.find((x) => String(x._id) === String(userId));
    const payload: Alert = {
      alertId: id,
      userId: userId ?? "t000",
      type: "panic",
      location: location ?? { lat: 28.6139, lng: 77.209 },
      severity: "high",
      status: "active",
      timestamp: timestamp ?? new Date().toISOString(),
    };
    alerts.push(payload);

    const io = (req.app as any).get("io");
    if (io) {
      io.emit("panic_alert", {
        alertId: payload.alertId,
        userId: payload.userId,
        name: t?.name ?? "Unknown",
        location: payload.location,
        severity: payload.severity,
        timestamp: payload.timestamp,
        notes,
      });
    }

    res.json({ success: true, alertId: id });
  });

  // Admin verification APIs
  app.get("/api/admin/pending-verifications", (_req, res) => {
    const pending = tourists.filter((t) => t.verificationStatus === "pending");
    res.json({ data: pending });
  });

  app.post("/api/admin/approve/:userId", async (req, res) => {
    const { userId } = req.params;
    const t = tourists.find((x) => x._id === userId);
    if (!t) return res.status(404).json({ error: "not_found" });
    try {
      const r = await fetch(`${BLOCKCHAIN_API_URL}/createID`, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ name: t.name, documentType: t.documentType, documentNumber: t.documentNumber }),
      });
      const json = await r.json();
      t.blockchainId = json?.blockchainId ?? `bc_${userId}`;
      t.verificationStatus = "verified";
      return res.json({ success: true, blockchainId: t.blockchainId });
    } catch (e: any) {
      return res.status(502).json({ error: "blockchain_error", details: e?.message });
    }
  });

  app.post("/api/admin/reject/:userId", (req, res) => {
    const { userId } = req.params;
    const t = tourists.find((x) => x._id === userId);
    if (!t) return res.status(404).json({ error: "not_found" });
    t.verificationStatus = "rejected";
    res.json({ success: true });
  });

  // Bridge proxies
  const BLOCKCHAIN_API_URL = process.env.BLOCKCHAIN_API_URL || "http://localhost:5002";
  const AIML_API_URL = process.env.AIML_API_URL || "http://localhost:5003";

  app.post("/api/bridge/blockchain/createID", async (req, res) => {
    try {
      const r = await fetch(`${BLOCKCHAIN_API_URL}/createID`, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(req.body ?? {}),
      });
      const json = await r.json();
      res.status(r.status).json(json);
    } catch (e: any) {
      res.status(502).json({ error: "upstream_unreachable", details: e?.message });
    }
  });

  app.get("/api/bridge/blockchain/verifyID", async (req, res) => {
    try {
      const url = new URL(`${BLOCKCHAIN_API_URL}/verifyID`);
      if (req.query.blockchainId) url.searchParams.set("blockchainId", String(req.query.blockchainId));
      const r = await fetch(url);
      const json = await r.json();
      res.status(r.status).json(json);
    } catch (e: any) {
      res.status(502).json({ error: "upstream_unreachable", details: e?.message });
    }
  });

  app.post("/api/bridge/aiml/safetyScore", async (req, res) => {
    try {
      const r = await fetch(`${AIML_API_URL}/safetyScore`, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(req.body ?? {}),
      });
      const json = await r.json();
      res.status(r.status).json(json);
    } catch (e: any) {
      res.status(502).json({ error: "upstream_unreachable", details: e?.message });
    }
  });

  app.post("/api/bridge/aiml/detectAnomaly", async (req, res) => {
    try {
      const r = await fetch(`${AIML_API_URL}/detectAnomaly`, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(req.body ?? {}),
      });
      const json = await r.json();
      res.status(r.status).json(json);
    } catch (e: any) {
      res.status(502).json({ error: "upstream_unreachable", details: e?.message });
    }
  });

  return app;
}
