window.MINERD_DATA = {
  periodos: [
    { id: 'DIAG_SEP', nombre: 'Evaluación Diagnóstica · Septiembre', corto: 'Diagnóstica Sep' },
    { id: 'SEG_NOV',  nombre: '1ra Evaluación de Seguimiento · Noviembre', corto: 'Seguimiento Nov' },
    { id: 'SEG_MAR',  nombre: '2da Evaluación de Seguimiento · Marzo', corto: 'Seguimiento Mar' },
    { id: 'SEG_MAY',  nombre: '3ra Evaluación de Seguimiento · Mayo', corto: 'Seguimiento May' }
  ],

  centroDefault: {
    correo: 'coordinacionprimaria@colegiosantodomingo.edu.do',
    codigo_sigerd: '05102',
    nombre_centro: 'COLEGIO SANTO DOMINGO',
    regional: '15 - Santo Domingo III',
    distrito: '15-03',
    sector: 'Privado',
    tipo: 'Urbano',
    tanda: 'Matutina',
    coordinadora_c1: 'Marije Guerrero',
    coordinadora_c2: 'María Angel Herrera'
  },

  nivelesLectura1erCiclo: [
    { id: 'fluido',    label: 'Fluido',    desc: 'Lee textos adecuados a su grado con entonación, ritmo, precisión y respetando signos de puntuación.' },
    { id: 'no_fluido', label: 'No fluido', desc: 'Lee oraciones o textos con pausas frecuentes, silabeo ocasional o poca entonación.' },
    { id: 'palabras',  label: 'Palabras',  desc: 'Reconoce y lee palabras aisladas de forma global o decodificando lentamente, sin fluidez oracional.' },
    { id: 'silabas',   label: 'Sílabas',   desc: 'Decodifica sílabas sueltas sin lograr integrar con fluidez la palabra completa.' },
    { id: 'imagenes',  label: 'Imágenes',  desc: 'Interpreta únicamente imágenes o ilustraciones sin decodificar aún el código escrito.' }
  ],

  docentes: [
    // PRIMER CICLO (1ro a 3ro)
    { id: 'rosa-jaquez',       nombre: 'Rosa Jaquez',       ciclo: 1, rol: 'Docente Titular 1P-A', asignaciones: [{ curso: '1P-A', grado: 1, seccion: 'A', asignaturas: ['LECTURA', 'LE', 'MAT'] }] },
    { id: 'dania-martinez',    nombre: 'Dania Martinez',    ciclo: 1, rol: 'Docente Titular 1P-B', asignaciones: [{ curso: '1P-B', grado: 1, seccion: 'B', asignaturas: ['LECTURA', 'LE', 'MAT'] }] },
    { id: 'mariely-carrasco',  nombre: 'Mariely Carrasco',  ciclo: 1, rol: 'Docente Titular 1P-C', asignaciones: [{ curso: '1P-C', grado: 1, seccion: 'C', asignaturas: ['LECTURA', 'LE', 'MAT'] }] },
    { id: 'jennifer-lugo',     nombre: 'Jennifer Lugo',     ciclo: 1, rol: 'Docente Titular 2P-A', asignaciones: [{ curso: '2P-A', grado: 2, seccion: 'A', asignaturas: ['LECTURA', 'LE', 'MAT'] }] },
    { id: 'elisabeth-mejia',   nombre: 'Elisabeth Mejía',   ciclo: 1, rol: 'Docente Titular 2P-B', asignaciones: [{ curso: '2P-B', grado: 2, seccion: 'B', asignaturas: ['LECTURA', 'LE', 'MAT'] }] },
    { id: 'ludis-batista',     nombre: 'Ludis Batista',     ciclo: 1, rol: 'Docente Titular 2P-C', asignaciones: [{ curso: '2P-C', grado: 2, seccion: 'C', asignaturas: ['LECTURA', 'LE', 'MAT'] }] },
    { id: 'rafaelina-peralta', nombre: 'Rafaelina Peralta', ciclo: 1, rol: 'Docente Titular 3P-A', asignaciones: [{ curso: '3P-A', grado: 3, seccion: 'A', asignaturas: ['LECTURA', 'LE', 'MAT'] }] },
    { id: 'carmen-leonardo',   nombre: 'Carmen Leonardo',   ciclo: 1, rol: 'Docente Titular 3P-B', asignaciones: [{ curso: '3P-B', grado: 3, seccion: 'B', asignaturas: ['LECTURA', 'LE', 'MAT'] }] },
    { id: 'saoni-grullon',     nombre: 'Saoni Grullón',     ciclo: 1, rol: 'Docente Titular 3P-C', asignaciones: [{ curso: '3P-C', grado: 3, seccion: 'C', asignaturas: ['LECTURA', 'LE', 'MAT'] }] },

    // SEGUNDO CICLO (4to a 6to)
    {
      id: 'juana-pichardo', nombre: 'Juana Pichardo', ciclo: 2, rol: 'Lengua Española (4to Grado)',
      asignaciones: [
        { curso: '4P-A', grado: 4, seccion: 'A', asignaturas: ['LE'] },
        { curso: '4P-B', grado: 4, seccion: 'B', asignaturas: ['LE'] },
        { curso: '4P-C', grado: 4, seccion: 'C', asignaturas: ['LE'] }
      ]
    },
    {
      id: 'kenia-correa', nombre: 'Kenia Correa', ciclo: 2, rol: 'Matemática (4to y 5P-C)',
      asignaciones: [
        { curso: '4P-A', grado: 4, seccion: 'A', asignaturas: ['MAT'] },
        { curso: '4P-B', grado: 4, seccion: 'B', asignaturas: ['MAT'] },
        { curso: '4P-C', grado: 4, seccion: 'C', asignaturas: ['MAT'] },
        { curso: '5P-C', grado: 5, seccion: 'C', asignaturas: ['MAT'] }
      ]
    },
    {
      id: 'ana-paola-medina', nombre: 'Ana Paola Medina', ciclo: 2, rol: 'Ciencias Sociales y Naturaleza (4to Grado)',
      asignaciones: [
        { curso: '4P-A', grado: 4, seccion: 'A', asignaturas: ['CS', 'CN'] },
        { curso: '4P-B', grado: 4, seccion: 'B', asignaturas: ['CS', 'CN'] },
        { curso: '4P-C', grado: 4, seccion: 'C', asignaturas: ['CS', 'CN'] }
      ]
    },
    {
      id: 'noemil-morel', nombre: 'Noemil Morel', ciclo: 2, rol: 'Lengua Española (5to Grado)',
      asignaciones: [
        { curso: '5P-A', grado: 5, seccion: 'A', asignaturas: ['LE'] },
        { curso: '5P-B', grado: 5, seccion: 'B', asignaturas: ['LE'] },
        { curso: '5P-C', grado: 5, seccion: 'C', asignaturas: ['LE'] }
      ]
    },
    {
      id: 'sara-medina', nombre: 'Sara Medina', ciclo: 2, rol: 'Matemática (5P-A, 5P-B y 6to Grado)',
      asignaciones: [
        { curso: '5P-A', grado: 5, seccion: 'A', asignaturas: ['MAT'] },
        { curso: '5P-B', grado: 5, seccion: 'B', asignaturas: ['MAT'] },
        { curso: '6P-A', grado: 6, seccion: 'A', asignaturas: ['MAT'] },
        { curso: '6P-B', grado: 6, seccion: 'B', asignaturas: ['MAT'] },
        { curso: '6P-C', grado: 6, seccion: 'C', asignaturas: ['MAT'] }
      ]
    },
    {
      id: 'jose-luis-gonzalez', nombre: 'José Luis González', ciclo: 2, rol: 'Ciencias Sociales (5to y 6to Grado)',
      asignaciones: [
        { curso: '5P-A', grado: 5, seccion: 'A', asignaturas: ['CS'] },
        { curso: '5P-B', grado: 5, seccion: 'B', asignaturas: ['CS'] },
        { curso: '5P-C', grado: 5, seccion: 'C', asignaturas: ['CS'] },
        { curso: '6P-A', grado: 6, seccion: 'A', asignaturas: ['CS'] },
        { curso: '6P-B', grado: 6, seccion: 'B', asignaturas: ['CS'] },
        { curso: '6P-C', grado: 6, seccion: 'C', asignaturas: ['CS'] }
      ]
    },
    {
      id: 'rodys-figuereo', nombre: 'Rodys Figuereo', ciclo: 2, rol: 'Ciencias de la Naturaleza (5to y 6to Grado)',
      asignaciones: [
        { curso: '5P-A', grado: 5, seccion: 'A', asignaturas: ['CN'] },
        { curso: '5P-B', grado: 5, seccion: 'B', asignaturas: ['CN'] },
        { curso: '5P-C', grado: 5, seccion: 'C', asignaturas: ['CN'] },
        { curso: '6P-A', grado: 6, seccion: 'A', asignaturas: ['CN'] },
        { curso: '6P-B', grado: 6, seccion: 'B', asignaturas: ['CN'] },
        { curso: '6P-C', grado: 6, seccion: 'C', asignaturas: ['CN'] }
      ]
    },
    {
      id: 'gizel-vila', nombre: 'Gizel Vila', ciclo: 2, rol: 'Lengua Española (6to Grado)',
      asignaciones: [
        { curso: '6P-A', grado: 6, seccion: 'A', asignaturas: ['LE'] },
        { curso: '6P-B', grado: 6, seccion: 'B', asignaturas: ['LE'] },
        { curso: '6P-C', grado: 6, seccion: 'C', asignaturas: ['LE'] }
      ]
    }
  ],

  asignaturasMeta: {
    LECTURA: { codigo: 'LECTURA', nombre: 'Niveles de Lectura', corto: 'Lectura' },
    LE:      { codigo: 'LE',      nombre: 'Lengua Española',    corto: 'Lengua Española' },
    MAT:     { codigo: 'MAT',     nombre: 'Matemática',         corto: 'Matemática' },
    CS:      { codigo: 'CS',      nombre: 'Ciencias Sociales',  corto: 'C. Sociales' },
    CN:      { codigo: 'CN',      nombre: 'Ciencias de la Naturaleza', corto: 'C. Naturaleza' }
  },

  // INSTRUMENTOS Y RÚBRICAS OFICIALES POR GRADO Y ASIGNATURA (1RO A 6TO)
  instrumentos: {
    1: {
      LE: {
        competencias: [
          { id: 'C1', nombre: 'Comprensión y Producción Oral y Escrita (CE-LE1)', indicadores: ['1.1', '1.2'] }
        ],
        indicadores: [
          {
            id: '1.1',
            texto: 'Comprende de manera oral y escrita, textos funcionales y literarios muy sencillos, respondiendo preguntas literales e inferenciales.',
            rubrica: {
              S: 'Responde correctamente las preguntas literales e inferenciales demostrando comprensión global y específica del texto leído o escuchado.',
              A: 'Responde parcialmente preguntas literales o requiere apoyo puntual para establecer inferencias sencillas del texto.',
              E: 'Presenta dificultad para identificar información explícita o responder preguntas sobre el texto, aun con mediación docente.'
            }
          },
          {
            id: '1.2',
            texto: 'Produce textos funcionales y literarios ajustándose progresivamente al proceso de escritura, con apoyo de su docente.',
            rubrica: {
              S: 'Escribe palabras o enunciados comprensibles ajustándose a la intención comunicativa y direccionalidad con segmentación progresiva.',
              A: 'Escribe con omisiones o sustituciones de grafías, pero logra comunicar la idea básica con apoyo del docente.',
              E: 'Realiza trazos, pseudoletras o copia sin correspondencia fonema-grafema comprensible.'
            }
          }
        ]
      },
      MAT: {
        competencias: [
          { id: 'C1', nombre: 'Comunicación y Representación Matemática', indicadores: ['1.1', '1.2', '1.3', '1.4'] },
          { id: 'C2', nombre: 'Resolución de Problemas y Razonamiento', indicadores: ['2.1', '2.2', '2.3'] }
        ],
        indicadores: [
          { id: '1.1', texto: 'Utiliza imágenes o diagramas sencillos para representar situaciones cotidianas que implican conteo, comparación o clasificación.', rubrica: { S: 'Representa y cuenta colecciones, compara y clasifica correctamente.', A: 'Representa o cuenta parcialmente con imprecisiones menores.', E: 'No logra establecer correspondencia en el conteo o clasificación.' } },
          { id: '1.2', texto: 'Reconoce imágenes de materiales y objetos físicos de su entorno que se relacionan con conceptos matemáticos básicos, como: formas, tamaño o color.', rubrica: { S: 'Identifica con precisión formas, tamaños y colores en objetos del entorno.', A: 'Identifica algunos atributos pero confunde al menos uno.', E: 'No logra discriminar las propiedades solicitadas.' } },
          { id: '1.3', texto: 'Relaciona adecuadamente imágenes de objetos con representaciones gráficas como dibujos o esquemas, para resolver problemas simples de su entorno cotidiano.', rubrica: { S: 'Asocia correctamente los objetos con su representación gráfica para solucionar la situación.', A: 'Relaciona parcialmente los objetos con el esquema.', E: 'No establece relación entre el objeto y la representación.' } },
          { id: '1.4', texto: 'Mide y compara longitudes de objetos de su entorno utilizando unidades arbitrarias.', rubrica: { S: 'Mide y compara longitudes con exactitud usando unidades arbitrarias.', A: 'Compara longitudes visualmente pero comete errores en el conteo de unidades.', E: 'No logra medir ni comparar las longitudes solicitadas.' } },
          { id: '2.1', texto: 'Realiza problemas matemáticos simples relacionados a situaciones de su entorno.', rubrica: { S: 'Resuelve el problema identificando datos, operación y respuesta correcta.', A: 'Plantea la idea pero comete un error en el conteo o cálculo final.', E: 'No logra resolver la situación planteada.' } },
          { id: '2.2', texto: 'Expresa ideas matemáticas sencillas al explicar cómo resolvió un problema usando dibujos o representaciones gráficas.', rubrica: { S: 'Explica con claridad su procedimiento apoyándose en dibujos o esquemas.', A: 'Muestra un dibujo parcial con explicación incompleta.', E: 'No logra representar ni explicar cómo obtuvo el resultado.' } },
          { id: '2.3', texto: 'Reconoce patrones y sus regularidades en actividades cotidianas, como secuencias de colores, formas o numeración.', rubrica: { S: 'Identifica la regularidad y completa toda la secuencia del patrón.', A: 'Identifica parcialmente el patrón con algún error en la continuación.', E: 'No identifica la regla de formación del patrón.' } }
        ]
      }
    },

    2: {
      LE: {
        competencias: [
          { id: 'C1', nombre: 'Comprensión y Producción Escrita', indicadores: ['1.1', '2.1'] }
        ],
        indicadores: [
          { id: '1.1', texto: 'Comprende de manera oral y escrita, textos funcionales y literarios muy sencillos, respondiendo preguntas literales e inferenciales.', rubrica: { S: 'Comprende textos funcionales y literarios respondiendo preguntas literales e inferenciales con precisión.', A: 'Responde preguntas literales pero presenta dificultad en las inferenciales.', E: 'No logra extraer información literal ni inferencial del texto.' } },
          { id: '2.1', texto: 'Produce textos funcionales y literarios ajustándose progresivamente al proceso de escritura, con apoyo de su docente.', rubrica: { S: 'Produce el texto respetando su estructura básica, segmentación de palabras y sentido completo.', A: 'Produce oraciones comprensibles con errores de segmentación u ortografía básica.', E: 'Escribe palabras sueltas sin coherencia textual.' } }
        ]
      },
      MAT: {
        competencias: [
          { id: 'C1', nombre: 'Comunicación y Modelación Matemática', indicadores: ['1.1', '1.2', '1.3', '1.4'] },
          { id: 'C2', nombre: 'Resolución de Problemas y Pensamiento Lógico', indicadores: ['2.1', '2.2', '2.3'] }
        ],
        indicadores: [
          { id: '1.1', texto: 'Describe situaciones matemáticas cotidianas, utilizando un vocabulario básico como números, operaciones y comparaciones.', rubrica: { S: 'Utiliza adecuadamente números, comparaciones y vocabulario matemático.', A: 'Describe parcialmente la situación con vocabulario impreciso.', E: 'No logra describir matemáticamente la situación.' } },
          { id: '1.2', texto: 'Utiliza símbolos matemáticos como =, +, -, x, ÷, para representar ideas que den soluciones a situaciones cotidianas.', rubrica: { S: 'Selecciona y aplica correctamente los símbolos de operación e igualdad.', A: 'Reconoce la operación pero confunde el signo en parte del ejercicio.', E: 'No utiliza los símbolos matemáticos correspondientes.' } },
          { id: '1.3', texto: 'Compara y relaciona situaciones cotidianas con conceptos de cantidad, medida o perímetro.', rubrica: { S: 'Relaciona y compara con acierto medidas, cantidades o perímetros.', A: 'Realiza comparaciones parciales con errores de cálculo.', E: 'No logra relacionar el concepto de medida o cantidad.' } },
          { id: '1.4', texto: 'Identifica figuras planas o cuerpos geométricos en situación de vida diaria.', rubrica: { S: 'Reconoce y nombra figuras planas y cuerpos geométricos en objetos reales.', A: 'Identifica algunas figuras pero confunde cuerpos geométricos.', E: 'No distingue las figuras geométricas solicitadas.' } },
          { id: '2.1', texto: 'Plantea posibles soluciones a problemas matemáticos simples.', rubrica: { S: 'Plantea una estrategia válida y llega a la solución correcta.', A: 'Plantea una estrategia adecuada con error de cálculo.', E: 'No logra plantear una vía de solución.' } },
          { id: '2.2', texto: 'Formula conjeturas sobre patrones o relaciones matemáticas de situaciones cotidianas.', rubrica: { S: 'Descubre la regla del patrón y completa la serie correctamente.', A: 'Completa parcialmente la secuencia numérica o gráfica.', E: 'No identifica la relación del patrón.' } },
          { id: '2.3', texto: 'Interpreta datos a partir de dibujos o esquemas para dar respuesta a situaciones de la vida cotidiana.', rubrica: { S: 'Lee e interpreta pictogramas o esquemas respondiendo todas las preguntas.', A: 'Interpreta datos directos pero falla en comparaciones.', E: 'No logra extraer datos del esquema o gráfico.' } }
        ]
      }
    },

    3: {
      LE: {
        competencias: [
          { id: 'C1', nombre: 'Comprensión y Producción Escrita', indicadores: ['1.1', '1.2'] }
        ],
        indicadores: [
          { id: '1.1', texto: 'Comprende de manera escrita el texto que lee, respondiendo preguntas literales e inferenciales.', rubrica: { S: 'Responde acertadamente preguntas literales, inferenciales y de sentido global.', A: 'Responde preguntas literales pero falla en inferencias o vocabulario contextual.', E: 'Evidencia baja comprensión literal e inferencial.' } },
          { id: '1.2', texto: 'Produce textos funcionales respetando las convenciones de la escritura.', rubrica: { S: 'Produce el texto respetando partes formales, coherencia, mayúsculas, signos de puntuación y segmentación.', A: 'Cumple parcialmente la estructura con varios errores ortográficos o de cohesión.', E: 'Texto incompleto sin estructura ni convenciones básicas.' } }
        ]
      },
      MAT: {
        competencias: [
          { id: 'C1', nombre: 'Numeración y Operaciones', indicadores: ['1.1', '1.2', '1.3'] },
          { id: 'C2', nombre: 'Geometría, Medición y Estadística', indicadores: ['2.1', '2.2', '2.3'] }
        ],
        indicadores: [
          { id: '1.1', texto: 'Escribe y describe patrones numéricos relacionados con secuencias de números pares e impares en contextos escolares.', rubrica: { S: 'Completa y describe con exactitud patrones de números pares e impares.', A: 'Completa la secuencia pero no logra describir la regla.', E: 'No identifica ni completa el patrón numérico.' } },
          { id: '1.2', texto: 'Interpreta enunciados matemáticos y selecciona la operación adecuada para resolver problemas contextualizados.', rubrica: { S: 'Identifica los datos, selecciona la operación pertinente y resuelve correctamente.', A: 'Selecciona la operación adecuada pero comete errores de cálculo.', E: 'Selecciona una operación incorrecta o no resuelve el problema.' } },
          { id: '1.3', texto: 'Aplica números ordinales hasta el 30mo para describir posiciones o secuencias en situaciones del entorno escolar.', rubrica: { S: 'Lee, escribe y ubica correctamente números ordinales hasta el 30.º.', A: 'Ubica ordinales menores a 10.º pero presenta errores en decenas superiores.', E: 'No reconoce ni aplica números ordinales.' } },
          { id: '2.1', texto: 'Resuelve problemas que implican el cálculo de perímetro y área de figuras en contextos cotidianos, justificando el procedimiento utilizado.', rubrica: { S: 'Calcula correctamente perímetro y área y justifica el procedimiento.', A: 'Calcula uno de los dos (perímetro o área) o no justifica el proceso.', E: 'Confunde perímetro y área sin lograr el cálculo.' } },
          { id: '2.2', texto: 'Resuelve problemas de medición (longitud, capacidad, tiempo y dinero) en contextos escolares y familiares, utilizando estrategias digitales y convencionales.', rubrica: { S: 'Resuelve situaciones de longitud, capacidad, tiempo o dinero con unidades correctas.', A: 'Plantea el procedimiento con errores de conversión o cálculo.', E: 'No resuelve las situaciones de medición.' } },
          { id: '2.3', texto: 'Interpreta y comunica de forma sencilla los resultados obtenidos a partir de gráficos estadísticos, relacionándolos con su contexto comunitario.', rubrica: { S: 'Interpreta gráficos de barras o tablas y comunica conclusiones acertadas.', A: 'Lee frecuencias aisladas sin comparar ni concluir.', E: 'No logra leer ni interpretar el gráfico estadístico.' } }
        ]
      }
    },

    4: {
      LE: {
        incluyeFluidez: true,
        competencias: [
          { id: 'C1', nombre: 'Comprensión Escrita (CE-LE1)', indicadores: ['1.1', '1.2', '1.3'] },
          { id: 'C2', nombre: 'Producción Escrita y Pensamiento Crítico (CE-LE2 / CE-LE3)', indicadores: ['2.1', '2.2', '2.3'] }
        ],
        indicadores: [
          { id: '1.1', texto: 'Reconoce el género textual y el propósito comunicativo del texto que lee.', rubrica: { S: 'Identifica con exactitud el tipo de texto, su estructura y su intención comunicativa.', A: 'Reconoce el tipo de texto pero describe vagamente su propósito.', E: 'No logra identificar el género ni el propósito del texto.' } },
          { id: '1.2', texto: 'Infiere información explícita y no explícita considerando el contexto y el propósito del texto que lee.', rubrica: { S: 'Extrae datos explícitos y realiza inferencias precisas a partir del contexto.', A: 'Localiza datos explícitos pero presenta dificultad en las inferencias.', E: 'No identifica información relevante del texto.' } },
          { id: '1.3', texto: 'Evalúa la pertinencia del género y los recursos lingüísticos usados en el texto que lee.', rubrica: { S: 'Valora con criterio el uso de conectores, vocabulario y recursos del texto.', A: 'Reconoce algunos recursos lingüísticos sin explicar su función.', E: 'No identifica los recursos lingüísticos empleados.' } },
          { id: '2.1', texto: 'Redacta textos con claridad, cohesión y corrección ortográfica, respetando la intención comunicativa y la estructura del tipo de texto solicitado.', rubrica: { S: 'Redacta el texto completo con estructura clara, cohesión y buen uso ortográfico.', A: 'Redacta un texto comprensible con descuidos de cohesión u ortografía.', E: 'Escrito fragmentado que no se ajusta a la estructura solicitada.' } },
          { id: '2.2', texto: 'Infiere relaciones causa–efecto y formula explicaciones a partir del texto que lee.', rubrica: { S: 'Establece relaciones causa-efecto lógicas y las explica con claridad.', A: 'Menciona causas o consecuencias aisladas sin vincularlas claramente.', E: 'No logra establecer relaciones de causa y efecto.' } },
          { id: '2.3', texto: 'Argumenta propuestas de solución con el género textual adecuado a partir del texto que lee.', rubrica: { S: 'Plantea propuestas pertinentes y bien fundamentadas en el formato solicitado.', A: 'Propone ideas generales con poca argumentación.', E: 'No presenta propuestas ni argumentos relacionados.' } }
        ]
      },
      MAT: {
        competencias: [
          { id: 'C1', nombre: 'Comunicación y Representación Matemática', indicadores: ['1.1', '1.2', '1.3'] },
          { id: 'C2', nombre: 'Resolución de Problemas', indicadores: ['2.1', '2.2', '2.3'] }
        ],
        indicadores: [
          { id: '1.1', texto: 'Representa información con expresiones numéricas, gráficas o simbólicas.', rubrica: { S: 'Traduce con precisión situaciones a expresiones numéricas, gráficas o simbólicas.', A: 'Representa parcialmente la información con alguna imprecisión.', E: 'No logra representar matemáticamente la información.' } },
          { id: '1.2', texto: 'Interpreta representaciones para explicar ideas o resultados.', rubrica: { S: 'Explica con claridad el significado de tablas, gráficos o expresiones numéricas.', A: 'Lee datos puntuales sin explicar la relación general.', E: 'No interpreta la representación dada.' } },
          { id: '1.3', texto: 'Compara representaciones y valora su adecuación.', rubrica: { S: 'Compara distintas representaciones y justifica cuál es más adecuada.', A: 'Compara representaciones sin fundamentar su elección.', E: 'No logra establecer comparaciones entre representaciones.' } },
          { id: '2.1', texto: 'Identifica datos y relaciones relevantes en un problema.', rubrica: { S: 'Extrae todos los datos e identifica la relación matemática entre ellos.', A: 'Identifica datos pero omite alguna condición del problema.', E: 'No distingue los datos necesarios para resolver el problema.' } },
          { id: '2.2', texto: 'Aplica el procedimiento matemático adecuado.', rubrica: { S: 'Selecciona y ejecuta correctamente el algoritmo u operación requerida.', A: 'Elige el procedimiento correcto pero comete errores de cálculo.', E: 'Aplica un procedimiento inadecuado o incompleto.' } },
          { id: '2.3', texto: 'Verifica la coherencia del resultado.', rubrica: { S: 'Comprueba la solución y valida su sentido en el contexto del problema.', A: 'Escribe la respuesta sin verificar unidades o sentido práctico.', E: 'Presenta un resultado incoherente o sin respuesta final.' } }
        ]
      },
      CS: {
        competencias: [
          { id: 'C1', nombre: 'Uso Crítico de Fuentes Geográficas e Históricas', indicadores: ['1.1', '1.2', '1.3'] },
          { id: 'C2', nombre: 'Ubicación Espacio-Temporal y Análisis Histórico del Caribe', indicadores: ['2.1', '2.2', '2.3'] }
        ],
        indicadores: [
          { id: '1.1', texto: 'Identifica tipos de fuentes sobre geografía e historia del Caribe.', rubrica: { S: 'Clasifica con precisión fuentes primarias, secundarias, cartográficas y escritas.', A: 'Reconoce algunas fuentes pero confunde su clasificación.', E: 'No distingue los tipos de fuentes históricas o geográficas.' } },
          { id: '1.2', texto: 'Aplica criterios de confiabilidad de una fuente sobre la geografía e historia de Las Antillas.', rubrica: { S: 'Evalúa autoría, fecha y objetividad para determinar la confiabilidad de la fuente.', A: 'Menciona un criterio aislado sin justificar la confiabilidad.', E: 'No aplica criterios de validación de fuentes.' } },
          { id: '1.3', texto: 'Interpreta información de fuentes confiables, como mapas, tablas y cronologías, sobre el Caribe, las Antillas y la isla de Santo Domingo.', rubrica: { S: 'Extrae y relaciona correctamente datos de mapas, tablas y líneas de tiempo.', A: 'Ubica información básica con imprecisiones espaciales o cronológicas.', E: 'No logra interpretar mapas ni cronologías.' } },
          { id: '2.1', texto: 'Reconoce hechos y períodos relevantes del Caribe y las Antillas.', rubrica: { S: 'Ubica y caracteriza con exactitud los períodos y hechos históricos estudiados.', A: 'Reconoce hechos aislados sin ubicarlos en su período.', E: 'Confunde los hechos y períodos históricos.' } },
          { id: '2.2', texto: 'Identifica problemas, causas o consecuencias relacionadas con los hechos históricos.', rubrica: { S: 'Explica con claridad las causas y consecuencias de los procesos históricos.', A: 'Menciona una causa o consecuencia de forma superficial.', E: 'No establece causas ni consecuencias históricas.' } },
          { id: '2.3', texto: 'Relaciona un hecho con el lugar geográfico donde ocurrió.', rubrica: { S: 'Vincula correctamente los acontecimientos históricos con su localización en las Antillas.', A: 'Relaciona parcialmente el hecho con la región geográfica.', E: 'No logra ubicar geográficamente el suceso.' } }
        ]
      },
      CN: {
        competencias: [
          { id: 'C1', nombre: 'Explicación Científica de Fenómenos', indicadores: ['1.1', '1.2', '1.3'] },
          { id: 'C2', nombre: 'Indagación y Experimentación Científica', indicadores: ['2.1', '2.2'] }
        ],
        indicadores: [
          { id: '1.1', texto: 'Formula preguntas e hipótesis en los procesos y estructuras de ciencias de la vida a partir de observaciones/modelos.', rubrica: { S: 'Plantea preguntas investigables e hipótesis coherentes sobre los seres vivos.', A: 'Formula preguntas generales o hipótesis poco específicas.', E: 'No logra formular preguntas ni hipótesis a partir de la observación.' } },
          { id: '1.2', texto: 'Analiza y aplica ideas y conceptos sobre fenómenos y propiedades en ciencias físicas mediante medición/modelos.', rubrica: { S: 'Aplica conceptos de materia y energía interpretando mediciones y modelos.', A: 'Reconoce el concepto básico con dificultad al interpretar mediciones.', E: 'No aplica los conceptos de ciencias físicas.' } },
          { id: '1.3', texto: 'Explica fenómenos de la Tierra y el universo usando observaciones/modelos.', rubrica: { S: 'Explica con rigor fenómenos terrestres y astronómicos apoyándose en modelos.', A: 'Describe el fenómeno de forma incompleta.', E: 'No logra explicar el fenómeno representado.' } },
          { id: '2.1', texto: 'Reconoce y ordena pasos básicos de procedimientos científicos/tecnológicos.', rubrica: { S: 'Ordena lógicamente todas las etapas del método experimental.', A: 'Reconoce la mayoría de los pasos con alguna inversión en la secuencia.', E: 'No identifica el orden lógico del procedimiento científico.' } },
          { id: '2.2', texto: 'Aplica instrumentos y materiales de forma adecuada en experimentos, proyectos, exploraciones y observaciones guiadas.', rubrica: { S: 'Selecciona el instrumento de medición adecuado y lee su escala correctamente.', A: 'Reconoce el instrumento pero comete imprecisiones en su uso o lectura.', E: 'No relaciona los instrumentos con la magnitud o experiencia.' } }
        ]
      }
    },

    5: {
      LE: {
        competencias: [
          { id: 'C1', nombre: 'Comprensión Escrita y Valoración Crítica', indicadores: ['1.1', '1.2', '1.3'] },
          { id: 'C2', nombre: 'Producción Escrita Coherente', indicadores: ['2.1', '2.2', '2.3'] }
        ],
        indicadores: [
          { id: '1.1', texto: 'Identifica información explícita e implícita en textos que lee.', rubrica: { S: 'Identifica con precisión ideas principales, datos explícitos y sentidos implícitos.', A: 'Localiza datos explícitos pero realiza inferencias parciales.', E: 'Dificultad severa para extraer información explícita e implícita.' } },
          { id: '1.2', texto: 'Analiza recursos lingüísticos y organizativos del texto que lee para comprender mejor su sentido.', rubrica: { S: 'Explica la función de conectores, estructura y recursos expresivos del texto.', A: 'Identifica recursos lingüísticos sin relacionarlos con el sentido global.', E: 'No reconoce la organización ni los recursos lingüísticos.' } },
          { id: '1.3', texto: 'Valora críticamente la información y emite juicios fundamentados a partir del texto que lee.', rubrica: { S: 'Emite juicios críticos sustentados en evidencias del texto.', A: 'Expresa una opinión personal con poca fundamentación textual.', E: 'No emite valoración ni argumentos sobre lo leído.' } },
          { id: '2.1', texto: 'Organiza por escrito información e ideas de manera coherente.', rubrica: { S: 'Estructura sus ideas en párrafos bien articulados con progresión temática.', A: 'Presenta ideas comprensibles con saltos en la secuencia lógica.', E: 'Ideas desorganizadas sin estructura de párrafos.' } },
          { id: '2.2', texto: 'Redacta textos diversos relacionados con el texto que lee.', rubrica: { S: 'Produce el texto cumpliendo cabalmente con el género, ortografía y léxico.', A: 'Redacta el texto con errores ortográficos o de puntuación que no impiden su lectura.', E: 'No logra redactar el tipo de texto solicitado.' } },
          { id: '2.3', texto: 'Presenta conclusiones y propuestas con base en información analizada relacionada con el texto que lee.', rubrica: { S: 'Formula conclusiones sólidas y propuestas viables derivadas del análisis.', A: 'Presenta una conclusión breve o propuesta poco desarrollada.', E: 'No formula conclusiones ni propuestas.' } }
        ]
      },
      MAT: {
        competencias: [
          { id: 'C1', nombre: 'Numeración, Operaciones y Estadística', indicadores: ['1.1', '1.2', '1.3'] },
          { id: 'C2', nombre: 'Proporcionalidad, Modelación y Geometría', indicadores: ['2.1', '2.2', '2.3'] }
        ],
        indicadores: [
          { id: '1.1', texto: 'Comprende y usa el sistema de numeración decimal.', rubrica: { S: 'Lee, compone, descompone y compara números naturales y decimales con exactitud.', A: 'Realiza comparaciones con errores en el valor posicional.', E: 'No domina el valor posicional del sistema decimal.' } },
          { id: '1.2', texto: 'Resuelve operaciones con números naturales, fracciones y decimales en contextos cotidianos.', rubrica: { S: 'Ejecuta con precisión operaciones combinadas con naturales, fracciones y decimales.', A: 'Plantea bien la operación pero comete errores de cálculo.', E: 'No logra resolver las operaciones planteadas.' } },
          { id: '1.3', texto: 'Interpreta y organiza información numérica y de medidas mediante tablas y gráficos.', rubrica: { S: 'Organiza datos en tablas/gráficos y extrae conclusiones cuantitativas correctas.', A: 'Lee valores directos de la tabla o gráfico con errores al totalizar.', E: 'No interpreta ni organiza los datos en tablas o gráficos.' } },
          { id: '2.1', texto: 'Resuelve problemas de proporcionalidad y razones.', rubrica: { S: 'Aplica correctamente razones y proporcionalidad directa para resolver problemas.', A: 'Identifica la relación proporcional pero falla en el cálculo del valor faltante.', E: 'No reconoce ni aplica la relación de proporcionalidad.' } },
          { id: '2.2', texto: 'Analiza e interpreta representaciones (tablas, gráficos, patrones) para modelar relaciones.', rubrica: { S: 'Modela y predice valores a partir de patrones, tablas o representaciones.', A: 'Continúa el patrón inmediato sin generalizar la relación.', E: 'No logra interpretar el patrón ni la tabla.' } },
          { id: '2.3', texto: 'Utiliza nociones geométricas y de medición para resolver problemas espaciales.', rubrica: { S: 'Resuelve problemas geométricos aplicando ángulos, áreas, perímetros y conversiones.', A: 'Reconoce la propiedad geométrica pero comete errores en la fórmula o medida.', E: 'No aplica las nociones geométricas requeridas.' } }
        ]
      },
      CS: {
        competencias: [
          { id: 'C1', nombre: 'Manejo de Fuentes sobre América y Santo Domingo', indicadores: ['1.1', '1.2', '1.3'] },
          { id: 'C2', nombre: 'Análisis Geográfico e Histórico Americano y Dominicano', indicadores: ['2.1', '2.2', '2.3'] }
        ],
        indicadores: [
          { id: '1.1', texto: 'Identifica tipos de fuentes sobre geografía e historia del continente americano y la isla de Santo Domingo.', rubrica: { S: 'Distingue con precisión fuentes primarias, secundarias, cartográficas y estadísticas.', A: 'Identifica el tema de la fuente pero confunde su tipología.', E: 'No identifica los tipos de fuentes presentadas.' } },
          { id: '1.2', texto: 'Aplica criterios de confiabilidad a fuentes de información sobre geografía e historia del continente americano.', rubrica: { S: 'Valora autoría, rigor y contexto para determinar la fiabilidad de la fuente.', A: 'Aplica parcialmente un criterio de confiabilidad.', E: 'No distingue entre fuentes confiables y no confiables.' } },
          { id: '1.3', texto: 'Interpreta información de fuentes confiables (mapas, tablas, cronologías) del continente americano.', rubrica: { S: 'Interpreta con exactitud mapas temáticos, cuadros estadísticos y cronologías.', A: 'Extrae datos aislados sin integrarlos al contexto americano.', E: 'No logra leer la información cartográfica o cronológica.' } },
          { id: '2.1', texto: 'Analiza situaciones geográficas e históricas del continente americano a partir de mapas físicos, políticos y de población, considerando límites, relieve, hidrografía, ubicación geográfica y acontecimientos históricos relevantes.', rubrica: { S: 'Relaciona relieve, hidrografía, límites y procesos históricos del continente americano.', A: 'Ubica elementos físicos o políticos aislados.', E: 'No logra analizar los mapas ni vincularlos con los hechos históricos.' } },
          { id: '2.2', texto: 'Identifica fenómenos de la Geografía y acontecimientos históricos de América y el Caribe.', rubrica: { S: 'Reconoce y explica fenómenos geográficos e hitos históricos de América y el Caribe.', A: 'Nombra acontecimientos sin precisar su alcance geográfico o histórico.', E: 'No identifica los fenómenos ni acontecimientos evaluados.' } },
          { id: '2.3', texto: 'Analiza información histórica y geográfica de la República Dominicana presentada en gráficos, mapas, textos, tablas y cronologías para explicar cambios, relaciones y características del territorio y su historia.', rubrica: { S: 'Explica cambios y características del territorio e historia dominicana integrando múltiples fuentes.', A: 'Describe datos puntuales sin explicar los cambios o relaciones.', E: 'No logra analizar la información sobre República Dominicana.' } }
        ]
      },
      CN: {
        competencias: [
          { id: 'C1', nombre: 'Comprensión Científica de la Vida, Materia y Universo', indicadores: ['1.1', '1.2', '1.3'] },
          { id: 'C2', nombre: 'Aplicación Experimental y Argumentación Científica', indicadores: ['2.1', '2.2', '2.3'] }
        ],
        indicadores: [
          { id: '1.1', texto: 'Analiza y describe procesos y estructuras de los seres vivos a partir de observaciones o modelos, estableciendo relaciones entre sus funciones y el entorno en Ciencias de la Vida.', rubrica: { S: 'Describe con rigor estructuras biológicas y su relación funcional con el entorno.', A: 'Identifica partes o estructuras sin explicar su función.', E: 'No reconoce los procesos ni estructuras de los seres vivos.' } },
          { id: '1.2', texto: 'Interpreta y compara procesos y estructuras de la materia y la energía a partir de observaciones, experimentos o modelos, identificando causas y efectos en los fenómenos en Ciencias Físicas.', rubrica: { S: 'Compara estados/propiedades de la materia y energía identificando causas y efectos.', A: 'Reconoce el fenómeno físico sin establecer la relación causa-efecto.', E: 'No interpreta los procesos de materia y energía.' } },
          { id: '1.3', texto: 'Relaciona y argumenta fenómenos de la Tierra y del universo a partir de observaciones, modelos o representaciones, formulando ideas sobre sus causas y transformaciones.', rubrica: { S: 'Relaciona y argumenta fenómenos de la Tierra y del universo explicando causas y transformaciones con apoyo de modelos.', A: 'Relaciona fenómenos terrestres o del universo con explicaciones parciales.', E: 'No relaciona ni argumenta los fenómenos de la Tierra y del universo.' } },
          { id: '2.1', texto: 'Analiza y describe procesos y estructuras de los seres vivos a partir de observaciones o modelos, valorando su relación con las funciones vitales y el ambiente en Ciencias de la Vida.', rubrica: { S: 'Analiza procesos y estructuras de los seres vivos valorando su relación con las funciones vitales y el ambiente.', A: 'Describe procesos de los seres vivos con relación parcial con el ambiente.', E: 'No analiza ni describe los procesos y estructuras de los seres vivos.' } },
          { id: '2.2', texto: 'Interpreta y compara procesos y estructuras vinculados con la materia, la energía y sus transformaciones a partir de observaciones, mediciones o modelos experimentales en Ciencias Físicas.', rubrica: { S: 'Interpreta y compara procesos de materia y energía con mediciones o modelos experimentales.', A: 'Interpreta parcialmente los procesos de materia y energía.', E: 'No interpreta los procesos vinculados con la materia y la energía.' } },
          { id: '2.3', texto: 'Relaciona y argumenta fenómenos de la Tierra y del universo a partir de observaciones, modelos o simulaciones, formulando inferencias sobre sus causas y efectos.', rubrica: { S: 'Relaciona fenómenos de la Tierra y del universo y formula inferencias coherentes sobre causas y efectos.', A: 'Relaciona los fenómenos con inferencias parciales.', E: 'No relaciona los fenómenos ni formula inferencias.' } }
        ]
      }
    },

    6: {
      LE: {
        competencias: [
          { id: 'C1', nombre: 'Comprensión Escrita y Valoración Crítica', indicadores: ['1.1', '1.2', '1.3'] },
          { id: 'C2', nombre: 'Producción Escrita', indicadores: ['2.1', '2.2', '2.3'] }
        ],
        indicadores: [
          { id: '1.1', texto: 'Identifica información explícita e implícita en textos diversos.', rubrica: { S: 'Identifica con precisión información explícita e implícita en textos diversos.', A: 'Identifica información explícita y parte de la implícita.', E: 'No identifica información explícita ni implícita.' } },
          { id: '1.2', texto: 'Analiza recursos lingüísticos y organizativos del texto que lee para comprender mejor su sentido.', rubrica: { S: 'Analiza recursos lingüísticos y organizativos y explica su efecto en el sentido del texto.', A: 'Identifica recursos sin analizar plenamente su función.', E: 'No analiza los recursos lingüísticos ni organizativos.' } },
          { id: '1.3', texto: 'Valora críticamente la información y emite juicios fundamentados.', rubrica: { S: 'Valora críticamente la información y emite juicios fundamentados en evidencias.', A: 'Emite juicios con fundamentación parcial.', E: 'No valora críticamente ni fundamenta juicios.' } },
          { id: '2.1', texto: 'Expresa por escrito ideas y resultados de manera lógica, crítica con claridad y coherencia, a través de diversos textos.', rubrica: { S: 'Expresa ideas por escrito de manera lógica, clara, coherente y crítica.', A: 'Expresa ideas comprensibles con fallas de coherencia o claridad.', E: 'No expresa por escrito ideas con claridad ni coherencia.' } },
          { id: '2.2', texto: 'Emplea normas gramaticales y ortográficas al escribir diversos textos.', rubrica: { S: 'Emplea correctamente normas gramaticales y ortográficas.', A: 'Emplea las normas con errores frecuentes que no impiden la comprensión.', E: 'No emplea normas gramaticales ni ortográficas básicas.' } },
          { id: '2.3', texto: 'Integra recursos lingüísticos y discursivos al escribir diversos textos.', rubrica: { S: 'Integra recursos lingüísticos y discursivos adecuados al tipo de texto.', A: 'Integra algunos recursos con uso limitado.', E: 'No integra recursos lingüísticos ni discursivos.' } }
        ]
      },
      MAT: {
        competencias: [
          { id: 'C1', nombre: 'Comunicación Matemática', indicadores: ['1.1', '1.2', '1.3'] },
          { id: 'C2', nombre: 'Resolución de Problemas', indicadores: ['2.1', '2.2'] },
          { id: 'C3', nombre: 'Modelación Matemática', indicadores: ['3.1', '3.2'] }
        ],
        indicadores: [
          { id: '1.1', texto: 'Comunica ideas matemáticas de manera clara.', rubrica: { S: 'Comunica ideas matemáticas con claridad, precisión y vocabulario adecuado.', A: 'Comunica ideas matemáticas con imprecisiones.', E: 'No comunica ideas matemáticas de manera comprensible.' } },
          { id: '1.2', texto: 'Argumenta procedimientos y resultados.', rubrica: { S: 'Argumenta procedimientos y resultados con justificación matemática válida.', A: 'Argumenta parcialmente sus procedimientos.', E: 'No argumenta procedimientos ni resultados.' } },
          { id: '1.3', texto: 'Utiliza representaciones matemáticas adecuadas.', rubrica: { S: 'Utiliza representaciones matemáticas adecuadas y las interpreta correctamente.', A: 'Utiliza representaciones con errores parciales.', E: 'No utiliza representaciones matemáticas adecuadas.' } },
          { id: '2.1', texto: 'Emplea procedimientos adecuados para resolver problemas.', rubrica: { S: 'Emplea procedimientos adecuados y resuelve correctamente el problema.', A: 'Emplea el procedimiento adecuado con errores de cálculo.', E: 'No emplea procedimientos adecuados.' } },
          { id: '2.2', texto: 'Valora la utilidad de la matemática en situaciones reales.', rubrica: { S: 'Valora y explica la utilidad de la matemática en situaciones reales.', A: 'Reconoce la utilidad matemática sin explicarla plenamente.', E: 'No valora la utilidad de la matemática.' } },
          { id: '3.1', texto: 'Representa situaciones de su entorno mediante modelos matemáticos.', rubrica: { S: 'Representa situaciones del entorno mediante modelos matemáticos pertinentes.', A: 'Representa parcialmente la situación mediante un modelo.', E: 'No representa la situación mediante modelos matemáticos.' } },
          { id: '3.2', texto: 'Valida el modelo propuesto con los datos.', rubrica: { S: 'Valida el modelo propuesto contrastándolo correctamente con los datos.', A: 'Valida parcialmente el modelo propuesto.', E: 'No valida el modelo propuesto.' } }
        ]
      },
      CS: {
        competencias: [
          { id: 'C1', nombre: 'Uso Crítico de Fuentes y Geografía', indicadores: ['1.1', '1.2', '1.3'] },
          { id: 'C2', nombre: 'Análisis Histórico', indicadores: ['2.1', '2.2', '2.3'] }
        ],
        indicadores: [
          { id: '1.1', texto: 'Reconoce fuentes confiables y la autoría en informaciones geográficas e históricas.', rubrica: { S: 'Reconoce fuentes confiables e identifica correctamente su autoría.', A: 'Reconoce parcialmente la confiabilidad o la autoría.', E: 'No reconoce fuentes confiables ni su autoría.' } },
          { id: '1.2', texto: 'Distingue la clasificación e importancia de la geografía (física, humana, económica).', rubrica: { S: 'Distingue la geografía física, humana y económica y explica su importancia.', A: 'Distingue algunas ramas de la geografía.', E: 'No distingue la clasificación de la geografía.' } },
          { id: '1.3', texto: 'Analiza informaciones sobre civilizaciones antiguas y modernas y sus aportes.', rubrica: { S: 'Analiza civilizaciones antiguas y modernas y explica sus aportes.', A: 'Describe civilizaciones sin analizar sus aportes.', E: 'No analiza las civilizaciones ni sus aportes.' } },
          { id: '2.1', texto: 'Analiza acontecimientos históricos relacionados con las civilizaciones antiguas y modernas y con la historia de América, identificando causas y consecuencias de procesos relevantes.', rubrica: { S: 'Analiza acontecimientos históricos identificando causas y consecuencias relevantes.', A: 'Identifica causas o consecuencias de forma parcial.', E: 'No analiza los acontecimientos históricos.' } },
          { id: '2.2', texto: 'Caracteriza contextos políticos, sociales, económicos y culturales por periodos y regiones.', rubrica: { S: 'Caracteriza contextos políticos, sociales, económicos y culturales por periodos y regiones.', A: 'Caracteriza parcialmente algún contexto.', E: 'No caracteriza los contextos históricos.' } },
          { id: '2.3', texto: 'Sustenta valoraciones críticas a partir de información histórica confiable, diferenciando hechos, opiniones y datos que respaldan una conclusión.', rubrica: { S: 'Sustenta valoraciones críticas diferenciando hechos, opiniones y datos.', A: 'Emite valoraciones con diferenciación parcial.', E: 'No sustenta valoraciones críticas ni diferencia hechos de opiniones.' } }
        ]
      },
      CN: {
        competencias: [
          { id: 'C1', nombre: 'Explicación Científica', indicadores: ['1.1', '1.2', '1.3'] },
          { id: 'C2', nombre: 'Indagación y Análisis de Datos', indicadores: ['2.1', '2.2'] }
        ],
        indicadores: [
          { id: '1.1', texto: 'Formula preguntas e hipótesis a partir de observaciones en el entorno y experimentos realizados en Ciencias de la Vida.', rubrica: { S: 'Formula preguntas e hipótesis pertinentes a partir de observaciones y experimentos.', A: 'Formula preguntas o hipótesis parciales.', E: 'No formula preguntas ni hipótesis.' } },
          { id: '1.2', texto: 'Aplica ideas y conceptos en Ciencias Física a partir de experimentos y diseño de proyectos.', rubrica: { S: 'Aplica ideas y conceptos de Ciencias Físicas en experimentos y proyectos.', A: 'Aplica parcialmente los conceptos físicos.', E: 'No aplica ideas ni conceptos de Ciencias Físicas.' } },
          { id: '1.3', texto: 'Explica fenómenos mediante modelos y representaciones en Ciencias de la Tierra y el Universo.', rubrica: { S: 'Explica fenómenos mediante modelos y representaciones adecuados.', A: 'Explica parcialmente los fenómenos representados.', E: 'No explica los fenómenos mediante modelos.' } },
          { id: '2.1', texto: 'Organiza y ejecuta procedimientos experimentales en Ciencias de la Vida.', rubrica: { S: 'Organiza y ejecuta procedimientos experimentales de forma ordenada y segura.', A: 'Ejecuta el procedimiento con desorden parcial.', E: 'No organiza ni ejecuta el procedimiento experimental.' } },
          { id: '2.2', texto: 'Analiza e interpreta datos de exploraciones o experimentos, teorías y principios en Ciencias Físicas.', rubrica: { S: 'Analiza e interpreta datos experimentales estableciendo conclusiones coherentes.', A: 'Interpreta datos aislados sin conclusión completa.', E: 'No analiza ni interpreta los datos experimentales.' } }
        ]
      }
    }
  },

  // Se llena desde Neon.tech (/api/state). Si la API no responde, desde localStorage.
  // No contiene datos de prueba.
  estudiantes: []
};
