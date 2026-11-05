"use strict";
(()=>{
 const editor='https://makecode.microbit.org';
 const packageOpt='maqueenPlusV2=github:DFRobot/pxt-DFRobot_MaqueenPlus_v20';
 let frame=null,ready=false,failed=false,seq=0,active=null,alarm=null;
 const queue=[],cache=new Map();
 function status(host,message,kind){ if(!host.isConnected)return; const el=host.querySelector('.mq6-status'); if(el){el.textContent=message;el.dataset.state=kind||'wait';}}
 function pump(){
   if(!ready||!frame||active||!queue.length)return;
   let job=queue.shift();
   if(!job.host.isConnected||job.host.dataset.job!==job.id){pump();return;}
   active=job; status(job.host,'Generando bloques oficiales de MakeCode…','wait');
   alarm=setTimeout(()=>complete(null,'MakeCode no ha respondido a tiempo.'),20000);
   try{frame.contentWindow.postMessage({type:'renderblocks',id:job.id,code:job.code,options:{package:packageOpt,snippetMode:true}},editor);}catch(e){complete(null,'Error al comunicar con el editor MakeCode.');}
 }
 function complete(result,error){clearTimeout(alarm);alarm=null; const job=active; active=null; if(!job){pump();return;} if(result){cache.set(job.cacheKey,result); showImage(job.host,result);} else {status(job.host,error||'MakeCode no ha podido dibujar este programa.','bad'); const b=job.host.querySelector('.mq6-retry'); if(b)b.hidden=false;} pump();}
 function showImage(host,result){ if(!host.isConnected)return; const img=host.querySelector('.mq6-image'); if(!img)return; img.src=result.data; img.hidden=false; img.alt='Bloques oficiales de MakeCode para esta misión Maqueen'; img.onerror=()=>{img.hidden=true;status(host,'La imagen recibida no se puede mostrar en este navegador.','bad');}; status(host,'✓ Bloques oficiales generados correctamente','ok'); }
 function readyFrame(){ if(frame)return; frame=document.createElement('iframe'); frame.src=editor+'/--docs?render=1&lang=es-ES'; frame.title='Motor oficial para bloques MakeCode de Maqueen'; frame.setAttribute('aria-hidden','true'); frame.tabIndex=-1; frame.style.cssText='position:fixed;left:0;bottom:0;width:1px;height:1px;border:0;opacity:0;pointer-events:none;'; document.body.appendChild(frame); setTimeout(()=>{ if(!ready){ failed=true; for(const j of queue.splice(0)){ status(j.host,'No se ha podido conectar con MakeCode.','bad'); const b=j.host.querySelector('.mq6-retry'); if(b)b.hidden=false; } } },18000); }
 window.addEventListener('message',ev=>{
   if(!frame||ev.source!==frame.contentWindow||ev.origin!==editor)return;
   const m=ev.data||{}; if(m.source!=='makecode')return;
   if(m.type==='renderready'){ready=true;failed=false;pump();return;}
   if(m.type!=='renderblocks'||!active||m.id!==active.id)return;
   if(m.error){complete(null,'El editor no pudo convertir este código a bloques.');return;}
   let svg=typeof m.svg==='string'?m.svg.trim():''; let uri=typeof m.uri==='string'?m.uri:''; const isSvg=svg.indexOf('<svg')!==-1;
   if(!uri.startsWith('data:image/')&&isSvg){uri='data:image/svg+xml;charset=utf-8,'+encodeURIComponent(svg.slice(svg.indexOf('<svg')));} if(uri.startsWith('data:image/')) complete({data:uri}); else complete(null,'MakeCode no devolvió una imagen de bloques.');
 });
 function show(host,id,code){
   if(!host)return; const key=id+':'+code, jobid='mq6-'+(++seq); host.dataset.job=jobid;
   host.innerHTML=`<div class="mq6-frame"><p class="mq6-status" data-state="wait" role="status">Preparando renderizador oficial de MakeCode…</p><img class="mq6-image" alt="Bloques de MakeCode" hidden><div class="mq6-actions"><button type="button" class="pro-btn subtle mq6-retry" hidden>↻ Reintentar bloques</button><a class="pro-btn subtle" href="https://makecode.microbit.org/?lang=es-ES" target="_blank" rel="noopener noreferrer">Abrir editor MakeCode ↗</a></div></div>`;
   host.querySelector('.mq6-retry').onclick=()=>show(host,id,code);
   if(cache.has(key)){showImage(host,cache.get(key));return;}
   if(!navigator.onLine){status(host,'Sin conexión. Abre la página desde GitHub Pages con Internet.','bad'); host.querySelector('.mq6-retry').hidden=false; return;}
   if(failed&&frame){frame.remove(); frame=null; ready=false; failed=false;}
   queue.push({id:jobid,host,code,cacheKey:key}); readyFrame(); pump();
 }
 window.ROBO_LIVE_MAQUEEN={show};
})();
