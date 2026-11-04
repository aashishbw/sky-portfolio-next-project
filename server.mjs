import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
const root=path.dirname(fileURLToPath(import.meta.url));
const types={'.html':'text/html; charset=utf-8','.css':'text/css; charset=utf-8','.js':'text/javascript; charset=utf-8','.jpg':'image/jpeg','.png':'image/png'};
http.createServer((req,res)=>{let name;try{name=decodeURIComponent(new URL(req.url,'http://localhost').pathname)}catch{res.writeHead(400).end();return}if(name==='/')name='/index.html';const file=path.resolve(root,'.'+name);if(!file.startsWith(root+path.sep)||name.endsWith('.mjs')||name.includes('/.')){res.writeHead(403).end();return}try{const data=fs.readFileSync(file);res.writeHead(200,{'Content-Type':types[path.extname(file)]||'application/octet-stream','Cache-Control':'no-store'});res.end(data)}catch{res.writeHead(404).end('Not found')}}).listen(4180,'127.0.0.1',()=>console.log('Local preview: http://localhost:4180'));
