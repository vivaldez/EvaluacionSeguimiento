-- Neon: tablas (sin datos de prueba; cargar seed_estudiantes.sql y seed_docentes.sql)
CREATE TABLE IF NOT EXISTS estudiantes(id SERIAL PRIMARY KEY, matricula TEXT UNIQUE NOT NULL, nombre TEXT NOT NULL, grado INT NOT NULL, seccion TEXT NOT NULL, ciclo INT NOT NULL);
CREATE TABLE IF NOT EXISTS docentes(id SERIAL PRIMARY KEY, nombre TEXT NOT NULL);
CREATE TABLE IF NOT EXISTS asignaciones(id SERIAL PRIMARY KEY, docente TEXT NOT NULL, grado INT NOT NULL, seccion TEXT NOT NULL, asignatura TEXT NOT NULL, UNIQUE(docente,grado,seccion,asignatura));
CREATE TABLE IF NOT EXISTS evaluaciones(id SERIAL PRIMARY KEY, periodo TEXT NOT NULL, matricula TEXT NOT NULL, grado INT NOT NULL, seccion TEXT NOT NULL, asignatura TEXT NOT NULL, indicador TEXT NOT NULL, nivel TEXT CHECK(nivel IN ('E','A','S','')), updated_at TIMESTAMPTZ DEFAULT now(), UNIQUE(periodo,matricula,asignatura,indicador));
CREATE TABLE IF NOT EXISTS niveles_lectura(id SERIAL PRIMARY KEY, periodo TEXT NOT NULL, matricula TEXT UNIQUE NOT NULL, nivel TEXT, updated_at TIMESTAMPTZ DEFAULT now());
