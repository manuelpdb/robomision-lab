'use strict';
/* V35 · Planes específicos de enseñanza, programación y verificación para los 26 componentes. */
(()=>{
const catalog=window.ROBO_TA647||[], guides=window.ROBO_TA647_GUIAS||{};
/* Cada actividad: procedimiento físico/intelectual | programa o algoritmo | ensayo objetivo. */
const P={
shield:[
 ['Localiza el zócalo y señala la orientación correcta antes de insertar la micro:bit apagada','No necesitas descargar código: dibuja el zócalo y rotula el borde de la micro:bit','Otro equipo inserta la placa sin forzar el conector siguiendo tu croquis'],
 ['Busca los puertos P0, P1 y P2 y apunta para cada uno las etiquetas S, V y G','Dibuja una tabla de 3 filas con señal, alimentación y masa; no programes salidas','Identifica S/V/G en los tres puertos sin mirar tus apuntes'],
 ['Elige el módulo de luz, identifica sus patillas reales y dibuja S→P1, V→3,3 V compatible y G→GND','Selecciona «leer pin analógico P1» y explica qué valor obtendría','El docente aprueba tres cables, polaridad y tensión antes de permitir conectar'],
 ['Intercambia con otro equipo un esquema sin etiquetas explicativas','Describe en voz alta el recorrido de S, V y G y marca el pin exacto de lectura','El autor del esquema confirma que has interpretado las tres conexiones correctamente'],
 ['Analiza en PAPEL un esquema con S y V intercambiados o masa sin conectar; nunca lo montes','Marca con rojo los errores y dibuja la alternativa segura','Localizas dos fallos y explicas qué podría dañarse o por qué no funciona'],
 ['Prepara un cartel con cinco normas sobre tensión, desconexión y polaridad','Ilustra una conexión correcta y una incorrecta, sin energizar ninguna incorrecta','Un grupo externo identifica las cinco normas y detecta el error del dibujo']
],
oled:[
 ['Lee la serigrafía de GND/VCC/SCL/SDA e identifica referencia de la pantalla','Programa un saludo en la matriz LED integrada; aún NO escribe en la OLED','Enseñas el saludo y distingues con claridad matriz LED de pantalla OLED'],
 ['Mide temperatura con la propia micro:bit y dibuja la pantalla que la mostraría','Usa temperatura → variable → mostrar número; para OLED real hace falta extensión compatible','Registra tres temperaturas y explica dónde se muestran realmente'],
 ['Diseña dos vistas alternas: temperatura y nivel de luz','Utiliza variables y pausas de 2 s sobre la matriz LED como simulación','Se alternan las dos medidas y justificas qué cambiarías para la OLED'],
 ['Dibuja el aspecto de INICIO y LISTO y un botón que cambia de pantalla','Usa evento de botón A para alternar una variable de estado','Realiza tres pulsaciones y muestra los dos estados sin confundir las pantallas'],
 ['Define temperatura y luz, con etiquetas y unidades','Actualiza ambas variables cada 2 s y prepara la secuencia para una biblioteca OLED','Tu algoritmo incluye dos variables, frecuencia de actualización y unidad'],
 ['Identifica chip y dirección I²C; verifica tensión del OLED y posibles resistencias pull-up','Solo tras confirmar compatibilidad instala extensión específica y manda un texto al OLED','Texto visible realmente en la OLED; si no hay biblioteca, entrega esquema y simulación']
],
rele:[
 ['Con el relé SIN CARGA localiza IN, VCC, GND, COM, NO y NC','Configura P1 en reposo y activa 0,5 s con A según su lógica comprobada','Tres ciclos controlados sin dejar el relé permanentemente activo'],
 ['Parte del mismo relé compatible, aún con COM y NO sin carga','Al pulsar A envía P1 activo 0,5 s y luego 1,5 s, siempre con parada','Mides dos tiempos distintos y estado de reposo al final'],
 ['Añade sensor de luz con señal en P2 y deja el relé sin carga','Leer P2 → comparar con umbral medido → conmutar P1; verifica activo alto/bajo','Activa solo en el estado de iluminación programado en 3 de 3 pruebas'],
 ['Mide por separado si IN necesita 0 o 1 para conmutar, bajo supervisión','Escribe tabla de verdad de alto/bajo y estado del contacto NO','Enseñas la tabla y adaptas las constantes activo/reposo al relé real'],
 ['Ensaya tres pulsaciones de B con un intervalo de seguridad','Programa un bloqueo temporal antes de permitir otro pulso P1','No admite pulsaciones repetidas durante el bloqueo y siempre vuelve al reposo'],
 ['Prepara un paro lógico y señala el corte de alimentación físico','Pulsación de B solicita salida en reposo; A solo actúa sin bloqueo','La salida vuelve a reposo y explicas por qué B no sustituye una desconexión física']
],
joystick:[
 ['Localiza VRx, VRy y SW; lee reposo de ambos ejes sin mover la palanca','Leer analógico P0 y P1 alternativamente; SW en P2 si está conectado','Anota tres lecturas del centro y reconoce sus pequeñas variaciones'],
 ['Empuja una vez arriba, abajo, izquierda y derecha, anotando rangos','Si VRx está a un lado del umbral, muestra flecha; usa zona muerta central','No cambia de dirección mientras el joystick queda centrado'],
 ['Prepara una segunda micro:bit montada en Maqueen y deja el joystick en la emisora','Radio mismo grupo; envía letras I/D/S y receptor convierte mensajes en motores','Recibe izquierda, derecha y parada, con la pista despejada'],
 ['Registra X/Y en centro y cuatro extremos, con tres lecturas por posición','Mostrar número del eje elegido y anotar el valor, sin suponer centro exactamente 512','Tabla con cinco posiciones, mínimo, máximo y centro medidos'],
 ['Compara una palanca centrada con una ligeramente desplazada','Usa dos umbrales y exige regresar al centro antes de otro cambio','Diez movimientos intencionados cambian de opción sin saltos en reposo'],
 ['Prepara un mando con joystick, transmisor y Maqueen receptor','Radio con grupo compartido, temporizador y comando de parada al soltar','Robot se detiene al soltar palanca y por pérdida de mensajes si implementas tiempo límite']
],
l298n:[
 ['Confirma que el driver tiene alimentación de lógica válida y VM compatible; conecta un único motor a OUT1/OUT2','IN1=P1, IN2=P2, ENA=P0; en A ordena 1/0 y activa brevemente ENA','El motor gira a velocidad baja y se detiene en 3 ensayos'],
 ['Detén completamente antes de cambiar IN1=1/IN2=0 por IN1=0/IN2=1','Usa dos botones con parada intermedia de 300 ms','Se observan dos sentidos sin invertir bruscamente ni mover cables'],
 ['Diseña segundo canal OUT3/OUT4 para un motor EXTRA, sin afirmar que el kit trae dos','Dibuja ENB/IN3/IN4 y una rutina de paro independiente de cada canal','Entrega tabla y croquis; ejecución real solo si tienes segundo motor y fuente adecuada'],
 ['Anota los cuatro estados de las parejas IN1/IN2','Compara 1/0, 0/1, 0/0 y 1/1 con ENA activo controlado','Tabla explica giro, giro contrario y estados de reposo/frenado observables'],
 ['Quita puente ENA si el módulo lo permite y hay control PWM compatible','Prueba dos valores de analogWrite P0 (por ejemplo 350 y 750 sobre 1023)','Tres ensayos por valor muestran un cambio de régimen si el motor llega a arrancar'],
 ['Prepara una secuencia segura que incluya parada antes de invertir','P1=1 P2=0, pausa, ENA=0, espera, P1=0 P2=1, pulsa de nuevo','Tres ciclos sin inversión brusca, con el motor fijado y sin carga']
],
ultrason:[
 ['Fija el sensor y coloca un obstáculo plano a 10, 20 y 40 cm','Enviar pulso TRIG en P0 y leer ECHO en P1 mediante conversión de nivel','Tres distancias aproximadas registradas con error calculado'],
 ['Sitúa dos umbrales medidos para LEDs rojo P2 y verde P8','Si distancia pequeña, rojo; si grande, verde; comprueba zona intermedia','Tres zonas muestran estados diferenciados, sin usar ECHO directo de 5 V'],
 ['Conecta zumbador en P2 y mide cinco lecturas consecutivas','Promedio de distancia y dos umbrales distintos para activar/desactivar aviso','No produce alarma errática cerca del límite en 5 ensayos'],
 ['Marca con regla las tres distancias de prueba y mantén objeto perpendicular','Calcula error = lectura - referencia para 10, 20 y 40 cm','Presenta tabla de 3 errores y compara cuál es mayor'],
 ['Comprueba la ausencia de eco y superficies absorbentes','Descarta cero/lectura fuera de rango antes de evaluar la alarma','Sin eco el programa no activa una alerta falsa en 3 intentos'],
 ['Conserva cinco lecturas y compara con la lectura única','Suma cinco medidas válidas y divide entre 5','Explicas si la media fue más estable que una lectura aislada']
],
zumbador:[
 ['Reconoce las patillas S/V/G y prueba un tono moderado con el módulo en P1','Configura música para salir por P1, no solo por altavoz de micro:bit','El tono se oye en el módulo externo tres veces'],
 ['Escoge tres frecuencias separadas y apunta el orden','Reproduce 262, 392 y 523 Hz en secuencia con pausas','Una pareja distingue los tres sonidos sin mirar el programa'],
 ['Diseña una alarma de tres tonos y un botón de silencio','Variable alarma; B la desactiva y evita repetir la secuencia','La alarma se apaga al pulsar B en 3 ensayos'],
 ['Asigna un tono breve diferente a rojo, amarillo y verde','Usa una variable estado que elige frecuencia','Tres estados producen tres tonos reconocibles'],
 ['Mantén el programa sensible a botones mientras emite avisos','Usa notas cortas y vuelve a consultar eventos o estado','B responde durante o entre señales en 3 pruebas'],
 ['Muestra icono y genera aviso sonoro a la vez','Reproduce señal breve e icono al activar, y silencio cuando corresponde','Cinco pruebas identifican la alerta sin volumen molesto']
],
sonido:[
 ['Identifica si el módulo tiene DO digital o AO analógico; ajusta potenciómetro','Si solo existe DO, leer pin digital P1; no inventar lectura analógica','Registra reposo y tres palmadas con 0/1 o valores AO reales'],
 ['Añade LED rojo en P2 con S/V/G compatibles','Si DO cambia al detectar sonido, escribir P2=1 y apagar en reposo','El LED responde a 4 de 5 palmadas sin confundir DO con amplitud'],
 ['Genera diez sonidos separados y detecta flancos','Cuenta transición reposo→detección con mínimo 300 ms entre cuentas','La cuenta final corresponde aproximadamente a diez sonidos'],
 ['Prueba cinco situaciones de ruido y dos ajustes del potenciómetro','Guarda cantidad de detecciones, no valores de amplitud si solo hay DO','Tabla identifica el ajuste que menos falsos positivos produce'],
 ['Mantén un sonido o una entrada activa durante un segundo','Solo suma al cambiar de reposo a activado, no cada vuelta de para siempre','Una detección continua suma una sola vez'],
 ['Realiza dos periodos de 30 s con potenciómetro en posiciones distintas','Inicia contador, recoge eventos y detén tras 30 s','Explica qué ajuste detecta mejor sin multiplicar los falsos positivos']
],
rgb:[
 ['Fotografía y rotula los pines del módulo RGB exacto antes de elegir programa','No usar tres salidas PWM si el módulo solo presenta S/V/G','Entregas identificación de modelo y un esquema compatible verificado'],
 ['Elige rojo, verde, azul y blanco como referencias','Solo si existen R/G/B independientes, programa tres PWM; si hay señal única, busca driver compatible','Muestras qué salidas exige TU módulo; no conectas R/G/B inventados'],
 ['Relaciona cuatro estados con colores en una tabla','Usa una variable estado y asigna un color a cada valor con biblioteca compatible','La tabla define cuatro entradas y cuatro salidas sin ambigüedad'],
 ['Comprueba si el módulo es LED RGB analógico o direccionable','Consulta manual y anota alimentación, pines y biblioteca','No se conecta hasta verificar tensión y función de la señal'],
 ['Diseña una transición entre dos colores en papel o simulador','Incrementa gradualmente los canales autorizados sin superar rangos','Secuencia de cinco estados y razonamiento de cómo se programaría'],
 ['Combina color y botón si hay controlador compatible','Evento A avanza el color; estado guardado en variable','Tres pulsaciones cambian entre colores previstos']
],
rojo:[
 ['Identifica S/V/G y comprueba la resistencia integrada antes de activar','Escribe P1=1 o 0 según la lógica real del módulo','El LED se enciende y apaga de forma controlada 3 veces'],
 ['Ensaya tres duraciones de encendido separadas por apagado','Secuencia: encender, pausa, apagar; cambia solo la pausa','Tabla compara los tres tiempos en 3 ensayos'],
 ['Genera secuencia SOS simplificada con pulsos cortos/largos','Define funciones pulso_corto y pulso_largo','La secuencia se repite idéntica dos veces'],
 ['Prepara gráfico de estado con dos pausas distintas','Cuenta ciclos por segundo con pulsos medidos','Presenta dos frecuencias de parpadeo reconocibles'],
 ['Conecta botón azul en P2 y LED rojo en P1','Leer botón con su lógica real; encender LED solo pulsado','LED sigue las cinco pulsaciones sin atascarse'],
 ['Añade zumbador por otro puerto libre y respeta masa/alimentación','Al entrar alarma activa LED y tono corto, al salir apaga ambos','Aviso doble visual/acústico y parada clara']
],
verde:[
 ['Comprueba módulo con resistencia y un pulso de encendido','Controla salida P1 activa/inactiva, sin LED suelto directo','Tres encendidos y apagados seguros'],
 ['Construye una señal de éxito con tres destellos','Repetir 3 veces LED activo 200 ms / inactivo 200 ms','El patrón termina apagado en cada ensayo'],
 ['Añade LED rojo con señal distinta P2','Si condición se cumple, verde, si no rojo; evita encender ambos en ese estado','Cinco condiciones producen un único color activo'],
 ['Programa variación de ritmo con pausas diferentes','Emite patrones lentos y rápidos desde eventos A y B','Describe qué diferencia aprecia un compañero'],
 ['Calibra orden de encendido de dos LEDs','Usa variable estado para alternar salidas, no solapar señales','El estado queda inequívoco en 3 ciclos'],
 ['Diseña código de estados con verde y rojo','Verde correcto, rojo error, ambos apagados reposo','Otro grupo identifica estados sin explicación oral']
],
azul:[
 ['Prueba el módulo LED azul con la Shield apagada al montar','P1 activo, pausa, apagado; comprueba resistencia integrada','Tres ciclos iluminan el azul sin quedarse encendido'],
 ['Crea un parpadeo con pausa de 0,5 s','Para siempre encender, pausar y apagar con duración simétrica','Cinco ciclos seguidos con ritmo constante'],
 ['Muestra dos patrones de luz diferentes por botón A/B','A ejecuta pulsos cortos y B largos','El compañero reconoce el patrón sin mirar la micro:bit'],
 ['Cuenta cuatro destellos y detén la salida','Repetir 4 veces con pausa y apagado al final','Emite exactamente cuatro destellos'],
 ['Relaciona intensidad aparente con duración del pulso','Prueba pausas distintas sin aumentar tensión del módulo','Describe diferencia de ritmo sin alterar la alimentación'],
 ['Añade LED rojo y verde en pines distintos','Usa tres salidas y una variable estado con cada color','La secuencia ordenada repite azul-rojo-verde dos veces']
],
botonazul:[
 ['Determina si pulsar equivale a 0 o 1 en S','Leer pin digital P1 y mostrar en pantalla el estado real','Diez pulsaciones alternan lectura de reposo y pulsado'],
 ['Mide duración entre pulsar y soltar','Guarda millis de inicio y compara con umbral de 800 ms','Distingue 3 pulsaciones cortas y 3 largas'],
 ['Realiza diez pulsaciones de ritmo normal','Cuenta solo cambios de reposo a pulsado más antirrebote','No suma varias veces al mantener pulsado'],
 ['Realiza otra serie de diez toques rápidos','Ajusta intervalo de antirrebote y compara conteos','Tabla muestra conteos antes/después del ajuste'],
 ['Prepara estado cronómetro: parado, marcha, parado','Evento de pulsación alterna estado; diferencia millis','Tres pulsaciones muestran arranque, parada y nuevo arranque'],
 ['Añade un bloqueo de 200 ms y estado anterior','Suma solo flanco y desactiva al soltar; B integrado puede reiniciar','Diez pulsaciones intencionadas cuentan una sola vez']
],
botonamarillo:[
 ['Conecta pulsador amarillo a P1; usa botón A de micro:bit para detener','Evento exterior pone estado=1; A integrado pone estado=0','La pantalla cambia a ON/OFF sin pulsaciones ambiguas'],
 ['Añade módulo azul con señal en P2 y alimentación compatible','P1 cambia opción; P2 confirma; prueba reposo de ambos','Tres elecciones se confirman y registran'],
 ['Define estados 0,1,2 controlados por amarillo y azul','Un botón avanza estado; el otro ejecuta elección','Se alcanzan los tres estados sin saltos inesperados'],
 ['Prepara amarillo para reiniciar y azul para sumar','Lee flancos de cada botón para sumar/reiniciar variable','Cinco sumas y un reinicio producen el valor esperado'],
 ['Asigna un voto a cada color de botón','Contador amarillo y contador azul; lee una vez por pulsación','Se registran diez votos sin duplicaciones'],
 ['Ensaya diez toques rápidos y luego espaciados','Añade antirrebote y compara detecciones','Escribes qué retardo permite contar sin dobles toques']
],
color:[
 ['Localiza la referencia del chip en la placa sin alimentarla','Solo después instala biblioteca compatible para TCS34725 si coincide con el módulo','Documentas chip, tensión, SDA/SCL y dirección confirmada'],
 ['Utiliza tres tarjetas de color bajo una luz estable','Obtén lecturas RGB con extensión adecuada y decide color dominante','Clasifica cinco muestras con tres colores elegidos'],
 ['Diseña un clasificador y añade servo solo si hay alimentación segura','Leer RGB → decidir etiqueta → enviar posición al servo externo','El diseño contempla lecturas y giro; no obligues a conectar sin adaptadores'],
 ['Fotografía chip y anota SCL/SDA/V/GND y tensión aceptada','Crea tabla de pines I²C y qué librería los utiliza','Otro equipo interpreta esquema sin inventar terminales'],
 ['Calibra blanco, rojo, azul y verde manteniendo la iluminación','Guarda medidas base y compara muestras nuevas','Tabla con diferencias entre colores y tolerancia'],
 ['Crea caja con iluminación repetible y registra diez muestras','Comparar canales RGB y descartar lecturas ambiguas','Clasifica al menos 8 de 10 muestras o explica los errores']
],
presion:[
 ['Comprueba el chip BMP280 u otro realmente serigrafiado en placa','Inicializa extensión I²C apropiada y lee presión solo si es compatible','Muestra valor plausible con unidad hPa, no la temperatura integrada de micro:bit'],
 ['Toma una lectura al inicio y otra 10 min después','Guarda presión_1/presión_2 y calcula diferencia','Anota ambas presiones, hora y diferencia en hPa'],
 ['Planifica registro durante cinco momentos del día','Guardar muestras de presión con sello temporal manual','Tabla de cinco presiones y tendencia sin atribuir causalidad falsa'],
 ['Identifica dirección I²C y límites de alimentación del sensor','Dibuja SDA=P20/SCL=P19 con V y G validados','Ficha técnica completa; no conectas 5 V a entradas de micro:bit'],
 ['Toma cinco lecturas del sensor externo ya operativo','Suma y divide cinco muestras de presión','Explicas promedio y dispersión en hPa'],
 ['Compara en dos zonas del aula sin esperar grandes diferencias','Registra presión en mismo intervalo y controla temperatura','Tabla explica que pequeñas diferencias pueden ser ruido']
],
luz:[
 ['Comprueba si la señal aumenta o disminuye al tapar el sensor','Leer analog P1 → comparar con valor medio calibrado → aviso','La alerta se activa al tapar y se desactiva al iluminar'],
 ['Mide con el sensor tapado y cerca de una ventana sin sol directo','Mostrar número de P1; cinco lecturas en cada sitio','La tabla separa los dos ambientes y muestra su variación'],
 ['Elige dos umbrales separados para evitar parpadeo','Si nivel cruza umbral 1 activa; solo desactiva con umbral 2','La salida no oscila al mover la mano cerca del límite'],
 ['Prueba sensor tapado, aula y luz de una linterna indirecta','Guarda valor mín/med/máx sin invertir la lógica observada','Tres rangos registrados y ordenados según datos'],
 ['Diseña una lámpara simulada con icono, no una carga de potencia','Variable estado y dos umbrales para iluminar icono en oscuridad','Cinco cambios de luz producen estados estables'],
 ['Compara sensor externo P1 y el nivel de luz de micro:bit','Leer P1 y input.lightLevel(), con escalas distintas','Anotas ambos valores sin suponer que tienen iguales unidades']
],
lm35:[
 ['Comprueba tensión de alimentación mínima del LM35 y salida con multímetro','Leer analog P1 solo con salida validada por docente','Datos estables y confirmación de alimentación correcta'],
 ['Prepara umbral térmico tras convertir milivoltios a grados','Calcular Celsius según sensibilidad real LM35 (10 mV/°C)','Alarma reacciona solo al superar umbral sin conectar 5 V a P1'],
 ['Registra valores cada 5 s en habitación estable','Convertir tensión con referencia ADC adecuada y trazar tabla','Se observa evolución con unidades y limitaciones'],
 ['Toma diez lecturas sin mover sensor y sin calentarlo','Guarda lista de lecturas y calcula variación total','Tabla con máximo, mínimo y diferencia'],
 ['Compara con termómetro independiente junto al sensor','Calcula diferencia constante entre dos medidas','Justificas posible error y condiciones de calibración'],
 ['Detecta cambio térmico suave sin calentar circuitos','Al superar umbral, icono y zumbador si está conectado','Alerta aparece en tres pruebas y se apaga al recuperar temperatura']
],
inclinacion:[
 ['Fija el módulo a una pequeña caja e identifica la postura estable','Leer digital P1; si inclinado, LED P2 e icono de alerta','Cinco inclinaciones producen estado correcto'],
 ['Registra alternancias horizontal/inclinado sin rebotes','Guardar estado previo y sumar al cambiar','Diez cambios de postura cuentan diez transiciones, no vueltas de bucle'],
 ['Mantén caja inclinada durante 3 segundos y vuelve al reposo','Guarda tiempo de inicio de inclinación y dispara alarma tras 3000 ms','La alarma NO salta con inclinaciones más cortas'],
 ['Busca tres orientaciones distintas con lectura digital','Mostrar 0/1 y anotar postura real','Tabla distingue orientaciones que activan el interruptor'],
 ['Construye avisador de inclinación con zumbador P2','Al detectar inclinación, reproducir tono corto y apagar al restaurar','Aviso aparece en cinco movimientos, sin quedar sonando'],
 ['Mueve el sensor repetidas veces y observa contactos inestables','Espera 150–300 ms antes de aceptar un nuevo estado','La lectura deja de contar múltiples rebotes de un único movimiento']
],
infrarrojo:[
 ['Prueba una mano frente al sensor y localiza el potenciómetro','Leer digital P1 y mostrar detección tras verificar si activo es 0/1','Registra distancia de detección en tres ensayos'],
 ['Ajusta despacio el potenciómetro y repite la aproximación','Usa la misma lectura digital P1 antes y después','Tabla muestra alcance y falsos positivos con dos ajustes'],
 ['Construye barrera sin tocar el módulo con los objetos','Cuenta transición libre→detectado y espera salida completa','Diez pasos producen un conteo cercano a diez'],
 ['Sitúa objeto negro y blanco a idéntica distancia','Registra 5 lecturas por objeto con misma iluminación','Comparas detección por reflectividad, sin concluir distancia absoluta'],
 ['Haz pasar diez objetos espaciados por la zona','Flanco de entrada + antirrebote para sumar una vez','Cuenta diez pasos sin duplicar objetos inmóviles'],
 ['Prueba dos condiciones de luz ambiente y ruido de sensor','Usa estado anterior y retardo mínimo entre alarmas','Falsos positivos disminuyen tras ajuste medido']
],
humedad:[
 ['Introduce sonda resistiva por separado en tierra seca y húmeda','Lee pin analógico P1 y muestra números, sin asumir mayor=mojado','Tabla con tres lecturas por estado y sentido de respuesta identificado'],
 ['Elige dos umbrales calculados de medidas reales','Clasifica lectura en seco, medio y húmedo con condiciones ordenadas','Tres macetas se clasifican según la calibración'],
 ['Prepara un aviso de riego visual ANTES de conectar la bomba','P1 humedad → umbral → mostrar cara; salida P2 al relé solo con validación','Cinco ensayos distinguen seco/húmedo sin alimentar bomba por Shield'],
 ['Compara sonda en aire, tierra seca y tierra mojada','Registrar 3 muestras por posición y obtener umbral','Presentas valor medio de cada estado y umbral justificado'],
 ['Toma cinco lecturas de humedad y promedio para reducir ruido','Suma cinco analog P1 y divide por 5; muestra LED en P2 si procede','La lectura media cambia menos que muestras aisladas'],
 ['Diseña riego con relé y bomba externa y protección verificada','Si seco y tiempo seguro → pulso corto P2; luego bloqueo y paro','Esquema separa señal y potencia y ninguna salida de micro:bit mueve directamente bomba']
],
motorcc:[
 ['Identifica primero el motor amarillo y su pareja obligatoria: controlador L298N','Motor en OUT1/OUT2; Shield P1→IN1, P2→IN2, P0→ENA y GND común; fuente externa','Con motor elevado, A produce giro ≤1 s y termina sin tensión en ENA'],
 ['Detén ENA antes de invertir IN1 e IN2; nunca inviertas los cables conectados','B ordena IN1=0/IN2=1, con pausa 300 ms después del paro','El mismo motor cambia de sentido en 3 pruebas sin golpes'],
 ['Prepara dos velocidades manteniendo IN1/IN2 y sentido constantes','AnalogWrite P0 en dos niveles (p. ej. 400 y 800 de 1023)','Apuntas velocidad observable y confirmas que el motor puede arrancar con la tensión real'],
 ['Haz tabla 1/0, 0/1, 0/0, 1/1 con ENA controlado','Muestra la combinación actual y detén el driver antes de cada cambio','Cuatro estados registrados sin tocar los cables durante pruebas'],
 ['El motor de kit NO es por sí solo un vehículo: coloca polea/tira de cartón con supervisión','Compara desplazamiento de la tira durante 1 s a dos valores PWM','Distancias medidas sobre el MISMO montaje; si no hay polea, compara vueltas visuales'],
 ['Diseña un transportador de cartón y un IR de parada (P8) solo si es compatible','IR P8 → si objeto detectado poner ENA P0=0; P1/P2 fijan dirección','Tres objetos paran el motor antes del límite, con desconexión física disponible']
],
lcd:[
 ['Localiza módulo I²C en la parte trasera y serigrafía SDA/SCL','Escribe mensaje en matriz LED como simulación previa, no en LCD','Indicas que el LCD real necesita dirección y extensión específicas'],
 ['Representa una lectura en dos líneas con boceto de 16×2','Primero temperatura a variable; luego diseña texto para línea 1/2','Tu boceto diferencia lo que muestra micro:bit de la LCD física'],
 ['Con sensor de luz P1 programa lectura analógica','Diseña visualización de valor junto a título, pero no afirmes que ya escribe LCD','Compruebas lectura P1 con matriz y dibujo de pantalla'],
 ['Documenta dirección I²C típica sin asumirla hasta medir','Busca controlador PCF8574 u otro y comprueba pull-ups a 5 V','Ficha incluye tensión, dirección y adaptación de nivel si necesita'],
 ['Diseña menú con dos páginas de datos','Evento A alterna estado de página y variables que aparecerían','Tres cambios alternos de pantalla simulada'],
 ['Con botón externo P1 diseña una página seleccionable','Lee botón con su lógica y define representación en LCD solo con biblioteca compatible','Entregas boceto y programa que sí lee botón, sin afirmar escritura LCD no probada']
],
bomba:[
 ['Con relé SIN BOMBA, verifica por separado IN, VCC, GND y la lógica activo alto/bajo','A activa P1 menos de 1 s y vuelve a reposo, con COM/NO sin carga','Tres clics seguros con reposo al acabar y sin energizar la bomba'],
 ['Con el relé comprobado, compara dos tiempos de activación sin bomba','A activa durante 0,5 s y 1 s y vuelve al reposo','Dos duraciones registradas y parada en cada ensayo'],
 ['Calibra humedad por P1 y reserva P2 para relé, bomba desconectada al principio','Si suelo seco, solicita pulso seguro en P2 solo tras verificación docente','Detectas seco/húmedo y previenes riegos continuos'],
 ['Dibuja dos circuitos separados: control Shield→relé y potencia fuente→COM/NO→bomba','Señala qué cables son señales y cuáles soportan corriente','Otro equipo distingue potencia de control sin ayuda'],
 ['Botón A inicia ciclo corto y B cancela salida P1 del relé','Usa variables ejecutando/cancelar y corta al finalizar','Tres cancelaciones simuladas sin ciclos superpuestos'],
 ['Programa riego autónomo con bloqueo temporal y humedad calibrada','P1 lectura → si seco y tiempo mínimo → pulso P2 → apagado','Muestra esquema seguro y simulación antes de autorizar agua y alimentación externa']
],
servo360:[
 ['Reconoce que servo de 360° NO apunta a un ángulo físico','Fija P1 cerca de 90° y ajusta el neutro por pasos pequeños','El eje queda parado y anotas valor neutro real'],
 ['Prueba valores por debajo y encima del neutro sin carga','ServoWrite P1 con dos valores alrededor del reposo','Gira en ambos sentidos y regresa al neutro'],
 ['Prepara dos servos (el kit trae 2) con señales P1 y P2 y fuente común','Escribe dos consignas y detén ambos en sus neutros','Se mueven sin reinicios de micro:bit ni fuente sobrecargada'],
 ['Prueba consignas 88, 90 y 92 solo para localizar parada','Registrar si gira y en qué sentido para cada valor','Obtienes neutro real del servo sin forzar eje'],
 ['Prueba dos desviaciones pequeñas y grandes del neutro','Guardar valores lento/rápido y medir vueltas en 5 s','Relacionas desviación de neutro y velocidad, no posición angular'],
 ['Construye plataforma con botón externo P2 para detener','Si pulsado, P1 vuelve inmediatamente a neutro','Se detiene en 3 ensayos y existe forma de desconectar físicamente']
],
servo180:[
 ['Fija brazo del servo sin pieza que choque en extremos','Envía P1 a 30°,90°,150° antes de probar otros límites','Alcanza tres posiciones sin zumbidos ni topes mecánicos'],
 ['Monta barrera ligera con brazo servo en P1 y botón P2','Botón alterna entre 30° y 100° (ajusta topes medidos)','Abre y cierra tres veces sin forzar engranajes'],
 ['Recorre de 30° a 150° en pasos pequeños','Bucle aumenta consigna 5° con pausa de 30–80 ms','Movimiento más suave que salto único y sin colisión'],
 ['Encuentra límite de giro real con barrera desconectada de carga','Prueba ángulos gradualmente sin alcanzar tope peligroso','Registra rango seguro y justifica por qué no usar 0/180 extremos'],
 ['Con botón P2 abre barrera y luego cierra después de tiempo elegido','Evento pulsación → posición abierta → espera → posición cerrada','Tres ciclos idénticos con dos posiciones seguras'],
 ['Diseña mano de cartón con cuatro gestos de un solo eje','Guarda cuatro ángulos válidos, accede a ellos con botones/estados','Distingues cuatro gestos y no sobrecargas el servo']
]
};
const extras={
 motorcc:'Motor amarillo DC, controlador L298N, micro:bit, Shield, cables Dupont para señales, cables adecuados para bornes, fuente externa y alimentación lógica compatible. No incluye segundo motor.',
 l298n:'L298N, motor amarillo CC, micro:bit, Shield, cables Dupont de señales, cables de bornes, fuente de potencia externa apropiada y fuente lógica comprobada.',
 bomba:'Micro:bit, Shield, relé y bomba; fuente y protección de potencia externas con verificación docente.',
 oled:'OLED I²C, micro:bit, Shield y 4 Dupont; extensión, dirección y adaptación de nivel solo si compatible.',
 lcd:'LCD 1602 I²C, micro:bit y Shield; no conectar SDA/SCL a 5 V sin adaptador de nivel.',
 lm35:'LM35, micro:bit, Shield, alimentación verificada y, si procede, multímetro; no improvisar fuente de 5 V.',
 rgb:'Módulo RGB exacto, Shield y ficha técnica de pines. Solo cablear al identificar si es RGB analógico o direccionable.',
 color:'Sensor de color, Shield, documentación técnica y extensión compatible; no conectar hasta verificar tensión y pines.',
 presion:'Sensor barométrico, Shield, documentación y extensión I²C compatible; comprobar dirección y alimentación.',
 ultrason:'HC-SR04, Shield, alimentación adecuada y adaptador/divisor real para ECHO antes de micro:bit.'
};
for(const m of catalog){const rows=P[m.id],g=guides[m.id];if(!rows||rows.length!==6||!g||!Array.isArray(g.activities)||g.activities.length!==6)continue;
 for(let i=0;i<6;i++){
  const a=g.activities[i],r=rows[i], task=[...(m.practices||[]),...(m.expanded||[])][i]||a.objective;
  /* Preserve the six carefully developed bomba/shield activities from v34; simply enrich programming metadata. */
  a.plan={action:r[0],program:r[1],check:r[2],title:task};
  if(['bomba','shield'].includes(m.id))continue;
  const bc=window.ROBO_WIRING_V8?.build?.(m,i),extra=bc?.extra||[];
  a.materials=extras[m.id] || `${m.name}, micro:bit V2, Shield ACEBOTT TA647 y los cables Dupont de señal/alimentación que correspondan a sus pines reales.`;
  if(extra.length){a.materials += ' Complementos de esta actividad: '+extra.map(z=>({'rojo':'LED rojo','verde':'LED verde','azul':'LED azul','infrarrojo':'sensor infrarrojo','botonazul':'botón azul','zumbador':'zumbador pasivo','rele':'relé','bomba':'bomba y fuente externa','motorcc':'motor DC','humedad':'sensor de humedad','servo180':'servo 180°','servo360_2':'segundo servo 360°','maqueen':'segundo micro:bit y robot Maqueen Plus'}[z]||z)).join(', ')+'.';}
  a.steps=[
   `Prepara el material de esta práctica con todo apagado. Comprueba las etiquetas de ${m.name} y distingue los contactos de señal de los de alimentación.`,
   r[0]+'.',
   'Comprueba la tabla de conexión de esta misma actividad. Verifica la alimentación antes de unir cables; la micro:bit se introduce en el zócalo de la Shield, sin Dupont entre ambas.',
   'En MakeCode (en español), construye esta secuencia: '+r[1]+'. Comprueba los nombres de los pines del esquema antes de descargar.',
   'Haz tres ensayos manteniendo las mismas condiciones. '+r[2]+'.',
   'Anota los resultados, explica qué bloque controla la decisión principal y entrega una fotografía del montaje seguro o un croquis si no puede conectarse.'
  ];
  a.success=r[2]+'.';
  a.deliver='Entrega un esquema rotulado y una tabla con 3 ensayos (condición, respuesta y explicación), más captura de los bloques propios de esta actividad.';
  a.variant='Reto adicional: '+(a.variant||`mejora la precisión del montaje`)+'. Demuestra el cambio con otros tres ensayos.';
 }
}
window.ROBO_TA647_PLANS_V35=P;
})();
