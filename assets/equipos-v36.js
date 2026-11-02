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
 const simpleGoal=(m,i,p)=>((window.ROBO_TA647_V36_METAS||{})[m.id]||[])[i]||p?.objective||'Entender el funcionamiento de los bloques de este ejemplo.';
 const modeText={
   hardware:{label:'EJEMPLO CON EL COMPONENTE',explain:'Se utiliza con el módulo real conectado correctamente, después de verificar alimentación y pines.'},
   simulacion:{label:'PRUEBA EN LA MICRO:BIT · SIN EL MÓDULO',explain:'Este código NO controla el componente externo. Solo sirve para practicar la lógica antes de escribir el programa específico.'},
   demostracion:{label:'DEMOSTRACIÓN PREVIA',explain:'Practica los bloques básicos. Puede necesitar un módulo conectado o cambios para realizar la actividad completa.'},
   condicional:{label:'CONTROL CON COMPROBACIONES PREVIAS',explain:'Antes de conectarlo debes confirmar tensión, polaridad, controlador y alimentación del módulo real.'}
 };
 function guidance(m,i){const p=guide(m)?.programs[i];return modeText[p?.mode]||modeText.demostracion;}

 function codeBlock(m,sample,i){
   const p=guide(m)?.programs[i], mode=p?.mode||'demostracion', md=guidance(m,i),label=i?'B':'A';
   const blocks=(p?.blocks||[]).map((step,n)=>`<li><span class="ta21-stepnumber">${n+1}</span><div><strong>${esc(step.name)}</strong><p>${esc(step.why)}</p></div></li>`).join('');
   return `<article class="ta-code-example ta21-code ta36-code" id="ta36-program-${i}" aria-labelledby="ta36-program-title-${i}">
      <header class="ta36-codehead"><span class="ta36-letter">${label}</span><div><span class="ta36-codeover">PROGRAMA DE REFERENCIA ${label} · ${i===0?'PRIMEROS PASOS':'PARA SEGUIR APRENDIENDO'}</span><h4 id="ta36-program-title-${i}">${esc(simpleGoal(m,i,p))}</h4></div></header>
      <div class="ta36-codepurpose"><span class="ta36-mode ta36-${esc(mode)}">${esc(md.label)}</span><p class="ta36-modeexplain">${esc(md.explain)}</p><div class="ta36-results"><div><b>1 · Qué vas a programar</b><p>${esc(p?.objective||sample.title)}</p></div><div><b>2 · Qué debe ocurrir</b><p>${esc(p?.observe||'Compara el comportamiento con el objetivo descrito en la actividad.')}</p></div></div></div>
      <section class="ta36-imagearea" aria-label="Imagen de bloques de MakeCode"><h5>3 · Observa los bloques reales y monta el programa</h5><p>Los bloques de colores son una imagen generada por Microsoft MakeCode. <b>Puedes ampliarla</b> para leer los detalles. Si no carga, abre el código del final del ejemplo.</p><div class="mk-real-area" data-live="${i}" aria-live="polite"><p>Solicitando los bloques a MakeCode…</p></div></section>
      ${p?`<section class="ta21-blockexplain ta36-blockexplain"><h5>4 · ¿Qué hace cada bloque? Léelos en este orden</h5><ol>${blocks}</ol><p class="ta21-question"><b>Una modificación para probar:</b> ${esc(p.question)}</p></section>`:''}
      <div class="ta36-codefooter"><strong>5 · Úsalo para tu actividad</strong><p>El ejemplo ${label} es una <b>ayuda para aprender</b>. Vuelve a la actividad seleccionada y comprueba si debes añadir sensores, cambiar condiciones o utilizar una extensión. <b>No copies ambos programas como si fueran la solución de la actividad.</b></p></div>
      <details class="ta-code-source"><summary>Ver el código JavaScript de este programa</summary><p class="ta36-sourcewarning">No se traducen los nombres de las funciones: MakeCode los necesita para que el programa funcione.</p><pre><code>${esc(sample.code)}</code></pre><button type="button" class="pro-btn subtle" data-copy-code="${i}">Copiar código JavaScript</button></details>
   </article>`;
 }
 function activityCard(m,title,i){
  const g=guide(m),a=g&&g.activities[i];
  const level=i<2?'INICIAL':i<4?'INTERMEDIO':'PRO';
  const which=a?a.program:(i%2);
  const instructions=(a?.steps||m.steps||[]).map((step,n)=>`<li><span class="ta34-stepnum">${n+1}</span><span>${esc(step)}</span></li>`).join('');
  const clearInfo=a?`<div class="ta34-outcomes"><div><span class="ta34-eyebrow">META CLARA</span><p>${esc(a.objective)}</p></div><div><span class="ta34-eyebrow">PRUEBA PARA DARLA POR CONSEGUIDA</span><p>${esc(a.success)}</p></div></div>`:'';
  const plan=a?.plan;
  const pg=guide(m)?.programs[which],md=guidance(m,which),theLetter=which?'B':'A';
  const preview=`<div class="ta36-related"><div class="ta36-related-head"><span class="ta36-related-letter">${theLetter}</span><div><span>EL EJEMPLO QUE TE PUEDE AYUDAR</span><strong>${esc(simpleGoal(m,which,pg))}</strong></div></div><div class="ta36-related-body"><p><b>¿Qué hace realmente?</b> ${esc(pg?.objective||'Practica los bloques básicos.')}</p><p><b>¿Qué observarás?</b> ${esc(pg?.observe||'Compara con el objetivo de tu actividad.')}</p><p class="ta36-related-mode"><b>${esc(md.label)}.</b> ${esc(md.explain)}</p><p class="ta36-related-warning">Ojo: <b>tu actividad manda</b>. Sigue el algoritmo específico que aparece arriba; el ejemplo ${theLetter} no resuelve automáticamente todos los pasos.</p></div><button type="button" class="ta-go-program ta36-related-button" data-go-program="${which}">Ver programa ${theLetter}: imagen de bloques y explicación paso a paso ↓</button></div>`;
  const mode=(m.id==='shield'||['rgb','color','presion','oled','lcd'].includes(m.id))?'Diseño / simulación previa hasta verificar el módulo':(['bomba','motorcc','l298n','rele','ultrason','lm35','servo180','servo360'].includes(m.id)?'Montaje condicionado a comprobación de seguridad':'Práctica guiada con el módulo real compatible');
  const clearProgram=plan?`<div class="ta35-program-plan"><span class="ta34-eyebrow">🧠 PROGRAMA QUE NECESITAS PARA ESTA ACTIVIDAD</span><p>${esc(plan.program)}</p><div class="ta35-program-truth"><b>Qué debes comprobar:</b> ${esc(plan.check)}</div></div>`:'';
  const decision=plan?`<div class="ta35-plan-activity"><span>1 · ACCIÓN</span><p>${esc(plan.action)}</p><span>2 · BLOQUES</span><p>${esc(plan.program)}</p><span>3 · PRUEBA</span><p>${esc(plan.check)}</p></div>`:'';
  return `<article class="ta-activity ta21-activity ta34-activity" data-activity-card="${i}" id="actividad-${i+1}" ${i?'hidden':''}>
    <div class="ta34-activeheading"><span class="ta34-mainnum">${String(i+1).padStart(2,'0')}</span><div><span class="ta34-eyebrow">ACTIVIDAD ${i+1} DE 6 · ${level}</span><h4>${esc(title)}</h4></div></div>
    <div class="ta35-mode-label">${esc(mode)}</div>
    ${clearInfo}
    ${decision}
    <div class="ta34-materials"><h5>🧰 Qué necesitas</h5><p>${esc(a?.materials||'Micro:bit, Shield y componente descrito en el esquema inferior. Comprueba el material adicional antes de iniciar.')}</p></div>
    <div class="ta34-instruction-area"><h5>🛠️ Qué debe hacer el alumnado, paso a paso</h5><ol>${instructions}</ol></div>
    <section class="ta34-link-panel"><h5>🔌 Cómo conectar cada elemento</h5><p>Lee este esquema <b>antes</b> de realizar el montaje. La micro:bit entra en el zócalo de la Shield; los cables Dupont van hacia los módulos.</p>
    <div class="ta34-wiring-visible">${window.ROBO_WIRING_V8.render(m,i)}</div></section>
    <div class="ta34-program-guide"><h5>🧩 Cómo programarlo</h5>
    ${clearProgram}
    ${m.id==='shield'?'<p>En esta actividad la meta principal es aprender el <b>montaje y los pines de la Shield</b>. No es obligatorio descargar un programa para realizar el croquis o detectar errores. Los ejemplos de MakeCode de abajo son ejercicios opcionales de lectura P1.</p>':a?.code?'<p>Utiliza el siguiente programa <b>solo para comprobar la lectura de humedad</b>. La bomba y el relé siguen desconectados. No copies el ejemplo genérico A/B como si fuese un riego automático completo.</p>':`<p>Primero sigue <b>el algoritmo específico</b> de esta actividad. El ejemplo ${theLetter} que aparece justo después te ayudará a aprender los bloques relacionados, pero quizá tengas que <b>añadir condiciones, sensores o una extensión</b> para completar el reto. No cambies los pines sin actualizar el esquema de conexiones.</p>`}
    ${a?.code?`<div class="ta34-code-activity"><strong>Ejemplo específico de esta actividad</strong><p>${esc(a.codeNote)}</p><pre><code>${esc(a.code)}</code></pre><button type="button" data-copy-v34="${i}" class="ta34-copycode">Copiar este código de simulación</button></div>`:''}
    ${preview}</div>
    <div class="ta34-evidence"><div><span class="ta34-eyebrow">🧪 PRUEBA Y ENTREGA</span><p>${esc(a?.deliver||'Registra tres ensayos, una fotografía o croquis y una mejora.')}</p></div><div><span class="ta34-eyebrow">⭐ RETO EXTRA</span><p>${esc(a?.variant||'Propón una mejora y comprueba el resultado.')}</p></div></div>
    <label class="ta34-checkdone"><input type="checkbox" data-task="${i}"><span>He completado y comprobado esta actividad</span></label>
    <div class="ta34-activity-foot"><button type="button" class="ta34-next" data-next-activity="${i<5?i+1:0}">${i<5?'Siguiente actividad →':'Volver a actividad 1 ↺'}</button></div>
   </article>`;
 }
 function shieldDetail(m){
  return `<section class="ta-lesson-section shield-detail" id="conexion-shield"><span class="micro-label">CONEXIONES POR ACTIVIDAD · V36</span><h3>La micro:bit entra en el zócalo de la Shield</h3><p>No se usan cables entre micro:bit y Shield. En cada actividad encontrarás el cableado concreto desde los pines <b>S / V / G</b> (o SDA/SCL, etc.) de la Shield hasta el módulo con los <b>cables Dupont del kit</b>. Si el ejercicio utiliza más de un módulo, se mostrarán todas sus conexiones.</p><p>Cada actividad muestra su esquema de conexiones directamente, debajo de los pasos. Identifica primero los pines reales, su alimentación y la orientación del cable antes de conectar.</p><p class="shield-important"><b>Atención:</b> para sensores de 5 V, motores, servos y módulos I²C incompatibles hacen falta protecciones o alimentación adicional. Un cable Dupont por sí solo no sustituye esos elementos.</p></section>`;
 }
 function sensorDetail(m){
   const tasks=allTasks(m), code=m.codeSamples||[],g=guide(m);
   return `<div class="practice-head"><span class="micro-label">${esc(m.kind)} · ACEBOTT TA647</span><div class="practice-head-row">${img(m,'practice-photo')}<div><h2>${esc(m.name)}</h2><p>${esc(m.desc)}</p><div class="ta-pills"><span>6 actividades con montaje y prueba</span><span>Ejemplos A y B explicados paso a paso</span><span>Secundaria</span></div></div></div></div>
   <div class="ta-learning-route" aria-label="Ruta de trabajo"><span>1. Identifica</span><span>2. Conecta</span><span>3. Programa</span><span>4. Mejora</span></div>
   <section class="ta-lesson-section ta21-intro"><span class="micro-label">GUÍA DIDÁCTICA REVISADA · V36</span><h3>🧠 ¿Qué hace realmente este componente?</h3><p>${g?esc(g.why):esc(m.desc)}</p><div class="ta21-safety"><b>Antes de conectar:</b> ${g?esc(g.setup):esc(m.caution)}</div></section>
   <section class="ta-lesson-section"><h3>🔌 Montaje: micro:bit + Shield</h3><p>Inserta la micro:bit en el zócalo de la Shield. Los cables Dupont se utilizan entre la Shield y cada módulo; no se conectan entre la micro:bit y la Shield. Consulta el esquema específico debajo de cada actividad.</p><div class="ta-wiring-labels"><span><b>S</b> Señal</span><span><b>V</b> Alimentación</span><span><b>G</b> Masa (GND)</span></div></section>
   ${shieldDetail(m)}
   <section class="ta-lesson-section"><span class="micro-label">RUTA DE TRABAJO · SELECCIONA UNA ACTIVIDAD</span><h3>🚀 Elige tu actividad y sigue los pasos</h3><p class="ta34-navigation-intro">Pulsa una tarjeta. Verás <b>qué conseguir</b>, <b>materiales reales</b>, <b>pasos de trabajo</b>, <b>conexiones</b>, <b>prueba de éxito</b> y <b>entrega</b>, sin desplegables escondidos.</p>
    <div class="ta34-picker" role="group" aria-label="Elegir una de las seis actividades">${tasks.map((p,i)=>`<button type="button" data-select-activity="${i}" class="ta34-picker-button ${i===0?'active':''}" aria-pressed="${i===0?'true':'false'}"><span>${String(i+1).padStart(2,'0')} · ${i<2?'INICIAL':i<4?'INTERMEDIO':'PRO'}</span><strong>${esc(p)}</strong></button>`).join('')}</div>
    <div class="ta34-activity-counter" aria-live="polite">Actividad 1 de 6</div><div class="ta-activities">${tasks.map((p,i)=>activityCard(m,p,i)).join('')}</div></section>
   <section class="ta-lesson-section ta36-program-section" id="ta36-referencias"><div class="ta36-program-hero"><span class="ta36-program-eyebrow">GUÍA DE PROGRAMACIÓN · MICROSOFT MAKECODE</span><h3>🧩 Aprende los bloques con dos programas explicados</h3><p>Estos son <b>dos programas de referencia, A y B</b>, para aprender cómo se programa este componente. <b>Son diferentes de las seis actividades</b> que aparecen arriba: utiliza sus bloques como punto de partida y sigue las instrucciones específicas de la actividad que has elegido.</p><div class="ta36-stepsbar"><div><strong>1</strong><span>Lee qué hace el ejemplo</span></div><div><strong>2</strong><span>Monta sus bloques en MakeCode</span></div><div><strong>3</strong><span>Comprueba el resultado y adapta tu actividad</span></div></div><a class="pro-btn primary" href="https://makecode.microbit.org/?lang=es-ES" target="_blank" rel="noopener noreferrer">Abrir MakeCode en español ↗</a></div>${code.map((s,i)=>codeBlock(m,s,i)).join('')}<div class="ta-note">${esc(m.codeHelp||'Comprueba la compatibilidad con tu módulo.')} <b>Atención:</b> en módulos con extensiones (OLED, LCD, color o presión), los ejemplos sin esa extensión muestran solo la lógica de apoyo en micro:bit; no escriben en la pantalla ni leen directamente ese sensor.</div></section>
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
  const draw=()=>{const arr=filter(items,inp.value,type.value);counter.textContent=`${arr.length} de ${items.length} componentes`;grid.innerHTML=arr.map(m=>`<a class="sensor-card" href="practicas-ta647.html?pieza=${encodeURIComponent(m.id)}">${img(m)}<div><span class="micro-label">${esc(m.kind)}</span><h3>${esc(m.name)}</h3><p>${esc(m.desc)}</p><span class="card-link">Ver las 6 actividades y ejemplos A/B explicados →</span></div></a>`).join('')||'<p>No hay piezas que coincidan con la búsqueda.</p>'};
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
    try{const url=new URL(location.href);url.searchParams.set('pieza',id);if(!url.searchParams.has('actividad'))url.searchParams.set('actividad','1');history.replaceState(null,'',url.pathname+url.search)}catch(e){}
    detail.querySelectorAll('[data-copy-v34]').forEach(button=>button.onclick=async()=>{
      const g=guide(m);const a=g?.activities[Number(button.dataset.copyV34)];if(!a?.code)return;
      try{await copyText(a.code);button.textContent='✓ Código de simulación copiado'}catch(e){button.textContent='No se pudo copiar'}
    });
    detail.querySelectorAll('[data-copy-code]').forEach(button=>button.onclick=async()=>{
      const i=+button.dataset.copyCode;try{await copyText(m.codeSamples[i].code);button.textContent='✓ Código copiado'}catch(e){button.textContent='Copia no disponible'}
    });
    detail.querySelector('[data-copy-guide]').onclick=async()=>{
      const g=guide(m);const txt=[m.name,m.desc,'¿PARA QUÉ SIRVE?',g?.why||'','ANTES DE CONECTAR',g?.setup||'', 'PROGRAMAS',...m.codeSamples.flatMap((s,i)=>['CÓDIGO '+(i?'B':'A'),s.code,...(g?.programs[i]?.blocks||[]).map(b=>b.name+': '+b.why)]),'6 ACTIVIDADES',...(g?.activities||[]).flatMap((a,i)=>['ACTIVIDAD '+(i+1)+': '+allTasks(m)[i], 'Materiales: '+a.materials,'Objetivo: '+a.objective,...a.steps,'Resultado: '+a.success,'Entrega: '+a.deliver]),'SEGURIDAD',m.caution].join('\n');
      await copyText(txt);detail.querySelector('[data-copy-guide]').textContent='✓ Ficha copiada';
    };
    detail.querySelector('[data-print]').onclick=()=>window.print();
    detail.querySelectorAll('[data-task]').forEach(input=>{
       const k='robolab.ta647.hecho.'+m.id+'.'+input.dataset.task;
       try{input.checked=localStorage.getItem(k)==='1'}catch(e){}
       input.onchange=()=>{try{localStorage.setItem(k,input.checked?'1':'0')}catch(e){}}
    });
    // Una única ficha abierta: objetivo, instrucciones y cableado visibles sin desplegables.
    const buttons=[...detail.querySelectorAll('[data-select-activity]')];
    const cards=[...detail.querySelectorAll('[data-activity-card]')];
    const choose=(n,scroll)=>{
      n=Math.min(5,Math.max(0,Number(n)||0));
      buttons.forEach((b,i)=>{const active=i===n;b.classList.toggle('active',active);b.setAttribute('aria-pressed',String(active));});
      cards.forEach((c,i)=>c.hidden=i!==n);
      const status=detail.querySelector('.ta34-activity-counter');if(status)status.textContent=`Actividad ${n+1} de 6 · ${n<2?'Nivel inicial':n<4?'Intermedio':'PRO'}`;
      try{const url=new URL(location.href);url.searchParams.set('pieza',id);url.searchParams.set('actividad',String(n+1));history.replaceState(null,'',url.pathname+url.search)}catch(e){}
      if(scroll){const active=cards[n];if(active)active.scrollIntoView({behavior:'smooth',block:'start'});}
    };
    buttons.forEach(b=>b.onclick=()=>choose(Number(b.dataset.selectActivity),true));
    detail.querySelectorAll('[data-next-activity]').forEach(b=>b.onclick=()=>choose(Number(b.dataset.nextActivity),true));
    const initial=new URLSearchParams(location.search).get('actividad');choose(initial?Number(initial)-1:0,false);
    detail.querySelectorAll('[data-go-program]').forEach(button=>button.onclick=()=>{const n=Number(button.dataset.goProgram);const target=detail.querySelector('#ta36-program-'+n);if(target){target.classList.add('ta36-pulse');target.scrollIntoView({behavior:'smooth',block:'start'});setTimeout(()=>target.classList.remove('ta36-pulse'),2400);}});
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
