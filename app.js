const http = require('http');
const url = require('url');

const PORT = process.env.PORT || 3000;

const server = http.createServer((req, res) => {
  const query = url.parse(req.url, true).query;
  const videoUrl = query.video;

  res.writeHead(200, { 'Content-Type': 'text/html' });
  res.end(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <title>HLS Video Player</title>
      <style>
        body {
          margin: 0;
          background-color: #000;
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100vh;
        }
        video {
          width: 90%;
          max-width: 800px;
          border: 2px solid #fff;
          border-radius: 12px;
        }
      </style>
    </head>
    <body>
      <video id="video" controls autoplay></video>

      <script src="https://cdn.jsdelivr.net/npm/hls.js@latest"></script>
      <script>
        const video = document.getElementById('video');
        const videoUrl = "${videoUrl}";

        if (Hls.isSupported()) {
          const hls = new Hls();
          hls.loadSource(videoUrl);
          hls.attachMedia(video);
        } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
          video.src = videoUrl;
        } else {
          alert('Your browser does not support HLS playback.');
        }
      </script>
    </body>
    </html>
  `);
});

server.listen(PORT, () => {
  console.log(\`🚀 Server running at http://localhost:\${PORT}/?video=رابط_HLS\`);
});
