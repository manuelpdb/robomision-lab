'use strict';
(()=>{
 const data=window.BITABIT_DATA;
 const KEY='bitabit.pro.perfiles.v2';
 const valid=new Set(data.missions.map(m=>m.id));
 const initial=()=>({version:2,active:'equipo-1',profiles:[{id:'equipo-1',name:'Mi equipo',done:{},quiz:{},notes:{},started:{},checks:{}}]});
 let memory=null;
 function load(){try{let r=localStorage.getItem(KEY);let v=r?JSON.parse(r):initial();if(v&&v.version===2&&Array.isArray(v.profiles)&&v.profiles.length)return v;}catch(e){console.warn('Guardado local no disponible, se usa memoria de sesión',e);}return memory||initial();}
 let state=load();
 function save(){memory=state;try{localStorage.setItem(KEY,JSON.stringify(state));}catch(e){console.warn('No se puede guardar permanentemente',e);}}
 function active(){const p=state.profiles.find(p=>p.id===state.active)||state.profiles[0];if(!p.checks)p.checks={};return p;}
 function setActive(id){if(state.profiles.some(p=>p.id===id)){state.active=id;save();}}
 function createProfile(name){name=String(name||'').trim().slice(0,55);if(!name)return false;let id='equipo-'+Date.now().toString(36)+'-'+Math.random().toString(36).slice(2,6);state.profiles.push({id,name,done:{},quiz:{},notes:{},started:{},checks:{}});state.active=id;save();return true;}
 function saveMission(id,patch){if(!valid.has(id))return;const p=active();for(let k of ['done','quiz','notes','started','checks'])if(Object.prototype.hasOwnProperty.call(patch,k))p[k][id]=patch[k];save();}
 function doneCount(){return data.missions.filter(m=>active().done[m.id]).length;}
 function points(){return doneCount()*120+Object.values(active().quiz).filter(Boolean).length*30;}
 function completedRoute(route){return data.missions.filter(m=>m.route===route&&active().done[m.id]).length;}
 function url(id){return 'mision.html?id='+encodeURIComponent(id)}
 function route(id){return data.routes.find(r=>r.id===id)}
 function mission(id){return data.missions.find(m=>m.id===id)}
 function escape(s){return String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));}

 function blockCategory(text){
  text=String(text||'').toLowerCase();
  if(/al iniciar|al agitar|bot[oó]n|al pulsar|radio recibe|cuando/.test(text))return 'events';
  if(/para siempre|repetir|bucle|mientras/.test(text))return 'loops';
  if(/(^| )si( |$)|sino| mayor | menor | igual | supera | compara | true | false /.test(' '+text+' '))return 'logic';
  if(/variable|contador|puntos|resultado|tiempo|rumbo|temperatura|valor|grupo|distancia|velocidad|x=|y=|z=/.test(text))return 'variables';
  if(/mostrar|icono|led|n[uú]mero|pausa|pantalla|brillo|flecha|matriz/.test(text))return 'basic';
  if(/aceleraci[oó]n|br[úu]jula|gesto|agitar|sensor|temperatura|luz|sonido|entrada|pin p|ultrasonidos|linea|siguel[ií]neas/.test(text))return 'input';
  if(/servo|motor|maqueen|rueda|giro|rel[eé]|zumbador|buzzer|pantalla i2c|lcd|neopixel|rgb|pwm|salida|encender/.test(text))return 'robotics';
  if(/radio|grupo|mensaje|enviar|recibe/.test(text))return 'radio';
  if(/m[úu]sica|nota|melod[ií]a|tono/.test(text))return 'music';
  return 'basic';
 }
 function splitBlockSequences(text){
  text=String(text||'').replace(/\s*[;\n]+\s*/g,';').trim();
  if(!text)return [];
  return text.split(';').map(part=>part.split(/\s*→\s*/g).map(x=>x.trim()).filter(Boolean)).filter(arr=>arr.length);
 }
 function renderBlocksGuide(text){
  const esc=escape;
  const groups=splitBlockSequences(text);
  if(!groups.length)return '<div class="mk-empty">Sin bloques definidos.</div>';
  const legend=[['events','Eventos'],['loops','Bucles'],['logic','Lógica'],['variables','Variables'],['basic','Básico'],['input','Entrada'],['robotics','Robótica'],['radio','Radio'],['music','Música']];
  return `<div class="mk-guide"><div class="mk-guide-head"><span>Vista guiada de bloques MakeCode</span><small>Esquema visual orientativo para montar el programa paso a paso.</small></div><div class="mk-sequences">${groups.map((seq,gi)=>`<div class="mk-seq"><div class="mk-seq-label">${groups.length>1?`Secuencia ${gi+1}`:'Programa'}</div><div class="mk-stack">${seq.map((token,ti)=>`<div class="mk-step ${ti===0?'first':''}"><div class="mk-arrow">${ti===0?'':'↓'}</div><div class="mk-block ${blockCategory(token)}"><span>${esc(token)}</span></div></div>`).join('')}</div></div>`).join('')}</div><div class="mk-legend">${legend.map(([k,t])=>`<span class="${k}">${t}</span>`).join('')}</div></div>`;
 }

 function blockColor(cat){return ({events:'#d14a9c',loops:'#26a7b8',logic:'#4a82d7',variables:'#e05a47',basic:'#7a58c8',input:'#bf4eb5',robotics:'#118f72',radio:'#2877b7',music:'#db8a28'})[cat]||'#7a58c8';}
 function svgEscape(s){return String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));}
 function blockPath(w,h){return `M 0 10 Q 0 0 10 0 H ${w*0.22} l 8 8 h 28 l 8 -8 H ${w-10} Q ${w} 0 ${w} 10 V ${h-10} Q ${w} ${h} ${w-10} ${h} H ${w*0.55} l -8 8 h -28 l -8 -8 H 10 Q 0 ${h} 0 ${h-10} Z`;}
 function renderBlocksSvg(text){
  const groups=splitBlockSequences(text);
  if(!groups.length)return '<div class="mk-svg-box"><p>Sin bloques definidos.</p></div>';
  const pad=14, gapY=14, blockH=38, seqGap=28, baseW=420;
  let y=pad, body='';
  groups.forEach((seq,si)=>{
    const labelY=y+12;
    body+=`<text x="${pad}" y="${labelY}" font-size="11" font-weight="700" fill="#5a6d77">${svgEscape(groups.length>1?('Secuencia '+(si+1)):'Programa')}</text>`;
    y+=20;
    seq.forEach((token,ti)=>{
      const label=svgEscape(token);
      const cat=blockCategory(token), fill=blockColor(cat);
      const w=Math.max(180, Math.min(baseW, 120 + token.length*7));
      body+=`<g transform="translate(${pad},${y})"><path d="${blockPath(w,blockH)}" fill="${fill}"/><rect x="10" y="9" width="9" height="20" rx="4" fill="#ffffff44"/><text x="28" y="24" font-size="13" font-weight="700" fill="#fff">${label}</text></g>`;
      if(ti<seq.length-1){body+=`<text x="${pad+12}" y="${y+blockH+12}" font-size="18" font-weight="700" fill="#87a499">↓</text>`; y+=blockH+18;} else {y+=blockH+12;}
    });
    y+=seqGap;
  });
  const totalH=Math.max(120,y);
  return `<div class="mk-svg-box"><svg viewBox="0 0 470 ${totalH}" role="img" aria-label="Esquema de bloques MakeCode" xmlns="http://www.w3.org/2000/svg"><rect x="0" y="0" width="470" height="${totalH}" rx="16" fill="#f7fbfa" stroke="#dfe9e5"/>${body}</svg></div>`;
 }
 function missionType(m){
  const t=((m.title||'')+' '+(m.goal||'')+' '+(m.kit||'')).toLowerCase();
  if(/maqueen|robot|siguel[íi]neas|motor|rueda|ultrason/.test(t))return 'robot';
  if(/servo|rel[ée]|lcd|pantalla|neopixel|rgb|electr[oó]nica|actuador/.test(t))return 'electronics';
  if(/radio|mensaje|comunic|grupo/.test(t))return 'radio';
  if(/sensor|temperatura|luz|sonido|distancia|br[úu]jula|aceleraci[oó]n/.test(t))return 'sensor';
  if(/led|melod[ií]a|zumbador|sem[aá]foro|l[aá]mpara|morse|animaci[oó]n/.test(t))return 'led';
  if(/proyecto|steam|invernadero|ciudad|escape|feria|huevo/.test(t))return 'project';
  return 'microbit';
 }
 function missionTips(m){
  const type=missionType(m);
  const common=['Comprueba el montaje antes de encender.','Haz una prueba corta y corrige de una en una las variables.'];
  const map={
   microbit:['Usa la matriz LED y los botones como primera comprobación.','Si algo falla, revisa el evento inicial o el bucle principal.'],
   sensor:['Mide primero los valores reales del sensor.','Ajusta el umbral antes de decidir si activa o no una acción.'],
   led:['Empieza con una salida simple y añade el efecto después.','Comprueba pausas, iconos y orden de encendido.'],
   robot:['Prueba ruedas o motores por separado antes del reto final.','Empieza despacio y aumenta velocidad cuando funcione.'],
   electronics:['Revisa polaridad, tensión y conexiones del módulo.','Nunca alimentes servos o motores solo desde un pin.'],
   radio:['Asegúrate de que los dos dispositivos usan el mismo grupo.','Envía primero un mensaje corto de prueba.'],
   project:['Haz un boceto del proyecto y reparte tareas.','Valida primero una parte sencilla antes de integrar todo.']
  };
  return (map[type]||map.microbit).concat(common).slice(0,3);
 }
 function renderMissionVisual(m,compact=false){
  const type=missionType(m), esc=escape;
  const label={microbit:'micro:bit',sensor:'Sensor',led:'LED / sonido',robot:'Robot',electronics:'Electrónica',radio:'Radio',project:'Proyecto'}[type]||'Misión';
  const tips=missionTips(m);
  let art='';
  if(type==='microbit') art=`<svg viewBox="0 0 260 160" xmlns="http://www.w3.org/2000/svg"><rect x="58" y="14" width="144" height="128" rx="24" fill="#14324f"/><circle cx="92" cy="49" r="14" fill="#223f5b" stroke="#87b8d6"/><circle cx="168" cy="49" r="14" fill="#223f5b" stroke="#87b8d6"/><g fill="#f87364">${[0,1,2,3,4].map(r=>[0,1,2,3,4].map(c=>`<rect x="${97+c*13}" y="${73+r*13}" width="8" height="8" rx="2"/>`).join('')).join('')}</g><rect x="84" y="132" width="18" height="22" rx="3" fill="#d9b257"/><rect x="121" y="132" width="18" height="22" rx="3" fill="#d9b257"/><rect x="158" y="132" width="18" height="22" rx="3" fill="#d9b257"/></svg>`;
  if(type==='sensor') art=`<svg viewBox="0 0 260 160" xmlns="http://www.w3.org/2000/svg"><rect x="38" y="38" width="88" height="72" rx="12" fill="#284867"/><circle cx="72" cy="74" r="15" fill="#66d0c5"/><rect x="148" y="32" width="78" height="84" rx="12" fill="#14324f"/><path d="M164 98 C180 85, 188 45, 210 54" stroke="#7ee2b5" stroke-width="6" fill="none" stroke-linecap="round"/><circle cx="164" cy="98" r="5" fill="#7ee2b5"/><circle cx="210" cy="54" r="5" fill="#7ee2b5"/><rect x="54" y="112" width="152" height="10" rx="4" fill="#e7edf0"/></svg>`;
  if(type==='led') art=`<svg viewBox="0 0 260 160" xmlns="http://www.w3.org/2000/svg"><circle cx="84" cy="66" r="30" fill="#ffd26d"/><path d="M73 92 h22 v16 h-22z" fill="#537a8b"/><rect x="132" y="38" width="80" height="56" rx="14" fill="#14324f"/><path d="M148 52 h48 M148 66 h48 M148 80 h48" stroke="#7ee2b5" stroke-width="8" stroke-linecap="round"/><path d="M62 110 C70 136 96 136 104 110" stroke="#718896" stroke-width="8" fill="none" stroke-linecap="round"/></svg>`;
  if(type==='robot') art=`<svg viewBox="0 0 260 160" xmlns="http://www.w3.org/2000/svg"><rect x="64" y="48" width="132" height="58" rx="18" fill="#173958"/><circle cx="82" cy="114" r="18" fill="#263b48"/><circle cx="178" cy="114" r="18" fill="#263b48"/><circle cx="112" cy="78" r="10" fill="#77e5b2"/><circle cx="148" cy="78" r="10" fill="#77e5b2"/><rect x="116" y="30" width="28" height="22" rx="6" fill="#d157a0"/><path d="M18 134 H242" stroke="#111" stroke-width="8"/><path d="M70 126 Q130 88 190 126" stroke="#ffd06b" stroke-width="6" fill="none" stroke-dasharray="10 7"/></svg>`;
  if(type==='electronics') art=`<svg viewBox="0 0 260 160" xmlns="http://www.w3.org/2000/svg"><rect x="30" y="56" width="78" height="48" rx="10" fill="#254766"/><rect x="50" y="70" width="38" height="19" rx="4" fill="#7ee2b5"/><circle cx="172" cy="82" r="34" fill="#14324f"/><path d="M172 82 L198 60" stroke="#ffd26d" stroke-width="8" stroke-linecap="round"/><circle cx="172" cy="82" r="8" fill="#ffd26d"/><path d="M108 79 H138" stroke="#7a58c8" stroke-width="8" stroke-linecap="round"/></svg>`;
  if(type==='radio') art=`<svg viewBox="0 0 260 160" xmlns="http://www.w3.org/2000/svg"><rect x="36" y="48" width="64" height="54" rx="14" fill="#14324f"/><rect x="160" y="48" width="64" height="54" rx="14" fill="#14324f"/><path d="M106 75 q24 -28 48 0" stroke="#7ee2b5" stroke-width="6" fill="none"/><path d="M114 88 q16 -16 32 0" stroke="#7ee2b5" stroke-width="6" fill="none"/><circle cx="130" cy="100" r="4" fill="#7ee2b5"/><circle cx="68" cy="74" r="10" fill="#d14a9c"/><circle cx="192" cy="74" r="10" fill="#2877b7"/></svg>`;
  if(type==='project') art=`<svg viewBox="0 0 260 160" xmlns="http://www.w3.org/2000/svg"><rect x="54" y="42" width="152" height="84" rx="18" fill="#14324f"/><rect x="70" y="58" width="120" height="18" rx="6" fill="#7ee2b5"/><rect x="70" y="84" width="58" height="28" rx="6" fill="#ffd26d"/><rect x="136" y="84" width="54" height="28" rx="6" fill="#d14a9c"/><path d="M130 18 l8 16 18 2 -13 13 3 18 -16 -9 -16 9 3 -18 -13 -13 18 -2z" fill="#ffcf6a"/></svg>`;
  return `<div class="mission-visual ${compact?'compact':''}"><div class="mission-visual-art">${art}</div><div class="mission-visual-copy"><div class="mission-visual-badge">Vista rápida · ${esc(label)}</div><h3>${esc(m.title)}</h3><ul>${tips.map(t=>`<li>${esc(t)}</li>`).join('')}</ul></div></div>`;
 }

 function renderOfflineImage(m){
   const id=String(m.id||'');
   if(!/^\d\d-\d\d$/.test(id))return '';
   return `<figure class="mk-image-card"><div class="mk-image-head"><b>Esquema didáctico · misión ${escape(id)}</b><span>Incluida en esta web</span></div><img class="mk-png" src="assets/makecode/${id}.png" alt="Esquema no oficial de la misión ${escape(id)}: ${escape(m.title)}" loading="eager" decoding="async"><figcaption>Imagen orientativa, NO es una captura de MakeCode. Consulta los bloques oficiales en el apartado superior.</figcaption></figure>`;
 }
 function download(filename,content,type){let blob=new Blob([content],{type:type||'application/json;charset=utf-8'});let a=document.createElement('a');let u=URL.createObjectURL(blob);a.href=u;a.download=filename;document.body.appendChild(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(u),5000);}
 function exportData(){download('bitabit-progreso-'+new Date().toISOString().slice(0,10)+'.json',JSON.stringify(state,null,2));}
 async function importData(file){if(!file||file.size>1000000)throw Error('El archivo debe ocupar menos de 1 MB.');let payload=JSON.parse(await file.text());if(!payload||payload.version!==2||!Array.isArray(payload.profiles)||!payload.profiles.length||payload.profiles.length>100)throw Error('El archivo no es una exportación válida de RoboMisión LAB.');let clean=[];let used=new Set();for(let p of payload.profiles){if(!p||typeof p.name!=='string'||typeof p.id!=='string'||p.name.length>100||p.id.length>200||used.has(p.id))throw Error('El archivo contiene un perfil inválido.');used.add(p.id);let v={id:p.id,name:p.name.slice(0,55),done:{},quiz:{},notes:{},started:{},checks:{}};for(let id of valid){if(p.done&&p.done[id]===true)v.done[id]=true;if(p.quiz&&typeof p.quiz[id]==='boolean')v.quiz[id]=p.quiz[id];if(p.notes&&typeof p.notes[id]==='string')v.notes[id]=p.notes[id].slice(0,1500);if(p.started&&p.started[id]===true)v.started[id]=true;if(p.checks&&Array.isArray(p.checks[id]))v.checks[id]=p.checks[id].slice(0,8).map(Boolean);}clean.push(v);}state={version:2,active:clean.some(p=>p.id===payload.active)?payload.active:clean[0].id,profiles:clean};save();}
 window.BB={data,state:()=>state,active,setActive,createProfile,saveMission,doneCount,points,completedRoute,url,route,mission,escape,download,exportData,importData,renderBlocksGuide,renderBlocksSvg,renderMissionVisual,renderOfflineImage,splitBlockSequences,blockCategory,missionType,missionTips};
})();
