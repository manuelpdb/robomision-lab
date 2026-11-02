'use strict';
(()=>{
 const $=(s,p=document)=>p.querySelector(s),esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
 const excluded=new Set(['protoboard','mm','mf','ff']);
 const items=(window.ROBO_TA647||[]).filter(m=>!excluded.has(String(m.id).toLowerCase())&&!/protoboard|cables? dupont/i.test(String(m.name))), lessons=window.ROBO_MAQUEEN||[];
 const img=(m,cls='')=>`<img class="${cls}" loading="lazy" src="${esc(m.photo)}" alt="Fotografía del componente ${esc(m.name)} del kit ACEBOTT TA647">`;
 const norm=s=>String(s||'').normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLocaleLowerCase('es');
 const filter=(arr,q,cat)=>arr.filter(m=>(!cat||(m.kind||m.level)===cat)&&(!q||norm([m.name,m.desc,m.kind,...(m.practices||[]),...(m.expanded||[])].join(' ')).includes(norm(q))));
 const allTasks=m=>(m.practices||[]).concat(m.expanded||[]);
 function copyText(txt){
   if(navigator.clipboard&&window.isSecureContext)return navigator.clipboard.writeText(txt);
   const el=document.createElement('textarea');el.value=txt;document.body.append(el);el.select();document.execCommand('copy');el.remove();return Promise.resolve();
 }
 function guide(m){return (window.ROBO_TA647_GUIAS||{})[m.id]||null;}
 function codeBlock(m,sample,i){
   const g=guide(m),p=g&&g.programs[i];
   const mode=p?p.mode:'demostracion';
   const modeLabel={hardware:'LECTURA O CONTROL DEL MÓDULO',simulacion:'DEMOSTRACIÓN · NO USA EL MÓDULO EXTERNO',demostracion:'EJERCICIO PREVIO · NECESITA ADAPTACIÓN',condicional:'MONTAJE CON CONDICIONES ESPECIALES'}[mode]||'GUÍA DEL PROGRAMA';
   const blocks=p?(p.blocks||[]).map((step,n)=>`<li><span class="ta21-stepnumber">${n+1}</span><div><strong>${esc(step.name)}</strong><p>${esc(step.why)}</p></div></li>`).join(''):'';
   return `<div class="ta-code-example ta21-code" id="ta21-program-${i}"><div class="ta-code-title"><span class="ta-code-index">${i===0?'01':'02'}</span><div><strong>${p?esc(p.title):esc(sample.title)}</strong><small>${i===0?'EJEMPLO A · PARA EMPEZAR':'EJEMPLO B · PARA MEJORAR'}</small></div></div>
    <span class="ta21-mode ${mode}">${esc(modeLabel)}</span>
    ${p?`<div class="ta21-purpose"><h4>¿Qué hace este programa?</h4><p>${esc(p.objective)}</p><h4>¿Qué verás al ejecutarlo?</h4><p>${esc(p.observe)}</p></div>`:''}
    <div class="mk-real-area" data-live="${i}" aria-live="polite"><p>Preparando bloques oficiales con Microsoft MakeCode…</p></div>
    ${p?`<div class="ta21-blockexplain"><h4>🧩 Explicación de cada bloque, en orden</h4><p class="ta21-note">Sigue los pasos mientras observas la imagen de MakeCode. Los bloques que estén dentro de un evento, «si» o «para siempre» ejecutan sus instrucciones siguiendo su estructura.</p><ol>${blocks}</ol><p class="ta21-question"><b>Experimenta:</b> ${esc(p.question)}</p></div>`:''}
    <details class="ta-code-source"><summary>Ver el JavaScript exacto y copiarlo a MakeCode</summary><pre><code>${esc(sample.code)}</code></pre><button type="button" class="pro-btn subtle" data-copy-code="${i}">Copiar código</button></details>
  </div>`;
 }
 function activityCard(m,title,i){
   const g=guide(m),a=g&&g.activities[i];
   const level=i<2?'INICIAL':i<4?'INTERMEDIO':'PRO';
   const levelIndex=Math.min(Math.floor(i/2),2),which=a?a.program:(i%2);
   return `<article class="ta-activity ta21-activity" id="actividad-${i+1}"><div class="ta-activity-top"><span class="ta-activity-index">${i+1}</span><span class="tier tier-${levelIndex}">${level}</span></div><h4>${esc(title)}</h4>
    ${a?`<div class="ta21-summary"><b>¿Qué vamos a conseguir?</b><p>${esc(a.objective)}</p><b>¿Cómo sabremos que funciona?</b><p>${esc(a.success)}</p></div><details class="ta21-instructions" ${i===0?'open':''}><summary>📖 Instrucciones completas para esta actividad</summary><ol>${a.steps.map(s=>`<li>${esc(s)}</li>`).join('')}</ol><div class="ta21-improve"><b>Reto extra:</b> ${esc(a.variant)}</div></details>`:''}
    <details class="task-wiring" ${i===0?'open':''}><summary>🔌 Conexiones de esta actividad · Shield + Dupont</summary>${window.ROBO_WIRING_V8.render(m,i)}</details>
    <div class="ta-task-actions"><button type="button" class="ta-go-program" data-go-program="${which}">🧩 Ver bloques explicados del ejemplo ${which===0?'A':'B'} ↑</button><span>El ejemplo es un punto de partida. Sigue las instrucciones para completar el reto; comprueba si se necesita una extensión.</span></div>
    <label><input type="checkbox" data-task="${i}"><span>Actividad realizada y comprobada</span></label>
   </article>`;
 }
 function shieldDetail(m){
  return `<section class="ta-lesson-section shield-detail" id="conexion-shield"><span class="micro-label">CONEXIONES CORREGIDAS · V8</span><h3>La micro:bit entra en el zócalo de la Shield</h3><p>No se usan cables entre micro:bit y Shield. En cada actividad encontrarás el cableado concreto desde los pines <b>S / V / G</b> (o SDA/SCL, etc.) de la Shield hasta el módulo con los <b>cables Dupont del kit</b>. Si el ejercicio utiliza más de un módulo, se mostrarán todas sus conexiones.</p><p>Abre los desplegables <b>«Conexiones de esta actividad»</b> que aparecen debajo de cada reto. Identifica primero los pines reales, su alimentación y la orientación del cable antes de conectar.</p><p class="shield-important"><b>Atención:</b> para sensores de 5 V, motores, servos y módulos I²C incompatibles hacen falta protecciones o alimentación adicional. Un cable Dupont por sí solo no sustituye esos elementos.</p></section>`;
 }
 function sensorDetail(m){
   const tasks=allTasks(m), code=m.codeSamples||[],g=guide(m);
   return `<div class="practice-head"><span class="micro-label">${esc(m.kind)} · ACEBOTT TA647</span><div class="practice-head-row">${img(m,'practice-photo')}<div><h2>${esc(m.name)}</h2><p>${esc(m.desc)}</p><div class="ta-pills"><span>6 actividades explicadas</span><span>2 programas explicados bloque a bloque</span><span>Secundaria</span></div></div></div></div>
   <div class="ta-learning-route" aria-label="Ruta de trabajo"><span>1. Identifica</span><span>2. Conecta</span><span>3. Programa</span><span>4. Mejora</span></div>
   <section class="ta-lesson-section ta21-intro"><span class="micro-label">GUÍA DIDÁCTICA COMPLETA · V21</span><h3>🧠 ¿Qué hace realmente este componente?</h3><p>${g?esc(g.why):esc(m.desc)}</p><div class="ta21-safety"><b>Antes de conectar:</b> ${g?esc(g.setup):esc(m.caution)}</div></section>
   <section class="ta-lesson-section"><h3>🔌 Montaje: micro:bit + Shield</h3><p>Inserta la micro:bit en el zócalo de la Shield. Los cables Dupont se utilizan entre la Shield y cada módulo; no se conectan entre la micro:bit y la Shield. Consulta el esquema específico debajo de cada actividad.</p><div class="ta-wiring-labels"><span><b>S</b> Señal</span><span><b>V</b> Alimentación</span><span><b>G</b> Masa (GND)</span></div></section>
   ${shieldDetail(m)}
   <section class="ta-lesson-section"><div class="ta-section-heading"><div><span class="micro-label">CADA BLOQUE EXPLICADO · MAKECODE</span><h3>🧩 Programa A y B: qué hacen y cómo funcionan</h3></div><a class="pro-btn primary" href="https://makecode.microbit.org/?lang=es-ES" target="_blank" rel="noopener noreferrer">Abrir MakeCode ↗</a></div><p class="ta-explain">En cada ejemplo encontrarás primero <b>qué hace realmente</b>, después los <b>bloques originales generados en línea</b>, la <b>explicación de cada bloque</b> y el resultado esperado. Si una actividad es solo una simulación previa a conectar un módulo, quedará señalado expresamente.</p>${code.map((s,i)=>codeBlock(m,s,i)).join('')}<div class="ta-note">${esc(m.codeHelp||'Comprueba la compatibilidad con tu módulo.')} <b>Atención:</b> en módulos con extensiones (OLED, LCD, color o presión), los ejemplos sin esa extensión muestran solo la lógica de apoyo en micro:bit; no escriben en la pantalla ni leen directamente ese sensor.</div></section>
   <section class="ta-lesson-section"><span class="micro-label">6 ACTIVIDADES EXPLICADAS · DE INICIAL A PRO</span><h3>🚀 Qué hacer, cómo hacerlo y cómo comprobarlo</h3><p class="ta21-note">Abre «Instrucciones completas» en cada actividad y sigue su montaje específico. Comprueba el resultado antes de marcarla como realizada.</p><div class="ta-activities">${tasks.map((p,i)=>activityCard(m,p,i)).join('')}</div></section>
   <section class="ta-lesson-section"><h3>🧪 Pasos para empezar</h3><ol class="e-steps">${m.steps.map(s=>`<li>${esc(s)}</li>`).join('')}</ol></section>
   <section class="ta-lesson-section"><h3>📋 Comprobación y evaluación</h3><div class="ta-assessment"><label><input type="checkbox"> He fotografiado el módulo e identificado sus conexiones.</label><label><input type="checkbox"> El código está hecho en MakeCode y he mostrado sus bloques.</label><label><input type="checkbox"> He repetido tres pruebas y anotado al menos un cambio.</label><label><input type="checkbox"> He completado un reto PRO y explicado el resultado.</label></div><p><b>Entrega:</b> fotografía del montaje sin datos personales, captura de los bloques, tabla de resultados y una propuesta de mejora.</p></section>
   <div class="safety-box"><b>⚠ Seguridad específica</b><p>${esc(m.caution)}</p></div>
   <div class="e-actions"><button type="button" class="pro-btn subtle" data-copy-guide>Copiar ficha de actividad</button><button type="button" class="pro-btn subtle" data-print>Imprimir / guardar en PDF</button><a class="pro-btn subtle" href="sensores-ta647.html">← Volver al inventario</a></div>
   <p class="source-foot">Fotografía real recortada del inventario aportado. Los bloques oficiales se renderizan en línea con MakeCode; no son ilustraciones imitadas. Algunas prácticas con I²C requieren comprobar modelo y extensión exactos.</p>`;
 }
 function robotDetail(m){
  if(window.ROBO_MAQUEEN_V9_RENDER)return window.ROBO_MAQUEEN_V9_RENDER.render(m);
  return `<div class="practice-head"><h2>${esc(m.title)}</h2><p>${esc(m.goal)}</p></div>`;
 }
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
      const g=guide(m);const txt=[m.name,m.desc,'¿PARA QUÉ SIRVE?',g?.why||'','ANTES DE CONECTAR',g?.setup||'', 'CONEXIÓN',m.wiringDetails,'PASOS',...m.steps,...m.codeSamples.flatMap((s,i)=>['CÓDIGO '+(i?'B':'A'),s.code,...(g?.programs[i]?.blocks||[]).map(b=>b.name+': '+b.why)]),'6 ACTIVIDADES',...allTasks(m),'SEGURIDAD',m.caution].join('\n');
      await copyText(txt);detail.querySelector('[data-copy-guide]').textContent='✓ Ficha copiada';
    };
    detail.querySelector('[data-print]').onclick=()=>window.print();
    detail.querySelectorAll('[data-task]').forEach(input=>{
       const k='robolab.ta647.hecho.'+m.id+'.'+input.dataset.task;
       try{input.checked=localStorage.getItem(k)==='1'}catch(e){}
       input.onchange=()=>{try{localStorage.setItem(k,input.checked?'1':'0')}catch(e){}}
    });
    detail.querySelectorAll('[data-go-program]').forEach(button=>button.onclick=()=>{const target=detail.querySelectorAll('[data-live]')[Number(button.dataset.goProgram)];if(target)target.scrollIntoView({behavior:'smooth',block:'center'});});
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
  const open=id=>{const m=lessons.find(m=>m.id===id);if(!m)return;selected=id;detail.innerHTML=robotDetail(m);list.querySelectorAll('[data-open]').forEach(b=>b.classList.toggle('selected',b.dataset.open===id));installActions(detail,window.ROBO_MAQUEEN_V9_RENDER?window.ROBO_MAQUEEN_V9_RENDER.toText(m):m.title);if(window.ROBO_MAQUEEN_V9_RENDER)window.ROBO_MAQUEEN_V9_RENDER.init(detail,m)};
  const draw=()=>{const arr=lessons.filter(m=>(!type.value||m.level===type.value)&&(!inp.value||norm(JSON.stringify(m)).includes(norm(inp.value))));count.textContent=`${arr.length} de ${lessons.length} misiones`;list.innerHTML=arr.map(m=>`<button class="practice-list-button ${m.id===selected?'selected':''}" data-open="${esc(m.id)}"><span class="mq-number">${esc(m.id)}</span><span><strong>${esc(m.title)}</strong><small>${esc(m.category)} · ${esc(m.level)}</small></span><span>›</span></button>`).join('')||'<p>No hay coincidencias.</p>';list.querySelectorAll('[data-open]').forEach(b=>b.onclick=()=>open(b.dataset.open));if(arr.length&&!arr.some(m=>m.id===selected))open(arr[0].id)};
  inp.oninput=draw;type.onchange=draw;draw();open(selected);
 }
})();
