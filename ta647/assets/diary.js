"use strict";
(function(){
 const select=document.getElementById('actselect');if(!select)return;
 const keys=['prueba','resultado','mejora'];const status=document.getElementById('note-status');
 function key(f){return 'ta647-pruebas-'+location.pathname+'-'+select.selectedIndex+'-'+f}
 function read(){keys.forEach(f=>{try{document.getElementById(f).value=localStorage.getItem(key(f))||''}catch(err){}})}
 select.addEventListener('change',read);read();
 document.getElementById('save-notes')?.addEventListener('click',()=>{try{keys.forEach(f=>localStorage.setItem(key(f),document.getElementById(f).value));status.textContent='✓ Notas guardadas en este navegador.'}catch(err){status.textContent='No se ha podido guardar en este navegador. Usa imprimir.'}});
})();
