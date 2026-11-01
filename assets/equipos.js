'use strict';
(()=>{
 const $=(s,p=document)=>p.querySelector(s),esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
 const items=window.ROBO_TA647||[], lessons=window.ROBO_MAQUEEN||[];
 const img=(m,cls='')=>`<img class="${cls}" loading="lazy" src="${esc(m.photo)}" alt="Fotografía del componente ${esc(m.name)} del kit ACEBOTT TA647">`;
 const norm=s=>String(s||'').normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLocaleLowerCase('es');
 const filter=(arr,q,cat)=>arr.filter(m=>(!cat||(m.kind||m.level)===cat)&&(!q||norm([m.name,m.desc,m.kind,...(m.practices||[]),...(m.expanded||[])].join(' ')).includes(norm(q))));
 const allTasks=m=>(m.practices||[]).concat(m.expanded||[]);
 function copyText(txt){
   if(navigator.clipboard&&window.isSecureContext)return navigator.clipboard.writeText(txt);
   const el=document.createElement('textarea');el.value=txt;document.body.append(el);el.select();document.execCommand('copy');el.remove();return Promise.resolve();
 }
 function codeBlock(m,sample,i){
   return `<div class="ta-code-example"><div class="ta-code-title"><span class="ta-code-index">${i===0?'01':'02'}</span><div><strong>${esc(sample.title)}</strong><small>Programa de ejemplo con JavaScript de MakeCode</small></div></div><div class="mk-real-area" data-live="${i}" aria-live="polite"><p>Los bloques reales se generan con el motor oficial de MakeCode cuando hay conexión.</p></div><details class="ta-code-source"><summary>Ver código / copiar a MakeCode</summary><pre><code>${esc(sample.code)}</code></pre><button type="button" class="pro-btn subtle" data-copy-code="${i}">Copiar código</button></details></div>`;
 }
 function sensorDetail(m){
   const tasks=allTasks(m), code=m.codeSamples||[];
   return `<div class="practice-head"><span class="micro-label">${esc(m.kind)} · ACEBOTT TA647</span><div class="practice-head-row">${img(m,'practice-photo')}<div><h2>${esc(m.name)}</h2><p>${esc(m.desc)}</p><div class="ta-pills"><span>6 actividades</span><span>2 ejemplos MakeCode</span><span>Secundaria</span></div></div></div></div>
   <div class="ta-learning-route" aria-label="Ruta de trabajo"><span>1. Identifica</span><span>2. Conecta</span><span>3. Programa</span><span>4. Mejora</span></div>
   <section class="ta-lesson-section"><h3>🧠 ¿Para qué sirve?</h3><p>${esc(m.desc)}. Observa su fotografía y localiza los conectores antes de programar. Compara la respuesta del módulo con una prueba real.</p></section>
   <section class="ta-lesson-section"><h3>🔌 Conexión con micro:bit</h3><div class="wiring-box"><b>Esquema orientativo de cableado</b><p>${esc(m.wiringDetails||m.connection)}</p><small><b>Importante:</b> se muestran pines de ejemplo. Comprueba serigrafía, alimentación, masa y niveles 3,3 V antes de conectar el equipo.</small></div><div class="ta-wiring-labels"><span><b>S</b> Señal</span><span><b>V</b> Alimentación</span><span><b>G</b> Masa (GND)</span></div></section>
   <section class="ta-lesson-section"><div class="ta-section-heading"><div><span class="micro-label">GUÍA VISUAL REAL · MAKECODE</span><h3>🧩 Programación por bloques</h3></div><a class="pro-btn primary" href="https://makecode.microbit.org/" target="_blank" rel="noopener noreferrer">Abrir MakeCode ↗</a></div><p class="ta-explain">Estos programas están escritos con las funciones de MakeCode y se convierten a <b>imágenes de bloques reales</b> mediante el renderizador oficial. Si no tienes Internet, sigue disponible el código.</p>${code.map((s,i)=>codeBlock(m,s,i)).join('')}<div class="ta-note">${esc(m.codeHelp||'Comprueba la compatibilidad con tu módulo.')}</div></section>
   <section class="ta-lesson-section"><span class="micro-label">SECUENCIA DIDÁCTICA</span><h3>🚀 Seis actividades por componente</h3><div class="ta-activities">${tasks.map((p,i)=>`<article class="ta-activity"><div class="ta-activity-top"><span class="ta-activity-index">${i+1}</span><span class="tier tier-${Math.min(Math.floor(i/2),2)}">${i<2?'INICIAL':i<4?'INTERMEDIO':'PRO'}</span></div><h4>${esc(p)}</h4><label><input type="checkbox" data-task="${i}"><span>Actividad realizada</span></label></article>`).join('')}</div></section>
   <section class="ta-lesson-section"><h3>🧪 Pasos para empezar</h3><ol class="e-steps">${m.steps.map(s=>`<li>${esc(s)}</li>`).join('')}</ol></section>
   <section class="ta-lesson-section"><h3>📋 Comprobación y evaluación</h3><div class="ta-assessment"><label><input type="checkbox"> He fotografiado el módulo e identificado sus conexiones.</label><label><input type="checkbox"> El código está hecho en MakeCode y he mostrado sus bloques.</label><label><input type="checkbox"> He repetido tres pruebas y anotado al menos un cambio.</label><label><input type="checkbox"> He completado un reto PRO y explicado el resultado.</label></div><p><b>Entrega:</b> fotografía del montaje sin datos personales, captura de los bloques, tabla de resultados y una propuesta de mejora.</p></section>
   <div class="safety-box"><b>⚠ Seguridad específica</b><p>${esc(m.caution)}</p></div>
   <div class="e-actions"><button type="button" class="pro-btn subtle" data-copy-guide>Copiar ficha de actividad</button><button type="button" class="pro-btn subtle" data-print>Imprimir / guardar en PDF</button><a class="pro-btn subtle" href="sensores-ta647.html">← Volver al inventario</a></div>
   <p class="source-foot">Fotografía real recortada del inventario aportado. Los bloques oficiales se renderizan en línea con MakeCode; no son ilustraciones imitadas. Algunas prácticas con I²C requieren comprobar modelo y extensión exactos.</p>`;
 }
 function robotDetail(m){return `<div class="practice-head"><span class="micro-label">MISIÓN MQ-${esc(m.id)} · ${esc(m.level)} · ${esc(m.category)}</span><h2>${esc(m.title)}</h2><p>${esc(m.goal)}</p></div><div class="wiring-box"><b>🔌 Material</b><p>Robot Maqueen Plus, micro:bit, fuente de alimentación compatible y pista/obstáculos según la misión. Usa la extensión MakeCode correspondiente a <b>la versión del robot</b>.</p></div><h3>🧩 Pista de bloques</h3><div class="e-block-hint">${esc(m.blocks)}</div><p class="e-mini-help">Guía textual orientativa; los programas enlazados de DFRobot pueden ofrecer bloques reales para el modelo V2.</p><h3>🏅 Tres niveles de reto</h3><div class="e-tiers">${[m.bronze,m.silver,m.pro].map((t,i)=>`<div><span class="tier tier-${i}">${['BRONCE','PLATA','ORO · PRO'][i]}</span><strong>${esc(t)}</strong></div>`).join('')}</div><div class="safety-box"><b>⚠ Seguridad</b><p>${esc(m.safety)}</p></div><div class="e-actions">${m.url?`<a class="pro-btn primary" href="${esc(m.url)}" target="_blank" rel="noopener noreferrer">Abrir programa oficial DFRobot ↗</a>`:`<a class="pro-btn primary" href="https://makecode.microbit.org/" target="_blank" rel="noopener noreferrer">Abrir MakeCode ↗</a>`}<a class="pro-btn subtle" target="_blank" rel="noopener noreferrer" href="https://github.com/DFRobot/pxt-DFRobot_MaqueenPlus_v20">Extensión Maqueen Plus V2 ↗</a><button class="pro-btn subtle" type="button" data-copy>Copiar guía</button><button class="pro-btn subtle" type="button" data-print>Imprimir ficha</button></div><div class="evidence-box"><b>📷 Entrega</b><p>Foto del robot en su pista, captura del código y tabla con al menos dos pruebas, un error y una mejora.</p></div>`}
 function installActions(detail,text){const b=detail.querySelector('[data-copy]');if(b)b.onclick=async()=>{try{await copyText(text);b.textContent='✓ Guía copiada'}catch(e){b.textContent='Copia no disponible'}};const p=detail.querySelector('[data-print]');if(p)p.onclick=()=>window.print()}
 if($('#sensorGrid')){
  const grid=$('#sensorGrid'),inp=$('#sensorSearch'),type=$('#sensorType'),counter=$('#sensorCount');
  [...new Set(items.map(m=>m.kind))].sort().forEach(t=>type.insertAdjacentHTML('beforeend',`<option>${esc(t)}</option>`));
  const draw=()=>{const arr=filter(items,inp.value,type.value);counter.textContent=`${arr.length} de ${items.length} componentes`;grid.innerHTML=arr.map(m=>`<a class="sensor-card" href="practicas-ta647.html?pieza=${encodeURIComponent(m.id)}">${img(m)}<div><span class="micro-label">${esc(m.kind)}</span><h3>${esc(m.name)}</h3><p>${esc(m.desc)}</p><span class="card-link">Ver imágenes reales de bloques y 6 retos →</span></div></a>`).join('')||'<p>No hay piezas que coincidan con la búsqueda.</p>'};
  [inp,type].forEach(e=>e.addEventListener(e===inp?'input':'change',draw));document.querySelectorAll('[data-quick-query]').forEach(btn=>btn.addEventListener('click',()=>{inp.value=btn.dataset.quickQuery||'';type.value='';draw();inp.scrollIntoView({behavior:'smooth',block:'center'});}));draw();
 }
 if($('#practiceList')){
  const list=$('#practiceList'),detail=$('#practiceDetail'),inp=$('#practiceSearch'),type=$('#practiceType'),count=$('#practiceCount');
  [...new Set(items.map(m=>m.kind))].sort().forEach(t=>type.insertAdjacentHTML('beforeend',`<option>${esc(t)}</option>`));
  const validIds=new Set(items.map(m=>m.id));let selected=new URLSearchParams(location.search).get('pieza');
  if(!validIds.has(selected))selected=items[0]?.id;
  const open=id=>{
    const m=items.find(m=>m.id===id);if(!m)return;
    selected=id;detail.innerHTML=sensorDetail(m);
    list.querySelectorAll('[data-open]').forEach(b=>b.classList.toggle('selected',b.dataset.open===id));
    try{history.replaceState(null,'','practicas-ta647.html?pieza='+encodeURIComponent(id))}catch(e){}
    detail.querySelectorAll('[data-copy-code]').forEach(button=>button.onclick=async()=>{
      const i=+button.dataset.copyCode;try{await copyText(m.codeSamples[i].code);button.textContent='✓ Código copiado'}catch(e){button.textContent='Copia no disponible'}
    });
    detail.querySelector('[data-copy-guide]').onclick=async()=>{
      const txt=[m.name,m.desc,'CONEXIÓN',m.wiringDetails,'PASOS',...m.steps,'CÓDIGO A',m.codeSamples[0].code,'CÓDIGO B',m.codeSamples[1].code,'6 ACTIVIDADES',...allTasks(m),'SEGURIDAD',m.caution].join('\n');
      await copyText(txt);detail.querySelector('[data-copy-guide]').textContent='✓ Ficha copiada';
    };
    detail.querySelector('[data-print]').onclick=()=>window.print();
    detail.querySelectorAll('[data-task]').forEach(input=>{
       const k='robolab.ta647.hecho.'+m.id+'.'+input.dataset.task;
       try{input.checked=localStorage.getItem(k)==='1'}catch(e){}
       input.onchange=()=>{try{localStorage.setItem(k,input.checked?'1':'0')}catch(e){}}
    });
    if(window.ROBO_LIVE_MAKECODE){detail.querySelectorAll('[data-live]').forEach((host,i)=>window.ROBO_LIVE_MAKECODE.show(host,'ta647-'+id+'-'+(i+1),m.codeSamples[i].code));}
  };
  const draw=()=>{
    const arr=filter(items,inp.value,type.value);count.textContent=`${arr.length} de ${items.length} componentes · 6 actividades cada uno`;
    list.innerHTML=arr.map(m=>`<button type="button" data-open="${esc(m.id)}" class="practice-list-button ${m.id===selected?'selected':''}">${img(m)}<span><strong>${esc(m.name)}</strong><small>${esc(m.kind)} · 6 actividades</small></span><span>›</span></button>`).join('')||'<p>No hay coincidencias.</p>';
    list.querySelectorAll('[data-open]').forEach(b=>b.onclick=()=>open(b.dataset.open));
    if(arr.length&&!arr.some(m=>m.id===selected))open(arr[0].id);
  };
  inp.oninput=draw;type.onchange=draw;draw();if(selected)open(selected);
 }
 if($('#maqueenList')){
  const list=$('#maqueenList'),detail=$('#maqueenDetail'),inp=$('#maqueenSearch'),type=$('#maqueenLevel'),count=$('#maqueenCount');let selected='01';
  const open=id=>{const m=lessons.find(m=>m.id===id);if(!m)return;selected=id;detail.innerHTML=robotDetail(m);list.querySelectorAll('[data-open]').forEach(b=>b.classList.toggle('selected',b.dataset.open===id));installActions(detail,['Maqueen Plus · '+m.title,m.goal,m.blocks,'Bronce: '+m.bronze,'Plata: '+m.silver,'PRO: '+m.pro,'Seguridad: '+m.safety].join('\n'))};
  const draw=()=>{const arr=lessons.filter(m=>(!type.value||m.level===type.value)&&(!inp.value||norm(JSON.stringify(m)).includes(norm(inp.value))));count.textContent=`${arr.length} de ${lessons.length} misiones`;list.innerHTML=arr.map(m=>`<button class="practice-list-button ${m.id===selected?'selected':''}" data-open="${esc(m.id)}"><span class="mq-number">${esc(m.id)}</span><span><strong>${esc(m.title)}</strong><small>${esc(m.category)} · ${esc(m.level)}</small></span><span>›</span></button>`).join('')||'<p>No hay coincidencias.</p>';list.querySelectorAll('[data-open]').forEach(b=>b.onclick=()=>open(b.dataset.open));if(arr.length&&!arr.some(m=>m.id===selected))open(arr[0].id)};
  inp.oninput=draw;type.onchange=draw;draw();open(selected);
 }
})();
