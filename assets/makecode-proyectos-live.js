
"use strict";
(()=>{
 const host='https://makecode.microbit.org';
 const targets=[...document.querySelectorAll('.mk-live-target[data-codekey]')];
 if(!targets.length||location.protocol==='file:'||!navigator.onLine)return;
 const projects=window.ROBO_PROJECT_EXAMPLES||{};
 const queue=targets.map(el=>{
   const [pid,idx]=String(el.dataset.codekey||'').split(':');
   const item=(projects[pid]||[])[+idx];
   if(!item||!item.code)return null;
   return {el,pid,idx,item};
 }).filter(Boolean);
 if(!queue.length)return;
 let iframe=document.createElement('iframe');
 iframe.src=host+'/--docs?render=1&lang=es';
 iframe.title='Renderizador de bloques MakeCode';
 iframe.setAttribute('aria-hidden','true');
 iframe.style.cssText='position:fixed;left:-100px;top:-100px;width:2px;height:2px;opacity:0;pointer-events:none;border:0';
 let current=null, sent=false, ready=false;
 function optionsFor(pid){
   return /^rescatador|luna|olimpiadas$/.test(pid)
    ? {package:'maqueenPlusV2=github:DFRobot/pxt-DFRobot_MaqueenPlus_v20',snippetMode:true}
    : {snippetMode:true};
 }
 function renderNext(){
   if(!ready||current||!queue.length)return;
   current=queue.shift();
   sent=false;
   current.el.innerHTML='<div class="mk-live-msg">Generando bloques oficiales…</div>';
   iframe.contentWindow.postMessage({type:'renderblocks',id:'project-'+current.pid+'-'+current.idx,code:current.item.code,options:optionsFor(current.pid)},host);
   sent=true;
 }
 function finishCurrent(htmlNode){
   if(!current)return;
   current.el.replaceChildren(htmlNode);
   current=null;
   setTimeout(renderNext,60);
 }
 function failCurrent(msg){
   if(!current)return;
   const div=document.createElement('div');
   div.className='mk-live-fail';
   div.innerHTML='<strong>Bloques no disponibles ahora.</strong><span>'+msg+'</span>';
   finishCurrent(div);
 }
 function handle(e){
   if(e.origin!==host||e.source!==iframe.contentWindow)return;
   const msg=e.data||{};
   if(msg.source!=='makecode')return;
   if(msg.type==='renderready'){ready=true;renderNext();return;}
   if(!current)return;
   if(msg.type==='renderblocks'&&msg.id==='project-'+current.pid+'-'+current.idx){
      if(msg.error){failCurrent('Comprueba la conexión a Internet o vuelve a intentarlo más tarde.'); return;}
      const src=typeof msg.uri==='string'&&msg.uri.startsWith('data:image/')?msg.uri:null;
      if(src || (typeof msg.svg==='string'&&msg.svg.trim().startsWith('<svg'))){
        const wrap=document.createElement('figure');
        wrap.className='mk-live-figure';
        const cap=document.createElement('figcaption');
        cap.className='mk-live-title';
        cap.textContent='Bloques oficiales de MakeCode';
        const img=document.createElement('img');
        img.alt='Bloques oficiales de MakeCode para '+current.item.title;
        img.loading='lazy';
        img.decoding='async';
        img.src=src || 'data:image/svg+xml;charset=utf-8,'+encodeURIComponent(msg.svg);
        img.addEventListener('load',()=>{wrap.append(cap,img);finishCurrent(wrap)},{once:true});
        img.addEventListener('error',()=>failCurrent('No se pudo cargar la imagen de bloques.'),{once:true});
      } else failCurrent('El servicio no devolvió la imagen de bloques.');
   }
 }
 window.addEventListener('message',handle);
 document.body.appendChild(iframe);
 setTimeout(()=>{if(queue.length||current){
   targets.forEach(el=>{if(!el.querySelector('img')&&!el.querySelector('.mk-live-fail')){el.innerHTML='<div class="mk-live-fail"><strong>Bloques no disponibles ahora.</strong><span>Puedes usar el código base mientras tanto.</span></div>';}})
 }},25000);
})();
