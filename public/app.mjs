import {copy} from './i18n.mjs';
import {reference,functions} from './math.mjs';
const $=id=>document.getElementById(id);
let locale=localStorage.getItem('studyforge-locale')||'en';if(!copy[locale])locale='en';
let result,labInput,events=[],running=false,cleanupFailed=false;
const t=()=>copy[locale];
const number=n=>new Intl.NumberFormat(locale,{maximumFractionDigits:6}).format(n);
function input(){return {fn:$('fn').value,x:Number($('x').value),h:Number($('h').value),locale};}
function questions(items){$('questions').replaceChildren();for(const q of items){const div=document.createElement('div');div.className='question';const p=document.createElement('div');p.textContent=q.prompt;div.append(p);for(const [key,label]of [['hint','hint'],['answer','answer']]){const d=document.createElement('details'),s=document.createElement('summary'),a=document.createElement('p');s.textContent=t()[label];a.textContent=q[key];d.append(s,a);div.append(d);}$('questions').append(div);}}
function renderContent(){
  document.documentElement.lang=locale;$('locale').value=locale;
  for(const el of document.querySelectorAll('[data-t]')){const value=t()[el.dataset.t];if(typeof value==='string')el.textContent=value;}
  $('mode').textContent=result?.mode==='live'?t().live:t().reference;
  $('explanation').textContent=result?.mode==='live'?result.explanation:t().explain;
  questions(result?.mode==='live'?result.questions:t().questions.map(([prompt,hint,answer])=>({prompt,hint,answer})));
  $('source').textContent=result?.code||t().noCode;
  $('trace').replaceChildren();for(const e of events){const li=document.createElement('li');li.textContent=(t().events[e.stage]||e.stage)+(e.attempt?' · '+e.attempt:'');$('trace').append(li);}
  $('chart').setAttribute('aria-label',`${t().curve}, ${t().secant}, ${t().tangent}`);
  if(result)draw();
}
function svg(name,attrs,text){const el=document.createElementNS('http://www.w3.org/2000/svg',name);for(const[k,v]of Object.entries(attrs))el.setAttribute(k,String(v));if(text!==undefined)el.textContent=text;return el;}
function draw(){
  const row=result.rows[Number($('sample').value)],{x,fn}=labInput,f=functions[fn].f,y=f(x),points=result.points;
  $('slope').textContent=number(row.slope);$('derivative').textContent=number(result.derivative);$('error').textContent=number(row.error);$('step-value').textContent='h = '+number(row.h);
  const prediction=$('prediction').value;$('comparison').textContent=prediction===''?'':`${t().comparison}: ${number(Number(prediction))} · Δ = ${number(Math.abs(Number(prediction)-result.derivative))}`;
  const chart=$('chart');chart.replaceChildren();
  const minX=x-2,maxX=x+2,ys=points.map(p=>p.y);let minY=Math.min(...ys,y-1),maxY=Math.max(...ys,y+1);const padding=(maxY-minY)*.15;minY-=padding;maxY+=padding;
  const X=v=>48+(v-minX)/(maxX-minX)*640,Y=v=>290-(v-minY)/(maxY-minY)*260;
  const defs=svg('defs',{}),clip=svg('clipPath',{id:'plot'});clip.append(svg('rect',{x:48,y:30,width:640,height:260}));defs.append(clip);chart.append(defs);
  for(let i=0;i<=4;i++){const tx=minX+i;chart.append(svg('line',{x1:X(tx),y1:30,x2:X(tx),y2:290,stroke:'#ece8f3'}));chart.append(svg('text',{x:X(tx),y:312,fill:'#a69ab5','font-size':10,'text-anchor':'middle'},number(tx)));const ty=minY+(maxY-minY)*i/4;chart.append(svg('line',{x1:48,y1:Y(ty),x2:688,y2:Y(ty),stroke:'#ece8f3'}));chart.append(svg('text',{x:39,y:Y(ty)+3,fill:'#a69ab5','font-size':9,'text-anchor':'end'},number(ty)));}
  const group=svg('g',{'clip-path':'url(#plot)'});group.append(svg('path',{d:points.map((p,i)=>(i?'L':'M')+X(p.x)+','+Y(p.y)).join(' '),fill:'none',stroke:'#8460e2','stroke-width':3}));
  for(const[slope,color,dash]of [[row.slope,'#e6a074','6 4'],[result.derivative,'#50aaa0','']])group.append(svg('line',{x1:X(minX),y1:Y(y+slope*(minX-x)),x2:X(maxX),y2:Y(y+slope*(maxX-x)),stroke:color,'stroke-width':2,'stroke-dasharray':dash}));
  for(const[px,py,color]of [[x,y,'#7953d8'],[x+row.h,f(x+row.h),'#e6a074']])group.append(svg('circle',{cx:X(px),cy:Y(py),r:5,fill:color,stroke:'white','stroke-width':2}));chart.append(group);
}
function preview(){try{labInput=input();result={...reference(labInput),mode:'reference'};events=[];cleanupFailed=false;$('status').textContent='';$('sample').value='0';renderContent();}catch{$('status').textContent=t().runError;}}
$('preview').onclick=preview;$('sample').oninput=draw;$('prediction').oninput=()=>{if(result)draw();};
for(const id of ['fn','x','h'])$(id).onchange=preview;
$('locale').onchange=()=>{locale=$('locale').value;localStorage.setItem('studyforge-locale',locale);if(result?.mode==='live')preview();else renderContent();};
$('lab').onsubmit=async e=>{
  e.preventDefault();if(running)return;running=true;events=[];cleanupFailed=false;
  for(const id of ['run','preview','fn','x','h','locale'])$(id).disabled=true;
  $('status').textContent=t().working;$('trace').replaceChildren();$('source').textContent=t().noCode;
  try{
    const selected=input();const response=await fetch('/api/lab',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(selected)});
    if(!response.ok)throw new Error('PROVIDER_ERROR');
    const reader=response.body.getReader(),decoder=new TextDecoder();let pending='',completed=false;
    while(true){const{value,done}=await reader.read();pending+=decoder.decode(value||new Uint8Array(),{stream:!done});const lines=pending.split('\n');pending=lines.pop();for(const line of lines){if(!line.trim())continue;const event=JSON.parse(line);if(event.stage==='error')throw new Error(event.code);if(event.stage==='complete'){result=event.result;labInput=selected;completed=true;$('sample').value='0';renderContent();$('status').textContent=cleanupFailed?t().cleanupWarning:t().done;}else{events.push(event);if(event.code)$('source').textContent=event.code;const li=document.createElement('li');li.textContent=(t().events[event.stage]||event.stage)+(event.attempt?' · '+event.attempt:'');$('trace').append(li);if(event.stage==='cleanupFailed')cleanupFailed=true;}}if(done)break;}
    if(!completed)throw new Error('PROVIDER_ERROR');
  }catch(error){$('status').textContent=error.message==='SETUP_REQUIRED'?t().setupError:t().runError;if(cleanupFailed)$('status').textContent+=' '+t().cleanupWarning;}
  finally{running=false;for(const id of ['run','preview','fn','x','h','locale'])$(id).disabled=false;}
};
preview();fetch('/api/status').then(r=>r.json()).then(s=>{$('setup').hidden=s.ready;}).catch(()=>{$('setup').hidden=false;});
