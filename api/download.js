import path from "path";

export default function handler(req, res) {
  const { data } = req.query;

  if (!data) return res.status(400).send("Invalid");

  const payload = JSON.parse(Buffer.from(data, "base64").toString());

  if (Date.now() > payload.exp) {
    return res.status(403).send("Expired link");
  }

  const file = payload.file;
  const ext = path.extname(file).toLowerCase();

  // Determine thumbnail for OG
  let thumbnail = "https://i.ibb.co/Thumbnails/default.png"; // default image
  if (ext === ".mp4" || ext === ".mov") thumbnail = "/files/video-thumb.png";
  else if (ext === ".jpg" || ext === ".png") thumbnail = `/files/${file}`;
  else if (ext === ".zip") thumbnail = "https://i.ibb.co/Thumbnails/zip.png";
  else if (ext === ".pdf") thumbnail = "https://i.ibb.co/Thumbnails/pdf.png";

  // Serve HTML page with OG tags
  res.setHeader("Content-Type", "text/html");
  res.send(`
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>${file}</title>

  <!-- Open Graph / Facebook -->
  <meta property="og:type" content="website">
  <meta property="og:title" content="${file}">
  <meta property="og:description" content="Download ${file} from iHost">
  <meta property="og:image" content="${thumbnail}">
  <meta property="og:url" content="${req.headers.host}${req.url}">

  <!-- Twitter -->
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="${file}">
  <meta name="twitter:description" content="Download ${file} from iHost">
  <meta name="twitter:image" content="${thumbnail}">

  <script>
    // Auto-download the file after page loads
    window.onload = () => {
      const link = document.createElement('a');
      link.href = '/files/${file}';
      link.download = '${file}';
      document.body.appendChild(link);
      link.click();
    }
  </script>
</head>
<body>
  <p>Preparing download for ${file}...</p>
</body>
</html>
  `);
}
