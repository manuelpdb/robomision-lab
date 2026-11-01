"use strict";
(()=>{
 const data=window.ROBO_SHIELD,items=(window.ROBO_TA647||[]).filter(m=>data[m.id]);
 const esc=s=>String(s||'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
 const el=document.getElementById('shieldCards'),s=document.getElementById('shieldSearch');
 if(!el)return;
 function paint(){const q=(s.value||'').trim().toLocaleLowerCase('es');el.innerHTML=items.filter(m=>(m.name+' '+m.kind).toLocaleLowerCase('es').includes(q)).map(m=>{let d=data[m.id];return `<article class="shield-mini"><img src="${esc(m.photo)}" loading="lazy" alt="${esc(m.name)}"><div><span class="micro-label">${esc(d.title)}</span><h3>${esc(m.name)}</h3><p>${esc(d.voltage)}</p><a href="practicas-ta647.html?pieza=${encodeURIComponent(m.id)}#conexion-shield">Ver conexión y actividades →</a></div></article>`}).join('')||'<p>No hay resultados.</p>'}
 s.addEventListener('input',paint);paint();
})();
