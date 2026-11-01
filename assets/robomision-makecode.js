"use strict";
/* RoboMisión LAB v16: bloques AUTÉNTICOS vía renderblocks de Microsoft MakeCode.
   Documentación: https://makecode.microbit.org/blocks-embed
   No genera imitaciones ni presenta pseudocódigo como imágenes oficiales. */
(()=>{
 const origin='https://makecode.microbit.org';
 const packageMaqueen='maqueenPlusV2=github:DFRobot/pxt-DFRobot_MaqueenPlus_v20';
 let frame=null, ready=false, busy=null, startupTimer=null, jobTimer=null, seq=0;
 const jobs=[], cache=new Map();
 const esc=s=>String(s||'').replace(/[&<>\"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','\"':'&quot;',"'":'&#39;'}[c]));
 const visible=el=>el&&el.isConnected;
 function setStatus(job,text,state='pending'){
   if(!visible(job.host))return;
   const el=job.host.querySelector('.rmk-status');
   if(el){el.textContent=text;el.dataset.state=state;}
 }
 function makeFrame(){
   if(frame)return;
   frame=document.createElement('iframe'); frame.title='Motor oficial MakeCode'; frame.setAttribute('aria-hidden','true');
   frame.style.cssText='position:fixed;left:0;top:0;width:1px;height:1px;opacity:0;border:0;pointer-events:none;';
   frame.src=origin+'/--docs?render=1&lang=es';document.body.appendChild(frame);
   startupTimer=setTimeout(()=>{
     if(!ready){ if(busy)finish(null,'No se ha podido iniciar MakeCode.');
      for(const j of jobs.splice(0))fail(j,'MakeCode no responde. Pulsa reintentar.');
      reset(); }
   },22000);
 }
 function reset(){
   clearTimeout(startupTimer);clearTimeout(jobTimer);startupTimer=jobTimer=null;
   if(frame){frame.remove();frame=null;}ready=false;busy=null;
 }
 function fail(job,message){
   setStatus(job,message,'error');
   if(visible(job.host)){
     const retry=job.host.querySelector('.rmk-retry');if(retry)retry.hidden=false;
   }
 }
 function image(job,svg,uri){
   if(!visible(job.host))return;
   let url=uri&&uri.startsWith('data:image/')?uri:'';
   if(!url&&svg){url='data:image/svg+xml;charset=utf-8,'+encodeURIComponent(svg);}
   if(!url){fail(job,'MakeCode no ha devuelto una imagen de bloques.');return;}
   const img=job.host.querySelector('.rmk-image');
   if(!img)return;
   img.onload=()=>{
     img.hidden=false;setStatus(job,'✓ Imagen de bloques generada por MakeCode','success');
     const btn=job.host.querySelector('.rmk-download');
     if(btn&&svg){btn.hidden=false;btn.onclick=()=>{
       const blob=new Blob([svg],{type:'image/svg+xml;charset=utf-8'}),link=document.createElement('a'),tmp=URL.createObjectURL(blob);
       link.href=tmp;link.download='bloques-makecode-'+job.key.replace(/[^a-z0-9_-]/gi,'-')+'.svg';document.body.appendChild(link);link.click();link.remove();setTimeout(()=>URL.revokeObjectURL(tmp),2500);
     };}
   };
   img.onerror=()=>{img.hidden=true;fail(job,'La imagen no se ha podido mostrar.');};
   img.src=url;
 }
 function finish(result,error){
   const job=busy;busy=null;clearTimeout(jobTimer);jobTimer=null;
   if(!job){pump();return;}
   if(result){cache.set(job.key,result);image(job,result.svg,result.uri);}
   else fail(job,error||'MakeCode ha devuelto un error al procesar este programa.');
   setTimeout(pump,100);
 }
 function pump(){
   if(!ready||busy)return;
   while(jobs.length){
     const job=jobs.shift();if(!visible(job.host)||job.host.dataset.rmkToken!==job.token)continue;
     busy=job;setStatus(job,'Generando bloques oficiales…');
     const options={snippetMode:true};if(job.kit==='maqueen')options.package=packageMaqueen;
     jobTimer=setTimeout(()=>finish(null,'Este ejemplo tarda demasiado en generarse. Puedes reintentar.'),26000);
     try{frame.contentWindow.postMessage({type:'renderblocks',id:job.token,code:job.code,options},origin);}
     catch(e){finish(null,'No se ha podido comunicar con MakeCode.');}
     return;
   }
 }
 window.addEventListener('message',ev=>{
   if(!frame||ev.source!==frame.contentWindow||ev.origin!==origin)return;
   const m=ev.data||{};if(m.source!=='makecode')return;
   if(m.type==='renderready'){ready=true;clearTimeout(startupTimer);pump();return;}
   if(m.type!=='renderblocks'||!busy||m.id!==busy.token)return;
   if(m.error){finish(null,'MakeCode no ha podido convertir este ejemplo. Revisa el código o la extensión.');return;}
   const svg=typeof m.svg==='string'&&m.svg.includes('<svg')?m.svg.slice(m.svg.indexOf('<svg')):'';
   const uri=typeof m.uri==='string'&&m.uri.startsWith('data:image/')?m.uri:'';
   if(!svg&&!uri){finish(null,'MakeCode no devolvió SVG. Abre el ejemplo en el editor.');return;}
   finish({svg,uri});
 });
 function show(host,key,code,opt={}){
   if(!host||!code)return;
   const kit=opt.kit||'microbit';
   const token='rmk-'+(++seq);
   host.dataset.rmkToken=token;
   host.innerHTML=`<div class="rmk-container"><div class="rmk-header"><span>Bloques reales de Microsoft MakeCode</span><small>${kit==='maqueen'?'Con extensión Maqueen Plus V2':'micro:bit V2'}</small></div><p class="rmk-status" data-state="pending" role="status">Preparando renderizado…</p><img class="rmk-image" hidden alt="Bloques generados mediante Microsoft MakeCode"><div class="rmk-actions"><button type="button" class="rmk-retry" hidden>↻ Reintentar imagen</button><button type="button" class="rmk-download" hidden>↓ Descargar SVG oficial</button><button type="button" class="rmk-copy">Copiar JavaScript</button><a href="https://makecode.microbit.org/" target="_blank" rel="noopener noreferrer">Abrir MakeCode ↗</a></div><details class="rmk-code"><summary>Ver el código exacto de este ejemplo</summary><pre><code>${esc(code)}</code></pre></details><p class="rmk-note">Este panel solo etiqueta como oficiales las imágenes recibidas del editor MakeCode. Si no hay conexión, usa el código base y la opción de reintentar.</p></div>`;
   host.querySelector('.rmk-retry').onclick=()=>show(host,key,code,opt);
   host.querySelector('.rmk-copy').onclick=async()=>{
     const btn=host.querySelector('.rmk-copy');
     try{if(navigator.clipboard&&window.isSecureContext){await navigator.clipboard.writeText(code);btn.textContent='✓ Código copiado';}
       else{const input=document.createElement('textarea');input.value=code;document.body.appendChild(input);input.select();document.execCommand('copy');input.remove();btn.textContent='✓ Código copiado';}}
     catch(e){btn.textContent='Selecciona el texto del código para copiarlo';}
   };
   const j={host,key,code,kit,token};
   if(cache.has(key+':'+kit+':'+code)){image(j,cache.get(key+':'+kit+':'+code).svg,cache.get(key+':'+kit+':'+code).uri);return;}
   j.key=key+':'+kit+':'+code;
   if(!navigator.onLine){fail(j,'Sin conexión. Los bloques auténticos se generan al abrir la web online.');return;}
   jobs.push(j);makeFrame();pump();
 }
 window.ROBO_MAKECODE={show,version:16};
 window.ROBO_LIVE_MAKECODE={show(host,id,code){show(host,id,code,{kit:'microbit'});}};
})();
