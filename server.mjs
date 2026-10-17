import {createServer} from 'node:http';
import {readFile} from 'node:fs/promises';
import {fileURLToPath} from 'node:url';
import {runLab} from './lib/agent.mjs';
const root=new URL('./public/',import.meta.url);
let busy=false;
const server=createServer(async(req,res)=>{
  res.setHeader('X-Content-Type-Options','nosniff');
  res.setHeader('Content-Security-Policy',"default-src 'self'; script-src 'self'; style-src 'self'; connect-src 'self'; img-src 'self' data:; frame-ancestors 'none'; base-uri 'none'; form-action 'self'");
  res.setHeader('Cache-Control','no-store');
  const url=new URL(req.url,'http://localhost');
  if(req.method==='GET'&&url.pathname==='/api/status') {res.setHeader('Content-Type','application/json');res.end(JSON.stringify({ready:!!(process.env.CREATEOS_API_KEY&&process.env.OPENROUTER_API_KEY)}));return;}
  if(req.method==='POST'&&url.pathname==='/api/lab') {
    // Reject cross-site and cross-origin requests before spending provider credits.
    if(req.headers['sec-fetch-site']==='cross-site'||(req.headers.origin&&req.headers.origin!==`http://${req.headers.host}`&&req.headers.origin!==`https://${req.headers.host}`)) {res.writeHead(403);res.end();return;}
    if(busy) {res.writeHead(429);res.end();return;}
    busy=true;
    try {
      let body='';for await(const chunk of req){body+=chunk;if(body.length>4096)throw new Error('INVALID_INPUT');}
      res.writeHead(200,{'Content-Type':'application/x-ndjson'});
      const emit=event=>res.write(JSON.stringify(event)+'\n');
      const result=await runLab(JSON.parse(body),{emit});
      emit({stage:'complete',result});
    } catch(e) {
      if(!res.headersSent) res.writeHead(400,{'Content-Type':'application/x-ndjson'});
      const known=['SETUP_REQUIRED','INVALID_INPUT','REPAIR_EXHAUSTED','SANDBOX_NOT_READY'];
      res.write(JSON.stringify({stage:'error',code:known.includes(e.message)?e.message:'PROVIDER_ERROR'})+'\n');
    } finally {busy=false;res.end();} return;
  }
  const files={'/':'index.html','/app.mjs':'app.mjs','/style.css':'style.css','/i18n.mjs':'i18n.mjs','/math.mjs':'../lib/math.mjs'};
  if(req.method!=='GET'||!Object.hasOwn(files,url.pathname)){res.writeHead(404);res.end();return;}
  try {const name=files[url.pathname];res.setHeader('Content-Type',name.endsWith('.html')?'text/html; charset=utf-8':name.endsWith('.css')?'text/css; charset=utf-8':'text/javascript; charset=utf-8');res.end(await readFile(fileURLToPath(new URL(name,root))));}catch{res.writeHead(500);res.end();}
});
server.listen(Number(process.env.PORT||3000),process.env.HOST||'127.0.0.1',()=>console.log('StudyForge: http://localhost:'+(process.env.PORT||3000)));
