"use strict";
window.ROBO_MAQUEEN_STARTERS_V60={
  "01": {
    "title": "Comprueba que el robot se inicia",
    "goal": "Aprender a preparar la comunicación y detener los motores.",
    "blocks": [
      [
        "al iniciar",
        "Reúne las órdenes que se ejecutan al encender."
      ],
      [
        "Inicializar el Maqueen",
        "Prepara la comunicación I²C con el robot."
      ],
      [
        "Detener ambos motores",
        "Evita un movimiento involuntario."
      ],
      [
        "Mostrar icono",
        "Confirma que terminó el arranque."
      ]
    ],
    "result": "Aparece ✓ y las ruedas permanecen quietas.",
    "programs": [
      {
        "role": "micro:bit montada en Maqueen",
        "code": "maqueenPlusV2.I2CInit()\nmaqueenPlusV2.controlMotorStop(maqueenPlusV2.MyEnumMotor.AllMotor)\nbasic.showIcon(IconNames.Yes)\n"
      }
    ]
  },
  "02": {
    "title": "Primer movimiento de prueba",
    "goal": "Hacer avanzar brevemente el robot para entender los bloques de motor.",
    "blocks": [
      [
        "Al pulsar A",
        "Inicia la acción solo cuando el alumno lo decide."
      ],
      [
        "Motores hacia delante",
        "Activa las dos ruedas a potencia reducida."
      ],
      [
        "Pausa de 200 ms",
        "Limita cuánto dura el avance."
      ],
      [
        "Detener motores",
        "Finaliza la prueba."
      ]
    ],
    "result": "El robot avanza unos instantes; todavía no resuelve una distancia concreta.",
    "programs": [
      {
        "role": "micro:bit montada en Maqueen",
        "code": "maqueenPlusV2.I2CInit()\nmaqueenPlusV2.controlMotorStop(maqueenPlusV2.MyEnumMotor.AllMotor)\ninput.onButtonPressed(Button.A, function () {\n    maqueenPlusV2.controlMotor(maqueenPlusV2.MyEnumMotor.AllMotor, maqueenPlusV2.MyEnumDir.Forward, 35)\n    basic.pause(200)\n    maqueenPlusV2.controlMotorStop(maqueenPlusV2.MyEnumMotor.AllMotor)\n})\n"
      }
    ]
  },
  "03": {
    "title": "Ensaya un avance corto",
    "goal": "Comprender un evento de botón y una parada antes de añadir marcha atrás.",
    "blocks": [
      [
        "Al pulsar A",
        "Arranca una sola maniobra."
      ],
      [
        "Mover ambos motores",
        "Hace girar las ruedas en sentido de avance."
      ],
      [
        "Pausa",
        "Acota la maniobra."
      ],
      [
        "Parada",
        "Detiene las ruedas; tú tendrás que pensar cómo retroceder."
      ]
    ],
    "result": "Solo avanza y se detiene: el reto de marcha atrás queda por resolver.",
    "programs": [
      {
        "role": "micro:bit montada en Maqueen",
        "code": "maqueenPlusV2.I2CInit()\nmaqueenPlusV2.controlMotorStop(maqueenPlusV2.MyEnumMotor.AllMotor)\ninput.onButtonPressed(Button.A, function () {\n    maqueenPlusV2.controlMotor(maqueenPlusV2.MyEnumMotor.AllMotor, maqueenPlusV2.MyEnumDir.Forward, 40)\n    basic.pause(250)\n    maqueenPlusV2.controlMotorStop(maqueenPlusV2.MyEnumMotor.AllMotor)\n})\n"
      }
    ]
  },
  "04": {
    "title": "Compara dos ruedas",
    "goal": "Descubrir que dos potencias diferentes provocan una curva.",
    "blocks": [
      [
        "Motor izquierdo 25",
        "Avanza con menor potencia."
      ],
      [
        "Motor derecho 45",
        "Avanza con mayor potencia."
      ],
      [
        "Pausa",
        "Permite observar una pequeña curva."
      ],
      [
        "Detener",
        "Cierra la maniobra."
      ]
    ],
    "result": "Una curva breve; todavía no hay ningún giro calibrado.",
    "programs": [
      {
        "role": "micro:bit montada en Maqueen",
        "code": "maqueenPlusV2.I2CInit()\nmaqueenPlusV2.controlMotorStop(maqueenPlusV2.MyEnumMotor.AllMotor)\ninput.onButtonPressed(Button.A, function () {\n    maqueenPlusV2.controlMotor(maqueenPlusV2.MyEnumMotor.LeftMotor, maqueenPlusV2.MyEnumDir.Forward, 25)\n    maqueenPlusV2.controlMotor(maqueenPlusV2.MyEnumMotor.RightMotor, maqueenPlusV2.MyEnumDir.Forward, 45)\n    basic.pause(250)\n    maqueenPlusV2.controlMotorStop(maqueenPlusV2.MyEnumMotor.AllMotor)\n})\n"
      }
    ]
  },
  "05": {
    "title": "Enciende una luz y apágala",
    "goal": "Descubrir el bloque de luces del propio chasis.",
    "blocks": [
      [
        "Al pulsar A",
        "Dispara la señal luminosa."
      ],
      [
        "Controlar LED izquierdo",
        "Enciende la luz del robot."
      ],
      [
        "Pausa",
        "Espera un cuarto de segundo."
      ],
      [
        "Apagar LED",
        "Devuelve el robot a la situación inicial."
      ]
    ],
    "result": "Solo parpadea una luz; no se ha programado el intermitente completo.",
    "programs": [
      {
        "role": "micro:bit montada en Maqueen",
        "code": "maqueenPlusV2.I2CInit()\ninput.onButtonPressed(Button.A, function () {\n    maqueenPlusV2.controlLED(maqueenPlusV2.MyEnumLed.LeftLed, maqueenPlusV2.MyEnumSwitch.Open)\n    basic.pause(250)\n    maqueenPlusV2.controlLED(maqueenPlusV2.MyEnumLed.LeftLed, maqueenPlusV2.MyEnumSwitch.Close)\n})\n"
      }
    ]
  },
  "06": {
    "title": "Reproduce un aviso",
    "goal": "Aprender a generar un tono al pulsar un botón.",
    "blocks": [
      [
        "Al pulsar A",
        "Activa el sonido."
      ],
      [
        "Reproducir tono",
        "Selecciona frecuencia y duración."
      ]
    ],
    "result": "Un pitido sencillo; faltan los patrones de los tres retos.",
    "programs": [
      {
        "role": "micro:bit montada en Maqueen",
        "code": "maqueenPlusV2.I2CInit()\ninput.onButtonPressed(Button.A, function () {\n    music.playTone(523, music.beat(BeatFraction.Quarter))\n})\n"
      }
    ]
  },
  "07": {
    "title": "Lee el centro de la pista",
    "goal": "Observar el resultado digital de un sensor siguelíneas.",
    "blocks": [
      [
        "Para siempre",
        "Repite la medición."
      ],
      [
        "Leer sensor central M",
        "Obtiene el estado digital del sensor."
      ],
      [
        "Mostrar número",
        "Permite comparar 0 y 1."
      ],
      [
        "Pausa",
        "Evita cambios demasiado rápidos en pantalla."
      ]
    ],
    "result": "Se muestra 0 o 1 al pasar el sensor por distintas superficies.",
    "programs": [
      {
        "role": "micro:bit montada en Maqueen",
        "code": "maqueenPlusV2.I2CInit()\nbasic.forever(function () {\n    let centro = maqueenPlusV2.readLineSensorState(maqueenPlusV2.MyEnumLineSensor.SensorM)\n    basic.showNumber(centro)\n    basic.pause(250)\n})\n"
      }
    ]
  },
  "08": {
    "title": "Observa tres sensores",
    "goal": "Leer los tres sensores centrales sin activar todavía los motores.",
    "blocks": [
      [
        "Al pulsar A",
        "Muestra las tres lecturas."
      ],
      [
        "Sensores L1, M y R1",
        "Detectan el estado de la pista."
      ],
      [
        "Mostrar número",
        "Enseña la información recogida."
      ]
    ],
    "result": "Verás tres valores de sensores; el siguelíneas aún está por programar.",
    "programs": [
      {
        "role": "micro:bit montada en Maqueen",
        "code": "maqueenPlusV2.I2CInit()\ninput.onButtonPressed(Button.A, function () {\n    basic.showNumber(maqueenPlusV2.readLineSensorState(maqueenPlusV2.MyEnumLineSensor.SensorL1))\n    basic.showNumber(maqueenPlusV2.readLineSensorState(maqueenPlusV2.MyEnumLineSensor.SensorM))\n    basic.showNumber(maqueenPlusV2.readLineSensorState(maqueenPlusV2.MyEnumLineSensor.SensorR1))\n})\n"
      }
    ]
  },
  "09": {
    "title": "Explora los sensores exteriores",
    "goal": "Leer L2 y R2 para entender qué aportan en las curvas.",
    "blocks": [
      [
        "Sensores L2/R2",
        "Detectan los extremos de la pista."
      ],
      [
        "Al pulsar A",
        "Muestra ambas medidas."
      ]
    ],
    "result": "El alumnado observa las dos lecturas; no hay todavía control de motores.",
    "programs": [
      {
        "role": "micro:bit montada en Maqueen",
        "code": "maqueenPlusV2.I2CInit()\ninput.onButtonPressed(Button.A, function () {\n    basic.showNumber(maqueenPlusV2.readLineSensorState(maqueenPlusV2.MyEnumLineSensor.SensorL2))\n    basic.showNumber(maqueenPlusV2.readLineSensorState(maqueenPlusV2.MyEnumLineSensor.SensorR2))\n})\n"
      }
    ]
  },
  "10": {
    "title": "Mide centímetros",
    "goal": "Leer un obstáculo y mostrar la distancia, sin mover el robot.",
    "blocks": [
      [
        "Ultrasonidos P13/P14",
        "Mide el eco del sensor en centímetros."
      ],
      [
        "Variable cm",
        "Guarda el resultado."
      ],
      [
        "Mostrar número",
        "Enseña la distancia observada."
      ]
    ],
    "result": "Muestra la distancia al pulsar A; el frenado es tarea del reto.",
    "programs": [
      {
        "role": "micro:bit montada en Maqueen",
        "code": "maqueenPlusV2.I2CInit()\ninput.onButtonPressed(Button.A, function () {\n    let cm = maqueenPlusV2.readUltrasonic(DigitalPin.P13, DigitalPin.P14)\n    basic.showNumber(cm)\n})\n"
      }
    ]
  },
  "11": {
    "title": "Detecta si un objeto está cerca",
    "goal": "Practicar una comparación sin poner todavía en marcha el robot.",
    "blocks": [
      [
        "Medir distancia",
        "Devuelve una lectura en cm."
      ],
      [
        "Si... entonces",
        "Comprueba un umbral de proximidad."
      ],
      [
        "Mostrar icono",
        "Representa el resultado de la condición."
      ]
    ],
    "result": "Solo aparece un icono: la maniobra de esquiva no está resuelta.",
    "programs": [
      {
        "role": "micro:bit montada en Maqueen",
        "code": "maqueenPlusV2.I2CInit()\ninput.onButtonPressed(Button.A, function () {\n    let cm = maqueenPlusV2.readUltrasonic(DigitalPin.P13, DigitalPin.P14)\n    if (cm > 0 && cm < 30) {\n        basic.showIcon(IconNames.No)\n    } else {\n        basic.showIcon(IconNames.Yes)\n    }\n})\n"
      }
    ]
  },
  "12": {
    "title": "Descubre el nivel de luz",
    "goal": "Mostrar en la micro:bit el valor de luz medido.",
    "blocks": [
      [
        "Nivel de luz",
        "Utiliza los LED de la micro:bit como sensor."
      ],
      [
        "Al pulsar A",
        "Pide la lectura."
      ],
      [
        "Mostrar número",
        "Enseña el valor para elegir después un umbral."
      ]
    ],
    "result": "Se visualiza un valor de luz; no controla aún luces ni movimiento.",
    "programs": [
      {
        "role": "micro:bit montada en Maqueen",
        "code": "maqueenPlusV2.I2CInit()\ninput.onButtonPressed(Button.A, function () {\n    basic.showNumber(input.lightLevel())\n})\n"
      }
    ]
  },
  "13": {
    "title": "Escucha el nivel de sonido",
    "goal": "Consultar el micrófono de la micro:bit V2.",
    "blocks": [
      [
        "Nivel de sonido",
        "Devuelve una medida del micrófono."
      ],
      [
        "Mostrar número",
        "Ayuda a decidir qué se considera una palmada."
      ]
    ],
    "result": "A muestra la lectura; falta programar las decisiones automáticas del reto.",
    "programs": [
      {
        "role": "micro:bit montada en Maqueen",
        "code": "maqueenPlusV2.I2CInit()\ninput.onButtonPressed(Button.A, function () {\n    basic.showNumber(input.soundLevel())\n})\n"
      }
    ]
  },
  "14": {
    "title": "Envía y recibe un mensaje",
    "goal": "Comprender la radio con dos micro:bit, sin movimiento del robot.",
    "blocks": [
      [
        "Radio: grupo 7",
        "Asegura que ambos equipos comparten canal."
      ],
      [
        "Enviar texto",
        "El mando manda una letra."
      ],
      [
        "Al recibir texto",
        "La segunda micro:bit muestra lo recibido."
      ]
    ],
    "result": "Al pulsar A en el mando, el robot muestra F; todavía no mueve motores.",
    "programs": [
      {
        "role": "Micro:bit del robot",
        "code": "radio.setGroup(7)\nmaqueenPlusV2.I2CInit()\nmaqueenPlusV2.controlMotorStop(maqueenPlusV2.MyEnumMotor.AllMotor)\nradio.onReceivedString(function (msg) {\n    basic.showString(msg)\n})\n"
      },
      {
        "role": "Micro:bit del mando",
        "code": "radio.setGroup(7)\ninput.onButtonPressed(Button.A, function () {\n    radio.sendString(\"F\")\n})\n"
      }
    ]
  },
  "15": {
    "title": "Cambia una señal visual",
    "goal": "Aprender a gestionar estados usando solo la pantalla.",
    "blocks": [
      [
        "Variable estado",
        "Guarda la fase del semáforo."
      ],
      [
        "Al pulsar A",
        "Avanza a la siguiente fase."
      ],
      [
        "Módulo % 3",
        "Hace que el contador vuelva al primer estado."
      ]
    ],
    "result": "La pantalla alterna 1, 2 y 0; el semáforo completo queda por programar.",
    "programs": [
      {
        "role": "micro:bit montada en Maqueen",
        "code": "let estado = 0\nmaqueenPlusV2.I2CInit()\nmaqueenPlusV2.controlMotorStop(maqueenPlusV2.MyEnumMotor.AllMotor)\ninput.onButtonPressed(Button.A, function () {\n    estado = (estado + 1) % 3\n    basic.showNumber(estado)\n})\n"
      }
    ]
  },
  "16": {
    "title": "Compara línea y distancia",
    "goal": "Observar dos datos que serán necesarios para el rescate.",
    "blocks": [
      [
        "Sensor de línea",
        "Indica si el central ve la pista."
      ],
      [
        "Ultrasonidos",
        "Da la distancia al obstáculo."
      ],
      [
        "Mostrar número",
        "Permite contrastar las dos medidas."
      ]
    ],
    "result": "Se leen sensores, pero no existe aún una estrategia de rescate.",
    "programs": [
      {
        "role": "micro:bit montada en Maqueen",
        "code": "maqueenPlusV2.I2CInit()\nmaqueenPlusV2.controlMotorStop(maqueenPlusV2.MyEnumMotor.AllMotor)\ninput.onButtonPressed(Button.A, function () {\n    basic.showNumber(maqueenPlusV2.readLineSensorState(maqueenPlusV2.MyEnumLineSensor.SensorM))\n    basic.showNumber(maqueenPlusV2.readUltrasonic(DigitalPin.P13, DigitalPin.P14))\n})\n"
      }
    ]
  }
};
