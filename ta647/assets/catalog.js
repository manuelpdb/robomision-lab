"use strict";
(function(){
 let filter='todos';const search=document.querySelector('#search');
 const buttons=[...document.querySelectorAll('[data-filter]')];const cards=[...document.querySelectorAll('[data-cat]')];
 function apply(){let q=(search?.value||'').toLowerCase().trim();cards.forEach(c=>{let vis=(filter==='todos'||filter===c.dataset.cat)&&(c.dataset.name||'').toLowerCase().includes(q);c.hidden=!vis;});}
 buttons.forEach(b=>b.addEventListener('click',()=>{filter=b.dataset.filter;buttons.forEach(x=>x.classList.toggle('active',x===b));apply()}));search?.addEventListener('input',apply);apply();
})();
