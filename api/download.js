export default function handler(req, res) {
  const { data } = req.query;

  if (!data) return res.status(400).send("Invalid");

  const payload = JSON.parse(
    Buffer.from(data, "base64").toString()
  );

  if (Date.now() > payload.exp) {
    return res.status(403).send("Expired");
  }

  // Redirect to public file
  res.redirect(`/files/${payload.file}`);
}
