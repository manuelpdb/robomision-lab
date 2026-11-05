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
 function download(filename,content,type){let blob=new Blob([content],{type:type||'application/json;charset=utf-8'});let a=document.createElement('a');let u=URL.createObjectURL(blob);a.href=u;a.download=filename;document.body.appendChild(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(u),5000);}
 function exportData(){download('bitabit-progreso-'+new Date().toISOString().slice(0,10)+'.json',JSON.stringify(state,null,2));}
 async function importData(file){if(!file||file.size>1000000)throw Error('El archivo debe ocupar menos de 1 MB.');let payload=JSON.parse(await file.text());if(!payload||payload.version!==2||!Array.isArray(payload.profiles)||!payload.profiles.length||payload.profiles.length>100)throw Error('El archivo no es una exportación válida de RoboMisión LAB.');let clean=[];let used=new Set();for(let p of payload.profiles){if(!p||typeof p.name!=='string'||typeof p.id!=='string'||p.name.length>100||p.id.length>200||used.has(p.id))throw Error('El archivo contiene un perfil inválido.');used.add(p.id);let v={id:p.id,name:p.name.slice(0,55),done:{},quiz:{},notes:{},started:{},checks:{}};for(let id of valid){if(p.done&&p.done[id]===true)v.done[id]=true;if(p.quiz&&typeof p.quiz[id]==='boolean')v.quiz[id]=p.quiz[id];if(p.notes&&typeof p.notes[id]==='string')v.notes[id]=p.notes[id].slice(0,1500);if(p.started&&p.started[id]===true)v.started[id]=true;if(p.checks&&Array.isArray(p.checks[id]))v.checks[id]=p.checks[id].slice(0,8).map(Boolean);}clean.push(v);}state={version:2,active:clean.some(p=>p.id===payload.active)?payload.active:clean[0].id,profiles:clean};save();}
 window.BB={data,state:()=>state,active,setActive,createProfile,saveMission,doneCount,points,completedRoute,url,route,mission,escape,download,exportData,importData};
})();
