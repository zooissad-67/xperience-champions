-- ============================================================
-- Xperience Champions — Preguntas de las 5 misiones
-- Ejecutar en Supabase > SQL Editor
-- ============================================================

-- ============================================================
-- MISIÓN 1: BIENVENIDA
-- Cómo iniciar la interacción con el cliente
-- ============================================================

INSERT INTO questions (mission_id, pregunta, opcion_a, opcion_b, opcion_c, opcion_d, respuesta_correcta, orden)
SELECT m.id,
  '¿Qué significa ser un Xperience Champion?',
  'Vender el mayor número de productos posible',
  'Priorizar al cliente creando experiencias únicas y consistentes',
  'Conocer a fondo las especificaciones técnicas de cada producto',
  'Alcanzar los objetivos de ventas mensuales',
  'B', 1
FROM missions m WHERE m.nombre = 'Bienvenida';

INSERT INTO questions (mission_id, pregunta, opcion_a, opcion_b, opcion_c, opcion_d, respuesta_correcta, orden)
SELECT m.id,
  '¿Qué expresa el juramento "Mi cliente, mi responsabilidad"?',
  'Que cada vendedor es responsable solo de sus ventas individuales',
  'Que debemos derivar al cliente al responsable cuando surge un problema',
  'Que asumimos la responsabilidad personal del customer journey de principio a fin',
  'Que el cliente siempre tiene razón en cualquier situación',
  'C', 2
FROM missions m WHERE m.nombre = 'Bienvenida';

INSERT INTO questions (mission_id, pregunta, opcion_a, opcion_b, opcion_c, opcion_d, respuesta_correcta, orden)
SELECT m.id,
  'Según el Comportamiento Lighthouse #1, ¿cuál es la actitud correcta al ver a un cliente en la tienda?',
  'Esperar a que el cliente se acerque y pida ayuda',
  'Observar desde la distancia para no invadir su espacio',
  'Preguntar solo si lleva más de cinco minutos en la misma sección',
  'Anticipar sus necesidades y acercarse proactivamente a él',
  'D', 3
FROM missions m WHERE m.nombre = 'Bienvenida';

INSERT INTO questions (mission_id, pregunta, opcion_a, opcion_b, opcion_c, opcion_d, respuesta_correcta, orden)
SELECT m.id,
  '¿Qué significa "Ownership" en el contexto de Xperience Champions?',
  'Es una tarea específica asignada a los managers',
  'Es una mentalidad de responsabilidad sobre toda la experiencia del cliente',
  'Solo es responsable el vendedor que hace la primera interacción',
  'Es la propiedad de los objetivos de ventas personales',
  'B', 4
FROM missions m WHERE m.nombre = 'Bienvenida';

INSERT INTO questions (mission_id, pregunta, opcion_a, opcion_b, opcion_c, opcion_d, respuesta_correcta, orden)
SELECT m.id,
  'En el reto "Welcome to MediaMarkt", ¿qué se pide hacer durante la primera semana?',
  'Aprender el catálogo completo de productos de tu sección',
  'Saludar con una gran sonrisa a al menos 5 clientes sin esperar a que pidan ayuda',
  'Presentarse al equipo de cada departamento de la tienda',
  'Conseguir al menos 5 ventas cerradas de forma autónoma',
  'B', 5
FROM missions m WHERE m.nombre = 'Bienvenida';


-- ============================================================
-- MISIÓN 2: ESCUCHA
-- Cómo detectar necesidades del cliente
-- ============================================================

INSERT INTO questions (mission_id, pregunta, opcion_a, opcion_b, opcion_c, opcion_d, respuesta_correcta, orden)
SELECT m.id,
  'Según el Comportamiento Lighthouse #3, ¿cuál es nuestra actitud ante el cliente?',
  'Escuchamos cuando el cliente lo solicita expresamente',
  'Escuchamos solo para identificar el producto que necesita',
  'Escuchamos de forma activa en todo momento',
  'Escuchamos principalmente a clientes con dudas',
  'C', 1
FROM missions m WHERE m.nombre = 'Escucha';

INSERT INTO questions (mission_id, pregunta, opcion_a, opcion_b, opcion_c, opcion_d, respuesta_correcta, orden)
SELECT m.id,
  'En el reto "The Detective Listener", ¿qué debes hacer al interactuar con un cliente?',
  'Hacer una sola pregunta directa sobre qué producto quiere',
  'Recomendar directamente el producto más vendido para ahorrar tiempo',
  'Escuchar sin preguntar para no molestar al cliente',
  'Hacer al menos tres preguntas para entender su contexto, motivaciones y prioridades',
  'D', 2
FROM missions m WHERE m.nombre = 'Escucha';

INSERT INTO questions (mission_id, pregunta, opcion_a, opcion_b, opcion_c, opcion_d, respuesta_correcta, orden)
SELECT m.id,
  '¿Qué ejemplo de pregunta de escucha activa se menciona en el programa?',
  '¿Cuánto presupuesto tiene para gastar hoy?',
  '¿Qué es lo más importante para usted al elegir un producto?',
  '¿Conoce ya el producto que está buscando?',
  '¿Ha comprado antes en MediaMarkt?',
  'B', 3
