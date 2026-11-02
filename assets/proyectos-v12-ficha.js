'use strict';
(()=>{
 const all=window.ROBOLAB_PROJECTS||[];
 const id=new URLSearchParams(location.search).get('id');
 const p=all.find(p=>p.id===id), root=document.getElementById('studentProjectSheet');
 const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
 if(!p){root.innerHTML='<p>Proyecto no encontrado. <a href="proyectos-pro.html">Abrir catálogo</a>.</p>';return}
 document.title='Ficha de trabajo · '+p.title+' · RoboMisión LAB';
 root.innerHTML=`<div class="sheet-tools"><a href="proyecto-guia.html?id=${encodeURIComponent(id)}">← Volver a la guía completa</a><button type="button" id="doPrint">🖨 Imprimir / Guardar como PDF</button></div>
 <header><div><span>ROBOMISIÓN LAB · KITs DE ROBÓTICA</span><span>PROYECTO ${String(all.indexOf(p)+1).padStart(2,'0')} · ${esc(p.level)}</span></div><h1>${esc(p.title)}</h1><p class="subtitle">${esc(p.kit)} · ${p.sessions} sesiones orientativas</p></header>
 <div class="fields"><div><b>EQUIPO / INTEGRANTES</b>______________________________________</div><div><b>CURSO / FECHA</b>______________________________________</div></div>
 <section><h2>1. ¿Qué vamos a conseguir?</h2><p>${esc(p.summary)}</p><p><b>Pregunta:</b> ${esc(p.question)}</p></section>
 <section><h2>2. Materiales</h2><ul class="task-list">${p.materials.map(x=>`<li>${esc(x)}</li>`).join('')}</ul></section>
 <section><h2>3. Montaje — Conexiones</h2><ol>${p.connections.map(x=>`<li>${esc(x)}</li>`).join('')}</ol><p class="warning">⚠ ${esc(p.safety)}</p></section>
 <section><h2>4. Lista de tareas</h2><ul class="task-list">${p.stages.map(x=>`<li>${esc(x)}</li>`).join('')}</ul></section>
 <section><h2>5. Retos Bronce, Plata y PRO</h2><div class="levels">${p.tiers.map(t=>`<article><h3>${esc(t.name)}</h3><p>${esc(t.text)}</p><small>${esc(t.criteria)}</small><p>□ Superado</p></article>`).join('')}</div></section>
 <section><h2>6. Tres pruebas y mejoras</h2><table class="trialtable"><thead><tr><th>Intento</th><th>Resultado / medida</th><th>¿Funcionó?</th><th>Mejora</th></tr></thead><tbody>${[1,2,3].map(i=>`<tr><th>${i}</th><td>________________</td><td>________</td><td>_____________</td></tr>`).join('')}</tbody></table></section>
 <section><h2>7. ¿Qué error encontramos y cómo lo resolvimos?</h2><div class="lines"></div></section>
 <section><h2>8. Autoevaluación de 1 a 10</h2><div class="rubric"><div>Montaje y seguridad: ___ / 10</div><div>Programación: ___ / 10</div><div>Pruebas y mejoras: ___ / 10</div><div>Colaboración y explicación: ___ / 10</div></div></section>
 <footer>Guía de trabajo RoboMisión LAB. Completa las actividades con la supervisión docente. No escribas datos personales innecesarios en la ficha.</footer>`;
 document.getElementById('doPrint').addEventListener('click',()=>window.print());
})();
