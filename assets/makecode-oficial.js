"use strict";
(()=>{
 const host='https://makecode.microbit.org';
 const targets=[...document.querySelectorAll('.mk-live-target[data-mission]')];
 if(!targets.length||location.protocol==='file:'||!navigator.onLine)return;
 const codes=window.ROBO_MAKECODE_EXAMPLES||{};
 const target=targets[0],id=target.dataset.mission, code=codes[id];
 if(!code)return;
 let sent=false,ended=false;
 let frame=document.createElement('iframe');
 frame.src=host+'/--docs?render=1&lang=es';
 frame.title='Renderizador de bloques MakeCode';
 frame.setAttribute('aria-hidden','true');
 frame.style.cssText='position:fixed;left:-100px;top:-100px;width:2px;height:2px;opacity:0;pointer-events:none;border:0';
 function handle(e){
   if(e.origin!==host||e.source!==frame.contentWindow)return;
   const msg=e.data||{};if(msg.source!=='makecode')return;
   if(msg.type==='renderready'&&!sent){
     sent=true;
     const opt=id.startsWith('05-')?{package:'maqueenPlusV2=github:DFRobot/pxt-DFRobot_MaqueenPlus_v20',snippetMode:true}:{snippetMode:true};
     frame.contentWindow.postMessage({type:'renderblocks',id:'robomision-'+id,code:code,options:opt},host);
   }
   if(msg.type==='renderblocks'&&msg.id==='robomision-'+id&&!ended){
      ended=true;
      if(msg.error){cleanup();return}
      const src=typeof msg.uri==='string'&&msg.uri.startsWith('data:image/')?msg.uri:null;
      if(src||typeof msg.svg==='string'&&msg.svg.trim().startsWith('<svg')){
        const img=document.createElement('img');
        img.alt='Bloques oficiales generados por Microsoft MakeCode para la misión '+id;
        img.loading='eager';
        img.decoding='async';
        img.src=src||'data:image/svg+xml;charset=utf-8,'+encodeURIComponent(msg.svg);
        img.addEventListener('load',()=>{
          target.replaceChildren();
          const heading=document.createElement('div');heading.className='live-title';
          heading.textContent='✓ Bloques originales de MakeCode (generados en línea)';
          target.append(heading,img);
        },{once:true});
      }
      cleanup();
   }
 }
 function cleanup(){setTimeout(()=>{frame.remove();window.removeEventListener('message',handle)},2000)}
 window.addEventListener('message',handle);
 document.body.appendChild(frame);
 setTimeout(()=>{if(!ended){cleanup()}},28000);
})();
