/* Menú accesible idéntico en catálogo y fichas TA647. */
(()=>{const scope=document.querySelector('.rm-nav-scope');if(!scope)return;const trigger=scope.querySelector('#abrirMenu');const panel=scope.querySelector('#menuPanel');if(!trigger||!panel)return;
function close(){panel.hidden=true;trigger.setAttribute('aria-expanded','false');trigger.setAttribute('aria-label','Abrir menú de secciones');}
function open(){panel.hidden=false;trigger.setAttribute('aria-expanded','true');trigger.setAttribute('aria-label','Cerrar menú de secciones');}
trigger.addEventListener('click',()=>panel.hidden?open():close());
document.addEventListener('keydown',e=>{if(e.key==='Escape'&&!panel.hidden){close();trigger.focus()}});
document.addEventListener('click',e=>{if(!panel.hidden&&!scope.contains(e.target))close()});
panel.querySelectorAll('a').forEach(link=>link.addEventListener('click',close));
})();
