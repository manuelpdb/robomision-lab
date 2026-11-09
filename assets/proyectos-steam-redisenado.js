const PROJECTS = (window.ROBOLAB_PROJECTS || []).map(p => ({...p,
  photoUrl:'assets/equipos/'+p.photo,
  guidedExample: ((window.ROBO_PROJECT_EXAMPLES || {})[p.id] || [])[0] || null
}));
const $=(s,root=document)=>root.querySelector(s);
const escapeHTML=(v)=>String(v??'').replace(/[&<>"']/g,ch=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch]));
const txt=(v)=>escapeHTML(v);
const safeArray=(arr)=>Array.isArray(arr)?arr:[];
const list=(arr)=>safeArray(arr).map(t=>'<li>'+txt(t)+'</li>').join('');
const button=(p)=>`<button class="outline" data-destination="${escapeHTML(p.id)}">Ver proyecto completo →</button>`;
function shorten(str,n=138){return str.length>n?str.slice(0,n).replace(/\s+\S*$/,'')+'…':str}
function card(p,i){const shared=['rescatador','luna','olimpiadas'].includes(p.id);return `<article class="project-card"><div class="card-pic"><img loading="lazy" src="${p.photoUrl}" alt="${txt(p.caption||p.title)}">${shared?'<span class="image-note">Foto del robot · escenario por diseñar</span>':'<span class="image-note">Maqueta orientativa</span>'}</div><div class="card-content"><div class="card-labels"><span>PROYECTO ${String(i+1).padStart(2,'0')}</span><span class="tag">${txt(p.level)}</span></div><h3>${txt(p.title)}</h3><p>${txt(shorten(p.build||p.summary,122))}</p><div class="meta"><span>⚙ ${txt(p.kit)}</span><span>◷ ${p.sessions} sesiones</span></div>${button(p)}</div></article>`}
function normalizeSearch(s){return String(s||'').normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLocaleLowerCase('es')}
function catalog(){const q=normalizeSearch($('#search').value.trim()),k=$('#kit').value,l=$('#level').value,s=$('#sessions').value;const arr=PROJECTS.filter(p=>(!q||normalizeSearch([p.title,p.summary,p.area,p.build].join(' ')).includes(q))&&(!k||p.kit===k)&&(!l||p.level===l)&&(!s||p.sessions===+s));$('#cards').innerHTML=arr.length?arr.map(p=>card(p,PROJECTS.indexOf(p))).join(''):'<div class="empty">No hay proyectos con estos filtros. Prueba otra búsqueda.</div>';$('#count').textContent=arr.length+' proyectos'}
function detail(p){const basic=(p.guidedExample||{}), materials=safeArray(p.materials),stages=safeArray(p.stages),questions=safeArray(p.tests);const shortSteps=stages.slice(0,3);let nums=p.connections||[];
return `<div class="crumb"><button data-destination="catalogo">← Volver a los proyectos</button><span>/</span><span>${txt(p.title)}</span></div><section class="detail-hero"><div class="detail-copy"><span class="notice" style="color:#b9fae4"><span class="dot"></span> PROYECTO ${String(PROJECTS.indexOf(p)+1).padStart(2,'0')} · GUÍA PARA EL ALUMNADO</span><h1>${txt(p.title)}</h1><p>${txt(p.summary)}</p><div class="detail-meta"><span>⚙ ${txt(p.kit)}</span><span>◷ ${p.sessions} sesiones</span><span>◉ ${txt(p.level)}</span></div><a class="primary" href="#objetivo">Empezar el proyecto →</a></div><div class="detail-pic"><img src="${p.photoUrl}" alt="${txt(p.caption||p.title)}"></div></section><div class="lesson-layout"><div class="lesson-main"><section class="box" id="objetivo"><span class="small-caps">01 · Empieza aquí</span><h2>¿Qué vamos a construir?</h2><p class="short-goal">${txt(p.build||p.summary)}</p><div class="questions">💡 Reto principal: ${txt(p.question)}</div><h3>Los tres primeros pasos</h3><ol class="step-list">${list(shortSteps)}</ol><p class="note">Cuando hayas preparado lo anterior, continúa con el montaje y las conexiones.</p></section><section class="box" id="materiales"><span class="small-caps">02 · Prepara tu mesa</span><h2>Materiales</h2><ul>${list(materials)}</ul></section><section class="box" id="montaje"><span class="small-caps">03 · Construye y conecta</span><h2>Montaje paso a paso</h2><ol class="step-list">${list(stages.slice(3))}</ol><details class="tech"><summary>Ver conexiones y precauciones técnicas</summary><div class="inner"><ol>${list(nums)}</ol><div class="care"><strong>⚠ Seguridad:</strong> ${txt(p.safety)}</div></div></details></section><section class="box" id="programacion"><span class="small-caps">04 · Programa tu idea</span><h2>Programación con MakeCode</h2><p>Antes de programar, explica qué debe suceder al encender la micro:bit, qué debe repetirse continuamente y qué condiciones debe comprobar.</p><ol class="step-list">${list(p.logic)}</ol>${basic.code?`<details class="tech"><summary>Ver ejemplo básico guiado: ${txt(basic.title)}</summary><div class="inner"><p>${txt(basic.desc)}</p><p class="note">Código de referencia para importar o revisar en MakeCode. No equivale a un programa verificado con el kit real.</p><div class="blocks-live"><button class="outline" type="button" id="renderBlocks">Ver bloques oficiales de MakeCode</button><div class="blocks-live-status" id="blocksViewer" aria-live="polite">El ejemplo se representa como programa completo cuando pulsas el botón. Necesita conexión a Internet.</div></div><details class="tech"><summary>Ver código del ejemplo (para copiar)</summary><pre class="code" id="exampleCode">${txt(basic.code)}</pre></details><div style="display:flex;gap:8px;flex-wrap:wrap"><button class="outline" id="copyCode">Copiar ejemplo</button><a class="outline" href="https://makecode.microbit.org/?lang=es-ES" target="_blank" rel="noopener noreferrer">Abrir MakeCode ↗</a></div></div></details>`:''}<details class="tech"><summary>¿Qué bloques necesitarás?</summary><div class="inner"><ul>${list(p.blocks)}</ul></div></details></section><section class="box" id="retos"><span class="small-caps">05 · Elige hasta dónde llegar</span><h2>Retos Bronce, Plata y PRO</h2><p>Elige un nivel y comprueba si lo has conseguido. Los retos no muestran directamente sus soluciones.</p><div class="levels">${p.tiers.map((t,i)=>`<article class="level ${i===1?'silver':i===2?'pro':''}"><h3>${txt(t.name)}</h3><p>${txt(t.text)}</p><small>✓ Cómo comprobarlo: ${txt(t.criteria)}</small></article>`).join('')}</div></section><section class="box" id="pruebas"><span class="small-caps">06 · Comprueba y mejora</span><h2>Antes de darlo por terminado</h2><div class="test-items">${questions.map((t,i)=>`<div class="test-item"><b>Prueba ${i+1}.</b> ${txt(t)}</div>`).join('')}</div><details class="tech"><summary>Problemas habituales y posibles causas</summary><div class="inner"><ul>${list(p.errors)}</ul></div></details><h3>¿Qué tienes que entregar?</h3><ul>${list(p.deliverables)}</ul></section><section class="box no-print"><button class="print-btn" onclick="window.print()">🖨 Imprimir esta guía</button> <a class="outline" href="ficha-proyecto.html?id=${encodeURIComponent(p.id)}" target="_blank" rel="noopener noreferrer">Ficha A4 del proyecto ↗</a><span class="note" style="display:block;margin-top:8px">Puedes imprimir esta guía o abrir la ficha A4 del proyecto.</span></section></div><aside class="lesson-side"><div class="aside-card"><span class="small-caps">Ruta de trabajo</span><h3>Tu proyecto, paso a paso</h3><a href="#objetivo">01 · Qué vas a construir</a><a href="#materiales">02 · Materiales</a><a href="#montaje">03 · Montaje y conexiones</a><a href="#programacion">04 · Programación</a><a href="#retos">05 · Retos por niveles</a><a href="#pruebas">06 · Pruebas y entrega</a><div class="care" style="font-size:12px;margin-bottom:0">No conectes bombas, motores o relés sin revisar antes las tensiones y la alimentación con el profesor.</div></div></aside></div>`}

let currentProjectId = null;
function route(){
 const key=decodeURIComponent((location.hash||'#catalogo').slice(1));
 const p=PROJECTS.find(item=>item.id===key);
 currentProjectId=p?.id||null;
 $('#catalogView').hidden=!!p;
 $('#detailView').hidden=!p;
 $('#detailView').innerHTML=p?detail(p):'';
 document.title=(p?p.title+' · ':'')+'Proyectos STEAM · RoboMisión LAB';
 if(!p) catalog();
 window.scrollTo({top:0,behavior:'instant'});
}
function blockRender(btn,view,project){
 const code=project?.guidedExample?.code;
 if(!code){view.textContent='Este proyecto no tiene un programa base para representar.';return;}
 if(!navigator.onLine){view.textContent='Para generar los bloques necesitas conexión a Internet.';return;}
 const host='https://makecode.microbit.org';
 const id='steam-'+project.id+'-'+Date.now();
 let frame=document.createElement('iframe');let ready=false,finished=false;
 const cleanup=()=>{window.removeEventListener('message',onMessage);clearTimeout(timer);frame.remove();btn.disabled=false;};
 const fail=(msg)=>{if(finished)return;finished=true;view.className='blocks-live-status error';view.textContent=msg;cleanup();};
 const success=(src)=>{if(finished)return;finished=true;view.className='blocks-live-status';const img=document.createElement('img');img.alt='Programa completo en bloques de MakeCode para '+project.title;img.src=src;img.onerror=()=>{view.textContent='No se pudo cargar la imagen de MakeCode. Usa el código de apoyo.'};view.replaceChildren(img);cleanup();};
 function onMessage(e){
  if(e.origin!==host||e.source!==frame.contentWindow)return;
  const msg=e.data||{};if(msg.source!=='makecode')return;
  if(msg.type==='renderready'&&!ready){
    ready=true;const options={snippetMode:false};
    if(project.kit==='Maqueen Plus V2') options.package='maqueenPlusV2=github:DFRobot/pxt-DFRobot_MaqueenPlus_v20';
    try{frame.contentWindow.postMessage({type:'renderblocks',id,code,options},host);view.textContent='MakeCode está dibujando el programa completo…'}
    catch(err){fail('No se ha podido conectar con MakeCode. Usa el código de apoyo.')}
  }else if(msg.type==='renderblocks'&&msg.id===id){
    if(msg.error){fail('MakeCode no ha podido representar este programa. Revisa el código y la extensión correspondiente.');return;}
    if(typeof msg.uri==='string'&&msg.uri.startsWith('data:image/')) success(msg.uri);
    else if(typeof msg.svg==='string'&&msg.svg.includes('<svg')) success('data:image/svg+xml;charset=utf-8,'+encodeURIComponent(msg.svg.slice(msg.svg.indexOf('<svg'))));
    else fail('MakeCode no devolvió una imagen de bloques. Puedes consultar el código de apoyo.');
  }
 }
 const timer=setTimeout(()=>fail('MakeCode no ha respondido a tiempo. Prueba de nuevo o utiliza el código de apoyo.'),30000);
 btn.disabled=true;view.className='blocks-live-status';view.textContent='Conectando con el servicio oficial de MakeCode…';
 window.addEventListener('message',onMessage);
 frame.title='Renderizador MakeCode';frame.setAttribute('aria-hidden','true');
 frame.style.cssText='position:fixed;left:0;top:0;opacity:0;width:1px;height:1px;pointer-events:none;border:0';
 frame.src=host+'/--docs?render=1&lang=es-ES';document.body.append(frame);
}
document.addEventListener('click',e=>{
 const btn=e.target.closest('[data-destination]');
 if(btn){location.hash=btn.dataset.destination==='catalogo'?'catalogo':btn.dataset.destination;return;}
 // Do not change the route hash when scrolling among the six sections of a project.
 const anchor=e.target.closest('a[href^="#"]');
 if(anchor&&currentProjectId){const name=anchor.getAttribute('href').slice(1);
   if(['objetivo','materiales','montaje','programacion','retos','pruebas'].includes(name)){
     const target=document.getElementById(name);if(target){e.preventDefault();target.scrollIntoView({behavior:'smooth',block:'start'});}return;
   }
 }
 if(e.target?.id==='renderBlocks'){
   const p=PROJECTS.find(item=>item.id===currentProjectId);
   const view=$('#blocksViewer');if(p&&view)blockRender(e.target,view,p);
 }
 if(e.target?.id==='copyCode'){
   const c=$('#exampleCode');if(c){navigator.clipboard.writeText(c.textContent).then(()=>{e.target.textContent='✓ Copiado'}).catch(()=>{e.target.textContent='Selecciona el texto para copiarlo'})}
 }
});
for(const x of ['search','kit','level','sessions']) $('#'+x).addEventListener(x==='search'?'input':'change',catalog);
window.addEventListener('hashchange',route);
if(PROJECTS[0])$('#heroImg').src=PROJECTS[0].photoUrl;
route();
