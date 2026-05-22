import express from "express";
import path from "path";
import fs from "fs";
import { createServer as createViteServer } from "vite";

const app = express();
const PORT = 3000;

// Enable JSON body parsing with standard limits
app.use(express.json({ limit: "50mb" }));

// Ensure database folders and files exist
const DATA_DIR = path.join(process.cwd(), "data");
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

const CONFIG_PATH = path.join(DATA_DIR, "site-config.json");
const LEADS_PATH = path.join(DATA_DIR, "leads.json");

// Helper to read JSON safely from files
const readJsonFile = (filePath: string, defaultValue: any) => {
  if (!fs.existsSync(filePath)) {
    return defaultValue;
  }
  try {
    const content = fs.readFileSync(filePath, "utf-8");
    return JSON.parse(content);
  } catch (err) {
    console.error(`Error reading ${filePath}, using fallback`, err);
    return defaultValue;
  }
};

// Helper to write JSON safely to files
const writeJsonFile = (filePath: string, data: any) => {
  try {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), "utf-8");
    return true;
  } catch (err) {
    console.error(`Error writing to ${filePath}:`, err);
    return false;
  }
};

// API Endpoint: Get the global, central waterproofing configurations
app.get("/api/config", (req, res) => {
  const config = readJsonFile(CONFIG_PATH, null);
  if (!config) {
    // If not configured on disk yet, return empty object (client uses local default fallback)
    return res.json({});
  }
  res.json(config);
});

// API Endpoint: Save modifications directly to backend database
app.post("/api/config", (req, res) => {
  const newConfig = req.body;
  if (!newConfig || typeof newConfig !== "object") {
    return res.status(400).json({ error: "Invalid payload config" });
  }
  const success = writeJsonFile(CONFIG_PATH, newConfig);
  if (success) {
    res.json({ status: "ok" });
  } else {
    res.status(500).json({ error: "Failed to persist configuration to disk" });
  }
});

// API Endpoint: Reset configuration to default on backend disk
app.post("/api/config/reset", (req, res) => {
  try {
    if (fs.existsSync(CONFIG_PATH)) {
      fs.unlinkSync(CONFIG_PATH);
    }
    res.json({ status: "ok" });
  } catch (err) {
    res.status(500).json({ error: "Failed to reset server specification" });
  }
});

// API Endpoint: Retrieve customer survey registrations
app.get("/api/leads", (req, res) => {
  const leads = readJsonFile(LEADS_PATH, []);
  res.json(leads);
});

// API Endpoint: Submits a new customer registration from the calculator
app.post("/api/leads", (req, res) => {
  const newLead = req.body;
  if (!newLead || !newLead.fullName || !newLead.phone) {
    return res.status(400).json({ error: "Lead payload is missing name or phone number" });
  }
  const currentLeads = readJsonFile(LEADS_PATH, []);
  const updatedLeads = [newLead, ...currentLeads];
  const success = writeJsonFile(LEADS_PATH, updatedLeads);
  if (success) {
    res.json({ status: "ok" });
  } else {
    res.status(500).json({ error: "Failed to write customer lead to database" });
  }
});

// API Endpoint: Delete a specific customer survey registration
app.delete("/api/leads/:id", (req, res) => {
  const leadId = req.params.id;
  const currentLeads = readJsonFile(LEADS_PATH, []);
  const updatedLeads = currentLeads.filter((l: any) => l.id !== leadId);
  const success = writeJsonFile(LEADS_PATH, updatedLeads);
  if (success) {
    res.json({ status: "ok" });
  } else {
    res.status(500).json({ error: "Failed to delete lead from database" });
  }
});

// API Endpoint: Clear entire registrations database
app.delete("/api/leads", (req, res) => {
  const success = writeJsonFile(LEADS_PATH, []);
  if (success) {
    res.json({ status: "ok" });
  } else {
    res.status(500).json({ error: "Failed to wipe backend leads database" });
  }
});

// Initialize Express + Vite Setup
async function start() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server is running internally on http://0.0.0.0:${PORT}`);
  });
}

start().catch((err) => {
  console.error("Critical: Failed to launch backend node server:", err);
});
