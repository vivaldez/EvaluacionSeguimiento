const D = window.MINERD_DATA;
const LS_KEY = 'minerd_primaria_v2';

const App = {
  ciclo: null,
  view: 'landing',
  periodo: 'SEG_NOV',
  centro: structuredClone(D.centroDefault),
  estudiantes: [],
  evalInd: {},   // clave: periodo|estudiante_id|asignatura|indicador_id -> E/A/S
  evalLec: {},   // clave: periodo|estudiante_id -> {nivel, observaciones}
  matrizSel: { curso: null, asignatura: null },
  saveTimer: null,

  init() {
    this.loadLocal();
    this.renderLandingMetrics();
    this.loadRemote();
  },

  // ---------- Persistencia / Neon ----------
  loadLocal() {
    try {
      const raw = localStorage.getItem(LS_KEY);
      if (!raw) return;
      const s = JSON.parse(raw);
      this.periodo = s.periodo || this.periodo;
      this.centro = { ...this.centro, ...(s.centro || {}) };
      this.estudiantes = s.estudiantes || [];
      this.evalInd = s.evalInd || {};
      this.evalLec = s.evalLec || {};
      const sel = document.getElementById('selectPeriodo');
      if (sel) sel.value = this.periodo;
    } catch (_) {}
  },

  persistLocal() {
    localStorage.setItem(LS_KEY, JSON.stringify({
      periodo: this.periodo, centro: this.centro,
      estudiantes: this.estudiantes, evalInd: this.evalInd, evalLec: this.evalLec
    }));
  },

  async loadRemote() {
    this.setSync('saving', 'Conectando con Neon…');
    try {
      const r = await fetch(`/api/state?periodo=${encodeURIComponent(this.periodo)}`);
      if (!r.ok) throw new Error('API no disponible');
      const data = await r.json();
      if (!data.ok) throw new Error(data.error || 'Respuesta inválida');
      if (data.centro) this.centro = { ...this.centro, ...data.centro };
      if (Array.isArray(data.estudiantes) && data.estudiantes.length) this.estudiantes = data.estudiantes;
      (data.indicadores || []).forEach(x => {
        this.evalInd[`${this.periodo}|${x.estudiante_id}|${x.asignatura}|${x.indicador_id}`] = x.valor;
      });
      (data.lectura || []).forEach(x => {
        this.evalLec[`${this.periodo}|${x.estudiante_id}`] = { nivel: x.nivel, observaciones: x.observaciones || '' };
      });
      this.persistLocal();
      this.setSync('ok', 'Autoguardado activo · Neon');
    } catch (_) {
      this.setSync('ok', 'Autoguardado local activo');
    }
    this.renderLandingMetrics();
    if (this.ciclo) this.render();
  },

  setSync(mode, text) {
    const dot = document.getElementById('syncDot');
    const txt = document.getElementById('syncText');
    if (dot) dot.className = 'sync-dot' + (mode === 'saving' ? ' saving' : '');
    if (txt) txt.textContent = text;
  },

  queueSave(fn) {
    this.persistLocal();
    this.setSync('saving', 'Guardando…');
    clearTimeout(this.saveTimer);
    this.saveTimer = setTimeout(async () => {
      try { if (fn) await fn(); this.setSync('ok', 'Autoguardado activo'); }
      catch (_) { this.setSync('ok', 'Guardado local · sin conexión'); }
    }, 350);
  },

  async post(path, body) {
    const r = await fetch(`/api/${path}`, {
      method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body)
    });
    if (!r.ok) throw new Error('API');
    return r.json();
  },

  // ---------- Navegación ----------
  goLanding() {
    this.ciclo = null; this.view = 'landing';
    document.getElementById('cycleNav').style.display = 'none';
    this.show('landing'); this.renderLandingMetrics();
  },

  selectCycle(ciclo) {
    this.ciclo = ciclo;
    document.getElementById('cycleNav').style.display = 'block';
    document.getElementById('btnCycle1').className = 'cycle-pill' + (ciclo === 1 ? ' active-c1' : '');
    document.getElementById('btnCycle2').className = 'cycle-pill' + (ciclo === 2 ? ' active-c2' : '');
    const first = D.docentes.find(d => d.ciclo === ciclo)?.asignaciones[0];
    if (first) this.matrizSel = { curso: first.curso, asignatura: ciclo === 1 ? 'LE' : first.asignaturas[0] };
    this.setView('docentes');
  },

  setView(view) { this.view = view; this.show(view); this.render(); },

  show(view) {
    document.querySelectorAll('.view-section').forEach(s => s.classList.remove('active'));
    document.getElementById(`view-${view}`)?.classList.add('active');
    document.querySelectorAll('.nav-tab').forEach(t => t.classList.toggle('active', t.dataset.view === view));
  },

  changePeriodo(periodo) {
    this.periodo = periodo;
    this.persistLocal();
    this.loadRemote().then(() => this.render());
  },

  render() {
    document.getElementById('navCountAlumnos').textContent =
      this.estudiantes.filter(e => !this.ciclo || Number(e.ciclo) === this.ciclo).length;
    if (this.view === 'docentes') this.renderDocentes();
    if (this.view === 'matriz') this.renderMatriz();
    if (this.view === 'supervision') this.renderSupervision();
    if (this.view === 'sistematizacion') this.renderSistematizacion();
    if (this.view === 'analisis') this.renderAnalisis();
    if (this.view === 'alumnos') this.renderAlumnos();
  },

  // ---------- Utilidades ----------
  esc(s) { return String(s ?? '').replace(/[&<>"']/g, c => ({ '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;' }[c])); },
  alumnosCurso(curso) { return this.estudiantes.filter(e => e.curso === curso && e.activo !== false).sort((a,b) => (a.no_orden||0)-(b.no_orden||0)); },
  alumnosGrado(grado) { return this.estudiantes.filter(e => Number(e.grado) === Number(grado) && e.activo !== false); },
  keyInd(eid, asig, ind) { return `${this.periodo}|${eid}|${asig}|${ind}`; },
  keyLec(eid) { return `${this.periodo}|${eid}`; },
  instrumento(grado, asig) { return D.instrumentos[grado]?.[asig] || null; },

  progreso(curso, asig) {
    const grado = Number(String(curso)[0]);
    const lista = this.alumnosCurso(curso);
    if (!lista.length) return 0;
    if (asig === 'LECTURA') {
      const hechos = lista.filter(e => this.evalLec[this.keyLec(e.id)]?.nivel).length;
      return Math.round(hechos / lista.length * 100);
    }
    const inst = this.instrumento(grado, asig);
    if (!inst) return 0;
    const total = lista.length * inst.indicadores.length;
    const hechos = lista.reduce((acc, e) => acc + inst.indicadores.filter(i => this.evalInd[this.keyInd(e.id, asig, i.id)]).length, 0);
    return total ? Math.round(hechos / total * 100) : 0;
  },

  conteo(curso, asig, ind) {
    const c = { E: 0, A: 0, S: 0 };
    this.alumnosCurso(curso).forEach(e => { const v = this.evalInd[this.keyInd(e.id, asig, ind)]; if (v) c[v]++; });
    return c;
  },

  renderLandingMetrics() {
    const mk = ciclo => {
      const est = this.estudiantes.filter(e => Number(e.ciclo) === ciclo && e.activo !== false).length;
      const doc = D.docentes.filter(d => d.ciclo === ciclo).length;
      return `<div><span class="metric-val">${est}</span><span class="metric-lbl">Estudiantes</span></div>
              <div><span class="metric-val">${doc}</span><span class="metric-lbl">Docentes</span></div>
              <div><span class="metric-val">9</span><span class="metric-lbl">Secciones</span></div>`;
    };
    const c1 = document.getElementById('landingMetricsC1');
    const c2 = document.getElementById('landingMetricsC2');
    if (c1) c1.innerHTML = mk(1);
    if (c2) c2.innerHTML = mk(2);
  },

  // ---------- Vista Docentes ----------
  renderDocentes() {
    const docentes = D.docentes.filter(d => d.ciclo === this.ciclo);
    document.getElementById('docentesContainer').innerHTML = `
      <div class="panel-card">
        <div class="panel-header">
          <div><h2>${this.ciclo === 1 ? 'Primer Ciclo · 1.º a 3.º' : 'Segundo Ciclo · 4.º a 6.º'}</h2>
          <p style="color:var(--text-muted);font-size:.88rem">Solo se muestran los docentes y secciones de este ciclo. Toque una asignación para abrir su matriz oficial.</p></div>
          <button class="btn-secondary" onclick="window.print()">🖨️ Imprimir vista</button>
        </div>
        <div class="teachers-grid">
          ${docentes.map(d => `
            <article class="teacher-card">
              <div class="teacher-top">
                <div class="teacher-avatar">${this.esc(d.nombre.split(' ').map(x=>x[0]).slice(0,2).join(''))}</div>
                <div><div class="teacher-name">${this.esc(d.nombre)}</div><div class="teacher-role">${this.esc(d.rol)}</div></div>
              </div>
              <div class="asig-chips">
                ${d.asignaciones.flatMap(a => a.asignaturas.map(asig => `
                  <button class="asig-btn" onclick="App.openMatriz('${a.curso}','${asig}')">
                    ${a.curso} · ${D.asignaturasMeta[asig]?.corto || asig} · ${this.progreso(a.curso, asig)}%
                  </button>`)).join('')}
              </div>
              ${d.asignaciones.map(a => `
                <div><div style="display:flex;justify-content:space-between;font-size:.78rem"><span>${a.curso}</span><span>${this.alumnosCurso(a.curso).length} estudiantes</span></div>
                <div class="progress-bar-wrap"><div class="progress-bar-fill" style="width:${this.progreso(a.curso, a.asignaturas[0])}%"></div></div></div>`).join('')}
            </article>`).join('')}
        </div>
      </div>`;
  },

  openMatriz(curso, asignatura) {
    this.matrizSel = { curso, asignatura };
    this.setView('matriz');
  },

  // ---------- Vista Matriz ----------
  renderMatriz() {
    const cont = document.getElementById('matrizContainer');
    const cursos = [...new Set(D.docentes.filter(d=>d.ciclo===this.ciclo).flatMap(d=>d.asignaciones.map(a=>a.curso)))].sort();
    if (!this.matrizSel.curso || !cursos.includes(this.matrizSel.curso)) this.matrizSel.curso = cursos[0];
    const curso = this.matrizSel.curso;
    const grado = Number(String(curso)[0]);
    const asigs = grado <= 3 ? ['LECTURA','LE','MAT'] : (grado === 4 ? ['LECTURA','LE','MAT','CS','CN'] : ['LE','MAT','CS','CN']);
    if (!asigs.includes(this.matrizSel.asignatura)) this.matrizSel.asignatura = asigs[0];
    const asig = this.matrizSel.asignatura;
    const lista = this.alumnosCurso(curso);

    let body = '';
    if (asig === 'LECTURA') {
      const niveles = grado === 4
        ? [{id:'fluido',label:'Fluido'},{id:'no_fluido',label:'No fluido'}]
        : D.nivelesLectura1erCiclo;
      body = `
        <div class="matrix-scroll-viewport"><table class="official-matrix">
          <thead>
            <tr class="row-comp"><th class="sticky-col-num">#</th><th class="sticky-col-name">Estudiante</th><th>Nivel de lectura</th><th>Observaciones</th></tr>
            <tr class="row-ind"><th class="sticky-col-num"></th><th class="sticky-col-name"></th>
              <th>${grado===4?'Fluido / No fluido':'Fluido · No fluido · Palabras · Sílabas · Imágenes'}</th><th>Registro del docente</th></tr>
            <tr class="row-eas"><th class="sticky-col-num"></th><th class="sticky-col-name"></th><th>Nivel</th><th>Texto</th></tr>
          </thead>
          <tbody>
            ${lista.map((e,i)=>{ const v=this.evalLec[this.keyLec(e.id)]||{}; return `
              <tr><td class="sticky-col-num">${i+1}</td><td class="sticky-col-name" title="${this.esc(e.apellidos)} ${this.esc(e.nombres)}">${this.esc(e.apellidos)}, ${this.esc(e.nombres)}</td>
              <td><select class="reading-select" onchange="App.setLectura(${e.id}, this.value, null)">
                <option value="">— Sin evaluar —</option>
                ${niveles.map(n=>`<option value="${n.id}" ${v.nivel===n.id?'selected':''}>${n.label}</option>`).join('')}
              </select></td>
              <td><input class="reading-select" value="${this.esc(v.observaciones||'')}" placeholder="Observación"
                onchange="App.setLectura(${e.id}, null, this.value)"></td></tr>`; }).join('')}
          </tbody>
          <tfoot><tr><td class="sticky-col-num"></td><td class="sticky-col-name">Total evaluados</td>
            <td>${lista.filter(e=>this.evalLec[this.keyLec(e.id)]?.nivel).length} / ${lista.length}</td><td></td></tr></tfoot>
        </table></div>`;
    } else {
      const inst = this.instrumento(grado, asig);
      if (!inst) { cont.innerHTML = '<div class="panel-card">Sin instrumento oficial para esta combinación.</div>'; return; }
      const compRow = inst.competencias.map(c =>
        `<th colspan="${c.indicadores.length}">${this.esc(c.nombre)}</th>`).join('');
      body = `
        <div class="matrix-scroll-viewport"><table class="official-matrix">
          <thead>
            <tr class="row-comp"><th class="sticky-col-num">#</th><th class="sticky-col-name">Estudiante</th>${compRow}</tr>
            <tr class="row-ind"><th class="sticky-col-num"></th><th class="sticky-col-name">Toque un indicador para ver su rúbrica oficial</th>
              ${inst.indicadores.map(ind=>`<th onclick="App.showRubrica(${grado},'${asig}','${ind.id}')" title="${this.esc(ind.texto)}">Ind. ${ind.id}<br><small>${this.esc(ind.texto.slice(0,70))}…</small></th>`).join('')}
            </tr>
            <tr class="row-eas"><th class="sticky-col-num"></th><th class="sticky-col-name">Nivel</th>
              ${inst.indicadores.map(()=>'<th>E · A · S</th>').join('')}
            </tr>
          </thead>
          <tbody>
            ${lista.map((e,i)=>`
              <tr><td class="sticky-col-num">${e.no_orden || i+1}</td>
              <td class="sticky-col-name" title="${this.esc(e.apellidos)} ${this.esc(e.nombres)}">${this.esc(e.apellidos)}, ${this.esc(e.nombres)}</td>
              ${inst.indicadores.map(ind=>{ const v=this.evalInd[this.keyInd(e.id,asig,ind.id)]||''; return `
                <td><span class="eas-group">
                  ${['E','A','S'].map(n=>`<button type="button" class="eas-btn ${v===n?'active-'+n:''}" onclick="App.setIndicador(${e.id},'${curso}','${asig}','${ind.id}','${n}')">${n}</button>`).join('')}
                </span></td>`; }).join('')}
              </tr>`).join('')}
          </tbody>
          <tfoot><tr><td class="sticky-col-num"></td><td class="sticky-col-name">Total por nivel</td>
            ${inst.indicadores.map(ind=>{ const c=this.conteo(curso,asig,ind.id); return `<td>E ${c.E} · A ${c.A} · S ${c.S}</td>`; }).join('')}
          </tr></tfoot>
        </table></div>`;
    }

    cont.innerHTML = `
      <div class="matrix-toolbar no-print">
        <div class="matrix-selectors">
          <select onchange="App.matrizSel.curso=this.value; App.renderMatriz()">
            ${cursos.map(c=>`<option ${c===curso?'selected':''}>${c}</option>`).join('')}
          </select>
          <select onchange="App.matrizSel.asignatura=this.value; App.renderMatriz()">
            ${asigs.map(a=>`<option value="${a}" ${a===asig?'selected':''}>${D.asignaturasMeta[a].nombre}</option>`).join('')}
          </select>
          <span style="font-size:.82rem;color:var(--text-muted)">${lista.length} estudiantes · ${this.progreso(curso,asig)}% completado</span>
        </div>
        <button class="btn-secondary" onclick="window.print()">🖨️ Imprimir / PDF</button>
      </div>
      <div class="panel-card" style="padding:.75rem">
        <h3 style="margin-bottom:.35rem">${curso} · ${D.asignaturasMeta[asig].nombre} · ${this.esc(document.getElementById('selectPeriodo').selectedOptions[0].textContent)}</h3>
        <p style="font-size:.8rem;color:var(--text-muted);margin-bottom:.75rem">Formato oficial: E = Elemental · A = Aceptable · S = Satisfactorio. El autoguardado se activa al tocar cada nivel.</p>
        ${body}
      </div>`;
  },

  setIndicador(estudianteId, curso, asig, indicador, valor) {
    const k = this.keyInd(estudianteId, asig, indicador);
    if (this.evalInd[k] === valor) delete this.evalInd[k]; else this.evalInd[k] = valor;
    this.queueSave(() => this.post('eval-indicador', {
      periodo: this.periodo, estudiante_id: estudianteId, curso, asignatura: asig,
      indicador_id: indicador, valor: this.evalInd[k] || ''
    }));
    this.renderMatriz();
  },

  setLectura(estudianteId, nivel, observaciones) {
    const k = this.keyLec(estudianteId);
    const cur = this.evalLec[k] || {};
    if (nivel !== null) cur.nivel = nivel || undefined;
    if (observaciones !== null) cur.observaciones = observaciones;
    this.evalLec[k] = cur;
    const curso = this.estudiantes.find(e=>e.id===estudianteId)?.curso;
    this.queueSave(() => this.post('eval-lectura', {
      periodo: this.periodo, estudiante_id: estudianteId, curso,
      nivel: cur.nivel || '', observaciones: cur.observaciones || ''
    }));
  },

  showRubrica(grado, asig, indId) {
    const ind = this.instrumento(grado, asig)?.indicadores.find(x=>x.id===indId);
    if (!ind) return;
    this.openModal(`
      <h3 style="margin-bottom:.5rem">Rúbrica oficial · Indicador ${ind.id}</h3>
      <p style="margin-bottom:1rem">${this.esc(ind.texto)}</p>
      <div class="distrito-counts" style="grid-template-columns:1fr">
        <div class="count-pill"><span>🔴 Elemental</span></div><p>${this.esc(ind.rubrica.E)}</p>
        <div class="count-pill"><span>🟡 Aceptable</span></div><p>${this.esc(ind.rubrica.A)}</p>
        <div class="count-pill"><span>🟢 Satisfactorio</span></div><p>${this.esc(ind.rubrica.S)}</p>
      </div>
      <button class="btn-primary" style="margin-top:1rem" onclick="App.closeModal()">Cerrar</button>`);
  },

  // ---------- Supervisión ----------
  renderSupervision() {
    const docentes = D.docentes.filter(d=>d.ciclo===this.ciclo);
    document.getElementById('supervisionContainer').innerHTML = `
      <div class="panel-card">
        <div class="panel-header"><h2>Supervisión de coordinación · Ciclo ${this.ciclo}</h2>
        <button class="btn-secondary" onclick="window.print()">🖨️ Exportar PDF</button></div>
        <div class="matrix-scroll-viewport"><table class="official-matrix">
          <thead><tr class="row-comp"><th class="sticky-col-num">#</th><th class="sticky-col-name">Docente</th><th>Curso</th><th>Asignatura</th><th>Avance</th><th>Estado</th></tr></thead>
          <tbody>
          ${docentes.flatMap((d,di)=>d.asignaciones.flatMap(a=>a.asignaturas.map(asig=>{ const p=this.progreso(a.curso,asig); return `
            <tr><td class="sticky-col-num">${di+1}</td><td class="sticky-col-name">${this.esc(d.nombre)}</td>
            <td>${a.curso}</td><td>${D.asignaturasMeta[asig].nombre}</td>
            <td><div class="progress-bar-wrap"><div class="progress-bar-fill" style="width:${p}%"></div></div> ${p}%</td>
            <td>${p===100?'✅ Completo':p===0?'⚪ Sin iniciar':'🟡 En proceso'}</td></tr>`; }))).join('')}
          </tbody></table></div>
        <p style="font-size:.82rem;color:var(--text-muted);margin-top:.75rem">Instrumento de consolidación por coordinador: este consolidado agrupa únicamente las secciones del ciclo activo, sin mostrar el otro ciclo.</p>
      </div>`;
  },

  // ---------- Sistematización distrital ----------
  renderSistematizacion() {
    const grados = this.ciclo === 1 ? [1,2,3] : [4,5,6];
    const asigsPorGrado = g => g <= 3 ? ['LE','MAT'] : ['LE','MAT','CS','CN'];
    const bloqueLectura = this.ciclo === 1 ? grados.map(g => {
      const lista = this.alumnosGrado(g);
      const c = { fluido:0,no_fluido:0,palabras:0,silabas:0,imagenes:0 };
      lista.forEach(e=>{ const n=this.evalLec[this.keyLec(e.id)]?.nivel; if(n && c[n]!==undefined) c[n]++; });
      return `<div class="distrito-ind-card"><strong>${g}.er grado · Niveles de Lectura</strong>
        <div class="distrito-counts">
          <span class="count-pill">Fluido <b>${c.fluido}</b></span><span class="count-pill">No fluido <b>${c.no_fluido}</b></span>
          <span class="count-pill">Palabras <b>${c.palabras}</b></span><span class="count-pill">Sílabas <b>${c.silabas}</b></span>
          <span class="count-pill">Imágenes <b>${c.imagenes}</b></span>
          <span class="count-pill">Suma / Matrícula <b>${Object.values(c).reduce((a,b)=>a+b,0)} / ${lista.length}</b></span>
        </div></div>`;
    }).join('') : '';

    document.getElementById('sistematizacionContainer').innerHTML = `
      <div class="distrito-box">
        <div class="panel-header"><div>
          <h2>Sistematización Evaluación de Seguimiento · ${this.ciclo===1?'Primer Ciclo':'Segundo Ciclo'}, Nivel Primario</h2>
          <p style="color:var(--text-muted);font-size:.85rem">Formato oficial para envío al Distrito Educativo · Registro hasta el 20 de noviembre de 2026, 4:00 p. m.</p>
        </div><button class="btn-primary no-print" onclick="window.print()">🖨️ Exportar PDF oficial</button></div>

        <div class="distrito-ind-card"><strong>Datos generales del centro educativo</strong>
          <div class="distrito-counts">
            ${[['Correo','correo'],['Código SIGERD (5 dígitos)','codigo_sigerd'],['Centro educativo','nombre_centro'],['Regional','regional'],['Distrito Educativo','distrito'],['Sector','sector'],['Tipo','tipo'],['Tanda','tanda']]
              .map(([lbl,k])=>`<label style="font-size:.8rem">${lbl}<input class="reading-select" value="${this.esc(this.centro[k]||'')}" onchange="App.setCentro('${k}',this.value)"></label>`).join('')}
          </div></div>

        <div class="distrito-ind-card"><strong>Matrícula por grado</strong><div class="distrito-counts">
          ${grados.map(g=>`<span class="count-pill">${g}.º grado <b>${this.alumnosGrado(g).length}</b></span>`).join('')}
        </div></div>

        ${bloqueLectura}

        ${grados.map(g=>asigsPorGrado(g).map(asig=>{
          const inst=this.instrumento(g,asig); if(!inst) return '';
          const matricula=this.alumnosGrado(g).length;
          return `<h3 style="margin:1rem 0 .5rem">${g}.º Grado · ${D.asignaturasMeta[asig].nombre}</h3>` +
            inst.indicadores.map(ind=>{
              const tot={E:0,A:0,S:0};
              this.alumnosGrado(g).forEach(e=>{ const v=this.evalInd[this.keyInd(e.id,asig,ind.id)]; if(v) tot[v]++; });
              const suma=tot.E+tot.A+tot.S;
              return `<div class="distrito-ind-card"><strong>Indicador ${ind.id}.</strong> ${this.esc(ind.texto)}
                <div class="distrito-counts">
                  <span class="count-pill">Elemental <b>${tot.E}</b></span>
                  <span class="count-pill">Aceptable <b>${tot.A}</b></span>
                  <span class="count-pill">Satisfactorio <b>${tot.S}</b></span>
                  <span class="count-pill">Suma / Matrícula <b>${suma} / ${matricula}</b> ${suma===matricula?'✅':'⚠️'}</span>
                </div></div>`;
            }).join('');
        }).join('')).join('')}
        <p style="font-size:.8rem;color:var(--text-muted)">© 2026 Ministerio de Educación</p>
      </div>`;
  },

  setCentro(campo, valor) {
    this.centro[campo] = valor;
    this.queueSave(() => this.post('centro', this.centro));
  },

  // ---------- Análisis / Riesgo / Reforzamiento ----------
  renderAnalisis() {
    const grados = this.ciclo === 1 ? [1,2,3] : [4,5,6];
    const asigs = this.ciclo === 1 ? ['LE','MAT'] : ['LE','MAT','CS','CN'];
    const filas = [], riesgo = [];

    grados.forEach(g => asigs.forEach(asig => {
      const inst = this.instrumento(g, asig); if (!inst) return;
      inst.indicadores.forEach(ind => {
        const tot = {E:0,A:0,S:0};
        this.alumnosGrado(g).forEach(e=>{ const v=this.evalInd[this.keyInd(e.id,asig,ind.id)]; if(v) tot[v]++; });
        const n = tot.E+tot.A+tot.S;
        filas.push({ g, asig, ind: ind.id, ...tot, n,
          pE: n?Math.round(tot.E/n*100):0, pA: n?Math.round(tot.A/n*100):0, pS: n?Math.round(tot.S/n*100):0 });
      });
    }));

    this.estudiantes.filter(e=>Number(e.ciclo)===this.ciclo && e.activo!==false).forEach(e=>{
      const g = Number(e.grado);
      let elem = 0, total = 0;
      asigs.forEach(asig=>{ const inst=this.instrumento(g,asig); if(!inst) return;
        inst.indicadores.forEach(ind=>{ const v=this.evalInd[this.keyInd(e.id,asig,ind.id)]; if(v){ total++; if(v==='E') elem++; } }); });
      if (g <= 3) { const lec=this.evalLec[this.keyLec(e.id)]?.nivel; if(['silabas','imagenes'].includes(lec)) elem += 2; }
      if (total && elem >= 2) riesgo.push({ e, elem, total, pct: Math.round(elem/total*100) });
    });
    riesgo.sort((a,b)=>b.pct-a.pct);

    document.getElementById('analisisContainer').innerHTML = `
      <div class="panel-card">
        <div class="panel-header"><h2>Análisis estadístico · Ciclo ${this.ciclo}</h2>
        <button class="btn-primary" onclick="window.print()">🖨️ Exportar análisis en PDF</button></div>
        <div class="matrix-scroll-viewport"><table class="official-matrix">
          <thead><tr class="row-comp"><th class="sticky-col-num">G</th><th class="sticky-col-name">Asignatura · Indicador</th><th>E</th><th>A</th><th>S</th><th>Distribución %</th></tr></thead>
          <tbody>${filas.map(f=>`<tr><td class="sticky-col-num">${f.g}º</td>
            <td class="sticky-col-name">${D.asignaturasMeta[f.asig].corto} · Ind. ${f.ind}</td>
            <td>${f.E} (${f.pE}%)</td><td>${f.A} (${f.pA}%)</td><td>${f.S} (${f.pS}%)</td>
            <td><div class="progress-bar-wrap" title="E/A/S"><div style="height:100%;width:${f.pE}%;background:#ef4444;float:left"></div><div style="height:100%;width:${f.pA}%;background:#f59e0b;float:left"></div><div style="height:100%;width:${f.pS}%;background:#22c55e;float:left"></div></div></td></tr>`).join('')}
          </tbody></table></div>
      </div>

      <div class="panel-card">
        <h3>🚨 Estudiantes con mayores riesgos</h3>
        <p style="font-size:.85rem;color:var(--text-muted)">Criterio: dos o más indicadores en Elemental; en 1.º–3.º también pondera lectura en Sílabas o Imágenes.</p>
        ${riesgo.length ? `<div class="matrix-scroll-viewport"><table class="official-matrix">
          <thead><tr class="row-comp"><th class="sticky-col-num">#</th><th class="sticky-col-name">Estudiante</th><th>Sección</th><th>Elementales</th><th>Riesgo</th></tr></thead>
          <tbody>${riesgo.map((r,i)=>`<tr><td class="sticky-col-num">${i+1}</td><td class="sticky-col-name">${this.esc(r.e.apellidos)}, ${this.esc(r.e.nombres)}</td><td>${r.e.curso}</td><td>${r.elem} / ${r.total}</td><td>${r.pct}%</td></tr>`).join('')}</tbody></table></div>`
        : '<p style="margin-top:.75rem">Sin estudiantes en riesgo con los datos registrados en este período.</p>'}
      </div>

      <div class="panel-card">
        <h3>📝 Plan de reforzamiento para casos Elementales</h3>
        ${filas.filter(f=>f.E>0).map(f=>`
          <div class="distrito-ind-card"><strong>${f.g}º · ${D.asignaturasMeta[f.asig].nombre} · Indicador ${f.ind} — ${f.E} en Elemental (${f.pE}%)</strong>
          <p style="font-size:.86rem;margin-top:.4rem">Acciones sugeridas: agrupamiento homogéneo temporal, modelado explícito del indicador, práctica guiada con rúbrica simplificada, retroalimentación inmediata, reevaluación formativa en 2 semanas y registro de avance en la matriz del próximo seguimiento.</p></div>`).join('') || '<p>Sin casos Elementales registrados.</p>'}
      </div>`;
  },

  // ---------- Alumnos ----------
  renderAlumnos() {
    const lista = this.estudiantes.filter(e=>!this.ciclo || Number(e.ciclo)===this.ciclo)
      .sort((a,b)=>a.curso.localeCompare(b.curso) || (a.no_orden||0)-(b.no_orden||0));
    document.getElementById('alumnosContainer').innerHTML = `
      <div class="panel-card">
        <div class="panel-header"><h2>Matrícula oficial · Ciclo ${this.ciclo || '—'}</h2>
        <button class="btn-primary" onclick="App.editAlumno()">➕ Inscribir alumno</button></div>
        <div class="matrix-scroll-viewport"><table class="official-matrix">
          <thead><tr class="row-comp"><th class="sticky-col-num">#</th><th class="sticky-col-name">Estudiante</th><th>Matrícula</th><th>Sección</th><th>Acción</th></tr></thead>
          <tbody>${lista.map((e,i)=>`<tr><td class="sticky-col-num">${e.no_orden||i+1}</td>
            <td class="sticky-col-name">${this.esc(e.apellidos)}, ${this.esc(e.nombres)}</td>
            <td>${this.esc(e.matricula)}</td><td>${this.esc(e.curso)}</td>
            <td><button class="btn-secondary" onclick="App.editAlumno(${e.id})">Editar</button></td></tr>`).join('')}
          </tbody></table></div>
        <p style="font-size:.82rem;color:var(--text-muted);margin-top:.75rem">Los cambios se guardan en Neon.tech mediante <code>/api/estudiante</code> y quedan respaldados localmente.</p>
      </div>`;
  },

  editAlumno(id) {
    const e = this.estudiantes.find(x=>x.id===id) || { matricula:'', no_orden:'', apellidos:'', nombres:'', curso: this.ciclo===1?'1P-A':'4P-A' };
    this.openModal(`
      <h3>${id?'Editar':'Inscribir'} alumno</h3>
      <div class="distrito-counts" style="grid-template-columns:1fr 1fr">
        <label>Matrícula<input id="f-mat" class="reading-select" value="${this.esc(e.matricula)}"></label>
        <label>No. orden<input id="f-no" type="number" class="reading-select" value="${this.esc(e.no_orden)}"></label>
        <label>Apellidos<input id="f-ape" class="reading-select" value="${this.esc(e.apellidos)}"></label>
        <label>Nombres<input id="f-nom" class="reading-select" value="${this.esc(e.nombres)}"></label>
        <label>Sección (ej. 1P-A)<input id="f-curso" class="reading-select" value="${this.esc(e.curso)}"></label>
      </div>
      <div style="display:flex;gap:.5rem;margin-top:1rem">
        <button class="btn-primary" onclick="App.saveAlumno(${id||'null'})">Guardar</button>
        <button class="btn-secondary" onclick="App.closeModal()">Cancelar</button>
      </div>`);
  },

  async saveAlumno(id) {
    const curso = document.getElementById('f-curso').value.trim().toUpperCase();
    const grado = Number(curso[0]);
    const body = {
      id: id || undefined,
      matricula: document.getElementById('f-mat').value.trim(),
      no_orden: Number(document.getElementById('f-no').value || 0),
      apellidos: document.getElementById('f-ape').value.trim(),
      nombres: document.getElementById('f-nom').value.trim(),
      curso, grado, seccion: curso.slice(-1), ciclo: grado <= 3 ? 1 : 2, activo: true
    };
    try {
      const r = await this.post('estudiante', body);
      if (r.estudiante) {
        const i = this.estudiantes.findIndex(x=>x.id===r.estudiante.id);
        if (i>=0) this.estudiantes[i]=r.estudiante; else this.estudiantes.push(r.estudiante);
      }
    } catch (_) {
      if (id) Object.assign(this.estudiantes.find(x=>x.id===id), body);
      else this.estudiantes.push({ ...body, id: Date.now() });
    }
    this.persistLocal(); this.closeModal(); this.renderAlumnos(); this.renderLandingMetrics();
  },

  openModal(html) {
    const m = document.getElementById('appModal');
    document.getElementById('appModalContent').innerHTML = html;
    m.style.display = 'flex';
  },
  closeModal() { document.getElementById('appModal').style.display = 'none'; }
};

window.App = App;
document.addEventListener('DOMContentLoaded', () => App.init());
