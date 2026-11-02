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
 /* El editor y la extensión usan español de España (es-ES).
    Si MakeCode conserva una etiqueta en inglés, traducimos SOLO el texto de ese
    bloque dentro del SVG recibido del editor, preservando sus formas reales.
    No alteramos el JavaScript, los números, los datos ni las conexiones. */
 const spanishLabels={
   'on start':'al iniciar','forever':'para siempre','on button a pressed':'al pulsar botón A','on button b pressed':'al pulsar botón B','on button a+b pressed':'al pulsar A+B',
   'set':'fijar','to':'a','change':'cambiar','by':'en','of':'de','if':'si','then':'entonces','else':'si no','else if':'si no, si','repeat':'repetir','times':'veces','while':'mientras','do':'hacer',
   'show number':'mostrar número','show string':'mostrar texto','show icon':'mostrar icono','show leds':'mostrar LED','show arrow':'mostrar flecha',
   'clear screen':'borrar pantalla','pause (ms)':'pausa (ms)','pause':'pausa','wait':'esperar',
   'temperature (°c)':'temperatura (°C)','temperature':'temperatura','light level':'nivel de luz','sound level':'nivel de sonido',
   'acceleration (mg)':'aceleración (mg)','acceleration':'aceleración','compass heading (°)':'rumbo brújula (°)',
   'button a':'botón A','button b':'botón B','button a+b':'botones A+B','pressed':'pulsado',
   'yes':'sí','no':'no','true':'verdadero','false':'falso','on':'encendido','off':'apagado',
   'forward':'adelante','backward':'atrás','left':'izquierda','right':'derecha','all':'todos',
   'left motor':'motor izquierdo','right motor':'motor derecho','all motors':'ambos motores','all motor':'ambos motores',
   'read ultrasonic':'leer ultrasonidos','read ultrasonic sensor':'leer sensor ultrasónico','read line sensor':'leer siguelíneas',
   'left led':'LED izquierdo','right led':'LED derecho','all led':'todos los LED',
   'turn on':'encender','turn off':'apagar','motor speed':'velocidad motor','control motor':'controlar motor',
   'stop motor':'detener motor','stop all motors':'detener ambos motores','run motor':'mover motor',
   'set group':'establecer grupo','radio set group':'fijar grupo radio','send string':'enviar texto','send number':'enviar número',
   'on radio received':'al recibir radio','on radio received string':'al recibir texto por radio',
   'play tone':'reproducir tono','beat':'pulso','milliseconds':'milisegundos',
   'initialize via i2c until success':'inicializar I²C hasta conectar',
   'initialize via i2c':'inicializar I²C','i2c init':'iniciar I²C',
   'digital write pin':'escribir pin digital','digital read pin':'leer pin digital',
   'analog read pin':'leer pin analógico','analog write pin':'escribir pin analógico',
   'servo write pin':'mover servo en pin','show':'mostrar','string':'texto','number':'número',
   'index':'índice','red':'rojo','green':'verde','blue':'azul','black':'negro','white':'blanco',
   'happy':'feliz','sad':'triste','heart':'corazón','north':'norte','south':'sur','east':'este','west':'oeste'
 };
 function spanishBlockSvg(svg){
   if(!svg||typeof DOMParser==='undefined')return {svg,translated:0};
   try{
     const doc=new DOMParser().parseFromString(svg,'image/svg+xml');
     if(doc.querySelector('parsererror'))return {svg,translated:0};
     let count=0;
     // Blockly exporta etiquetas como text/tspan; no tocamos otros elementos.
     for(const el of doc.querySelectorAll('text,tspan')){
       if(el.querySelector('tspan,text'))continue;
       const before=(el.textContent||'').trim();
       const key=before.toLocaleLowerCase('en').replace(/\s+/g,' ').trim();
       const after=spanishLabels[key];
       if(after&&after!==before){
         // Mantener texto en el espacio que reservó Blockly para la etiqueta.
         const fs=parseFloat(el.getAttribute('font-size')||'12')||12;
         if(after.length>before.length*1.25&&before.length>3){
            el.setAttribute('font-size',String(Math.max(8,Math.round(fs*before.length/after.length*10)/10)));
         }
         el.textContent=after;
         count++;
       }
     }
     return count?{svg:new XMLSerializer().serializeToString(doc.documentElement),translated:count}:{svg,translated:0};
   }catch(_){return {svg,translated:0};}
 }

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
   frame.src=origin+'/--docs?render=1&lang=es-ES';document.body.appendChild(frame);
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
 function image(job,svg,uri,translated=0){
   if(!visible(job.host))return;
   let url=translated? '':(uri&&uri.startsWith('data:image/')?uri:'');
   if(!url&&svg){url='data:image/svg+xml;charset=utf-8,'+encodeURIComponent(svg);}
   if(!url){fail(job,'MakeCode no ha devuelto una imagen de bloques.');return;}
   const img=job.host.querySelector('.rmk-image');
   if(!img)return;
   img.onload=()=>{
     img.hidden=false;setStatus(job,translated?'✓ Bloques de MakeCode con etiquetas adaptadas al español':'✓ Bloques generados por MakeCode en español','success');
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
   if(result){cache.set(job.key,result);image(job,result.svg,result.uri,result.translated||0);}
   else fail(job,error||'MakeCode ha devuelto un error al procesar este programa.');
   setTimeout(pump,100);
 }
 function pump(){
   if(!ready||busy)return;
   while(jobs.length){
     const job=jobs.shift();if(!visible(job.host)||job.host.dataset.rmkToken!==job.token)continue;
     busy=job;setStatus(job,'Generando bloques oficiales…');
     const options={snippetMode:job.kit!=='maqueen'};if(job.kit==='maqueen')options.package=packageMaqueen;
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
   const es=spanishBlockSvg(svg);finish({svg:es.svg,uri,translated:es.translated});
 });
 function show(host,key,code,opt={}){
   if(!host||!code)return;
   const kit=opt.kit||'microbit';
   const fullCode=opt.fullCode||code;
   const token='rmk-'+(++seq);
   host.dataset.rmkToken=token;
   host.innerHTML=`<div class="rmk-container"><div class="rmk-header"><span>Bloques reales de MakeCode · español</span><small>${kit==='maqueen'?'Extensión Maqueen Plus V2 · ES':'micro:bit V2 · ES'}</small></div><p class="rmk-status" data-state="pending" role="status">Preparando renderizado…</p><img class="rmk-image" hidden alt="Bloques de Microsoft MakeCode en español"><div class="rmk-actions"><button type="button" class="rmk-retry" hidden>↻ Reintentar imagen</button><button type="button" class="rmk-download" hidden>↓ Descargar SVG en español</button><button type="button" class="rmk-copy">Copiar JavaScript</button><a href="https://makecode.microbit.org/?lang=es-ES" target="_blank" rel="noopener noreferrer">Abrir MakeCode ↗</a></div><details class="rmk-code"><summary>Ver el código exacto de este ejemplo</summary><pre><code>${esc(fullCode)}</code></pre></details><p class="rmk-note">Los bloques se generan con MakeCode en español (es-ES). Cuando alguna etiqueta llega en inglés, se adapta solo el texto del SVG, sin modificar el código del programa. Si no hay conexión, usa el código base.</p></div>`;
   host.querySelector('.rmk-retry').onclick=()=>show(host,key,code,opt);
   host.querySelector('.rmk-copy').onclick=async()=>{
     const btn=host.querySelector('.rmk-copy');
     try{if(navigator.clipboard&&window.isSecureContext){await navigator.clipboard.writeText(fullCode);btn.textContent='✓ Código copiado';}
       else{const input=document.createElement('textarea');input.value=fullCode;document.body.appendChild(input);input.select();document.execCommand('copy');input.remove();btn.textContent='✓ Código copiado';}}
     catch(e){btn.textContent='Selecciona el texto del código para copiarlo';}
   };
   const j={host,key,code,kit,token};
   if(cache.has(key+':'+kit+':'+code)){image(j,cache.get(key+':'+kit+':'+code).svg,cache.get(key+':'+kit+':'+code).uri,cache.get(key+':'+kit+':'+code).translated||0);return;}
   j.key=key+':'+kit+':'+code;
   if(!navigator.onLine){fail(j,'Sin conexión. Los bloques auténticos se generan al abrir la web online.');return;}
   jobs.push(j);makeFrame();pump();
 }
 window.ROBO_MAKECODE={show,version:24,spanishBlockSvg};
 window.ROBO_LIVE_MAKECODE={show(host,id,code){show(host,id,code,{kit:'microbit'});}};
})();
