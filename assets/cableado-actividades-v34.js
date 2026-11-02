/* RoboMisión LAB v8 — cableado concreto por actividad, con micro:bit en el zócalo de la Shield. */
'use strict';
(()=>{
 const M={
  shield:{mode:'socket',ports:[],info:'Esta actividad solo utiliza la micro:bit encajada en la ranura de la Shield. No conectes cables Dupont entre ambas placas.'},
  oled:{mode:'i2c',ports:[['SDA','P20 / SDA'],['SCL','P19 / SCL'],['VCC','3,3 V SOLO si es compatible'],['GND','GND']],info:'Comprueba modelo, dirección y tensión del OLED. Si necesita 5 V o tiene pull-ups a 5 V, usa adaptación de niveles I²C.'},
  rele:{mode:'power',ports:[['IN','P1 (S)'],['VCC','Fuente adecuada al módulo'],['GND','G (masa común)'],['COM (si hay carga CC)','Positivo de fuente externa'],['NO (si hay carga CC)','Positivo de la carga'],['Carga -','Negativo de fuente externa']],info:'NO conectes red eléctrica ni 230 V. Verifica si IN acepta 3,3 V y si el relé es activo a nivel alto o bajo. La carga CC usa COM y NO por separado.'},
  joystick:{mode:'analog',ports:[['VRx','P0 (S)'],['VRy','P1 (S)'],['SW','P2 (S)'],['VCC','3,3 V'],['GND','GND']],info:'Usa tres señales distintas, comprueba los terminales reales del joystick y evita que las salidas analógicas superen 3,3 V.'},
  l298n:{mode:'power',ports:[['IN1','P1 (S)'],['IN2','P2 (S)'],['ENA','P0 (S) si vas a usar PWM'],['GND','G (masa común)'],['VM / MOTOR V','Fuente externa (según motor)'],['OUT1 / OUT2','Bornes del motor CC']],info:'La micro:bit NO alimenta el motor. El driver usa fuente externa, GND común y regulación apropiada. Nunca metas el positivo de la fuente en una señal GPIO.'},
  ultrason:{mode:'level',ports:[['TRIG','P0 (S)'],['ECHO','P1 (S), A TRAVÉS DE DIVISOR 5→3,3 V'],['VCC','5 V adecuado para HC-SR04'],['GND','G (masa común)']],info:'No conectes ECHO de un HC-SR04 de 5 V directamente a micro:bit: requiere divisor de resistencias o adaptador de nivel, no incluido en la lista de módulos básicos.'},
  zumbador:{mode:'digital',ports:[['S','P1 (S)'],['V','3,3 V si el módulo lo admite'],['G','GND']],info:'Conecta cada etiqueta física a su homóloga. Un zumbador pasivo necesita frecuencia/tono; comprueba consumo.'},
  sonido:{mode:'digital',ports:[['DO o S','P1 (S)'],['VCC','3,3 V, si compatible'],['GND','GND']],info:'Si tiene solo tres pines y salida DO, NO uses lectura analógica hasta comprobar que exista AO. Ajusta el potenciómetro.'},
  rgb:{mode:'verify',ports:[],info:'DETENTE: el módulo RGB de la fotografía puede no tener R/G/B PWM independientes. Identifica S/V/G o R/G/B y la referencia exacta antes de conectar. El código de tres PWM solo sirve para un RGB de tres canales compatible.'},
  rojo:{mode:'digital',ports:[['S','P1 (S)'],['V','3,3 V compatible'],['G','GND']],info:'Comprueba si el módulo incluye resistencia limitadora. No conectes un LED suelto sin resistencia.'},
  verde:{mode:'digital',ports:[['S','P1 (S)'],['V','3,3 V compatible'],['G','GND']],info:'Comprueba polaridad y lógica activa; un segundo LED debe ir a otro pin, no en paralelo sobre la misma señal.'},
  azul:{mode:'digital',ports:[['S','P1 (S)'],['V','3,3 V compatible'],['G','GND']],info:'Comprueba polaridad y lógica activa; evita alimentar LED sin resistencia.'},
  botonazul:{mode:'digital',ports:[['S / OUT','P1 (S)'],['V','3,3 V si módulo requiere'],['G','GND']],info:'Prueba si pulsado equivale a 0 o 1, configura pull-up si procede y aplica antirrebote.'},
  botonamarillo:{mode:'digital',ports:[['S / OUT','P1 (S)'],['V','3,3 V si módulo requiere'],['G','GND']],info:'Verifica si la salida es activa a 0 o a 1. Diferencia el botón externo del botón A/B integrado.'},
  color:{mode:'verify',ports:[],info:'Primero identifica el controlador del sensor de color y si es I²C. Si lo es y funciona a 3,3 V: SDA→P20, SCL→P19, VCC→3,3 V y GND→G. Sin identificarlo, NO es seguro fijar un cableado.'},
  presion:{mode:'verify',ports:[],info:'Identifica la referencia del chip y tensión admitida. Si es I²C a 3,3 V: SDA→P20, SCL→P19, VCC→3,3 V y GND→G. Verifica antes de conectar.'},
  luz:{mode:'analog',ports:[['S / AO','P1 (S)'],['V','3,3 V compatible'],['G','GND']],info:'Comprueba que el módulo presenta AO analógico en S; calibra el valor frente a diferentes iluminaciones.'},
  lm35:{mode:'analog',ports:[['OUT','P1 (S)'],['VCC','Tensión mínima REAL del LM35, verificar'],['GND','GND']],info:'El LM35 clásico suele necesitar más de 3,3 V. Si se alimenta con tensión superior, comprueba su salida con multímetro antes de P1; no uses adaptaciones sin supervisión.'},
  inclinacion:{mode:'digital',ports:[['S','P1 (S)'],['V','3,3 V compatible'],['G','GND']],info:'Comprueba orientación del sensor y añade retardo/antirrebote.'},
  infrarrojo:{mode:'digital',ports:[['DO / S','P1 (S)'],['V','3,3 V compatible'],['G','GND']],info:'Comprueba si detectado corresponde a 0 o 1; ajusta la sensibilidad con el potenciómetro.'},
  humedad:{mode:'analog',ports:[['AO / S','P1 (S)'],['V','3,3 V si compatible'],['G','GND']],info:'Calibra aire, seco y húmedo. Mantén la electrónica de la Shield lejos de tierra mojada.'},
  motorcc:{mode:'power',ports:[['Motor + / -','OUT1 / OUT2 del L298N'],['IN1','P1 (S) de la Shield'],['IN2','P2 (S) de la Shield'],['ENA','P0 (S) para PWM, si corresponde'],['GND','Masa común Shield / driver'],['VM','Fuente externa de motor']],info:'El motor de CC no se conecta directamente a la Shield: necesita el L298N, fuente externa y referencia de masa común.'},
  lcd:{mode:'level',ports:[['SDA','P20, mediante adaptador I²C si hay 5 V'],['SCL','P19, mediante adaptador I²C si hay 5 V'],['VCC','5 V típico (verificar modelo)'],['GND','GND común']],info:'Muchos LCD1602 I²C llevan pull-ups a 5 V. No conectes directamente SDA/SCL a P19/P20 sin asegurar compatibilidad o usar adaptador bidireccional.'},
  bomba:{mode:'power',ports:[['IN / GATE del driver','P1 (S)'],['GND del driver','GND común Shield'],['Bomba + / -','Salida del driver'],['V motor','Fuente 3–5 V adecuada']],info:'Nunca conectes la bomba a GPIO o alimentación de la Shield. Usa transistor/MOSFET o relé adecuado, diodo o protección inductiva, fuente externa y agua separada de electrónica.'},
  servo360:{mode:'servo',ports:[['Señal amarillo/naranja','P1 (S)'],['V rojo','Fuente externa 4,8–6 V compatible'],['G marrón/negro','GND común Shield / fuente']],info:'Servo 360º: neutro≈90 (calibrar), los grados cambian giro/velocidad, no posición. Alimentación externa compatible.'},
  servo180:{mode:'servo',ports:[['Señal amarillo/naranja','P1 (S)'],['V rojo','Fuente externa 4,8–6 V compatible'],['G marrón/negro','GND común Shield / fuente']],info:'Servo 180º: verifica topes antes de programar. Si la fuente externa no está disponible, no conectes el servo para hacer la prueba.'}
 };
 const N={shield:'Shield y zócalo',oled:'Pantalla OLED',rele:'Relé',joystick:'Joystick',l298n:'Controlador L298N',ultrason:'HC-SR04',zumbador:'Zumbador',sonido:'Sensor de sonido',rgb:'Módulo RGB',rojo:'LED rojo',verde:'LED verde',azul:'LED azul',botonazul:'Botón azul',botonamarillo:'Botón amarillo',color:'Sensor de color',presion:'Sensor barométrico',luz:'Sensor de luz',lm35:'LM35',inclinacion:'Sensor de inclinación',infrarrojo:'Sensor IR',humedad:'Sonda de humedad',motorcc:'Motor CC',lcd:'LCD1602 I²C',bomba:'Bomba de agua',servo360:'Servo 360°',servo180:'Servo 180°'};
 // Componentes adicionales por número de actividad; el número corresponde a la ficha publicada.
 const EX={
  rele:{3:['luz']},joystick:{3:['maqueen'],6:['maqueen']},
  l298n:{1:['motorcc'],2:['motorcc'],3:['motorcc'],4:['motorcc'],5:['motorcc'],6:['motorcc']},
  ultrason:{2:['rojo','verde'],3:['zumbador'],5:['zumbador']},
  zumbador:{6:['rojo']},sonido:{2:['rojo']},
  rojo:{5:['botonazul'],6:['zumbador']},verde:{3:['rojo'],6:['rojo']},azul:{6:['rojo','verde']},
  botonamarillo:{2:['botonazul'],3:['botonazul'],4:['botonazul'],5:['botonazul'],6:['botonazul']},
  color:{3:['servo180']},
  lm35:{2:['zumbador'],6:['zumbador']},inclinacion:{1:['rojo'],5:['zumbador'],6:['zumbador']},
  humedad:{3:['rele','bomba'],5:['rojo'],6:['rele','bomba']},
  motorcc:{6:['infrarrojo']},lcd:{3:['luz'],6:['botonazul']},
  bomba:{3:['humedad','rele'],6:['humedad','rele']},
  servo360:{3:['servo360_2'],6:['botonazul']},servo180:{2:['botonazul'],5:['botonazul']}
 };
 const x=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
 function pinRows(id,part=0){
  if(id==='servo360_2')return [['Señal servo 2','P2 (S)'],['V rojo servo 2','Fuente 4,8–6 V externa'],['G servo 2','Masa común']];
  if(id==='maqueen')return [];
  const base=M[id];if(!base)return [];
  if(part===1 && ['rojo','verde','azul','zumbador','botonazul','botonamarillo','luz','lm35','inclinacion','infrarrojo','humedad','sonido'].includes(id))return base.ports.map(row=>row.map((v,i)=>i===1?v.replace(/P1\b/g,'P2'):v));
  if(part===2 && ['rojo','verde','azul','zumbador'].includes(id))return base.ports.map(row=>row.map((v,i)=>i===1?v.replace(/P1\b/g,'P8'):v));
  return base.ports;
 }
 function build(m,index){
  const task=(m.practices||[]).concat(m.expanded||[])[index]||'';
  const id=m.id,ids=[id,...((EX[id]||{})[index+1]||[])];
  const modules=ids.filter(z=>!['shield','maqueen'].includes(z));
  // An explicitly duplicated motor in L298N tasks is already part of the L298N base wiring. Avoid double-counting it.
  const mapped=modules.filter((z,i)=>!(id==='l298n'&&z==='motorcc'));
  let groups=mapped.map((k,i)=>({id:k,name:N[k]||k,rows:pinRows(k,i===0?0:((['rojo','verde','azul','zumbador','botonazul','botonamarillo','luz','lm35','inclinacion','infrarrojo','humedad','sonido'].includes(k))?i:0)),mode:M[k]?.mode||'servo',info:M[k]?.info||''}));
  const wetRelay=['humedad','bomba'].includes(id)&&(index===2||index===5);
  if(wetRelay){
    groups=[
      {id:'humedad',name:'Sensor de humedad',mode:'analog',rows:[['S / AO','P1 (S)'],['V','3,3 V si el módulo lo permite'],['G','GND Shield']],info:'Calibra suelo seco/húmedo; mantén la Shield fuera del alcance del agua.'},
      {id:'rele',name:'Módulo relé',mode:'power',rows:[['IN','P2 (S)'],['VCC','Fuente para bobina según módulo'],['GND','GND Shield (si el módulo requiere masa común)']],info:'Verifica tensión de bobina y que la entrada IN funcione a 3,3 V. Usa solo cargas CC de baja tensión.'},
      {id:'bomba',name:'Bomba conectada a contactos del relé',mode:'power',rows:[['COM del relé','Positivo de fuente externa adecuada'],['NO del relé','Positivo de la bomba'],['Negativo de la bomba','Negativo de fuente externa']],info:'La bomba recibe su alimentación de fuente externa a través de COM/NO. Nunca desde P1/P2 o V de la Shield; protege el circuito inductivo según el tipo de carga y módulo.'}
    ];
  }
  // Tareas con varios módulos: resuelve colisiones de P1 con P2/P8; el código ejemplo no incorpora necesariamente esta modificación.
  const used=new Set(), collisions=[];
  for(const g of groups){
   g.rows=g.rows.map(([name,to])=>{
    if(!/P(?:0|1|2|8)\b/.test(to)||!/\(S\)/.test(to))return [name,to];
    let dest=to;
    const pin=to.match(/P(?:0|1|2|8)\b/)[0];
    if(used.has(pin)){
      const alt=['P2','P8','P0','P1'].find(p=>!used.has(p));
      if(alt){dest=to.replace(pin,alt);collisions.push(`${g.name}: señal movida a ${alt}; actualiza el bloque de MakeCode.`);}
      else collisions.push(`No hay pines libres confirmados para ${g.name}. Revisa la Shield y reorganiza el circuito.`);
    }
    used.add((dest.match(/P(?:0|1|2|8)\b/)||[])[0]);
    return [name,dest];
   });
  }
  const risky=groups.some(g=>['power','level','verify','servo'].includes(g.mode));
  const needExtra=groups.some(g=>['power','level','servo'].includes(g.mode));
  const cableCount=groups.reduce((n,g)=>n+g.rows.filter(r=>!(/fuente externa|fuente 3|fuente 4|salida del driver|OUT1|OUT2|bornes|fuente adecuada|V motor|motor V/i.test(r[1]))).length,0);
  const extra=(EX[id]||{})[index+1]||[];
  let notes=[`Actividad ${index+1}: ${task}.`];
  if(id==='shield')notes.push('La micro:bit entra directamente en el zócalo: no hacen falta cables externos para estas comprobaciones.');
  if(id==='rgb'||id==='color'||id==='presion')notes.push('Primero identifica modelo y pinout. No realices un montaje eléctrico hasta verificar el módulo.');
  if(id==='oled'||id==='lcd')notes.push('La imagen de los bloques de micro:bit puede ser solo una demostración: para escribir en la pantalla real necesitarás una extensión compatible.');
  if(id==='sonido'&&(index===0||index===3||index===5))notes.push('Si tu módulo únicamente ofrece salida DO, no uses analogReadPin: modifica el ejemplo para digitalReadPin.');
  if(id==='zumbador')notes.push('Para oír el zumbador externo en P1, configura la salida de música en P1 en MakeCode; sin ello puede sonar el altavoz interno de micro:bit V2.');
  if(id==='rgb')notes.push('Los ejemplos de tres PWM requieren 3 canales R, G y B separados; NO sirven para un módulo RGB de una sola entrada S/V/G.');
  if(id==='l298n'&&(index===2||index===5))notes.push('El kit muestra un único motor amarillo: para controlar dos necesitarías un segundo motor, no incluido en este inventario.');
  if(extra.includes('maqueen'))notes.push('La micro:bit del mando va en la Shield; una segunda micro:bit va en el zócalo del Maqueen Plus. La comunicación entre ambos usa RADIO (no cable).');
  if(extra.includes('servo360_2'))notes.push('El segundo servo usa P2 para su señal; alimenta ambos con fuente externa suficiente y une las masas.');
  if(wetRelay)notes.push('El código de demostración debe adaptarse: leer humedad por P1 y activar el relé por P2; la bomba se alimenta solo por el circuito externo de COM/NO.');
  if(extra.length)notes.push('La actividad añade un componente o equipo adicional. Usa otro juego de cables, y reconfigura los pines en MakeCode cuando cambien.');
  if(needExtra)notes.push('La alimentación de potencia, el divisor de ECHO, los conversores I²C o los drivers NO se sustituyen por cables Dupont; si faltan, haz solo simulación/documentación con supervisión.');
  if(collisions.length)notes.push(...collisions);
  return {task,index,id,groups,cableCount,risky,extra,notes};
 }
 function cableHint(g){
  if(g.id==='maqueen')return 'Sin Dupont entre robots: comunicación por radio.';
  if(['servo180','servo360','servo360_2'].includes(g.id))return 'Señal con Dupont H-H si ambos conectores son macho; V/G a fuente externa segura, masa común.';
  if(['l298n','rele','motorcc','bomba'].includes(g.id))return 'Dupont H-H para control y GND; bornes/terminales adecuados y fuente externa para potencia.';
  if(['oled','lcd','color','presion'].includes(g.id))return 'Dupont H-H para SDA/SCL/V/G cuando haya pines macho accesibles; verificar compatibilidad antes.';
  if(g.mode==='verify')return 'Ningún cable hasta verificar los terminales de la placa real.';
  return `Dupont hembra-hembra: ${g.rows.length} hilos orientativos cuando Shield y módulo tengan pines macho.`;
 }
 function diagram(g){
  let rows=g.rows;if(!rows.length)return `<div class="cable-no-diagram">${x(g.info)}</div>`;
  const h=82+rows.length*38;
  const svg=`<svg viewBox="0 0 780 ${h}" role="img" aria-label="Esquema de cables para ${x(g.name)}" xmlns="http://www.w3.org/2000/svg"><rect width="780" height="${h}" rx="14" fill="#f5faf8"/><rect x="22" y="18" width="235" height="${h-36}" rx="14" fill="#183a54"/><rect x="525" y="18" width="231" height="${h-36}" rx="14" fill="#133c33"/><text x="40" y="42" font-size="17" font-family="system-ui" font-weight="800" fill="white">SHIELD / FUENTE</text><text x="544" y="42" font-size="16" font-family="system-ui" font-weight="800" fill="white">${x(g.name).slice(0,24)}</text>${rows.map(([source,dest],i)=>{const yy=74+i*38;const col=['#32b8aa','#f39f4f','#7a95ff','#f16e8c','#a8b457','#df9ef4'][i%6];const left=x(dest.length>30?dest.slice(0,28)+'…':dest),right=x(source.length>31?source.slice(0,29)+'…':source);return `<text x="40" y="${yy}" font-size="13" font-family="system-ui" font-weight="700" fill="#e7f9f5">${left}</text><circle cx="244" cy="${yy-4}" r="6" fill="${col}"/><path d="M250 ${yy-4} C365 ${yy-4} 405 ${yy-4} 520 ${yy-4}" stroke="${col}" stroke-width="4" fill="none"/><circle cx="531" cy="${yy-4}" r="6" fill="${col}"/><text x="545" y="${yy}" font-size="13" font-family="system-ui" font-weight="700" fill="#e7f9f5">${right}</text>`}).join('')}</svg>`;
  return `<div class="cable-svg">${svg}</div>`;
 }
 function bombaWiring(m,index){
  const soil=index===2||index===5;
  const controlPin=soil?'P2':'P1';
  const image=`<img class="ta34-pumpdiagram" src="assets/ta647-bomba-circuito-v34.svg" alt="Esquema de dos circuitos: micro:bit con Shield controla la entrada IN del relé; una fuente externa de 3 a 5 voltios alimenta la bomba mediante COM y NO" loading="lazy">`;
  const components=[
    ['shield','Shield para micro:bit','La micro:bit entra directamente en el zócalo.'],
    ...(soil?[['humedad','Sensor de humedad del suelo','Entrada analógica para decidir si la tierra está seca.']]:[]),
    ['rele','Módulo relé','Conecta o desconecta la alimentación externa de la bomba.'],
    ['bomba','Minibomba DC 3–5 V','Es el motor que mueve el agua; no se conecta a un pin de micro:bit.']
  ];
  const photos=components.map(([id,name,why])=>`<div class="ta34-part"><img src="assets/equipos/${id}.png" alt="${x(name)}" loading="lazy"><div><strong>${x(name)}</strong><p>${x(why)}</p></div></div>`).join('');
  const rows=[
    ['micro:bit','Zócalo de la Shield','Encajar directamente y con todo apagado; sin Dupont'],
    ...(soil?[
      ['Sensor de humedad: S/AO','Shield P1 (señal)','Un Dupont; cambia a lectura analógica P1 en MakeCode'],
      ['Sensor de humedad: V / G','3,3 V compatible / GND de Shield','Dos cables; comprobar etiquetas y tensión del sensor']
    ]:[]),
    ['Shield '+controlPin+' (S)','Entrada IN del relé','Cable Dupont de señal; solo si el relé acepta control a 3,3 V'],
    ['GND de Shield','GND del relé','Solo cuando el circuito de control del relé requiere masa común'],
    ['VCC del relé','Alimentación compatible de la bobina','Verifica si es 3,3 o 5 V; NO asumir que la Shield puede dar la corriente'],
    ['Positivo fuente CC 3–5 V','COM del relé','Cable de potencia con terminal adecuado, NO simple Dupont flojo'],
    ['NO del relé','Positivo de la bomba','Contacto normalmente abierto; NC queda libre'],
    ['Negativo de la bomba','Negativo fuente CC 3–5 V','Retorno del circuito de potencia independiente'],
    ['Protección inductiva','En bornes del motor (según montaje)','El diodo debe ser apropiado; franja al positivo, otro extremo al negativo']
  ];
  const notes=soil?`<p>Para los retos <b>3 y 6</b> hay dos señales distintas: <strong>humedad en P1</strong> y <strong>relé en P2</strong>. El código de ejemplo A/B de botones P1 NO controla automáticamente estos dos módulos. Debes adaptar MakeCode y comprobar el sentido del umbral.</p>`:`<p>Para las actividades <b>1, 2, 4 y 5</b> el control usa <strong>P1</strong> y la bomba requiere un circuito externo de potencia. En la actividad 4 el esquema se dibuja sin alimentar nada; en la 1 se prueba el relé <b>sin bomba</b>.</p>`;
  return `<div class="ta34-wiring-wrap">
    <div class="ta34-wiring-hero"><strong>Montaje de esta actividad · ${soil?'riego con sensor de humedad':'control de la bomba con relé'}</strong><p>La micro:bit <b>no alimenta</b> la bomba. Hay que distinguir la señal de control del circuito que entrega corriente al motor.</p></div>
    <h5>1 · Saca estos componentes del kit</h5><div class="ta34-parts">${photos}</div>
    <div class="ta34-extra"><b>Material adicional que debes comprobar:</b> fuente de alimentación CC para la bomba, alimentación compatible para la bobina del relé, protección contra picos del motor (diodo y montaje apropiado), cables y bornes adecuados, interruptor/desconexión, recipientes y tubos si vas a bombear agua. <b>Estos elementos no deben darse por incluidos en el TA647.</b></div>
    <h5>2 · Entiende el esquema de los DOS circuitos</h5>${image}
    <p class="ta34-schematic-caption">Esquema didáctico funcional; no reproduce la ubicación física de las clavijas. Las etiquetas reales del relé pueden variar y deben comprobarse antes de montar.</p>
    <h5>3 · Conecta siguiendo esta tabla</h5><div class="ta34-table-scroll"><table class="ta34-pin-table"><thead><tr><th>Desde</th><th>Hasta</th><th>Qué debes comprobar</th></tr></thead><tbody>${rows.map(r=>`<tr><td>${x(r[0])}</td><td>${x(r[1])}</td><td>${x(r[2])}</td></tr>`).join('')}</tbody></table></div>
    <div class="ta34-important"><b>Antes de conectar:</b> el docente debe confirmar tensión y lógica de entrada del relé (algunos se activan con 0, otros con 1). La corriente de la bomba jamás circula por P1/P2 ni por el V de la Shield. El interruptor físico de desconexión es necesario; el botón B del programa no lo sustituye.</div>
    ${notes}<div class="ta34-wiring-check"><b>✓ Comprobación antes de encender</b><ol><li>Micro:bit insertada con todo apagado</li><li>Relé y su alimentación compatibles y verificados</li><li>Bomba conectada solo a fuente externa a través de COM/NO</li><li>Protección inductiva y terminales revisados</li><li>Agua separada de la electrónica; docente autoriza la prueba</li></ol></div>
    </div>`;
 }
 function shieldWiring(m,index){
  const all=[
   ['Solo observar el zócalo','Ningún cable Dupont','Inserta la micro:bit con todo apagado. Dibuja la orientación.'],
   ['Identificar P0, P1, P2 y S/V/G','Ningún cable Dupont','Completa una tabla de etiquetas antes de conectar algo.'],
   ['Dibujar un sensor analógico en P1','Tres cables solo si el sensor y la Shield son compatibles','S→P1(S), V→3,3 V compatible y G→GND; haz primero un esquema en papel.'],
   ['Interpretar un croquis de otro equipo','Ningún cable Dupont','Compara los tres contactos y marca el conector de señal.'],
   ['Detectar dos fallos de cableado','Ningún cable Dupont','Solo revisión sobre papel, jamás probar conexiones erróneas con alimentación.'],
   ['Crear cartel de seguridad','Ningún cable Dupont','Distingue S, V, G; explica por qué 5 V no debe entrar en P1.']
  ];
  const r=all[index]||all[0];
  return `<div class="ta34-shield-wiring"><div class="ta34-shield-photo"><img src="assets/equipos/shield.png" alt="Fotografía de la placa Shield ACEBOTT" loading="lazy"><div><h5>Para esta actividad: ${x(r[0])}</h5><p><b>Cables necesarios:</b> ${x(r[1])}.</p><p>${x(r[2])}</p></div></div><div class="ta34-svg-pill"><b>MICRO:BIT</b> <span>encajada en el zócalo</span> <b>SHIELD</b> <span>puertos S / V / G</span></div><p><b>Identifica los terminales:</b> <b>S</b> es señal (P0, P1, etc.); <b>V</b> es alimentación; <b>G</b> es masa. La micro:bit no se conecta con cables a la Shield.</p><p class="ta34-important">No cambies el selector de tensión mientras esté alimentado. Ninguna entrada de micro:bit debe recibir 5 V.</p></div>`;
 }
 function render(m,index){
  if(m.id==='bomba')return bombaWiring(m,index);
  if(m.id==='shield')return shieldWiring(m,index);
  const c=build(m,index);
  
  const board=`<div class="cable-microbit"><span class="cable-stepno">1</span><div><strong>micro:bit → zócalo de la Shield</strong><p>Introduce la micro:bit directamente en la ranura de la Shield, respetando la orientación. <b>Sin cables Dupont entre las dos placas.</b> Hazlo con todo apagado.</p></div><img src="assets/equipos/shield.png" alt="Shield del kit ACEBOTT con zócalo para micro:bit" loading="lazy"></div>`;
  const summary=`<div class="cable-material"><strong>Material para este reto:</strong> ${x(N[m.id]||m.name)}${c.extra.length?', '+c.extra.map(n=>x(n==='maqueen'?'micro:bit y robot Maqueen Plus':n==='servo360_2'?'segundo servo 360°':N[n]||n)).join(', '):''}  · <b>${c.cableCount} cables de señal/alimentación orientativos</b>, normalmente Dupont hembra-hembra entre pines macho (confirma los conectores). ${c.risky?'<span class="cable-warn">Puede requerir fuente, controlador o protección adicional.</span>':''}</div>`;
  const stages=c.groups.length?c.groups.map((g,i)=>`<div class="cable-module"><div class="cable-module-head"><span class="cable-stepno">${i+2}</span><div><h5>${x(g.name)} → Shield</h5><p>${x(cableHint(g))}</p></div></div>${diagram(g)}${g.rows.length?`<table class="cable-pins"><thead><tr><th>Pin del componente</th><th>Conectar a...</th></tr></thead><tbody>${g.rows.map(([a,b])=>`<tr><td>${x(a)}</td><td>${x(b)}</td></tr>`).join('')}</tbody></table>`:''}<p class="cable-caution">${x(g.info)}</p></div>`).join(''):`<div class="cable-nomodule">Sin cableado de módulos para esta actividad.</div>`;
  return `<div class="cable-task-guide">${board}${summary}${stages}<div class="cable-task-notes"><b>Comprobaciones de esta actividad</b><ul>${c.notes.map(n=>`<li>${x(n)}</li>`).join('')}</ul></div><p class="cable-disclaimer">Verifica la serigrafía física de tu Shield antes de conectar. Los diagramas identifican señales y no garantizan la ubicación ni el orden de las clavijas. Si un puerto no existe en tu placa, no fuerces el montaje.</p></div>`;
 }
 window.ROBO_WIRING_V8={render,build,BASE:M,EX};
})();
