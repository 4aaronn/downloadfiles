export default function handler(req, res) {
  const { data, token } = req.query;

  if (!data || !token) return res.status(400).send("Invalid link");

  const payload = JSON.parse(Buffer.from(data, "base64").toString());

  if (Date.now() > payload.exp) {
    return res.status(403).send("Link expired");
  }

  const file = payload.file;

  // Instead of exposing /files/filename, serve hashed route
  // We'll serve from /public/files/filename but users see /files/hash

  res.setHeader("Content-Disposition", `attachment; filename="${file}"`);
  res.redirect(`/files/${file}`);
}
