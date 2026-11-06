"use strict";
(function(){
 const cd=document.querySelector('#code-data');if(!cd)return;
 const D=JSON.parse(cd.textContent);
 document.querySelectorAll('[data-blocks]').forEach(btn=>btn.addEventListener('click',()=>{
  const key=btn.dataset.blocks,host=document.querySelector('[data-view="'+key+'"]');
  if(!host||!D[key])return;
  window.ROBO_LIVE_MAKECODE?.show(host,'ta647-'+key,D[key]);
 }));
 document.querySelectorAll('[data-source]').forEach(pre=>{pre.textContent=D[pre.dataset.source]||''});
})();
