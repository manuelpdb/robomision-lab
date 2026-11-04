"use strict";
/* RoboMisión LAB V60 · parche de aprendizaje Maqueen (alumnado). NO incluye solucionarios. */
(()=>{
 const DATA={
  "samples": {
    "01": [
      {
        "title": "Ejemplo guiado · Primer programa",
        "desc": "Programa introductorio. Los retos no se resuelven copiando este ejemplo.",
        "code": "maqueenPlusV2.I2CInit()\nmaqueenPlusV2.controlMotorStop(maqueenPlusV2.MyEnumMotor.AllMotor)\nbasic.showIcon(IconNames.Yes)\n"
      }
    ],
    "02": [
      {
        "title": "Ejemplo guiado · Primer programa",
        "desc": "Programa introductorio. Los retos no se resuelven copiando este ejemplo.",
        "code": "maqueenPlusV2.I2CInit()\ninput.onButtonPressed(Button.A, function () {\n    maqueenPlusV2.controlMotor(maqueenPlusV2.MyEnumMotor.AllMotor, maqueenPlusV2.MyEnumDir.Forward, 40)\n    basic.pause(200)\n    maqueenPlusV2.controlMotorStop(maqueenPlusV2.MyEnumMotor.AllMotor)\n})\n"
      }
    ],
    "03": [
      {
        "title": "Ejemplo guiado · Primer programa",
        "desc": "Programa introductorio. Los retos no se resuelven copiando este ejemplo.",
        "code": "maqueenPlusV2.I2CInit()\ninput.onButtonPressed(Button.A, function () {\n    maqueenPlusV2.controlMotor(maqueenPlusV2.MyEnumMotor.AllMotor, maqueenPlusV2.MyEnumDir.Forward, 40)\n    basic.pause(300)\n    maqueenPlusV2.controlMotorStop(maqueenPlusV2.MyEnumMotor.AllMotor)\n})\n"
      }
    ],
    "04": [
      {
        "title": "Ejemplo guiado · Primer programa",
        "desc": "Programa introductorio. Los retos no se resuelven copiando este ejemplo.",
        "code": "maqueenPlusV2.I2CInit()\ninput.onButtonPressed(Button.A, function () {\n    maqueenPlusV2.controlMotor(maqueenPlusV2.MyEnumMotor.LeftMotor, maqueenPlusV2.MyEnumDir.Forward, 30)\n    maqueenPlusV2.controlMotor(maqueenPlusV2.MyEnumMotor.RightMotor, maqueenPlusV2.MyEnumDir.Forward, 55)\n    basic.pause(250)\n    maqueenPlusV2.controlMotorStop(maqueenPlusV2.MyEnumMotor.AllMotor)\n})\n"
      }
    ],
    "05": [
      {
        "title": "Ejemplo guiado · Primer programa",
        "desc": "Programa introductorio. Los retos no se resuelven copiando este ejemplo.",
        "code": "maqueenPlusV2.I2CInit()\ninput.onButtonPressed(Button.A, function () {\n    maqueenPlusV2.controlLED(maqueenPlusV2.MyEnumLed.LeftLed, maqueenPlusV2.MyEnumSwitch.Open)\n    basic.pause(300)\n    maqueenPlusV2.controlLED(maqueenPlusV2.MyEnumLed.LeftLed, maqueenPlusV2.MyEnumSwitch.Close)\n})\n"
      }
    ],
    "06": [
      {
        "title": "Ejemplo guiado · Primer programa",
        "desc": "Programa introductorio. Los retos no se resuelven copiando este ejemplo.",
        "code": "maqueenPlusV2.I2CInit()\ninput.onButtonPressed(Button.A, function () {\n    music.playTone(440, 150)\n})\n"
      }
    ],
    "07": [
      {
        "title": "Ejemplo guiado · Primer programa",
        "desc": "Programa introductorio. Los retos no se resuelven copiando este ejemplo.",
        "code": "maqueenPlusV2.I2CInit()\ninput.onButtonPressed(Button.A, function () {\n    basic.showNumber(maqueenPlusV2.readLineSensorState(maqueenPlusV2.MyEnumLineSensor.SensorM))\n})\n"
      }
    ],
    "08": [
      {
        "title": "Ejemplo guiado · Primer programa",
        "desc": "Programa introductorio. Los retos no se resuelven copiando este ejemplo.",
        "code": "maqueenPlusV2.I2CInit()\nbasic.forever(function () {\n    let c = maqueenPlusV2.readLineSensorState(maqueenPlusV2.MyEnumLineSensor.SensorM)\n    if (c == 1) {\n        maqueenPlusV2.controlMotor(maqueenPlusV2.MyEnumMotor.AllMotor, maqueenPlusV2.MyEnumDir.Forward, 35)\n    } else {\n        maqueenPlusV2.controlMotorStop(maqueenPlusV2.MyEnumMotor.AllMotor)\n    }\n    basic.pause(50)\n})\n"
      }
    ],
    "09": [
      {
        "title": "Ejemplo guiado · Primer programa",
        "desc": "Programa introductorio. Los retos no se resuelven copiando este ejemplo.",
        "code": "maqueenPlusV2.I2CInit()\ninput.onButtonPressed(Button.A, function () {\n    basic.showNumber(maqueenPlusV2.readLineSensorState(maqueenPlusV2.MyEnumLineSensor.SensorL2))\n    basic.showNumber(maqueenPlusV2.readLineSensorState(maqueenPlusV2.MyEnumLineSensor.SensorM))\n})\n"
      }
    ],
    "10": [
      {
        "title": "Ejemplo guiado · Primer programa",
        "desc": "Programa introductorio. Los retos no se resuelven copiando este ejemplo.",
        "code": "maqueenPlusV2.I2CInit()\ninput.onButtonPressed(Button.A, function () {\n    basic.showNumber(maqueenPlusV2.readUltrasonic(DigitalPin.P13, DigitalPin.P14))\n})\n"
      }
    ],
    "11": [
      {
        "title": "Ejemplo guiado · Primer programa",
        "desc": "Programa introductorio. Los retos no se resuelven copiando este ejemplo.",
        "code": "maqueenPlusV2.I2CInit()\nbasic.forever(function () {\n    let cm = maqueenPlusV2.readUltrasonic(DigitalPin.P13, DigitalPin.P14)\n    if (cm <= 0 || cm < 30) {\n        maqueenPlusV2.controlMotorStop(maqueenPlusV2.MyEnumMotor.AllMotor)\n        basic.showIcon(IconNames.No)\n    } else {\n        basic.showIcon(IconNames.Yes)\n    }\n    basic.pause(150)\n})\n"
      }
    ],
    "12": [
      {
        "title": "Ejemplo guiado · Primer programa",
        "desc": "Programa introductorio. Los retos no se resuelven copiando este ejemplo.",
        "code": "maqueenPlusV2.I2CInit()\ninput.onButtonPressed(Button.A, function () {\n    basic.showNumber(input.lightLevel())\n})\n"
      }
    ],
    "13": [
      {
        "title": "Ejemplo guiado · Primer programa",
        "desc": "Programa introductorio. Los retos no se resuelven copiando este ejemplo.",
        "code": "maqueenPlusV2.I2CInit()\ninput.onButtonPressed(Button.A, function () {\n    basic.showNumber(input.soundLevel())\n})\n"
      }
    ],
    "14": [
      {
        "title": "Ejemplo guiado · Primer programa",
        "desc": "Programa introductorio. Los retos no se resuelven copiando este ejemplo.",
        "code": "radio.setGroup(7)\nmaqueenPlusV2.I2CInit()\nmaqueenPlusV2.controlMotorStop(maqueenPlusV2.MyEnumMotor.AllMotor)\nradio.onReceivedString(function (msg) {\n    if (msg == \"F\") basic.showArrow(ArrowNames.North)\n    else basic.showIcon(IconNames.No)\n})\n"
      },
      {
        "title": "Emisor · Segunda micro:bit",
        "desc": "Programa del mando (micro:bit sin Maqueen).",
        "code": "radio.setGroup(7)\ninput.onButtonPressed(Button.A, function () { radio.sendString(\"F\") })\ninput.onButtonPressed(Button.B, function () { radio.sendString(\"S\") })\n"
      }
    ],
    "15": [
      {
        "title": "Ejemplo guiado · Primer programa",
        "desc": "Programa introductorio. Los retos no se resuelven copiando este ejemplo.",
        "code": "maqueenPlusV2.I2CInit()\nmaqueenPlusV2.controlMotorStop(maqueenPlusV2.MyEnumMotor.AllMotor)\ninput.onButtonPressed(Button.A, function () {\n    basic.showString(\"V\")\n})\ninput.onButtonPressed(Button.B, function () {\n    basic.showString(\"R\")\n})\n"
      }
    ],
    "16": [
      {
        "title": "Ejemplo guiado · Primer programa",
        "desc": "Programa introductorio. Los retos no se resuelven copiando este ejemplo.",
        "code": "maqueenPlusV2.I2CInit()\ninput.onButtonPressed(Button.A, function () {\n    basic.showNumber(maqueenPlusV2.readLineSensorState(maqueenPlusV2.MyEnumLineSensor.SensorM))\n    basic.showNumber(maqueenPlusV2.readUltrasonic(DigitalPin.P13, DigitalPin.P14))\n})\n"
      }
    ]
  },
  "steps": {
    "01": [
      "«al iniciar» se ejecuta al arrancar la micro:bit.",
      "«inicializar I²C» conecta la micro:bit con el Maqueen.",
      "«detener ambos motores» garantiza una situación de reposo.",
      "El icono de confirmación indica que se ha ejecutado el inicio."
    ],
    "02": [
      "El botón A inicia una maniobra corta.",
      "El bloque motor configura ambas ruedas hacia delante y su velocidad.",
      "«pausa» deja que el robot avance durante 200 ms.",
      "«detener ambos motores» evita movimiento continuo."
    ],
    "03": [
      "«al pulsar A» responde únicamente a ese botón.",
      "El motor avanza a velocidad reducida.",
      "Tras 300 ms, el bloque de parada corta el movimiento.",
      "Todavía no controla la marcha atrás: eso se investigará en los retos."
    ],
    "04": [
      "El bloque de motor izquierdo fija una velocidad pequeña.",
      "El motor derecho avanza un poco más deprisa.",
      "La diferencia entre ruedas hace curvar la trayectoria.",
      "La pausa determina cuánto dura el giro antes de parar."
    ],
    "05": [
      "La pulsación A activa el ejemplo.",
      "El LED izquierdo se enciende con el bloque de la extensión V2.",
      "Una espera de 300 ms lo mantiene iluminado.",
      "Otro bloque apaga el LED. El reto pedirá crear una secuencia diferente."
    ],
    "06": [
      "El evento A decide cuándo sonar.",
      "«reproducir tono» utiliza la música de micro:bit y el zumbador del robot.",
      "440 es la frecuencia en hercios; 150, la duración en ms.",
      "Comprobad el interruptor del zumbador si no hay sonido."
    ],
    "07": [
      "Al pulsar A se lee solamente el sensor central.",
      "El bloque de lectura pertenece a Maqueen Plus V2.",
      "«mostrar número» dibuja en pantalla el valor recibido.",
      "Hay que contrastar blanco y negro: no se supone de antemano qué valor representa cada color."
    ],
    "08": [
      "«para siempre» repite la comprobación sin pulsar un botón.",
      "El sensor M informa sobre la cinta bajo el centro del robot.",
      "«si ... entonces» elige avanzar o detener.",
      "Antes de rodar hay que verificar qué valor corresponde al negro."
    ],
    "09": [
      "Se consultan el sensor exterior izquierdo y el central.",
      "Cada lectura aparece como número para poder compararlas.",
      "El ejemplo NO controla los cinco sensores ni mueve el robot.",
      "El reto será proponer decisiones seguras para las ruedas."
    ],
    "10": [
      "El botón A pide una nueva medida.",
      "«leer ultrasonidos» usa los pines P13/P14 de la conexión dedicada.",
      "«mostrar número» permite contrastar la medida con una regla.",
      "Un valor 0 puede ser una lectura inválida y nunca debe ordenar avanzar por sí solo."
    ],
    "11": [
      "El ultrasonido se lee continuamente.",
      "Si la lectura es inválida o la distancia es pequeña, se detienen los motores.",
      "La pantalla muestra si hay vía libre, pero todavía no hay maniobra de esquiva.",
      "El reto será diseñar los movimientos sin perder la seguridad."
    ],
    "12": [
      "La lectura de luz procede de la micro:bit, no de la base Maqueen.",
      "A muestra un número de luminosidad.",
      "Compara la lectura bajo una linterna y bajo sombra.",
      "Los retos relacionarán esa medida con luces y motores."
    ],
    "13": [
      "El bloque «nivel de sonido» usa el micrófono de micro:bit V2.",
      "El botón A muestra una medida en pantalla.",
      "Una palmada debe superar el sonido ambiente.",
      "El reto usará variables y una condición para decidir qué hacer."
    ],
    "14": [
      "Ambas micro:bit utilizan el mismo grupo de radio (7).",
      "La emisora manda «F» al pulsar A.",
      "El robot recibe el texto y muestra una flecha.",
      "Todavía no se activan motores: esa programación será parte del reto."
    ],
    "15": [
      "La micro:bit empieza con los motores detenidos.",
      "El botón A muestra V de verde.",
      "El botón B muestra R de rojo.",
      "El reto consiste en ampliar a tres estados y relacionarlos con señales seguras."
    ],
    "16": [
      "La pulsación A consulta la cinta bajo el sensor M.",
      "Después muestra la distancia ultrasónica.",
      "Aún no hay ningún movimiento: primero se comprueban sensores por separado.",
      "El proyecto final deberá integrar línea, distancia y parada con prioridad de seguridad."
    ]
  },
  "questions": {
    "01": "¿Qué sucedería si quitamos la orden de detener motores?",
    "02": "¿Cómo variaría el recorrido si aumentamos solamente el tiempo?",
    "03": "¿Qué bloque necesitarías para que la tecla B realizara una acción diferente?",
    "04": "¿Qué rueda debe ir más lenta para que el coche describa el arco contrario?",
    "05": "¿Qué pasa si apagamos el LED antes de la pausa?",
    "06": "¿Cómo distinguirías dos avisos sin mirar la pantalla?",
    "07": "¿Cuál es el valor leído sobre negro y cuál sobre blanco en vuestra pista?",
    "08": "¿Qué ocurre al llegar a una curva, cuando el sensor central deja de ver la cinta?",
    "09": "¿Qué ventaja tendría añadir los sensores de la derecha?",
    "10": "¿Qué lectura obtienes a 15, 30 y 50 cm?",
    "11": "¿Por qué conviene detener el coche antes de intentar un giro?",
    "12": "¿En qué condiciones cambia el nivel de luz?",
    "13": "¿Qué sonidos superan el ruido habitual de clase?",
    "14": "¿Qué ocurre si emisora y receptor usan grupos distintos?",
    "15": "¿Por qué rojo debe tener prioridad frente a cualquier orden de avance?",
    "16": "¿Qué lectura debería tener prioridad para impedir una colisión?"
  }
};
 const esc=s=>String(s??'').replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
 if(!window.ROBO_MAQUEEN_EXAMPLES||!window.ROBO_MAQUEEN_V9_RENDER){
   console.warn('V60: faltan los archivos previos maqueen-v15-examples.js o maqueen-v59-detail.js');return;
 }
 for(const [id,list] of Object.entries(DATA.samples))window.ROBO_MAQUEEN_EXAMPLES[id]=list;
 const previous=window.ROBO_MAQUEEN_V9_RENDER;
 function guided(m){
   const ex=DATA.samples[m.id]||[], steps=DATA.steps[m.id]||[], q=DATA.questions[m.id]||'';
   const cards=ex.map((p,i)=>{
     const title=i===0?'Programa introductorio':'Programa del mando (segunda micro:bit)';
     return `<article class="mq60-example">
       <div class="mq60-kicker">${i===0?'PROGRAMA BASE':'SEGUNDA PLACA'}</div><h4>${title}</h4>
       <p>${esc(p.desc)}</p>
       <div class="mq-live-target" data-codekey="${esc(m.id)}:${i}"><p>Generando los bloques auténticos de MakeCode…</p></div>
       <details class="mq60-code"><summary>Ver el JavaScript completo del ejemplo guiado</summary><pre>${esc(p.code)}</pre></details>
     </article>`;
   }).join('');
   return `<section class="mq-v9-section mq60-guided"><span class="micro-label">1 · OBSERVA Y APRENDE</span>
      <h3>🧩 Ejemplo guiado: entiende los bloques</h3>
      <p>Este programa es solo un <strong>punto de partida</strong>. Comprende qué hace cada bloque, pruébalo y después crea tu propia solución para Bronce, Plata y PRO.</p>
      <div class="mq60-main">${cards}<div class="mq60-side"><h4>🔍 Explicación bloque a bloque</h4>
      <ol>${steps.map(x=>`<li>${esc(x)}</li>`).join('')}</ol>
      <div class="mq60-think"><strong>Piensa antes de continuar:</strong> ${esc(q)}</div></div></div>
      <p class="mq60-note">Las imágenes se generan por <strong>Microsoft MakeCode</strong> con la extensión oficial <strong>Maqueen Plus V2</strong>. No son dibujos inventados. Para verlas es necesaria conexión a Internet. Si alguna imagen falla, conserva el código en el desplegable y usa «Reintentar».</p>
      <div class="mq60-next"><strong>2 · AHORA TE TOCA</strong><span>Haz Bronce, después Plata y finalmente PRO. Los criterios de éxito y el diario siguen abajo. No hay soluciones de estos retos en esta página.</span></div>
   </section>`;
 }
 function render(m){
   let markup=previous.render(m);
   // Evitar que los enlaces a programas completos externos desvelen el reto.
   // La bibliografía general del fabricante sigue disponible en la cabecera.
   const planMarker='<section class="mq-v9-section"><span class="micro-label">MAKECODE · MODELO V2';
   const pi=markup.indexOf(planMarker);
   if(pi>=0){const pj=markup.indexOf('</section>',pi);if(pj>pi){
      const shortPlan='<section class="mq-v9-section mq60-plan"><span class="micro-label">PISTAS PARA DISEÑAR</span><h3>💭 Planifica sin copiar</h3><p>Antes de crear tus bloques, identifica <strong>qué inicia el programa</strong>, <strong>qué información necesitas</strong>, <strong>qué decisión tomará el robot</strong> y <strong>cómo comprobarás el resultado</strong>. No copies un programa resuelto: diseña, prueba y mejora el tuyo.</p></section>';
      markup=markup.slice(0,pi)+shortPlan+markup.slice(pj+'</section>'.length);
   }}
   const marker='<section class="mq-v9-section"><span class="micro-label">BLOQUES REALES';
   const i=markup.indexOf(marker);
   if(i<0){console.warn('V60: no se encontró la sección de ejemplos de V59');return markup;}
   const j=markup.indexOf('</section>',i);
   if(j<0)return markup;
   markup=markup.slice(0,i)+guided(m)+markup.slice(j+'</section>'.length);
   markup=markup.replace('2 ejemplos con bloques reales',m.id==='14'?'1 ejemplo guiado + mando':'1 ejemplo guiado con bloques reales');
   return markup;
 }
 window.ROBO_MAQUEEN_V9_RENDER={...previous,render};
})();