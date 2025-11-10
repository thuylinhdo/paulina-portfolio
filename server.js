const http = require('http');
const fs = require('fs');
const path = require('path');

const host = process.env.HOST || '0.0.0.0';
const port = Number(process.env.PORT) || 3000;
const rootDir = __dirname;

const contentTypeByExt = {
	'.html': 'text/html; charset=utf-8',
	'.css': 'text/css; charset=utf-8',
	'.js': 'application/javascript; charset=utf-8',
	'.json': 'application/json; charset=utf-8',
	'.png': 'image/png',
	'.jpg': 'image/jpeg',
	'.jpeg': 'image/jpeg',
	'.gif': 'image/gif',
	'.svg': 'image/svg+xml',
	'.ico': 'image/x-icon',
	'.webp': 'image/webp',
	'.woff': 'font/woff',
	'.woff2': 'font/woff2'
};

function sendFile(res, filePath){
	fs.readFile(filePath, function(err, data){
		if (err){
			if (err.code === 'ENOENT'){
				res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
				res.end('404 Not Found');
			} else {
				res.writeHead(500, { 'Content-Type': 'text/plain; charset=utf-8' });
				res.end('500 Internal Server Error');
			}
			return;
		}
		const ext = path.extname(filePath).toLowerCase();
		const contentType = contentTypeByExt[ext] || 'application/octet-stream';
		res.writeHead(200, {
			'Content-Type': contentType,
			'Cache-Control': 'no-cache'
		});
		res.end(data);
	});
}

const server = http.createServer(function(req, res){
	const urlPath = decodeURI(req.url.split('?')[0]);
	let safePath = urlPath === '/' ? '/index.html' : urlPath;
	// Prevent directory traversal
	safePath = path.normalize(safePath).replace(/^(\.\.[/\\])+/, '');
	const filePath = path.join(rootDir, safePath);

	fs.stat(filePath, function(err, stats){
		if (!err && stats.isDirectory()){
			const indexPath = path.join(filePath, 'index.html');
			return fs.stat(indexPath, function(indexErr){
				if (!indexErr) return sendFile(res, indexPath);
				res.writeHead(403, { 'Content-Type': 'text/plain; charset=utf-8' });
				res.end('Directory access is forbidden');
			});
		}
		if (!err) return sendFile(res, filePath);
		// Fallback to SPA-ish behavior: serve index.html for unknown paths
		if (urlPath.startsWith('/#') || urlPath.startsWith('/?')){
			return sendFile(res, path.join(rootDir, 'index.html'));
		}
		res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
		res.end('404 Not Found');
	});
});

server.listen(port, host, function(){
	const displayHost = host === '0.0.0.0' ? 'localhost' : host;
	console.log(`Server running at http://${displayHost}:${port}`);
});


