"use strict";
(()=>{
 const go=document.getElementById('rmkLabShow');if(!go)return;
 const host=document.getElementById('rmkLab');
 go.addEventListener('click', async()=>{
  const copy=document.getElementById('copiarJS');
  if(!copy){host.textContent='Este laboratorio no proporciona JavaScript para MakeCode.';return;}
  // The original lab owns the code generator, and its copy button exports the exact program.
  // Prefer the original copy field if exposed. Otherwise ask the user to paste.
  let code=''; const text=document.getElementById('copiaManual');
  if(text&&text.value.trim()&&/\b(basic|input|pins|music|radio|maqueenPlusV2)\./.test(text.value))code=text.value;
  if(!code&&navigator.clipboard&&window.isSecureContext){try{const clipboard=await navigator.clipboard.readText();if(/\b(basic|input|pins|music|radio|maqueenPlusV2)\./.test(clipboard))code=clipboard;}catch(e){/* permiso opcional; se admite pegado manual */}}
  if(!code){
    host.innerHTML='<p>Para obtener los bloques exactos de este laboratorio, primero pulsa «Copiar para MakeCode (JavaScript)» en el simulador. Después pega el código aquí:</p><textarea id="rmkLabInput" rows="5" style="width:100%;padding:10px" placeholder="Pega aquí el JavaScript generado por el laboratorio"></textarea><button type="button" id="rmkLabGenerate">Generar bloques reales</button>';
    host.querySelector('#rmkLabGenerate').onclick=()=>{let c=host.querySelector('#rmkLabInput').value.trim();if(c)window.ROBO_MAKECODE.show(host,'lab-'+location.pathname.split('/').pop(),c,{kit:'microbit'});};return;
  }
  window.ROBO_MAKECODE.show(host,'lab-'+location.pathname.split('/').pop(),code,{kit:'microbit'});
 });
})();
