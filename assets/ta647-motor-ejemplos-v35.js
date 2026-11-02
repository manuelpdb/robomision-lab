'use strict';
/* V35 · programas seguros de partida para controlador L298N, común a motorcc y l298n. */
(()=>{
 const data=window.ROBO_TA647||[],G=window.ROBO_TA647_GUIAS||{};
 const codeA=`// Motor amarillo conectado a OUT1 / OUT2 de L298N.
// P0 -> ENA (PWM), P1 -> IN1, P2 -> IN2.
// Alimentacion externa y logica L298N verificadas por el docente.
let ocupado = false
let cancelar = false
pins.analogWritePin(AnalogPin.P0, 0)
pins.digitalWritePin(DigitalPin.P1, 0)
pins.digitalWritePin(DigitalPin.P2, 0)
input.onButtonPressed(Button.A, function () {
    if (!ocupado) {
        ocupado = true
        cancelar = false
        pins.digitalWritePin(DigitalPin.P1, 1)
        pins.digitalWritePin(DigitalPin.P2, 0)
        pins.analogWritePin(AnalogPin.P0, 700)
        for (let i = 0; i < 7; i++) {
            if (cancelar) {
                break
            }
            basic.pause(100)
        }
        pins.analogWritePin(AnalogPin.P0, 0)
        pins.digitalWritePin(DigitalPin.P1, 0)
        pins.digitalWritePin(DigitalPin.P2, 0)
        ocupado = false
    }
})
input.onButtonPressed(Button.B, function () {
    cancelar = true
    pins.analogWritePin(AnalogPin.P0, 0)
})`;
 const codeB=`// Dos niveles PWM, siempre con el motor sin carga.
// El jumper ENA se revisa / retira segun el controlador real.
let ocupado = false
pins.analogWritePin(AnalogPin.P0, 0)
pins.digitalWritePin(DigitalPin.P1, 0)
pins.digitalWritePin(DigitalPin.P2, 0)
function ensayo (potencia: number) {
    if (!ocupado) {
        ocupado = true
        pins.digitalWritePin(DigitalPin.P1, 1)
        pins.digitalWritePin(DigitalPin.P2, 0)
        pins.analogWritePin(AnalogPin.P0, potencia)
        basic.pause(650)
        pins.analogWritePin(AnalogPin.P0, 0)
        pins.digitalWritePin(DigitalPin.P1, 0)
        pins.digitalWritePin(DigitalPin.P2, 0)
        ocupado = false
    }
}
input.onButtonPressed(Button.A, function () {
    ensayo(400)
})
input.onButtonPressed(Button.B, function () {
    ensayo(800)
})`;
 const programs=[
  {title:'Programa A · Un giro corto con parada y cancelación',mode:'condicional',objective:'La micro:bit ordena al L298N mover un motor durante un máximo de 0,7 s y dejarlo parado; el botón B interrumpe el ensayo por software.',observe:'Al pulsar A gira un motor unos 0,7 segundos si la alimentación es adecuada. B puede cancelar la orden; el corte físico de la fuente sigue siendo la parada de seguridad.',blocks:[
   {name:'analogWrite P0 = 0',why:'Deshabilita ENA antes de ordenar una dirección; no alimenta la carga.'},
   {name:'digitalWrite P1/P2 = 0',why:'Deja ambas entradas de sentido en reposo.'},
   {name:'al pulsar A → si no ocupado',why:'Evita iniciar ensayos simultáneos.'},
   {name:'P1 = 1, P2 = 0',why:'Selecciona uno de los sentidos de giro mediante IN1 e IN2.'},
   {name:'analogWrite P0 = 700',why:'Envía PWM a ENA (valor 0 a 1023), con el puente ENA adecuado.'},
   {name:'repetir 7 × pausa 100 ms',why:'Mantiene el ensayo hasta 700 ms, comprobando si B solicita parar.'},
   {name:'analogWrite P0 = 0; P1/P2 = 0',why:'Finaliza el pulso y deja el controlador en reposo.'},
   {name:'al pulsar B → cancelar y ENA = 0',why:'Solicita la parada lógica; nunca sustituye el interruptor de la fuente.'}
  ],question:'¿Por qué el motor se alimenta desde los bornes del L298N y no desde la salida P0 de micro:bit?'},
  {title:'Programa B · Comparar dos órdenes de velocidad PWM',mode:'condicional',objective:'Comparar dos consignas PWM (400 y 800 sobre 1023) al mismo motor, sin modificar cableado ni duración.',observe:'El botón A prueba PWM 400, el botón B PWM 800. Si el primero no logra arrancar debido a la carga/caída de tensión del L298N, hay que registrarlo y no prometer una velocidad concreta.',blocks:[
   {name:'function ensayo(potencia)',why:'Agrupa el mismo procedimiento para comparar dos valores.'},
   {name:'si no ocupado',why:'Impide dos ciclos superpuestos.'},
   {name:'P1 = 1 / P2 = 0',why:'Mantiene siempre el mismo sentido para una comparación justa.'},
   {name:'analogWrite P0 = potencia',why:'Regula ENA mediante PWM, no el terminal de potencia del motor.'},
   {name:'pausa 650 ms',why:'Mantiene idéntica la duración de ambos ensayos.'},
   {name:'ENA 0, IN1/IN2 0',why:'Deja el motor parado al acabar cada ciclo.'},
   {name:'A → ensayo 400; B → ensayo 800',why:'Solo cambia una variable experimental: la consigna PWM.'}
  ],question:'¿Qué cambia en el programa cuando el control pasa de PWM 400 a PWM 800? ¿Y qué podría ocurrir si la tensión de la fuente es insuficiente?'}
 ];
 for(const id of ['motorcc','l298n']){
  const m=data.find(x=>x.id===id),g=G[id];if(!m||!g)continue;
  m.codeSamples=[{title:programs[0].title,code:codeA},{title:programs[1].title,code:codeB}];
  g.programs=programs;
  g.why='El motor de corriente continua convierte energía eléctrica en giro. La micro:bit no puede proporcionar la corriente necesaria: usa la Shield SOLO para señales digitales/PWM y el L298N para manejar la alimentación externa del motor. El kit incluye un motor amarillo; las pruebas con dos motores requieren uno adicional.';
  g.setup='Antes de energizar, identifica IN1, IN2, ENA, OUT1, OUT2, GND, VM/Vs y la alimentación lógica del L298N. Comprueba tensiones, corriente, caída del puente H, jumper ENA y fuente adecuada. Alimentación y conexiones verificadas con el docente; motor fijado y desconexión física accesible.';
 }
 const l298=data.find(x=>x.id==='l298n');if(l298&&l298.practices?.length>=3)l298.practices[2]='Diseñar el control de dos motores (segundo motor opcional)';
 const l=G.l298n;if(l){l.activities[2].success='Entregas el circuito del segundo canal y su programa sobre papel. Solo se prueban ambos motores si hay un SEGUNDO motor y una alimentación suficiente, no incluidos por defecto.';l.activities[2].materials+=' Para conectar de verdad un segundo canal, hace falta un segundo motor no incluido.';}
 const motorItem=data.find(x=>x.id==='motorcc');if(motorItem&&motorItem.expanded?.length>=2)motorItem.expanded[1]='Comparar el desplazamiento de una tira o polea con un motor';
 const motor=G.motorcc;if(motor){motor.activities[4].objective='Comparar el desplazamiento de una tira de cartón o polea acoplada al único motor CC a dos órdenes PWM. Si no se construye esa maqueta, comparar giros sin fingir que el kit trae un vehículo.';}
})();
