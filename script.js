async function downloadFile(file) {
  try {
    const res = await fetch(`/api/generate?file=${file}`);
    const data = await res.json();

    // iOS-like smooth redirect
    window.location.href = data.url;

  } catch (err) {
    alert("Download failed");
  }
}
