"use strict";
(() => {
  const data = {
  "01-01": {
    "explain": "Una animación son imágenes fijas mostradas una tras otra. «Para siempre» repite la secuencia y cada «pausa» controla cuánto dura un dibujo.",
    "example": "Dibujo 1 → espera 400 ms → dibujo 2 → espera 400 ms → vuelve al inicio."
  },
  "01-02": {
    "explain": "La variable «puntos» guarda el marcador aunque la pantalla cambie. El botón modifica el valor y «mostrar número» lo enseña.",
    "example": "A suma 1 · B resta 1 · la pantalla enseña el marcador actualizado."
  },
  "01-03": {
    "explain": "Un número aleatorio permite que no todas las tiradas sean iguales. El intervalo incluye sus dos extremos; por eso debe ir de 1 a 6.",
    "example": "Agitar → sortear un valor entre 1 y 6 → mostrar ese resultado."
  },
  "01-04": {
    "explain": "La brújula devuelve un ángulo entre 0° y 359°. El programa lo convierte en direcciones usando intervalos. El norte está a ambos lados de 0°.",
    "example": "0° o 350° → Norte; 90° → Este; 180° → Sur; 270° → Oeste.",
    "prep": "Solo micro:bit. Aleja la placa de imanes, altavoces y motores al calibrar.",
    "program": [
      "Calibra la brújula si MakeCode lo solicita y mantén la placa alejada de imanes.",
      "En «para siempre», guarda «rumbo de brújula (°)» en una variable.",
      "Con «si / si no», muestra N si el rumbo es ≥315° o <45°; E si está entre 45° y 134°; S si 135°–224°; O si 225°–314°.",
      "Prueba cada orientación; si lo deseas sustituye letras por flechas."
    ],
    "test": "Gira la micro:bit lentamente hacia los cuatro puntos cardinales y apunta la letra mostrada.",
    "warning": "El sector norte cruza 0°: necesita condición OR; evita objetos metálicos.",
    "levels": [
      {
        "task": "Indica N cuando el rumbo esté entre 315° y 45°",
        "success": "Acertará en tres pruebas al norte"
      },
      {
        "task": "Completa los cuatro sectores usando umbrales",
        "success": "Aparecen N, E, S y O en su orientación"
      },
      {
        "task": "Añade ocho rumbos con NE, SE, SO y NO",
        "success": "Ocho sectores aparecen sin huecos ni solapamientos"
      }
    ]
  },
  "01-05": {
    "explain": "El acelerómetro detecta cambios de movimiento. Una alarma útil debe reaccionar a sacudidas, pero no a cualquier desplazamiento suave.",
    "example": "Sacudida importante → aviso; movimiento suave → permanece en reposo."
  },
  "01-06": {
    "explain": "El tiempo de reacción empieza cuando aparece la señal, no cuando arranca el programa. Se calcula restando el instante de salida al instante de pulsación.",
    "example": "Señal visible → comienza el cronómetro → pulsas A → calcula los milisegundos."
  },
  "01-07": {
    "explain": "Cada gesto necesita un número fijo y un dibujo. El programa sortea un número y la persona interpreta piedra, papel o tijera según unas reglas comunes.",
    "example": "1 = piedra · 2 = papel · 3 = tijera; pulsas A y aparece una de las tres."
  },
  "01-08": {
    "explain": "Los ejes X e Y miden la inclinación en distintas direcciones. Antes de decidir «izquierda» o «adelante» hay que probar qué signo corresponde a cada movimiento.",
    "example": "Inclinar a la derecha → flecha derecha; dejar horizontal → icono neutro."
  },
  "01-09": {
    "explain": "La radio comunica la señal de salida entre placas. Cada jugador mide su propio tiempo y transmite solo la duración obtenida; no se comparan relojes sin sincronizar.",
    "example": "Árbitro envía «YA» → cada jugador reacciona → se comparan dos duraciones."
  },
  "02-01": {
    "explain": "Un algoritmo es una lista ordenada de instrucciones exactas. Si un paso no se puede ejecutar de manera literal, hay que dividirlo en acciones más pequeñas.",
    "example": "«Coge el pan» es verificable; «hazlo bien» no indica ninguna acción."
  },
  "02-02": {
    "explain": "Una condición hace que el programa elija entre dos caminos. La rama «si» actúa cuando se cumple, y «si no» permite definir qué sucede cuando no se cumple.",
    "example": "Si el botón está pulsado → ✓; si no lo está → ✕."
  },
  "02-03": {
    "explain": "Una variable guarda los segundos restantes. El bucle repite una misma operación: mostrar número, esperar un segundo y restar uno, hasta terminar.",
    "example": "5 → espera → 4 → espera → 3… → icono final."
  },
  "02-04": {
    "explain": "Depurar es buscar la causa de un fallo mediante pruebas. Cambiar una sola cosa entre ensayos permite saber qué corrección ha funcionado.",
    "example": "Anota el error → plantea una causa → cambia un bloque → vuelve a ejecutar."
  },
  "02-05": {
    "explain": "La variable «fase» indica cuántos botones correctos de la clave llevas. Cada pulsación válida avanza una fase; una equivocación reinicia el intento.",
    "example": "Clave A–B–A: tras A la fase es 1; tras B es 2; tras A se desbloquea."
  },
  "02-06": {
    "explain": "Una calculadora no solo cuenta pulsaciones: guarda un número, elige una operación y actualiza un resultado. Separar «operando» y «total» evita confundir introducir con calcular.",
    "example": "Elige 2 y suma → total 2; elige 1 y resta → total 1.",
    "prep": "Solo micro:bit. Anota las funciones: A elige el número (1–9); B cambia entre suma y resta; A+B realiza la operación.",
    "program": [
      "En «al iniciar», crea las variables «total» = 0, «operando» = 1 y «operación» = suma.",
      "En «al presionar botón A», aumenta «operando» hasta 9 y vuelve a 1; muestra el número elegido.",
      "En «al presionar botón B», cambia «operación» entre sumar y restar y muestra + o −.",
      "En «al presionar A+B», actualiza «total» sumando o restando el operando; muestra el resultado.",
      "Después de calcular, devuelve «operando» a 1 para preparar otra operación."
    ],
    "test": "Parte de total = 0. Elige 2, suma y comprueba que sale 2; luego elige 1, resta y comprueba que aparece 1.",
    "warning": "No confundas «operando» con «total»: uno es el número elegido y el otro acumula los resultados.",
    "levels": [
      {
        "task": "Realiza una suma y una resta con dos números elegidos.",
        "success": "Los resultados coinciden con dos operaciones hechas en papel."
      },
      {
        "task": "Permite multiplicar por un número pequeño además de sumar y restar.",
        "success": "Resuelve tres operaciones de comprobación."
      },
      {
        "task": "Crea un menú de operaciones y un borrado de resultados.",
        "success": "Cada botón tiene una función clara y el total se reinicia sin errores."
      }
    ]
  },
  "02-07": {
    "explain": "El número secreto se genera al comenzar una partida. El intento del jugador se compara con él y produce una pista: demasiado alto, demasiado bajo o correcto.",
    "example": "Secreto 6, intento 3 → «sube»; intento 8 → «baja»; intento 6 → ✓."
  },
  "02-08": {
    "explain": "Una máquina de estados solo puede estar en uno de sus estados definidos a la vez. La variable «estado» decide qué salida está activa y cuándo cambia.",
    "example": "Estado 0 = rojo; 1 = ámbar; 2 = verde; después vuelve a 0."
  },
  "02-09": {
    "explain": "Si una secuencia se repite, puedes convertirla en función y llamarla varias veces. La versión mejorada debe comportarse exactamente igual que la anterior.",
    "example": "Tres copias de «mostrar alerta» → una función «alerta» llamada tres veces."
  },
  "03-01": {
    "explain": "Primero se mide el valor de luz en dos situaciones reales. Solo después se escoge un umbral que permita distinguir suficiente luz de poca luz.",
    "example": "Luz fuerte → valor alto; sombra → menor lectura; bajo el umbral → aviso."
  },
  "03-02": {
    "explain": "El termómetro de la micro:bit mide la temperatura interna aproximada, que puede diferir de la del aire. Comparar con otro instrumento permite estimar el error.",
    "example": "Lectura micro:bit − lectura de referencia = diferencia de esa medición."
  },
  "03-03": {
    "explain": "Un sensor analógico entrega muchos valores posibles. Una condición con un umbral los convierte en dos respuestas: sí o no, encendido o apagado.",
    "example": "Valor 280 y umbral 400 → «bajo»; valor 620 → «alto»."
  },
  "03-04": {
    "explain": "No todos los sensores de humedad suben sus números cuando hay más agua. Hay que medir muestras seca y húmeda para saber qué significa el valor en tu módulo.",
    "example": "Si seco da 700 y húmedo 350, el aviso de sequedad usa la comparación adecuada."
  },
  "03-05": {
    "explain": "El micrófono mide un nivel de sonido aproximado, no reconoce palabras. Comparar ambiente silencioso y sonidos moderados ayuda a decidir un umbral razonable.",
    "example": "En calma el valor es bajo; tras una palmada aparece un pico registrado."
  },
  "03-06": {
    "explain": "Temperatura y presión son magnitudes diferentes. La micro:bit puede mostrar temperatura interna; medir presión requiere un sensor compatible y su programación específica.",
    "example": "Muestra °C desde micro:bit y presión real del módulo, cada una con unidad."
  },
  "03-07": {
    "explain": "El sensor ultrasónico calcula distancia a partir del tiempo que tarda el eco en regresar. El programa compara los centímetros con un límite para decidir el aviso.",
    "example": "40 cm → distancia segura; 10 cm → señal de proximidad."
  },
  "03-08": {
    "explain": "Un sensor de color puede dar canales de color o códigos de clasificación. Antes de programar hay que conocer su interfaz y observar lecturas reales bajo la misma luz.",
    "example": "Tres objetos rojos producen lecturas semejantes → se define criterio para rojo."
  },
  "03-09": {
    "explain": "Para poder comparar resultados solo debes cambiar una condición cada vez. Registrar unidades y repetir las medidas permite distinguir un patrón de una casualidad.",
    "example": "Cinco medidas con luz y cinco en sombra → medias → gráfico con ejes."
  },
  "04-01": {
    "explain": "La matriz LED puede mostrar texto que se desplaza e iconos fijos. El orden de los bloques determina qué ve primero la persona que utiliza la placa.",
    "example": "Al encender: aparece «HOLA» y después un corazón."
  },
  "04-02": {
    "explain": "En código Morse la información está en la duración: un punto es corto y una raya dura más. Las pausas separan señales y letras.",
    "example": "SOS se comunica con tres puntos, tres rayas y tres puntos."
  },
  "04-03": {
    "explain": "Una melodía se crea eligiendo alturas y duraciones de notas. Puedes asociar una secuencia diferente a cada botón para comparar resultados.",
    "example": "Botón A → tres notas ascendentes; botón B → tres notas descendentes."
  },
  "04-04": {
    "explain": "Un semáforo es una secuencia de estados mutuamente excluyentes. Cada cambio debe respetar el orden y un tiempo mínimo para evitar señales contradictorias.",
    "example": "Verde → ámbar → rojo; nunca verdes incompatibles a la vez."
  },
  "04-05": {
    "explain": "PWM enciende y apaga una salida rápidamente. Cambiar el porcentaje de tiempo encendida modifica el brillo percibido, sin necesidad de variar un potenciómetro.",
    "example": "Valores PWM progresivos → LED aumenta de brillo → desciende suavemente."
  },
  "04-06": {
    "explain": "El RGB combina cantidades de rojo, verde y azul. Cada canal se controla por separado según el tipo de módulo, y de su mezcla salen otros colores.",
    "example": "Rojo + verde → amarillo; sin canales activos → apagado."
  },
  "04-07": {
    "explain": "El juego guarda una secuencia de señales. El jugador debe reproducirla en el mismo orden; cada entrada se compara con el elemento correspondiente.",
    "example": "Se muestra A–B; introduces A–B → acierto; B–A → error."
  },
  "04-08": {
    "explain": "Un aviso accesible ofrece información por más de un canal. Una luz puede ayudar a quien no escucha el sonido, y un tono a quien no ve la pantalla.",
    "example": "Pulsa A → luz y sonido; pulsa B → ambos se detienen."
  },
  "04-09": {
    "explain": "Una obra interactiva cambia cuando el visitante hace algo. El sensor o botón es la entrada; luces, texto o sonido forman la respuesta artística.",
    "example": "Al acercar luz aparece un dibujo; al cubrirla, cambia la animación."
  },
  "05-01": {
    "explain": "El robot tiene motores que necesitan orden de velocidad y sentido. La inicialización prepara la comunicación y una parada explícita evita que siga avanzando.",
    "example": "Pulsar A → avanzar despacio un momento → detenerse ante la marca."
  },
  "05-02": {
    "explain": "Si las ruedas giran a velocidades distintas el robot describe una curva. Invertir qué motor gira más rápido cambia el sentido del giro.",
    "example": "Izquierdo lento y derecho rápido → gira; intercambias velocidades → gira al otro lado."
  },
  "05-03": {
    "explain": "Los faros y el sonido pueden indicar una acción antes de que empiece el movimiento. Ordenar las salidas ayuda a que el robot sea más predecible.",
    "example": "Primero se iluminan faros y suena el aviso; después avanza y se detiene."
  },
  "05-04": {
    "explain": "El robot necesita medir la distancia en cada vuelta del bucle. Si la lectura es peligrosa, la orden de parada debe tener prioridad sobre la de avanzar.",
    "example": "Distancia válida mayor a 20 cm → avanza; menor a 20 cm → se detiene.",
    "prep": "Maqueen Plus V2 con ultrasónico conectado al conector del propio robot y obstáculos blandos.",
    "program": [
      "Instala la extensión Maqueen Plus V2 e inserta «inicializar el Maqueen» dentro de «al iniciar».",
      "Con el robot parado, comprueba qué bloque permite medir centímetros con el sensor ultrasónico conectado al robot.",
      "Dentro de «para siempre», compara la distancia medida con un límite de seguridad de 20 cm.",
      "Si la distancia es válida y mayor que el límite, avanza despacio; si no, detén los motores.",
      "Prueba primero con las ruedas elevadas y después con un obstáculo blando en el suelo."
    ],
    "test": "Acerca cartón a 40, 25 y 15 cm; el robot nunca debe tocarlo.",
    "warning": "Si el sensor devuelve 0 o valor inválido, trata la medida como fallo seguro, no como permiso de avanzar.",
    "levels": [
      {
        "task": "Se detiene antes de 20 cm",
        "success": "Tres aproximaciones sin contacto"
      },
      {
        "task": "Activa aviso entre 20 y 35 cm",
        "success": "Aviso previo y parada final ocurren en orden"
      },
      {
        "task": "Compara dos velocidades y distancias de frenado",
        "success": "Tabla de seis medidas sin colisiones"
      }
    ]
  },
  "05-05": {
    "explain": "Los sensores bajo el Maqueen distinguen línea y fondo. El robot corrige con sus motores según el sensor que ve la línea, en vez de avanzar siempre recto.",
    "example": "Línea desplazada a la izquierda → giro corrector a la izquierda."
  },
  "05-06": {
    "explain": "Para seguir curvas difíciles no basta con velocidad alta. Conviene reducirla al corregir y recordar dónde estaba la línea si se pierde momentáneamente.",
    "example": "Sensor central → recto; sensor lateral → corrige; sin lectura → busca despacio."
  },
  "05-07": {
    "explain": "El nivel de luz permite activar una conducta, pero no indica automáticamente de qué lado viene una linterna. Con un único sensor se puede acercar y detener; orientar requiere otras medidas.",
    "example": "Con luz suficiente avanza; al bajar el nivel por debajo del umbral se detiene.",
    "prep": "Maqueen Plus V2 y linterna de baja intensidad; micro:bit orientada con su pantalla hacia arriba.",
    "program": [
      "Lee el nivel de luz de la micro:bit con el robot quieto y anota la lectura en luz y sombra.",
      "Fija un umbral intermedio entre ambas medidas y crea un «si / si no» dentro de «para siempre».",
      "Si el nivel es suficiente, ordena avanzar despacio; si es inferior, detén el Maqueen.",
      "Haz la primera prueba con las ruedas elevadas y luego sobre el suelo, sin dirigir luz intensa a los ojos."
    ],
    "test": "El robot arranca al iluminar y se para al cubrir la luz sin tocar sensores.",
    "warning": "Sin dos fotodetectores separados no puede localizar dirección de la luz; esto es reacción, no búsqueda direccional.",
    "levels": [
      {
        "task": "Responde a luz/sombra de forma fiable",
        "success": "Cinco cambios correctos"
      },
      {
        "task": "Crea dos velocidades con dos umbrales",
        "success": "Se distinguen dos velocidades"
      },
      {
        "task": "Haz un recorrido de luz por tres estaciones",
        "success": "Llega a cada estación y para sin choque"
      }
    ]
  },
  "05-08": {
    "explain": "La radio separa el mando del robot. La emisora envía una orden y la micro:bit del Maqueen la interpreta; conviene añadir parada ante pérdida de señal.",
    "example": "A envía «F» → avanza; B envía «S» → para; sin mensajes → parada de seguridad."
  },
  "05-09": {
    "explain": "En un laberinto no sirve girar al azar sin comprobar. El robot explora con pequeños movimientos, mide de nuevo y decide si el camino está libre.",
    "example": "Pared delante → frena, gira y mide otra vez antes de avanzar."
  },
  "06-01": {
    "explain": "S es la señal de control o lectura; V alimenta el módulo; G es la referencia común. La micro:bit se inserta en la Shield, sin cablearla por fuera.",
    "example": "S → pin elegido, V → voltaje compatible, G → masa; siempre con equipo apagado."
  },
  "06-02": {
    "explain": "Un pulsador es una entrada y un LED es una salida. El programa lee el estado del primero y decide el nivel que debe enviar al segundo.",
    "example": "Pulsador activo → LED encendido; liberado → LED apagado."
  },
  "06-03": {
    "explain": "Un servo de posición recibe una consigna de ángulo. Para alcanzar el giro previsto necesita alimentación apta, referencia común y ausencia de obstáculos mecánicos.",
    "example": "Orden 0° → brazo a un extremo; 90° → centro; 180° → otro extremo."
  },
  "06-04": {
    "explain": "La barrera transforma una orden en movimiento de un servo. Es importante definir posición cerrada, posición abierta y tiempo de espera sin bloquear el mecanismo.",
    "example": "Pulsador → subir barrera → esperar → bajar cuando el paso esté libre."
  },
  "06-05": {
    "explain": "Un servo continuo no se sitúa en ángulos concretos: una señal neutra lo detiene, y señales a ambos lados cambian dirección y velocidad.",
    "example": "Valor próximo a 90 → parado; valores inferiores y superiores → giros opuestos."
  },
  "06-06": {
    "explain": "La micro:bit no debe alimentar un motor directamente. Un puente H usa energía externa y cambia la polaridad de las salidas; un PWM regula la velocidad.",
    "example": "IN1/IN2 determinan sentido y ENA controla velocidad, con fuente externa de motor."
  },
  "06-07": {
    "explain": "La pantalla externa usa su propia comunicación, a menudo I²C. No basta con escribir en la matriz LED: se necesita la dirección, alimentación y extensión del modelo real.",
    "example": "La palabra «Hola» debe aparecer en la LCD/OLED conectada, no solo en micro:bit."
  },
  "06-08": {
    "explain": "El relé es un interruptor accionado eléctricamente: la micro:bit controla su entrada, mientras la bomba utiliza alimentación independiente y cableado protegido.",
    "example": "Orden breve al relé → bomba encendida durante un segundo → apagada.",
    "prep": "Relé TA647, minibomba de agua y fuente de 3–5 V apta; Shield solo manda señal, con montaje supervisado.",
    "program": [
      "Con el sistema apagado, verifica las características del relé (alimentación y nivel de disparo a 3,3 V).",
      "Primero prueba la orden de control usando un LED de estado o el indicador del relé, sin conectar la bomba.",
      "Con supervisión, conecta bomba y fuente adecuada a través de los contactos de potencia; jamás directamente a un pin de la micro:bit.",
      "Al pulsar A, envía la señal de activación comprobada durante un segundo y después la de desactivación.",
      "Incluye una parada por botón B y verifica que el sistema queda apagado al iniciar."
    ],
    "test": "En recipiente estanco, la bomba se activa 1 s y queda desconectada el resto del tiempo.",
    "warning": "Un relé puede activarse con nivel BAJO (0) o ALTO (1) y puede no ser compatible con 3,3 V. Comprueba el módulo real y usa alimentación externa para la bomba.",
    "levels": [
      {
        "task": "Acciona bomba un segundo y se detiene",
        "success": "Tres pulsos sin fuga ni calentamiento"
      },
      {
        "task": "Añade bloqueo entre pulsos de 5 s",
        "success": "No permite activaciones seguidas"
      },
      {
        "task": "Añade nivel bajo de agua o emergencia y corte seguro",
        "success": "Corta alimentación en cada ensayo de fallo"
      }
    ]
  },
  "06-09": {
    "explain": "El riego automático combina medida, decisión y acción. Primero calibra el sensor; después activa pulsos cortos, con descansos y apagado seguro, si se detecta sequedad.",
    "example": "Suelo seco → pulso breve de riego; suelo húmedo → bomba parada.",
    "prep": "Sensor de humedad, relé, bomba y fuente separada, Shield, tierra y recipiente impermeable.",
    "program": [
      "Calibra y apunta lecturas de suelo seco y húmedo del sensor de humedad antes de elegir un umbral.",
      "Comprueba el relé y la bomba por separado con alimentación externa y supervisión.",
      "Lee la humedad en P0; si el suelo está seco activa un pulso de riego breve según el nivel real de disparo del relé.",
      "Desactiva la bomba tras el pulso, espera un intervalo antes de volver a medir y añade una parada manual.",
      "Prueba con tierra seca y húmeda sin permitir riego continuo."
    ],
    "test": "Realiza tres ciclos con tierra seca y tres con húmeda; nunca mantiene bomba encendida continuamente.",
    "warning": "La bomba necesita alimentación y control adecuados, no se alimenta desde S de Shield.",
    "levels": [
      {
        "task": "Da aviso de sequedad sin activar bomba",
        "success": "Acierta cuatro de cinco mediciones"
      },
      {
        "task": "Riega un pulso solo en seco",
        "success": "Tres ciclos y corte posterior"
      },
      {
        "task": "Añade límite de riegos y alarma de depósito vacío",
        "success": "No hay riego cuando el límite se supera"
      }
    ]
  },
  "07-01": {
    "explain": "Para recibir mensajes, ambas micro:bit deben tener la radio activada y estar en el mismo grupo. El evento de recepción se ejecuta al llegar un paquete.",
    "example": "Emisor pulsa A → transmite «HOLA» → receptor lo muestra."
  },
  "07-02": {
    "explain": "Un protocolo es un acuerdo sobre el significado de cada mensaje. Si ambos equipos usan la misma tabla de códigos, pueden transmitir instrucciones con números.",
    "example": "Código 1 = ayuda, 2 = listo, 3 = alto; receptor muestra la acción correspondiente."
  },
  "07-03": {
    "explain": "Cada voto debe contarse una sola vez. La estación central suma las respuestas recibidas y muestra totales; sin control de duplicados la encuesta puede falsearse.",
    "example": "Dos votos A y uno B → resultado A:2, B:1.",
    "program": [
      "En todas las micro:bit, configura el mismo grupo de radio y acuerda una sola pregunta con respuestas A y B.",
      "En cada placa votante, «al presionar A» envía el número 1 y «al presionar B» envía el 2; bloquea una segunda votación en la misma ronda.",
      "En la placa receptora, inicia «votosA» y «votosB» en cero; en «al recibir número» incrementa solo el contador correspondiente.",
      "Pulsa B en la receptora para mostrar ambos contadores y comprobar que suman el número de participantes."
    ]
  },
  "07-04": {
    "explain": "El robot ejecuta las órdenes enviadas por radio. Un temporizador comprueba cuánto tiempo lleva sin recibir mensajes y detiene los motores por seguridad.",
    "example": "Mando envía F → avance; mando desconectado más de 2 s → parada."
  },
  "07-05": {
    "explain": "Cada estación debe enviar tanto la medida como su identificador. Así la central sabe de qué zona procede cada dato y no mezcla lecturas.",
    "example": "Estación A envía 24 °C y B envía 27 °C; central guarda ambos valores.",
    "program": [
      "Configura el mismo grupo de radio en las tres micro:bit y asigna una etiqueta diferente a cada estación: A, B o C.",
      "En cada estación, mide «temperatura (°C)» y envía el dato con su nombre mediante «radio enviar valor (nombre, valor)».",
      "En la central, utiliza «al recibir nombre/valor» y guarda la lectura en la variable de la estación indicada.",
      "Con los botones de la central, muestra por separado la última temperatura de A, B y C y anota cuándo se recibió."
    ]
  },
  "07-06": {
    "explain": "Un checksum es un número calculado a partir del dato enviado. El receptor vuelve a calcularlo y rechaza paquetes que no coinciden, aunque no detecta todos los errores.",
    "example": "Dato 5 → checksum 8; si llega 5 con checksum 2, se rechaza.",
    "prep": "Dos micro:bit; define un paquete sencillo: dato 0–9 y dígito de control.",
    "program": [
      "Define el paquete «dato» (un número de 0 a 9) y su control: «checksum = (dato + 3) módulo 10».",
      "En el emisor, calcula el checksum y envía tanto el dato como el control; acuerda cómo separarlos.",
      "En el receptor, separa ambos números y vuelve a calcular el checksum a partir del dato recibido.",
      "Si coinciden, muestra ✓; si no, muestra ✕ y rechaza ese mensaje.",
      "Prueba varios valores, incluido 9, para comprobar la operación módulo 10."
    ],
    "test": "Simula tres mensajes correctos y tres incorrectos; el receptor distingue ambos casos.",
    "warning": "Checksum simple detecta algunos errores, no protege de manipulación intencionada ni todos los fallos.",
    "levels": [
      {
        "task": "Valida una pareja dato/checksum",
        "success": "Tres parejas válidas pasan"
      },
      {
        "task": "Descarta tres parejas manipuladas",
        "success": "Los tres fallos se detectan"
      },
      {
        "task": "Añade contador de paquetes aceptados/rechazados",
        "success": "Se comprueba con seis ensayos"
      }
    ]
  },
  "07-07": {
    "explain": "La misma señal de radio puede iniciar dos robots, pero no asegura sincronía perfecta. Por eso se comprueban tiempo de salida y distancia de parada.",
    "example": "Ambos esperan detenidos → reciben «SALIDA» → avanzan y se paran tras el tiempo fijado."
  },
  "07-08": {
    "explain": "Cada detector pertenece a una zona identificada. Cuando se activa, envía su código a la central, que debe mostrar cuál de las zonas originó el aviso.",
    "example": "Se abre zona 2 → la central muestra «Z2»; al revisar se reinicia el aviso."
  },
  "07-09": {
    "explain": "Una red de nodos permite recoger información de distintos lugares. El identificador, la medida y la hora ayudan a reconocer cuál es el valor más reciente.",
    "example": "Nodos A, B y C envían medidas; una central permite consultarlas por separado."
  },
  "08-01": {
    "explain": "Un temporizador educativo necesita inicio, cuenta atrás y final; si se permite pausa, no puede depender de un único bucle largo que bloquee los botones.",
    "example": "Pulsa A → cuenta 30 s; B → pausa/reinicio según las reglas que hayas definido."
  },
  "08-02": {
    "explain": "La micro:bit puede seleccionar un número al azar, pero la pregunta y su respuesta siguen en una tarjeta o fichero preparado por el equipo.",
    "example": "Agitar → pregunta 4; el compañero lee la tarjeta 4 y registra el acierto."
  },
  "08-03": {
    "explain": "El acelerómetro mide aceleración, no directamente fuerza de impacto. Comparar prototipos exige repetir la misma prueba con condiciones similares y sin dañar la placa.",
    "example": "Diseño A y B se someten a tres movimientos iguales; se comparan los picos medidos."
  },
  "08-04": {
    "explain": "Un invernadero puede medir humedad y luz por separado. La primera versión debe avisar; añadir una bomba requiere alimentación y conmutación seguras supervisadas.",
    "example": "Tierra seca + sombra → dos avisos; cada uno responde a su propio sensor."
  },
  "08-05": {
    "explain": "Un escape room digital es una secuencia de pruebas. Una variable guarda la fase actual y solo permite pasar a la siguiente cuando la respuesta es correcta.",
    "example": "Resuelves prueba 1 → pista 2; fallas → sigues en la fase 1."
  },
  "08-06": {
    "explain": "Una ciudad inteligente integra varios sistemas, cada uno con su entrada, decisión y salida. Hay que comprobar las interacciones para que no den órdenes contradictorias.",
    "example": "Poca luz → farola encendida; petición peatonal → secuencia segura del cruce."
  },
  "08-07": {
    "explain": "Una comparación justa utiliza la misma distancia y condiciones de prueba. El tiempo se puede medir; el consumo eléctrico solo puede afirmarse si dispones de un instrumento adecuado.",
    "example": "Tres modos de conducción, mismo tramo: tabla de tiempos y, si hay medidor, energía."
  },
  "08-08": {
    "explain": "Un robot repartidor combina estabilidad de la carga, movimiento y parada. Es mejor ensayar el trayecto sin carga y añadirla cuando el control sea fiable.",
    "example": "Salida A → recogida en B → parada en C sin perder el objeto."
  },
  "08-09": {
    "explain": "Un proyecto STEAM demuestra que resuelve una necesidad mediante un prototipo probado. La explicación debe mostrar decisiones, datos y mejoras, no solo el aspecto final.",
    "example": "Problema → propuesta → prototipo → tres ensayos → mejora justificada."
  }
};
  const guides = window.ROBO_MISION_GUIAS_V28 || {};
  for (const [id, patch] of Object.entries(data)) {
    if (!guides[id]) continue;
    Object.assign(guides[id], patch);
  }
  // Preguntas vinculadas a la misión real, sin copiar el mismo test genérico en las 72.
  const all = window.BITABIT_DATA?.missions || [];
  const byRoute = Object.groupBy
    ? Object.groupBy(all, m => m.route)
    : all.reduce((acc, m) => ((acc[m.route] ||= []).push(m), acc), {});
  all.forEach((m, globalIndex) => {
    const guide = guides[m.id];
    const routeMissions = byRoute[m.route] || [];
    const idx = routeMissions.findIndex(x => x.id === m.id);
    if (!guide || idx < 0 || routeMissions.length < 7) return;
    function choices(key, offset1, offset2, shift) {
      const correct = guide[key];
      const wrong1 = guides[routeMissions[(idx+offset1)%routeMissions.length].id][key];
      const wrong2 = guides[routeMissions[(idx+offset2)%routeMissions.length].id][key];
      const options=[wrong1, wrong2];
      const answer=shift%3;
      options.splice(answer,0,correct);
      return {options,answer};
    }
    const c1 = choices('example', 3, 6, globalIndex);
    const c2 = choices('warning', 2, 5, globalIndex+1);
    m.question = [
      '¿Cuál es la secuencia correcta en «'+m.title+'»?',
      '¿Qué funcionamiento corresponde a «'+m.title+'»?',
      '¿Cuál de estos ejemplos describe tu misión?'
    ][globalIndex%3];
    m.options = c1.options;
    m.correct = c1.answer;
    m.question2 = '¿Qué error o precaución debes revisar específicamente en este trabajo?';
    m.options2 = c2.options;
    m.correct2 = c2.answer;
  });
})();
