/* RoboMisión LAB v57 · registro local de la puesta en marcha */
(()=>{
  'use strict';
  const boxes=[...document.querySelectorAll('[data-start57-step]')];
  const status=document.getElementById('start57-progress');
  const meter=document.getElementById('start57-progressbar');
  const reset=document.getElementById('start57-reset');
  if(!boxes.length||!status||!meter||!reset)return;
  const key='roboMisionLAB.empieza.v57.pasos';
  try{
    const saved=JSON.parse(localStorage.getItem(key)||'[]');
    boxes.forEach((b,i)=>{b.checked=saved[i]===true;});
  }catch(_e){}
  function update(){
    const n=boxes.filter(b=>b.checked).length;
    status.textContent=`${n} de ${boxes.length} completados`;
    meter.style.width=(n/boxes.length*100)+'%';
    try{localStorage.setItem(key,JSON.stringify(boxes.map(b=>b.checked)));}catch(_e){}
  }
  boxes.forEach(b=>b.addEventListener('change',update));
  reset.addEventListener('click',()=>{boxes.forEach(b=>b.checked=false);update();});
  update();
})();
