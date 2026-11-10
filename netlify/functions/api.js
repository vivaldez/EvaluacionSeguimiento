import { neon } from '@neondatabase/serverless';

const headers = {
  'Content-Type': 'application/json',
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS'
};

export async function handler(event) {
  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers, body: '' };
  }

  if (!process.env.DATABASE_URL) {
    return {
      statusCode: 503,
      headers,
      body: JSON.stringify({ ok: false, mode: 'local_fallback', error: 'DATABASE_URL no configurada' })
    };
  }

  const sql = neon(process.env.DATABASE_URL);
  const path = event.path.replace(/^\/\.netlify\/functions\/api\/?/, '').replace(/^\/api\/?/, '');
  const method = event.httpMethod;

  try {
    // 1. Obtener estado completo por periodo (Centro, Docentes, Estudiantes, Evaluaciones)
    if (method === 'GET' && (path === 'state' || path === '')) {
      const periodo = event.queryStringParameters?.periodo || 'SEG_NOV';
      const [centro] = await sql`SELECT * FROM centro_config WHERE id = 1`;
      const docentes = await sql`SELECT * FROM docentes WHERE activo = TRUE ORDER BY ciclo, nombre`;
      const estudiantes = await sql`SELECT * FROM estudiantes WHERE activo = TRUE ORDER BY grado, seccion, no_orden, apellidos, nombres`;
      const indicadores = await sql`SELECT estudiante_id, curso, asignatura, indicador_id, valor FROM evaluaciones_indicadores WHERE periodo = ${periodo}`;
      const lectura = await sql`SELECT estudiante_id, curso, nivel, observaciones FROM evaluaciones_lectura WHERE periodo = ${periodo}`;

      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({ ok: true, periodo, centro, docentes, estudiantes, indicadores, lectura })
      };
    }

    // 2. Autoguardado de indicador (E, A, S o vacío para limpiar)
    if (method === 'POST' && path === 'eval-indicador') {
      const { periodo, estudiante_id, curso, asignatura, indicador_id, valor } = JSON.parse(event.body);
      if (!valor) {
        await sql`
          DELETE FROM evaluaciones_indicadores
          WHERE periodo = ${periodo} AND estudiante_id = ${estudiante_id}
            AND asignatura = ${asignatura} AND indicador_id = ${indicador_id}
        `;
      } else {
        await sql`
          INSERT INTO evaluaciones_indicadores (periodo, estudiante_id, curso, asignatura, indicador_id, valor, updated_at)
          VALUES (${periodo}, ${estudiante_id}, ${curso}, ${asignatura}, ${indicador_id}, ${valor}, NOW())
          ON CONFLICT (periodo, estudiante_id, asignatura, indicador_id)
          DO UPDATE SET valor = EXCLUDED.valor, updated_at = NOW()
        `;
      }
      return { statusCode: 200, headers, body: JSON.stringify({ ok: true }) };
    }

    // 3. Autoguardado de Nivel de Lectura y Observaciones
    if (method === 'POST' && path === 'eval-lectura') {
      const { periodo, estudiante_id, curso, nivel, observaciones } = JSON.parse(event.body);
      await sql`
        INSERT INTO evaluaciones_lectura (periodo, estudiante_id, curso, nivel, observaciones, updated_at)
        VALUES (${periodo}, ${estudiante_id}, ${curso}, ${nivel || null}, ${observaciones || ''}, NOW())
        ON CONFLICT (periodo, estudiante_id)
        DO UPDATE SET
          nivel = COALESCE(EXCLUDED.nivel, evaluaciones_lectura.nivel),
          observaciones = COALESCE(EXCLUDED.observaciones, evaluaciones_lectura.observaciones),
          updated_at = NOW()
      `;
      return { statusCode: 200, headers, body: JSON.stringify({ ok: true }) };
    }

    // 4. Crear o editar estudiante (Inscripción / Edición de listado oficial)
    if (method === 'POST' && path === 'estudiante') {
      const { id, matricula, no_orden, apellidos, nombres, curso, grado, seccion, ciclo, activo } = JSON.parse(event.body);
      if (id) {
        const [updated] = await sql`
          UPDATE estudiantes
          SET matricula = ${matricula}, no_orden = ${no_orden}, apellidos = ${apellidos},
              nombres = ${nombres}, curso = ${curso}, grado = ${grado}, seccion = ${seccion},
              ciclo = ${ciclo}, activo = ${activo ?? true}
          WHERE id = ${id}
          RETURNING *
        `;
        return { statusCode: 200, headers, body: JSON.stringify({ ok: true, estudiante: updated }) };
      } else {
        const [inserted] = await sql`
          INSERT INTO estudiantes (matricula, no_orden, apellidos, nombres, curso, grado, seccion, ciclo, activo)
          VALUES (${matricula}, ${no_orden}, ${apellidos}, ${nombres}, ${curso}, ${grado}, ${seccion}, ${ciclo}, TRUE)
          RETURNING *
        `;
        return { statusCode: 200, headers, body: JSON.stringify({ ok: true, estudiante: inserted }) };
      }
    }

    // 5. Actualizar datos generales del centro (SIGERD)
    if (method === 'POST' && path === 'centro') {
      const d = JSON.parse(event.body);
      await sql`
        UPDATE centro_config
        SET correo = ${d.correo || ''}, codigo_sigerd = ${d.codigo_sigerd || ''},
            nombre_centro = ${d.nombre_centro || ''}, regional = ${d.regional || ''},
            distrito = ${d.distrito || ''}, sector = ${d.sector || ''},
            tipo = ${d.tipo || ''}, tanda = ${d.tanda || ''},
            director = ${d.director || ''}, coordinadora_c1 = ${d.coordinadora_c1 || ''},
            coordinadora_c2 = ${d.coordinadora_c2 || ''}, updated_at = NOW()
        WHERE id = 1
      `;
      return { statusCode: 200, headers, body: JSON.stringify({ ok: true }) };
    }

    return { statusCode: 404, headers, body: JSON.stringify({ ok: false, error: 'Ruta no encontrada' }) };
  } catch (err) {
    return { statusCode: 500, headers, body: JSON.stringify({ ok: false, error: err.message }) };
  }
}
