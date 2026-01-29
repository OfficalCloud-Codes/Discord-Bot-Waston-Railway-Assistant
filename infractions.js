import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const BASE_DIR = path.join(__dirname, "infractions");

function sanitizeUsername(username) {
  if (typeof username !== "string") {
    throw new Error("Username must be a string");
  }

  const sanitized = username
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9_-]/g, "");

  if (!sanitized) {
    throw new Error("Invalid username after sanitization");
  }

  return sanitized;
}

export function addInfraction(username, infraction, reason, action) {
  const safeUsername = sanitizeUsername(username);

  if (!fs.existsSync(BASE_DIR)) {
    fs.mkdirSync(BASE_DIR, { recursive: true });
  }

  const filePath = path.join(BASE_DIR, `${safeUsername}.json`);

  let data = {
    username: safeUsername,
    infractions: []
  };

  if (fs.existsSync(filePath)) {
    data = JSON.parse(fs.readFileSync(filePath, "utf8"));
  }

  data.infractions.push({
    infraction,
    reason,
    action,
    timestamp: new Date().toISOString()
  });

  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
}

export function getInfractions(username) {
  const safeUsername = sanitizeUsername(username);
  const filePath = path.join(BASE_DIR, `${safeUsername}.json`);

  if (!fs.existsSync(filePath)) {
    return ["No infractions for this user"];
  }

  const data = JSON.parse(fs.readFileSync(filePath, "utf8"));
  return data.infractions;
  
}
