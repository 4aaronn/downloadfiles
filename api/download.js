import fs from "fs";
import path from "path";

export default function handler(req, res) {
  const { data } = req.query;

  if (!data) return res.status(400).send("Invalid");

  const payload = JSON.parse(
    Buffer.from(data, "base64").toString()
  );

  if (Date.now() > payload.exp) {
    return res.status(403).send("Expired link");
  }

  const filePath = path.join(process.cwd(), "files", payload.file);

  if (!fs.existsSync(filePath)) {
    return res.status(404).send("Not found");
  }

  res.setHeader(
    "Content-Disposition",
    `attachment; filename=${payload.file}`
  );

  res.sendFile(filePath);
}
