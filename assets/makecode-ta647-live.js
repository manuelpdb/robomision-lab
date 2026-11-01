'use strict';
/* Renderizador oficial MakeCode: https://makecode.microbit.org/blocks-embed */
(()=>{
 const origin='https://makecode.microbit.org', queue=[], waiting=new Map();
 let iframe=null, ready=false, busy=false, timeout=null, activeRequest=null;
 const inMem=new Map();
 const key=(id)=>'robomision.ta647.bloque.real.v1.'+id;
 function cached(id){
   if(inMem.has(id))return inMem.get(id);
   try {const s=sessionStorage.getItem(key(id));if(s&&s.startsWith('<svg')&&s.length<250000){inMem.set(id,s);return s}}catch(e){}
   return null;
 }
 function finishCurrent(success,svg,error){
   if(timeout){clearTimeout(timeout);timeout=null}
   const job=activeRequest;activeRequest=null;busy=false;
   if(job){
      if(success&&typeof svg==='string'&&svg.startsWith('<svg')){
         inMem.set(job.id,svg);
         try{if(svg.length<230000)sessionStorage.setItem(key(job.id),svg)}catch(e){}
         job.ok(svg);
      }else job.fail(error||'No se pudo dibujar el programa. Revisa la conexión o la compatibilidad del código.');
   }
   pump();
 }
 function pump(){
   if(!ready||busy||!queue.length)return;
   const job=queue.shift();if(!job||!job.host.isConnected){pump();return}
   activeRequest=job;busy=true;
   try{
     iframe.contentWindow.postMessage({type:'renderblocks',id:job.id,code:job.code,options:{snippetMode:true}},origin);
     timeout=setTimeout(()=>finishCurrent(false,null,'MakeCode no ha respondido. El código de ejemplo sigue disponible abajo.'),22000);
   }catch(err){finishCurrent(false,null,'No ha podido comunicarse con MakeCode.');}
 }
 function onMessage(e){
   if(e.origin!==origin||!iframe||e.source!==iframe.contentWindow)return;
   const m=e.data||{};
   if(m.source!=='makecode')return;
   if(m.type==='renderready'){ready=true;pump();}
   if(m.type==='renderblocks'&&busy&&activeRequest&&m.id===activeRequest.id){
      if(m.error){finishCurrent(false,null,'Este ejemplo no ha podido convertirse a bloques; utiliza el código JavaScript de la ficha.');return}
      let svg=typeof m.svg==='string'&&m.svg.trim().startsWith('<svg')?m.svg.trim():null;
      if(!svg&&typeof m.uri==='string'&&m.uri.startsWith('data:image/svg+xml')){
        try{svg=decodeURIComponent(m.uri.split(',').slice(1).join(','))}catch(e){}
      }
      if(svg)finishCurrent(true,svg,null);
      else finishCurrent(false,null,'MakeCode no ha devuelto una imagen válida.');
   }
 }
 function ensure(){
   if(iframe)return;
   iframe=document.createElement('iframe');iframe.src=origin+'/--docs?render=1&lang=es';iframe.title='Renderizador oficial MakeCode';iframe.setAttribute('aria-hidden','true');iframe.tabIndex=-1;
   iframe.style.cssText='position:fixed;width:1px;height:1px;left:-10px;top:-10px;opacity:0;border:0;pointer-events:none';
   window.addEventListener('message',onMessage);
   document.body.appendChild(iframe);
   setTimeout(()=>{if(!ready){while(queue.length){let j=queue.shift();j.fail('El servicio de MakeCode no está accesible. Puedes copiar el programa y usar el editor.')}}},22000);
 }
 function show(host,id,code){
   host.replaceChildren();host.dataset.codeId=id;
   const title=document.createElement('div');title.className='mk-real-head';title.innerHTML='<span class="mk-real-pulse"></span> Cargando bloques originales de MakeCode…';host.appendChild(title);
   const setImg=(svg)=>{
      if(!host.isConnected||host.dataset.codeId!==id)return;
      host.replaceChildren();
      const label=document.createElement('div');label.className='mk-real-success';label.textContent='✓ Imagen real generada por Microsoft MakeCode';
      const img=document.createElement('img');img.className='mk-real-image';img.alt='Bloques reales del programa de ejemplo generados con el motor oficial MakeCode';img.src='data:image/svg+xml;charset=utf-8,'+encodeURIComponent(svg);
      const link=document.createElement('button');link.type='button';link.className='pro-btn subtle mk-download';link.textContent='Descargar imagen SVG';
      link.onclick=()=>{const blob=new Blob([svg],{type:'image/svg+xml;charset=utf-8'});const url=URL.createObjectURL(blob);const a=document.createElement('a');a.href=url;a.download='bloques-'+id+'.svg';a.click();setTimeout(()=>URL.revokeObjectURL(url),1500)};
      host.append(label,img,link);
   };
   const fail=(msg)=>{
       if(!host.isConnected||host.dataset.codeId!==id)return;
       host.replaceChildren();const note=document.createElement('p');note.className='mk-offline';note.textContent=msg;
       const button=document.createElement('button');button.type='button';button.className='pro-btn subtle';button.textContent='Reintentar imágenes reales';button.onclick=()=>show(host,id,code);
       host.append(note,button);
   };
   if(cached(id)){setImg(cached(id));return}
   if(!navigator.onLine){fail('Sin Internet: los bloques reales se generan con la herramienta oficial de MakeCode. El código y la foto sí se ven sin conexión.');return}
   queue.push({host,id,code,ok:setImg,fail});ensure();pump();
 }
 window.ROBO_LIVE_MAKECODE={show};
})();
