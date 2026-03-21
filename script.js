async function loadFiles() {
  const res = await fetch("/api/list");
  const data = await res.json();

  const container = document.querySelector(".container");

  data.files.forEach(file => {
    const div = document.createElement("div");
    div.className = "card";
    div.innerText = "📄 " + file;

    div.onclick = () => downloadFile(file);

    container.appendChild(div);
  });
}

async function downloadFile(file) {
  const res = await fetch(`/api/generate?file=${file}`);
  const data = await res.json();

  window.location.href = data.url;
}

loadFiles();
