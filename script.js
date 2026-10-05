(() => {
  'use strict';
  const WA = '51942827023';
  // Edita aquí tus cursos: dur = corto | medio | largo ; precio 0 = gratis
  const COURSES = [
    {t:'Introducción a QGIS', d:'Primeros pasos en SIG: capas, proyecciones y mapas.', dur:'corto', w:'1 semana', precio:0, tools:'QGIS'},
    {t:'Primeros pasos en Google Earth Engine', d:'Conoce la plataforma y visualiza imágenes satelitales.', dur:'corto', w:'1 semana', precio:0, tools:'GEE'},
    {t:'ArcGIS Básico', d:'ArcGIS, Google Earth Engine y RStudio aplicados al análisis espacial.', dur:'corto', w:'3 semanas', precio:30, tools:'ArcGIS · GEE · RStudio'},
    {t:'Análisis Ambiental y Detección de Cambios', d:'Landsat 8/9 y Sentinel-2/3: NDVI, dNBR, MNDWI y deforestación en Tambopata.', dur:'corto', w:'3 semanas', precio:30, tools:'GEE · QGIS · Python'},
    {t:'Fundamentos de Teledetección', d:'Bandas, firmas espectrales, índices y correcciones.', dur:'medio', w:'6 semanas', precio:0, tools:'QGIS · GEE'},
    {t:'Python para SIG gratis', d:'Automatiza tareas geoespaciales con GeoPandas y Rasterio.', dur:'medio', w:'6 semanas', precio:0, tools:'Python'},
    {t:'ArcGIS Intermedio y Cartografía Temática', d:'Geoprocesos, modelos, layouts y mapas profesionales.', dur:'medio', w:'8 semanas', precio:90, tools:'ArcGIS'},
    {t:'Google Earth Engine Avanzado', d:'Series temporales, clasificación y automatización con JavaScript.', dur:'medio', w:'8 semanas', precio:120, tools:'GEE'},
    {t:'Ruta SIG desde cero (gratis)', d:'Ruta completa de aprendizaje: conceptos, QGIS y mapas web.', dur:'largo', w:'12 semanas', precio:0, tools:'QGIS · Web'},
    {t:'Comunidad Geospatial: Proyectos Abiertos', d:'Trabaja en proyectos reales con mentoría colectiva.', dur:'largo', w:'12 semanas', precio:0, tools:'Todas'},
    {t:'Especialización en Teledetección Ambiental', d:'Programa completo: preprocesamiento, índices, cambios y reportes técnicos.', dur:'largo', w:'16 semanas', precio:350, tools:'GEE · ArcGIS · Python · R'},
    {t:'Diplomado en SIG y Geovisores Web', d:'Del dato al geovisor: bases de datos, APIs y publicación de mapas.', dur:'largo', w:'20 semanas', precio:480, tools:'ArcGIS · QGIS · Web'}
  ];
  const DUR = [['todos','Todos'],['corto','Cortos'],['medio','Medios'],['largo','Largos']];
  const PRI = [['todos','Todos'],['gratis','Gratis'],['pago','De pago']];
  const st = {dur:'todos', pri:'todos', q:''};
  const $ = s => document.querySelector(s);
  const norm = s => s.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'');
  const wa = msg => `https://wa.me/${WA}?text=${encodeURIComponent(msg)}`;

  function chips(el, list, key){
    el.innerHTML = list.map(([v,l]) => `<button class="chip" data-v="${v}" aria-pressed="${st[key]===v}">${l}</button>`).join('');
    el.onclick = e => { const b = e.target.closest('.chip'); if(!b) return; st[key]=b.dataset.v; sync(); render(); };
  }
  function sync(){ chips($('#fDur'),DUR,'dur'); chips($('#fPrice'),PRI,'pri'); }

  function render(){
    const q = norm(st.q);
    const list = COURSES.filter(c =>
      (st.dur==='todos'||c.dur===st.dur) &&
      (st.pri==='todos'||(st.pri==='gratis')===(c.precio===0)) &&
      norm(c.t+' '+c.d+' '+c.tools).includes(q));
    $('#count').textContent = `${list.length} curso${list.length===1?'':'s'} encontrado${list.length===1?'':'s'}`;
    $('#grid').innerHTML = list.map((c,i) => {
      const free = c.precio===0;
      return `<article class="card ${free?'free':''}" style="animation-delay:${i*40}ms">
        <div class="tags"><span class="tag">${c.dur.toUpperCase()}</span><span class="tag ${free?'free':'paid'}">${free?'GRATIS':'DE PAGO'}</span></div>
        <h3>${c.t}</h3><p>${c.d}</p>
        <div class="meta">⏱ ${c.w} · 💻 Virtual · 🛠 ${c.tools}</div>
        <div class="price ${free?'free':''}">${free?'Gratis':'S/ '+c.precio}</div>
        <a class="btn" target="_blank" rel="noopener" href="${wa('Hola, quiero inscribirme en: '+c.t)}">${free?'Acceder gratis':'Inscribirme'}</a>
      </article>`;
    }).join('') || '<p class="muted">No hay cursos con esos filtros.</p>';
  }

  $('#q').addEventListener('input', e => { st.q = e.target.value; render(); });
  document.querySelector('[data-quick]').addEventListener('click', () => { st.pri='gratis'; sync(); render(); });
  document.querySelectorAll('[data-wa]').forEach(a => { a.href = wa(a.dataset.wa); a.target='_blank'; a.rel='noopener'; });
  $('#y').textContent = new Date().getFullYear();
  sync(); render();
})();
