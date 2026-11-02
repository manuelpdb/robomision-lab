"use strict";
/* RoboMisión LAB v6 | Bloques REALES: render oficial de Microsoft MakeCode.
 * Manual técnico: https://makecode.microbit.org/blocks-embed
 * No se generan capturas simuladas ni se sustituyen por dibujos.
 */
(()=>{
 const editor='https://makecode.microbit.org';
 let frame=null,ready=false,failed=false,seq=0,active=null,alarm=null;
 const queue=[],cache=new Map();
 function status(host,message,kind){
  if(!host.isConnected)return;
  const el=host.querySelector('.mk6-status');
  if(el){el.textContent=message;el.dataset.state=kind||'wait';}
 }
 function pump(){
  if(!ready||!frame||active||!queue.length)return;
  let job=queue.shift();
  if(!job.host.isConnected||job.host.dataset.job!==job.id){pump();return;}
  active=job;
  status(job.host,'Generando la imagen con los bloques originales de MakeCode…','wait');
  alarm=setTimeout(()=>complete(null,'MakeCode no ha respondido a tiempo.'),20000);
  try{frame.contentWindow.postMessage({type:'renderblocks',id:job.id,code:job.code,options:{snippetMode:true}},editor);}catch(e){complete(null,'Error al comunicar con el editor MakeCode.');}
 }
 function complete(result,error){
  clearTimeout(alarm);alarm=null;
  const job=active;active=null;
  if(!job){pump();return;}
  if(result){
   cache.set(job.cacheKey,result);
   showImage(job.host,result,job.cacheKey);
  }else{
   status(job.host,error||'MakeCode no ha podido dibujar este programa.','bad');
   const btn=job.host.querySelector('.mk6-retry');if(btn)btn.hidden=false;
  }
  pump();
 }
 function showImage(host,result,name){
  if(!host.isConnected)return;
  const img=host.querySelector('.mk6-image');if(!img)return;
  img.src=result.data;
  img.alt='Imagen de bloques generada por el motor oficial de Microsoft MakeCode para este programa';
  img.hidden=false;
  img.onerror=()=>{img.hidden=true;status(host,'La imagen recibida no se puede mostrar en este navegador.','bad');};
  status(host,'✓ Bloques auténticos generados por MakeCode','ok');
  const btn=host.querySelector('.mk6-download');
  if(btn){btn.hidden=false;btn.onclick=()=>{
   const a=document.createElement('a');a.download='makecode-bloques-'+name+'.svg';
   if(result.svg){const b=new Blob([result.svg],{type:'image/svg+xml;charset=utf-8'}),url=URL.createObjectURL(b);a.href=url;a.click();setTimeout(()=>URL.revokeObjectURL(url),1200);}
   else {a.href=result.data;a.click();}
  };}
 }
 function readyFrame(){
  if(frame)return;
  frame=document.createElement('iframe');
  frame.src=editor+'/--docs?render=1&lang=es-ES';
  frame.title='Motor oficial para dibujar bloques MakeCode';
  frame.setAttribute('aria-hidden','true');frame.tabIndex=-1;
  frame.style.cssText='position:fixed;left:0;bottom:0;width:1px;height:1px;border:0;opacity:0;pointer-events:none;';
  document.body.appendChild(frame);
  setTimeout(()=>{
   if(!ready){failed=true;for(const j of queue.splice(0)){
    status(j.host,'No se ha podido conectar con MakeCode. Pulsa Reintentar o abre el editor.','bad');
    const b=j.host.querySelector('.mk6-retry');if(b)b.hidden=false;
   }}
  },18000);
 }
 window.addEventListener('message',ev=>{
  if(!frame||ev.source!==frame.contentWindow||ev.origin!==editor)return;
  const m=ev.data||{};
  if(m.source!=='makecode')return;
  if(m.type==='renderready'){ready=true;failed=false;pump();return;}
  if(m.type!=='renderblocks'||!active||m.id!==active.id)return;
  if(m.error){complete(null,'El editor no pudo convertir este fragmento a bloques. Usa «Copiar código» para revisarlo en MakeCode.');return;}
  let svg=typeof m.svg==='string'?m.svg.trim():'';
  let uri=typeof m.uri==='string'?m.uri:'';
  // El motor oficial puede devolver URI directa (SVG o PNG) y/o SVG puro.
  const isSvg=svg.indexOf('<svg')!==-1;
  if(!uri.startsWith('data:image/')&&isSvg){uri='data:image/svg+xml;charset=utf-8,'+encodeURIComponent(svg.slice(svg.indexOf('<svg')));}
  if(uri.startsWith('data:image/'))complete({data:uri,svg:isSvg?svg.slice(svg.indexOf('<svg')):''});
  else complete(null,'MakeCode no devolvió una imagen; abre el código en el editor para revisar compatibilidad.');
 });
 function show(host,id,code){
  if(!host)return;
  const key=id+':'+code,jobid='mk6-'+(++seq);host.dataset.job=jobid;
  host.innerHTML=`<div class="mk6-frame"><div class="mk6-heading">🧩 Bloques reales del programa</div><p class="mk6-status" data-state="wait" role="status">Preparando renderizador oficial de MakeCode…</p><img class="mk6-image" alt="Bloques de MakeCode" hidden><div class="mk6-actions"><button type="button" class="pro-btn subtle mk6-retry" hidden>↻ Reintentar bloques</button><button type="button" class="pro-btn subtle mk6-download" hidden>↓ Descargar SVG oficial</button><a class="pro-btn subtle" href="https://makecode.microbit.org/" target="_blank" rel="noopener noreferrer">Abrir editor MakeCode ↗</a></div><p class="mk6-foot">La imagen se crea con Microsoft MakeCode, no es un dibujo imitado. Requiere conexión; si falla, utiliza el código del ejemplo.</p></div>`;
  host.querySelector('.mk6-retry').onclick=()=>show(host,id,code);
  if(cache.has(key)){showImage(host,cache.get(key),id);return;}
  if(!navigator.onLine){status(host,'Sin conexión. Abre esta página desde GitHub Pages con Internet.','bad');host.querySelector('.mk6-retry').hidden=false;return;}
  if(failed&&frame){frame.remove();frame=null;ready=false;failed=false;}
  queue.push({id:jobid,host,code,cacheKey:key});readyFrame();pump();
 }
 window.ROBO_LIVE_MAKECODE={show};
})();
