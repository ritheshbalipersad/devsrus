// Optional: use this as "Application startup file" if your host requires one.
// Otherwise, use "Run command": npm run start
const { createServer } = require("http");
const { parse } = require("url");
const next = require("next");

const dev = process.env.NODE_ENV !== "production";
// Bind to 0.0.0.0 so the app is reachable via public URL (e.g. cPanel)
const host = process.env.HOST || "0.0.0.0";
const port = process.env.PORT || 3000;

const app = next({ dev, hostname: host, port });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  createServer((req, res) => {
    const parsedUrl = parse(req.url, true);
    handle(req, res, parsedUrl);
  })
    .once("error", (err) => {
      console.error(err);
      process.exit(1);
    })
    .listen(port, host, () => {
      console.log(`Ready on http://${host}:${port} (accessible from all interfaces)`);
    });
});