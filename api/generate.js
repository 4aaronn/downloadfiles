import crypto from "crypto";

const secret = process.env.HASH_SECRET || "supersecret"; // optional secret

export default function handler(req, res) {
  const { file } = req.query;

  if (!file) return res.status(400).json({ error: "No file specified" });

  // Create a hash based on filename + timestamp + secret
  const token = crypto
    .createHmac("sha256", secret)
    .update(file + Date.now())
    .digest("hex")
    .slice(0, 16); // short 16-char hash

  // Encode the mapping in base64 (for download)
  const payload = Buffer.from(JSON.stringify({ file, exp: Date.now() + 1000 * 120 })) // 2 min
    .toString("base64");

  // Return hashed URL
  res.json({
    url: `/api/download?token=${token}&data=${payload}`
  });
}
