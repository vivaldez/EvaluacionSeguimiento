# Evaluaciones Primaria — Netlify + Neon

## Despliegue
1. Neon: crear DB, ejecutar `db/schema.sql`, luego `db/seed_estudiantes.sql` (443 estudiantes oficiales, sin evaluaciones de prueba) y `db/seed_docentes.sql` (solo Lengua Española, Matemática, Ciencias Sociales y Ciencias de la Naturaleza según asignaciones del listado).
2. Netlify: importar esta carpeta, variable `DATABASE_URL` = cadena Neon. Publish `public`, functions `netlify/functions` (ya en netlify.toml).
3. Autoguardado: local inmediato (localStorage) + POST a `/.netlify/functions/api` cuando Neon está configurado.

## Alcance implementado
- Landing con 2 tarjetas (1.er y 2.o ciclo), dashboards por docente del ciclo, períodos Septiembre/Noviembre/Marzo/Mayo.
- Matrices estilo oficial (docente: nombres + indicadores E/A/S; primera fila y columnas #/nombre fijas; responsive móvil), rúbrica resumida por indicador, niveles de lectura 1.er ciclo, totales.
- Consolidado coordinador (impresión) y Consolidado distrito en formato Sistematización (cantidades por grado/área/indicador E-A-S + lectura).
- Supervisión por coordinadora de ciclo: progreso docente, análisis por indicador/sección/asignatura, estudiantes en riesgo (≥50% Elemental) y sugerencias de reforzamiento, exportable a PDF con Imprimir.
- Inscribir/editar estudiantes en la vista del docente.

Indicadores extraídos del PDF de Sistematización (97 indicadores) y asignaciones/estudiantes de los PDFs adjuntos.

## Novedades v2
- Rúbricas completas textuales por grado/asignatura en panel desplegable sobre cada matriz (fuente y páginas indicadas en el panel; texto extraído de los PDFs oficiales).
- Consolidado coordinador independiente por secciones A-H, con selector grado/área, matrícula, evaluados, E/A/S por indicador y fila Total.
- Supervisión con barras apiladas 100% E/A/S exportables a PDF y comparación Sep-Nov-Mar-May por grado/área.
