import crypto from "crypto";

export default function handler(req, res) {
  const { file } = req.query;

  const payload = {
    file,
    exp: Date.now() + 1000 * 60 * 2 // 2 min
  };

  const data = Buffer.from(JSON.stringify(payload)).toString("base64");

  const token = crypto.randomBytes(12).toString("hex");

  res.json({
    url: `/api/download?token=${token}&data=${data}`
  });
}
