"use strict";
/* RoboMisión LAB v34: guías centradas en qué construir y cómo comprobarlo. */
(() => {
 const data=window.ROBO_TA647||[], gui=window.ROBO_TA647_GUIAS||{};
 const get=id=>data.find(x=>x.id===id), p=get('bomba'),s=get('shield');
 function lesson(objective,steps,success,variant,materials,deliver,program=0){return {objective,steps,success,variant,materials,deliver,program};}
 if(p&&gui.bomba){
  p.codeSamples=[
   {title:'A · Prueba del relé sin conectar todavía la bomba',code:`// EJEMPLO PARA RELÉ COMPATIBLE CON ENTRADA ACTIVA EN ALTO
// Comprueba el tipo de relé con el docente antes de conectar la carga.
let encender = 1
let apagar = 0
pins.digitalWritePin(DigitalPin.P1, apagar)
input.onButtonPressed(Button.A, function () {
    pins.digitalWritePin(DigitalPin.P1, encender)
    basic.pause(800)
    pins.digitalWritePin(DigitalPin.P1, apagar)
})
input.onButtonPressed(Button.B, function () {
    pins.digitalWritePin(DigitalPin.P1, apagar)
})`},
   {title:'B · Simulación de riego temporizado desde botones',code:`// Solo tras comprobar si el relé se activa con 1 o con 0.
let encender = 1
let apagar = 0
let cancelar = false
let ejecutando = false
pins.digitalWritePin(DigitalPin.P1, apagar)
input.onButtonPressed(Button.A, function () {
    if (!ejecutando) {
        cancelar = false
        ejecutando = true
        pins.digitalWritePin(DigitalPin.P1, encender)
        for (let t = 0; t < 10; t++) {
            if (cancelar) { break }
            basic.pause(100)
        }
        pins.digitalWritePin(DigitalPin.P1, apagar)
        ejecutando = false
    }
})
input.onButtonPressed(Button.B, function () {
    cancelar = true
    pins.digitalWritePin(DigitalPin.P1, apagar)
})`}
  ];
  gui.bomba.why='La minibomba (3–5 V CC) mueve agua mediante un motor. La micro:bit NO puede alimentarla ni conectarse directamente a ella: solamente envía una orden al módulo relé (si es compatible) o a un controlador apropiado. La corriente de la bomba viene de una fuente externa independiente.';
  gui.bomba.setup='Con todo apagado: identifica la bomba, el relé, la Shield y la fuente CC de 3–5 V para la bomba. Comprueba qué tensión necesita la bobina del relé, si acepta control de 3,3 V y si su entrada es activa en 0 o 1. El montaje real exige contactos adecuados y protección frente a picos del motor. Si falta alguno de esos elementos, realiza solo la programación/simulación.';
  gui.bomba.programs=[
   {title:'A · Activación de la salida P1 durante 0,8 segundos',objective:'Probar el relé SIN BOMBA conectada antes de alimentar una carga. Solo con módulo compatible y preparado.',observe:'La salida P1 cambia durante 0,8 segundos. Si el relé está correctamente alimentado y es compatible, se puede oír un clic; eso no significa que la bomba esté conectada.',mode:'condicional',blocks:[{name:'fijar encender / apagar',why:'Guarda qué valor activa/desactiva el relé: aquí suponemos activo en 1; hay relés activos en 0. Debe verificarlo el docente.'},{name:'escribir pin digital P1 = apagar',why:'Establece una orden inicial de reposo para el relé.'},{name:'al pulsar botón A',why:'La activación empieza solo al pulsar A.'},{name:'escribir pin digital P1 = encender',why:'Envía una orden de control al relé, no suministra la corriente de la bomba.'},{name:'pausa 800 ms',why:'Mantiene la orden menos de un segundo.'},{name:'escribir pin digital P1 = apagar',why:'Devuelve el control al estado de reposo.'},{name:'al pulsar botón B',why:'También solicita el apagado. No sustituye un corte físico de emergencia.'}],question:'¿Qué diferencia existe entre ordenar encender el relé y alimentar la bomba?'},
   {title:'B · Riego temporizado con parada lógica',objective:'Limitar la duración de la orden y permitir que B la cancele; se prueba primero sin bomba.',observe:'Con A se activa como máximo un segundo; B solicita apagado. La desconexión manual sigue siendo imprescindible para una emergencia.',mode:'condicional',blocks:[{name:'variables encender y apagar',why:'Definen la lógica de control de la entrada del relé; deben ajustarse según el módulo.'},{name:'cancelar / ejecutando',why:'Impiden que un segundo pulso de A lance otro riego mientras dura el anterior.'},{name:'al pulsar A → si no ejecutando',why:'Solo comienza un ciclo si no hay otro en marcha.'},{name:'repetir hasta 10 intervalos',why:'Diez pausas de 100 ms permiten comprobar periódicamente si B pidió cancelar.'},{name:'si cancelar → salir del ciclo',why:'Evita continuar el tiempo programado si se ha solicitado detener.'},{name:'escribir P1 = apagar',why:'Devuelve la salida al estado de reposo al finalizar.'},{name:'al pulsar B',why:'Marca cancelar y manda apagar. Un apagado de seguridad de verdad requiere cortar la alimentación.'}],question:'¿Por qué la parada física debe poder realizarse aunque falle el programa?'}
  ];
  gui.bomba.activities=[
   lesson('Probar la señal de control del relé sin conectar la bomba.',[
    'Con la alimentación desconectada, identifica P1 de la Shield y los terminales IN, VCC y GND del relé.',
    'El docente verifica tensión de bobina, compatibilidad de IN con 3,3 V y si el relé se activa a nivel alto o bajo.',
    'Prepara solo el circuito de control. Mantén COM y NO sin carga; no conectes la bomba.',
    'En MakeCode monta el programa A, adapta los valores encender/apagar al relé confirmado y descárgalo.',
    'Pulsa A tres veces. Anota si se oye el clic y si el relé vuelve al reposo.'
   ],'Tres pulsaciones producen tres ciclos de duración limitada y al terminar el relé está en reposo.','Explica cómo cambia el programa si el relé se activa con 0 en lugar de 1.','Shield, micro:bit, relé compatible, 3 cables Dupont de control, fuente compatible para el relé (si la requiere). Sin bomba.','Foto del circuito de control y tabla de 3 ensayos.',0),
   lesson('Controlar cuánto tiempo funcionaría la bomba con una orden temporizada.',[
    'Repite el montaje del relé comprobado en la actividad 1. Primero no conectes la bomba.',
    'Programa A para activar la salida 500 ms. Haz tres ensayos y anota la duración.',
    'Cambia únicamente la pausa a 1000 ms y repite tres veces.',
    'Compara ambos tiempos y explica por qué la salida no puede alimentar directamente un motor.',
    'Si el docente dispone del circuito de potencia seguro, conecta la carga y mide el volumen solo con supervisión.'
   ],'La salida se desactiva automáticamente después de cada ensayo y comparas las dos duraciones.','Elige un tiempo máximo que impida dejar la bomba funcionando indefinidamente.','Relé comprobado, Shield y micro:bit, cronómetro; bomba y fuente externa solo en montaje docente autorizado.','Tabla de tiempos y explicación de la desconexión.',0),
   lesson('Diseñar un sistema de riego que utilice la humedad del suelo.',[
    'Coloca el sensor de humedad en P1 (S, V 3,3 V compatible y G) y reserva P2 para la entrada IN del relé.',
    'Toma tres lecturas con la sonda en tierra seca y tres en tierra húmeda; anota cuál situación produce más valor.',
    'Calcula un umbral intermedio y escribe el algoritmo: si está seco y ha pasado el tiempo de espera, ordena un pulso de riego.',
    'Comprueba la lógica primero mostrando una cara en la micro:bit, sin conectar la bomba.',
    'Solo después el docente puede habilitar el relé y el circuito de potencia externo verificado.'
   ],'El programa distingue seco/húmedo, limita cada pulso y evita riegos continuados.','Añade un bloqueo de 10 s entre dos riegos y un botón de cancelación.','Sensor de humedad, relé, bomba, micro:bit, Shield, cables Dupont; fuente externa, protección y conexiones de potencia adecuadas.','Seis medidas de humedad, umbral elegido y diagrama de decisión.',1),
   lesson('Dibujar el circuito completo y distinguir señal de potencia.',[
    'Observa los tres elementos: micro:bit+Shield, módulo relé y minibomba.',
    'Dibuja con un color la señal Shield P1 → IN del relé y el retorno de masa necesario.',
    'Con otro color dibuja la alimentación externa: fuente + → COM → NO → bomba + y bomba − → fuente −.',
    'Sitúa la protección contra picos inductivos en el motor, respetando la polaridad de la bomba.',
    'Haz que otro equipo revise el esquema antes de permitir un montaje físico.'
   ],'El dibujo distingue control y alimentación y no conecta la bomba a ningún GPIO ni al V de la Shield.','Explica qué sucedería si conectaras la bomba directamente a P1.','Fotografía de bomba, relé, Shield, papel, lápices de colores y ficha de datos. No hace falta energizar.','Esquema rotulado y una lista de tres medidas de seguridad.',0),
   lesson('Programar A para riego corto y B para solicitar la parada.',[
    'Comprueba que el docente ha verificado el relé y su estado de reposo (activo alto o activo bajo).',
    'Utiliza el programa B y localiza las instrucciones de A, B, cancelar y duración máxima.',
    'Prueba la secuencia A→B durante un ciclo, inicialmente sin bomba y con el relé descargado.',
    'Repite tres veces: B antes de terminar, B al comenzar y A mientras otro ciclo está activo.',
    'Documenta que B es una parada lógica; demuestra dónde se corta físicamente la fuente de la bomba.'
   ],'B solicita la desactivación y no se inicia un segundo ciclo simultáneo; puedes desconectar la alimentación de forma independiente.','Añade una indicación visual en la matriz LED al activar y al detener.','Micro:bit, Shield y relé comprobado; bomba y fuente externa únicamente con autorización y protección.','Registro de 3 pruebas de cancelación y foto del corte físico.',1),
   lesson('Proponer un riego automático con límites de tiempo y medida de humedad.',[
    'Prepara el esquema seguro: humedad en P1, relé en P2 y fuente externa separada para la bomba.',
    'Calibra la sonda con tres medidas secas y tres húmedas; anota el umbral.',
    'Construye el diagrama lógico: medir → decidir si está seco → activar 1 s como máximo → parar.',
    'Añade una espera mínima entre riegos y una bandera de cancelación que se active con B.',
    'Simula primero la orden en la matriz LED. El montaje real debe ser aprobado y supervisado por el docente.'
   ],'No hay activación continuada; se limita el tiempo y B permite solicitar la parada.','Añade una condición que impida regar si la sonda se desconecta o devuelve una lectura inválida.','Shield, micro:bit, sensor de humedad, relé, bomba y cables; fuente externa compatible, protección inductiva y medios de desconexión.','Diagrama completo, tabla de 6 medidas y resultados de tres simulaciones.',1)
  ];
  // Lectura de humedad segura: no activa el relé ni la bomba hasta calibrar la sonda.
  const soilDemo=`// Prueba la sonda sin conectar el relé ni la bomba.
// Comprueba si seco da un valor MENOR o MAYOR antes de usar el umbral.
let umbral = 500
basic.forever(function () {
    let valor = pins.analogReadPin(AnalogPin.P1)
    basic.showNumber(valor)
    if (valor < umbral) {
        basic.showIcon(IconNames.Sad)
    } else {
        basic.showIcon(IconNames.Happy)
    }
    basic.pause(1200)
})`;
  [2,5].forEach(i=>{gui.bomba.activities[i].code=soilDemo;gui.bomba.activities[i].codeNote='Programa de lectura para CALIBRAR y SIMULAR. NO acciona la bomba ni el relé. El sentido de la comparación debe invertirse si tu sensor da valores mayores cuando está seco.';});
 }
 if(s&&gui.shield){
  gui.shield.why='La Shield es la placa de expansión en la que se introduce la micro:bit. No es un sensor: permite acceder de forma ordenada a señales P0/P1, masa GND, alimentación y conectores de los módulos. Al aprender a usarla, evita confundir señal con alimentación.';
  gui.shield.setup='La micro:bit se introduce apagada en el zócalo. Nunca se cablea micro:bit→Shield con Dupont. Primero lee las etiquetas impresas S (señal), V (alimentación) y G (masa), identifica el selector de tensión si existe y no conectes 5 V a entradas de micro:bit.';
  gui.shield.activities=[
   lesson('Insertar correctamente la micro:bit y reconocer la Shield.',[
    'Observa una Shield desconectada: busca zócalo, conectores, etiquetas, alimentación y selector de tensión (si existe).',
    'Con la placa apagada, alinea la micro:bit con la ranura sin forzarla y pide al docente que revise la orientación.',
    'Dibuja un croquis frontal; señala por dónde entra la micro:bit y qué elementos quedan accesibles.',
    'Comprueba que no has utilizado cables Dupont entre la micro:bit y la Shield.'
   ],'El croquis señala zócalo, orientación y tres grupos de conexiones.','Explica por qué la colocación debe realizarse sin alimentación.','Shield, micro:bit y hoja de trabajo. Sin Dupont.','Croquis rotulado y fotografía de la inserción.',0),
   lesson('Distinguir S, V y G en los conectores.',[
    'Busca en la serigrafía los puertos P0, P1 y P2.',
    'Identifica en cada uno qué contacto es señal S, alimentación V y masa G.',
    'Completa una tabla de tres filas; anota el valor de V que permite el selector sin manipularlo energizado.',
    'Señala con tres colores diferentes las funciones de los pines, sin enchufar sensores.'
   ],'La tabla distingue correctamente 9 contactos y no confunde V con una entrada digital.','Explica por qué una salida de 5 V de un sensor no debe llegar directamente a P0/P1.','Shield, micro:bit apagada, lápices y ficha.','Tabla de pines P0/P1/P2 con tres colores.',0),
   lesson('Preparar el esquema de un sensor analógico antes de conectarlo.',[
    'Selecciona un módulo de luz compatible con 3,3 V y localiza sus pines S, V y G.',
    'Dibuja tres cables: sensor S→Shield P1 (señal), V→3,3 V compatible, G→GND.',
    'Comprueba que el dibujo usa señal analógica en P1 y que no hay tensión superior a 3,3 V en S.',
    'Pide revisión al docente antes de realizar cualquier conexión física.'
   ],'El esquema identifica los tres hilos, el pin P1 y la alimentación compatible.','Añade qué bloque de MakeCode leería la entrada analógica P1.','Shield, módulo de luz, tres Dupont hembra-hembra si ambos conectores son macho, hoja y lápiz.','Esquema de tres hilos validado.',1),
   lesson('Interpretar el montaje diseñado por otro equipo.',[
    'Intercambia tu croquis con otro equipo y no le expliques qué has dibujado.',
    'El compañero debe señalar el zócalo, las tres funciones S/V/G y el pin elegido.',
    'Anota cualquier etiqueta ambigua que haya dado lugar a duda.',
    'Corrige el dibujo y comprueba que un segundo equipo lo interpreta igual.'
   ],'Otro equipo interpreta las tres funciones y el pin sin ayuda oral.','Añade una leyenda de colores y símbolos para reducir dudas.','Shield o foto, croquis de otra pareja y rotuladores.','Croquis corregido con una mejora justificada.',0),
   lesson('Detectar errores peligrosos en un esquema de conexiones.',[
    'Recibe del docente un dibujo con un sensor mal conectado; no realices el montaje.',
    'Comprueba si se han intercambiado S y V, si falta masa o si una salida supera los 3,3 V.',
    'Señala dos riesgos con un círculo rojo y explica qué daño o mal funcionamiento podrían causar.',
    'Dibuja la conexión correcta y pide validación antes de enchufar nada.'
   ],'Identificas al menos dos fallos y corriges el esquema sin energizar.','Crea un ejemplo de error adicional para que otro equipo lo detecte.','Dibujo con errores, Shield apagada, lápices; sin cableado real.','Dibujo antes/después y breve explicación de riesgos.',0),
   lesson('Diseñar un cartel de seguridad para el uso de la Shield.',[
    'Escribe un título claro: «Antes de conectar un módulo».',
    'Incluye cinco verificaciones: placa apagada, S/V/G correctos, tensión de señal ≤3,3 V, masa común cuando corresponda, cables adecuados.',
    'Añade un ejemplo correcto y uno incorrecto, dejando claro por qué el incorrecto no debe probarse.',
    'Intercambia el cartel con otro grupo y revisa si puede seguirlo sin preguntar.'
   ],'El cartel incluye cinco verificaciones y ambos dibujos identificables.','Añade un código QR a la guía de seguridad de la web si el docente lo autoriza.','Cartón o A4, rotuladores, foto de la Shield y guía de seguridad.','Cartel listo para exponer y revisión de otro equipo.',0)
  ];
 }
 // Otras 24 piezas: sustituir los pasos repetitivos por un itinerario visible y específico.
 for(const m of data){ if(['bomba','shield'].includes(m.id))continue; const g=gui[m.id]; if(!g||!Array.isArray(g.activities))continue;
  g.activities.forEach((a,i)=>{
    const task=(m.practices||[]).concat(m.expanded||[])[i]||a.objective;
    a.materials = m.name+', micro:bit, Shield ACEBOTT TA647, cables adecuados y materiales complementarios que indique el esquema de esta actividad.';
    a.deliver = 'Fotografía o dibujo del montaje, tres resultados y una mejora explicada.';
    // Preservar el objetivo y la precaución del componente; concretar un guion de comprobación.
    a.steps=[
      'Lee la meta de esta actividad: «'+a.objective+'». Identifica qué se va a medir, encender, mover o representar.',
      'Con la alimentación desconectada, reúne '+m.name+' y comprueba qué contactos, alimentación y material adicional exige el esquema de abajo.',
      'Si el montaje se puede realizar de forma segura, prepara las conexiones con el docente. Si requiere una extensión, un adaptador o una fuente que no tienes, realiza primero la demostración o simulación.',
      'Abre el ejemplo de MakeCode que se indica en esta ficha y modifica únicamente los bloques necesarios para lograr: «'+task+'».',
      'Realiza tres ensayos, anotando la condición inicial, el resultado y si se cumple: «'+a.success+'».',
      'Entrega una captura o dibujo del programa y escribe qué cambiarías para superar el reto extra.'
    ];
  });
 }
})();