FROM missions m WHERE m.nombre = 'Escucha';

INSERT INTO questions (mission_id, pregunta, opcion_a, opcion_b, opcion_c, opcion_d, respuesta_correcta, orden)
SELECT m.id,
  'Tras escuchar al cliente, ¿qué recomienda incluir el programa?',
  'La promoción del mes aunque no encaje con sus necesidades',
  'Únicamente el producto exacto que ha solicitado',
  'La opción más económica disponible para no crear expectativas',
  'Algo que no pidió pero que realmente se adapta a sus necesidades: accesorio, seguro, financiación...',
  'D', 4
FROM missions m WHERE m.nombre = 'Escucha';

INSERT INTO questions (mission_id, pregunta, opcion_a, opcion_b, opcion_c, opcion_d, respuesta_correcta, orden)
SELECT m.id,
  '¿Qué actitud se describe como esencial durante la escucha al cliente?',
  'Eficiencia para resolver la consulta en el menor tiempo posible',
  'Neutralidad para no influenciar la decisión de compra',
  'Curiosidad genuina por el cliente',
  'Profesionalidad técnica para responder todas las preguntas',
  'C', 5
FROM missions m WHERE m.nombre = 'Escucha';


-- ============================================================
-- MISIÓN 3: RECOMENDACIÓN
-- Cómo argumentar y asesorar al cliente
-- ============================================================

INSERT INTO questions (mission_id, pregunta, opcion_a, opcion_b, opcion_c, opcion_d, respuesta_correcta, orden)
SELECT m.id,
  'Según el Comportamiento Lighthouse #5, ¿cómo debemos guiar al cliente?',
  'Con múltiples opciones para que decida con total libertad',
  'Claramente',
  'Hacia los productos con mayor margen para la tienda',
  'Hacia los productos más conocidos de la marca',
  'B', 1
FROM missions m WHERE m.nombre = 'Recomendación';

INSERT INTO questions (mission_id, pregunta, opcion_a, opcion_b, opcion_c, opcion_d, respuesta_correcta, orden)
SELECT m.id,
  '¿Qué describe el Comportamiento Lighthouse #7?',
  'Ofrecer descuentos especiales a clientes frecuentes',
  'Añadir garantías extendidas a todas las ventas',
  'Sorprender y deleitar ofreciendo algo extra',
  'Proporcionar información técnica detallada al cliente',
  'C', 2
FROM missions m WHERE m.nombre = 'Recomendación';

INSERT INTO questions (mission_id, pregunta, opcion_a, opcion_b, opcion_c, opcion_d, respuesta_correcta, orden)
SELECT m.id,
  '¿Cuál es la base de una buena recomendación según el programa?',
  'El conocimiento técnico profundo del producto',
  'La escucha activa y entender el contexto y necesidades del cliente',
  'El historial de compras del cliente en la tienda',
  'Las tendencias del mercado y novedades del sector',
  'B', 3
FROM missions m WHERE m.nombre = 'Recomendación';

INSERT INTO questions (mission_id, pregunta, opcion_a, opcion_b, opcion_c, opcion_d, respuesta_correcta, orden)
SELECT m.id,
  '¿Qué expresa la narrativa del programa sobre lo que los clientes valoran en la era de la IA?',
  'Información rápida y precisa sobre los productos',
  'Precios competitivos y grandes ofertas',
  'Autoservicio y autonomía en su proceso de compra',
  'Que no les traten como algoritmos sino como seres humanos únicos e irreemplazables',
  'D', 4
FROM missions m WHERE m.nombre = 'Recomendación';

INSERT INTO questions (mission_id, pregunta, opcion_a, opcion_b, opcion_c, opcion_d, respuesta_correcta, orden)
SELECT m.id,
  'Según el Comportamiento Lighthouse #2, ¿cómo debemos tratar a cada cliente?',
  'De forma eficiente y profesional',
  'Como un VIP',
  'Adaptándonos a su nivel de conocimiento técnico',
  'Con neutralidad para que se sienta libre de decidir',
  'B', 5
FROM missions m WHERE m.nombre = 'Recomendación';


-- ============================================================
-- MISIÓN 4: OBJECIONES
-- Cómo gestionar dudas o resistencias
-- ============================================================

INSERT INTO questions (mission_id, pregunta, opcion_a, opcion_b, opcion_c, opcion_d, respuesta_correcta, orden)
SELECT m.id,
  'Según el Comportamiento Lighthouse #8, ¿cómo debemos gestionar la frustración de un cliente?',
  'Derivándolo al manager para que lo gestione',
  'Ofreciendo un descuento como compensación',
  'Explicando las políticas de la tienda con calma y detalle',
  'Convirtiéndola en un "WOW"',
  'D', 1
FROM missions m WHERE m.nombre = 'Objeciones';

INSERT INTO questions (mission_id, pregunta, opcion_a, opcion_b, opcion_c, opcion_d, respuesta_correcta, orden)
SELECT m.id,
  '¿Qué implica "tomar ownership" cuando un cliente tiene un problema?',
  'Registrar la incidencia y esperar respuesta del departamento correspondiente',
  'Informar al cliente a qué departamento debe dirigirse',
  'Asumir la responsabilidad personal de la experiencia hasta resolverlo',
  'Escalar siempre el problema al manager de turno',
  'C', 2
