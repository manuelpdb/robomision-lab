"use strict";
(() => {
 const cards=[...document.querySelectorAll('#catalogo .ficha-lab')];
 const etapaButtons=[...document.querySelectorAll('[data-etapa-filtro]')];
 const comp=document.getElementById('filtroComp');
 const texto=document.getElementById('filtroTexto');
 const tipo=document.getElementById('filtroTipo');
 const cuenta=document.getElementById('filtroCuenta');
 const vacio=document.getElementById('catalogoVacio');
 if(!cards.length||!comp||!texto||!tipo||!cuenta||!vacio)return;
 let etapa='';
 const normal=s=>String(s||'').normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLocaleLowerCase('es').replace(/[^a-z0-9]+/g,' ').trim();
 function draw(){
   const q=normal(texto.value);
   let n=0,interactive=0,guides=0;
   for(const card of cards){
     const kind=card.dataset.kind||'interactive';
     const searchable=normal([card.dataset.texto,card.textContent].join(' '));
     const matches=(!etapa||card.dataset.etapaF===etapa)&&(!comp.value||card.dataset.comp.split('|').includes(comp.value))&&(!tipo.value||kind===tipo.value)&&(!q||q.split(' ').every(word=>searchable.includes(word)));
     card.hidden=!matches;
     if(matches){n++; if(kind==='interactive')interactive++; else guides++;}
   }
   cuenta.textContent=`${n} resultados: ${interactive} laboratorios interactivos y ${guides} prácticas guiadas`;
   vacio.hidden=n!==0;
 }
 etapaButtons.forEach(button=>button.addEventListener('click',()=>{
   etapa=button.dataset.etapaFiltro||'';
   etapaButtons.forEach(el=>el.setAttribute('aria-pressed',String(el===button)));
   draw();
 }));
 [comp,tipo].forEach(select=>select.addEventListener('change',draw));
 texto.addEventListener('input',draw);
 draw();
})();
