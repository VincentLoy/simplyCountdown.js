import http from 'http';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';
import fs from 'fs';
import { spawn } from 'child_process';

const __dirname = dirname(fileURLToPath(import.meta.url));
const docsDir = resolve(__dirname, '..', 'docs');
const PORT = 8000;

const server = http.createServer((req, res) => {
    const filePath = resolve(docsDir, req.url === '/' ? 'index.html' : req.url.slice(1));
    
    fs.readFile(filePath, (err, data) => {
        if (err) {
            res.writeHead(404);
            res.end('File not found');
            return;
        }

        const ext = filePath.split('.').pop();
        const contentTypes = {
            'html': 'text/html',
            'css': 'text/css',
            'js': 'application/javascript',
            'png': 'image/png',
            'jpg': 'image/jpeg',
            'jpeg': 'image/jpeg',
            'gif': 'image/gif',
            'svg': 'image/svg+xml'
        };

        res.writeHead(200, { 'Content-Type': contentTypes[ext] || 'text/plain' });
        res.end(data);
    });
});

server.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
    // Open browser
    spawn('xdg-open', [`http://localhost:${PORT}`], {
        stdio: 'inherit'
    });
});

// Handle graceful shutdown
process.on('SIGINT', () => {
    console.log('\nShutting down server...');
    server.close();
    process.exit(0);
});