FROM missions m WHERE m.nombre = 'Objeciones';

INSERT INTO questions (mission_id, pregunta, opcion_a, opcion_b, opcion_c, opcion_d, respuesta_correcta, orden)
SELECT m.id,
  '¿Qué actitud describe mejor el programa ante las dificultades con clientes?',
  'Mantener la calma y aplicar los protocolos establecidos',
  'Gestionar la incidencia en el menor tiempo posible',
  'Elevar la experiencia yendo más allá de lo esperado: convertir un mal día en uno bueno',
  'Priorizar la satisfacción del cliente por encima de las normas de la tienda',
  'C', 3
FROM missions m WHERE m.nombre = 'Objeciones';

INSERT INTO questions (mission_id, pregunta, opcion_a, opcion_b, opcion_c, opcion_d, respuesta_correcta, orden)
SELECT m.id,
  'Según el Comportamiento Lighthouse #4, ¿de qué nos hacemos responsables?',
  'Del proceso de venta desde que el cliente pregunta hasta que paga',
  'De los objetivos de ventas del turno',
  'De los productos que hemos recomendado específicamente',
  'De la experiencia completa del cliente',
  'D', 4
FROM missions m WHERE m.nombre = 'Objeciones';

INSERT INTO questions (mission_id, pregunta, opcion_a, opcion_b, opcion_c, opcion_d, respuesta_correcta, orden)
SELECT m.id,
  'La narrativa dice: "Nos llega al corazón reconocer que se interesan de verdad por nuestras necesidades". ¿Qué nos enseña esto?',
  'Que el cliente espera siempre un trato afectivo y cercano',
  'Que la autenticidad y el interés genuino son lo que realmente impacta al cliente',
  'Que debemos priorizar la conexión emocional sobre la eficiencia',
  'Que los clientes valoran el entretenimiento durante la experiencia de compra',
  'B', 5
FROM missions m WHERE m.nombre = 'Objeciones';


-- ============================================================
-- MISIÓN 5: CIERRE
-- Cómo finalizar la experiencia de forma positiva
-- ============================================================

INSERT INTO questions (mission_id, pregunta, opcion_a, opcion_b, opcion_c, opcion_d, respuesta_correcta, orden)
SELECT m.id,
  'Según el Comportamiento Lighthouse #9, ¿cómo debemos terminar la interacción con el cliente?',
  'Con un resumen de los productos comprados y los pasos siguientes',
  'Con una invitación a volver cuando tenga más necesidades',
  'Asegurándonos de que ha entendido todas las características del producto',
  'Terminando en un punto alto',
  'D', 1
FROM missions m WHERE m.nombre = 'Cierre';

INSERT INTO questions (mission_id, pregunta, opcion_a, opcion_b, opcion_c, opcion_d, respuesta_correcta, orden)
SELECT m.id,
  'Según el Comportamiento Lighthouse #6, ¿qué debemos garantizar durante toda la experiencia?',
  'Que el cliente tiene acceso a la información técnica que necesita',
  'Que la experiencia es fluida y sin fricciones',
  'Que el proceso de compra es rápido y eficiente',
  'Que el cliente está satisfecho con el precio pagado',
  'B', 2
FROM missions m WHERE m.nombre = 'Cierre';

INSERT INTO questions (mission_id, pregunta, opcion_a, opcion_b, opcion_c, opcion_d, respuesta_correcta, orden)
SELECT m.id,
  '¿Qué expresa el Comportamiento Lighthouse #10?',
  'Que el equipo comparte los objetivos de ventas',
  'Que comunicamos internamente el perfil de cada cliente',
  'Que colaboramos como un solo equipo',
  'Que el equipo apoya al vendedor durante una venta compleja',
  'C', 3
FROM missions m WHERE m.nombre = 'Cierre';

INSERT INTO questions (mission_id, pregunta, opcion_a, opcion_b, opcion_c, opcion_d, respuesta_correcta, orden)
SELECT m.id,
  '¿Qué significa para el programa "cada contacto cuenta"?',
  'Que debemos registrar todas las interacciones con clientes',
  'Que el número de clientes atendidos es un KPI relevante',
  'Que cada interacción es una oportunidad para elevar la experiencia al máximo nivel',
  'Que debemos hacer seguimiento post-venta de cada cliente',
  'C', 4
FROM missions m WHERE m.nombre = 'Cierre';

INSERT INTO questions (mission_id, pregunta, opcion_a, opcion_b, opcion_c, opcion_d, respuesta_correcta, orden)
SELECT m.id,
  '¿Qué frase resume mejor la mentalidad del Xperience Champion?',
  '"El cliente siempre tiene razón"',
  '"Vender más, mejor, cada día"',
  '"La tecnología al servicio de las personas"',
  '"Me hago responsable de la experiencia del cliente porque sé que puedo marcar la diferencia"',
  'D', 5
FROM missions m WHERE m.nombre = 'Cierre';
