import fs from "fs";
import path from "path";

export default function handler(req, res) {
  const dir = path.join(process.cwd(), "files");

  try {
    const files = fs.readdirSync(dir);

    res.json({
      files
    });
  } catch (err) {
    res.status(500).json({ error: "Cannot read files" });
  }
}
