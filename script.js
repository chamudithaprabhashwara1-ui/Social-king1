// Upload video
function uploadVideo() {
  const file = document.getElementById("videoFile").files[0];
  const title = document.getElementById("title").value;

  if (!file || !title) {
    alert("Please select video & title");
    return;
  }

  const reader = new FileReader();
  reader.onload = function () {
    const videos = JSON.parse(localStorage.getItem("videos")) || [];

    videos.push({
      id: Date.now(),
      title: title,
      src: reader.result,
      views: 0,
      likes: 0
    });

    localStorage.setItem("videos", JSON.stringify(videos));
    document.getElementById("uploadStatus").innerText = "✅ Upload Successful!";
  };

  reader.readAsDataURL(file);
}

// Load videos to home page
function loadVideos() {
  const container = document.getElementById("videoGrid");
  if (!container) return;

  const videos = JSON.parse(localStorage.getItem("videos")) || [];
  container.innerHTML = "";

  videos.forEach(video => {
    const card = document.createElement("div");
    card.className = "video-card";
    card.innerHTML = `
      <video src="${video.src}" muted></video>
      <h4>${video.title}</h4>
      <p>${video.views} views</p>
    `;
    card.onclick = () => {
      localStorage.setItem("currentVideo", video.id);
      window.location.href = "watch.html";
    };
    container.appendChild(card);
  });
}

// Watch page
function loadWatchVideo() {
  const id = localStorage.getItem("currentVideo");
  const videos = JSON.parse(localStorage.getItem("videos")) || [];
  const video = videos.find(v => v.id == id);

  if (!video) return;

  video.views++;
  localStorage.setItem("videos", JSON.stringify(videos));

  document.getElementById("player").src = video.src;
  document.getElementById("videoTitle").innerText = video.title;
  document.getElementById("views").innerText = video.views;
}

// Creator Studio
function loadStudio() {
  const list = document.getElementById("studioList");
  const videos = JSON.parse(localStorage.getItem("videos")) || [];

  list.innerHTML = "";
  videos.forEach(v => {
    list.innerHTML += `
      <div class="studio-item">
        <h4>${v.title}</h4>
        <p>${v.views} views | ${v.likes} likes</p>
      </div>
    `;
  });
}
