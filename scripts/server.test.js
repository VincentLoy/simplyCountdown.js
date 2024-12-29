import { createServer } from "http";
import handler from "serve-handler";
import { spawn } from "child_process";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = 5173;

const server = createServer((request, response) => {
    return handler(request, response, {
        public: path.join(__dirname, ".."),
        cleanUrls: false,
    });
});

server.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}/dist_tests/index.es.html`);

    const openCommand = process.platform === "win32" ? "start" : process.platform === "darwin" ? "open" : "xdg-open";

    spawn(openCommand, [`http://localhost:${PORT}/dist_tests/index.es.html`], {
        stdio: "ignore",
        detached: true,
    }).unref();
});

// Handle CTRL+C to stop server
process.on("SIGINT", () => {
    server.close();
    process.exit();
});
