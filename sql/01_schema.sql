-- 1. Configuración general del Centro Educativo (para el reporte SIGERD Distrital)
CREATE TABLE IF NOT EXISTS centro_config (
  id INT PRIMARY KEY DEFAULT 1,
  correo VARCHAR(150) DEFAULT '',
  codigo_sigerd VARCHAR(5) DEFAULT '00000',
  nombre_centro VARCHAR(200) DEFAULT 'COLEGIO SANTO DOMINGO',
  regional VARCHAR(100) DEFAULT '15 - Santo Domingo III',
  distrito VARCHAR(100) DEFAULT '15-03',
  sector VARCHAR(50) DEFAULT 'Privado',
  tipo VARCHAR(50) DEFAULT 'Urbano',
  tanda VARCHAR(50) DEFAULT 'Matutina',
  director VARCHAR(150) DEFAULT '',
  coordinadora_c1 VARCHAR(150) DEFAULT 'Coordinación Primer Ciclo',
  coordinadora_c2 VARCHAR(150) DEFAULT 'Marije Guerrero',
  updated_at TIMESTAMP DEFAULT NOW()
);

INSERT INTO centro_config (id, nombre_centro, tanda, coordinadora_c2)
VALUES (1, 'SANTO DOMINGO (CSD)', 'Matutina', 'Marije Guerrero')
ON CONFLICT (id) DO NOTHING;

-- 2. Tabla de Docentes y sus Asignaciones Oficiales
CREATE TABLE IF NOT EXISTS docentes (
  id VARCHAR(60) PRIMARY KEY,
  nombre VARCHAR(150) NOT NULL,
  ciclo INT NOT NULL CHECK (ciclo IN (1, 2)),
  rol VARCHAR(150) NOT NULL,
  asignaciones JSONB NOT NULL DEFAULT '[]'::jsonb,
  activo BOOLEAN DEFAULT TRUE
);

-- 3. Tabla Oficial de Estudiantes (443 alumnos en 18 secciones: 1P-A a 6P-C)
CREATE TABLE IF NOT EXISTS estudiantes (
  id SERIAL PRIMARY KEY,
  matricula VARCHAR(20) NOT NULL,
  no_orden INT NOT NULL,
  apellidos VARCHAR(120) NOT NULL,
  nombres VARCHAR(120) NOT NULL,
  curso VARCHAR(10) NOT NULL, -- Ej: '1P-A', '4P-B'
  grado INT NOT NULL CHECK (grado BETWEEN 1 AND 6),
  seccion CHAR(1) NOT NULL,
  ciclo INT NOT NULL CHECK (ciclo IN (1, 2)),
  activo BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(matricula, curso)
);

CREATE INDEX IF NOT EXISTS idx_estudiantes_curso ON estudiantes(curso, no_orden);
CREATE INDEX IF NOT EXISTS idx_estudiantes_grado ON estudiantes(grado, seccion);

-- 4. Evaluaciones de Indicadores (E, A, S) por Periodo, Asignatura e Indicador
-- Periodos: 'DIAG_SEP' (Diagnóstica Septiembre), 'SEG_NOV' (Seguimiento Noviembre),
--           'SEG_MAR' (Seguimiento Marzo), 'SEG_MAY' (Seguimiento Mayo)
CREATE TABLE IF NOT EXISTS evaluaciones_indicadores (
  periodo VARCHAR(20) NOT NULL,
  estudiante_id INT NOT NULL REFERENCES estudiantes(id) ON DELETE CASCADE,
  curso VARCHAR(10) NOT NULL,
  asignatura VARCHAR(20) NOT NULL, -- 'LE', 'MAT', 'CS', 'CN'
  indicador_id VARCHAR(20) NOT NULL, -- Ej: '1.1', '1.2', '2.1', '3.1'
  valor CHAR(1) CHECK (valor IN ('E', 'A', 'S')),
  updated_at TIMESTAMP DEFAULT NOW(),
  PRIMARY KEY (periodo, estudiante_id, asignatura, indicador_id)
);

CREATE INDEX IF NOT EXISTS idx_eval_ind_lookup ON evaluaciones_indicadores(periodo, curso, asignatura);

-- 5. Evaluaciones de Niveles de Lectura (1ro a 3ro: 5 niveles; 4to: Fluido / No fluido)
CREATE TABLE IF NOT EXISTS evaluaciones_lectura (
  periodo VARCHAR(20) NOT NULL,
  estudiante_id INT NOT NULL REFERENCES estudiantes(id) ON DELETE CASCADE,
  curso VARCHAR(10) NOT NULL,
  nivel VARCHAR(20) CHECK (nivel IN ('fluido', 'no_fluido', 'palabras', 'silabas', 'imagenes')),
  observaciones TEXT DEFAULT '',
  updated_at TIMESTAMP DEFAULT NOW(),
  PRIMARY KEY (periodo, estudiante_id)
);

CREATE INDEX IF NOT EXISTS idx_eval_lec_lookup ON evaluaciones_lectura(periodo, curso);
