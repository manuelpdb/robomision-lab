'use strict';
(()=>{
 const B=window.BB,id=new URLSearchParams(location.search).get('id'),m=B.mission(id),el=document.getElementById('worksheet'),h=B.escape;
 if(!m){el.innerHTML='<h1>Misión no encontrada</h1><a href="misiones.html">Volver al catálogo</a>';return;}
 const g=(window.ROBO_MISION_GUIAS_V28||{})[m.id];
 const steps=g?.program||m.steps;
 document.title='Ficha · '+m.title+' · RoboMisión LAB';
 el.innerHTML=`<div class="sheet-tools"><a href="${B.url(m.id)}">← Volver a la misión</a><div class="sheet-print-actions"><button type="button" id="printSheet" class="pro-btn primary">Imprimir / guardar PDF</button><a href="misiones.html" class="pro-btn subtle">Catálogo</a></div></div>
 <div class="sheet-topline"><span>ROBOMISIÓN LAB · MISIÓN GUIADA</span><span>MISIÓN ${h(m.id)} · ${h(m.level)}</span></div>
 <p class="sheet-id">${h(m.routeName)} · ${m.min} minutos</p><h1 class="sheet-title">${h(m.title)}</h1><p><b>Objetivo:</b> ${h(m.goal)}</p>
 <div class="fields"><div><b>EQUIPO</b>_____________________________________</div><div><b>FECHA / GRUPO</b>______________________________</div></div>
 <section class="sheet-section"><h2>1 · Antes de programar</h2><p><b>Prepara:</b> ${h(g?.prep||m.kit)}</p><p><b>Comprende:</b> ${h(g?.explain||m.goal)}</p><p class="sheet-v28-result"><b>Así funcionará:</b> ${h(g?.example||m.goal)}</p></section>
 <section class="sheet-section"><h2>2 · Sigue estas instrucciones</h2><ul class="sheet-tasks">${steps.map(s=>`<li><span class="sheet-checkbox">□</span><span>${h(s)}</span></li>`).join('')}</ul></section>
 <section class="sheet-section sheet-image-first"><h2>3 · Apoyo de MakeCode</h2><p>La imagen se genera en línea y es un ejemplo inicial: adapta los bloques al reto. Si no aparece, utiliza las instrucciones anteriores.</p><div id="rmkFicha" class="rmk-target"></div><details><summary>Consultar lógica orientativa en texto</summary><p class="sheet-code">${h(m.blocks)}</p></details></section>
 <section class="sheet-section"><h2>4 · Comprueba que funciona</h2><p class="sheet-v28-result"><b>Prueba específica:</b> ${h(g?.test||'Realiza tres ensayos y registra el resultado.')}</p><p><b>Evita este error:</b> ${h(g?.warning||m.bug)}</p><p><b>Registro de tres intentos:</b> 1. _____________ 2. _____________ 3. _____________</p></section>
 <section class="sheet-section"><h2>5 · Retos Bronce, Plata y PRO</h2><ul class="sheet-tasks">${(g?g.levels:m.challenges.map(c=>({task:c,success:'Realiza una prueba.'}))).map((c,i)=>`<li><span class="sheet-checkbox">□</span><span><b>${['BRONCE','PLATA','PRO'][i]}:</b> ${h(c.task)}<br><b>Se supera cuando:</b> ${h(c.success)}</span></li>`).join('')}</ul></section>
 <section class="sheet-section"><h2>6 · Entrega y reflexión</h2><p><b>Entregable:</b> ${h(m.evidence)}</p><p><b>Qué error encontré y cómo lo solucioné:</b></p><div class="sheet-spaces"></div><p><b>Qué mejoraría:</b></p><div class="sheet-spaces"></div></section>
 <section class="sheet-section"><h2>7 · Autoevaluación (1 a 10)</h2><div class="sheet-mini-rubric"><div>Preparación: ______ / 10</div><div>Programa / montaje: ______ / 10</div><div>Pruebas y mejora: ______ / 10</div><div>Explicación: ______ / 10</div></div></section>
 <p class="sheet-footer">RoboMisión LAB · Material didáctico. Comprueba las conexiones y la alimentación con el profesorado y no compartas datos personales.</p>`;
 const code=(window.ROBO_MAKECODE_EXAMPLES||{})[m.id];
 if(code&&window.ROBO_MAKECODE)window.ROBO_MAKECODE.show(document.getElementById('rmkFicha'),'worksheet-'+m.id,code,{kit:m.id.startsWith('05-')?'maqueen':'microbit'});
 document.getElementById('printSheet').addEventListener('click',()=>print());
})();
