/* 実在建築の外観を参考にした目印。位置は点、離した絵は引き出し線で結ぶ。 */
(function () {
  'use strict';
  const sessions = new WeakMap();
  const collection = features => ({ type: 'FeatureCollection', features });
  const point = (coordinates, properties) => ({ type: 'Feature', geometry: { type: 'Point', coordinates }, properties });
  function afterMarkers(gl) {
    const s = sessions.get(gl);
    if (!s || s.removed) return;
    clearTimeout(s.timer);
    s.timer = setTimeout(() => refresh(gl), 400);
  }

  function refresh(gl) {
    const s = sessions.get(gl);
    if (!s || s.removed || !gl.getSource('building-art')) return;
    const features = s.fixed.concat(s.places.filter(p => p.name.includes('シーボルト') && Number.isFinite(p.lat) && Number.isFinite(p.lng)).map(p =>
      point([p.lng, p.lat], { name: 'シーボルトの湯', art: 'siebold', dx: 85, dy: 85 })));
    // 広域では絵同士を離す。詳細表示では実際の場所へ近づける。
    const spread = Math.max(0.2, Math.min(1, (16 - gl.getZoom()) / 3));
    const lines = [];
    const canvas = gl.getCanvas().getBoundingClientRect();
    const mapRect = document.getElementById('map').getBoundingClientRect();
    const viewport = { left: mapRect.left - canvas.left, right: mapRect.right - canvas.left, top: mapRect.top - canvas.top + 55, bottom: mapRect.bottom - canvas.top - 28 };
    const obstacles = [...document.querySelectorAll('#map .leaflet-marker-icon, .map-legend, .map-tools')].map(el => {
      const r = el.getBoundingClientRect();
      return { left: r.left - canvas.left - 5, right: r.right - canvas.left + 5, top: r.top - canvas.top - 5, bottom: r.bottom - canvas.top + 5 };
    });
    const overlap = (a, b) => Math.max(0, Math.min(a.right, b.right) - Math.max(a.left, b.left)) * Math.max(0, Math.min(a.bottom, b.bottom) - Math.max(a.top, b.top));
    const pictures = features.map(f => {
      const xy = gl.project(f.geometry.coordinates);
      const p = f.properties;
      let offset = [p.dx * spread, p.dy * spread];
      // 店舗ピンを避ける。建物を座標の上へ重ねず、実際の位置は引き出し線で示す。
      if (gl.getZoom() >= 14 && xy.x >= viewport.left && xy.x <= viewport.right && xy.y >= viewport.top && xy.y <= viewport.bottom) {
        const desired = offset;
        const side = p.dx < 0 ? -1 : 1;
        const candidates = [desired, [side * 65, -35], [side * 100, -35], [side * 65, 60], [side * 100, 80], [side * 40, 100]];
        const box = ([dx, dy]) => ({ left: xy.x + dx - 48, right: xy.x + dx + 48, top: xy.y + dy - 76, bottom: xy.y + dy + 20 });
        const score = d => {
          const b = box(d);
          return obstacles.reduce((sum, o) => sum + overlap(b, o) * 10, 0) + (9216 - overlap(b, viewport)) * 30 + ((d[0] - desired[0]) ** 2 + (d[1] - desired[1]) ** 2) * 0.5;
        };
        offset = candidates.reduce((best, c) => score(c) < score(best) ? c : best, desired);
        obstacles.push(box(offset));
      }
      const end = gl.unproject([xy.x + offset[0], xy.y + offset[1]]);
      const coordinates = [end.lng, end.lat];
      lines.push({ type: 'Feature', geometry: { type: 'LineString', coordinates: [f.geometry.coordinates, coordinates] }, properties: {} });
      return point(coordinates, p);
    });
    gl.getSource('building-points').setData(collection(features));
    gl.getSource('building-leaders').setData(collection(lines));
    gl.getSource('building-art').setData(collection(pictures));
  }

  function install(gl) {
    if (sessions.has(gl)) return;
    const s = { places: [], fixed: [], removed: false, images: [] };
    sessions.set(gl, s);
    const setup = () => {
      if (s.removed) return;
      for (const [key, image] of s.images) {
        if (!gl.hasImage(key)) gl.addImage(key, image, { pixelRatio: image.width / 128 });
      }
      // 未確認の施設を架空の建築で表さない。名前は残す。
      for (const id of ['landmark-labels', 'local-bath-landmarks']) {
        if (!gl.getLayer(id)) continue;
        gl.setLayoutProperty(id, 'icon-image', null);
        gl.setLayoutProperty(id, 'text-offset', [0, 0]);
      }
      if (gl.getLayer('landmark-labels')) {
        if (!s.filter) s.filter = gl.getFilter('landmark-labels');
        gl.setFilter('landmark-labels', ['all', s.filter, ['!=', ['get', 'name'], '豊玉姫神社']]);
      }
      if (!gl.getSource('building-art')) {
        ['building-art', 'building-points', 'building-leaders'].forEach(id => gl.addSource(id, { type: 'geojson', data: collection([]) }));
        gl.addLayer({ id: 'building-leaders', type: 'line', source: 'building-leaders', paint: { 'line-color': '#9c7968', 'line-width': 1.2, 'line-opacity': 0.85 } });
        gl.addLayer({ id: 'building-points', type: 'circle', source: 'building-points', paint: { 'circle-radius': 3, 'circle-color': '#a66657', 'circle-stroke-width': 1.5, 'circle-stroke-color': '#fff7e7' } });
        gl.addLayer({ id: 'building-art', type: 'symbol', source: 'building-art', layout: {
          'icon-image': ['concat', 'building-', ['get', 'art']], 'icon-size': ['interpolate', ['linear'], ['zoom'], 13, 0.85, 14, 0.55], 'icon-optional': true,
          'icon-anchor': 'bottom', 'icon-allow-overlap': true,
          'text-field': ['get', 'name'], 'text-font': ['Noto Sans Regular'], 'text-size': 12,
          'text-anchor': 'top', 'text-offset': [0, 0.15], 'text-max-width': 8,
          'text-allow-overlap': true, 'text-ignore-placement': true,
        }, paint: { 'text-color': '#584c43', 'text-halo-color': '#fff7e7', 'text-halo-width': 2.5 } });
      }
      refresh(gl);
    };
    gl.on('load', () => { s.loaded = true; setup(); afterMarkers(gl); });
    gl.on('zoom', () => refresh(gl));
    gl.on('moveend', () => afterMarkers(gl));
    gl.on('remove', () => { s.removed = true; clearTimeout(s.timer); });
    fetch('assets/map-landmarks.json?v=2026-10-23').then(r => {
      if (!r.ok) throw new Error('landmarks');
      return r.json();
    }).then(data => { s.fixed = data.features; refresh(gl); }).catch(() => { /* 店舗由来の目印は引き続き表示 */ });
    Promise.all(['siebold', 'toyotama', 'cityhall'].map(key => new Promise(resolve => {
      const img = new Image();
      img.onload = () => resolve(['building-' + key, img]);
      img.onerror = () => resolve(null);
      img.src = 'assets/landmarks/' + key + '.png?v=1';
    }))).then(items => { s.images.push(...items.filter(Boolean)); if (s.loaded) setup(); });
    // 公園は建物ではなく汎用の樹木記号。
    const tree = new Image();
    tree.onload = () => {
      s.images.push(['walk-park', tree]);
      if (s.loaded) setup();
    };
    tree.src = 'data:image/svg+xml,' + encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" width="128" height="128" viewBox="0 0 128 128"><path d="M42 108V62m45 46V54" stroke="#9a7a56" stroke-width="6"/><path d="M42 79C7 81 12 47 25 42 13 12 62 10 60 36 83 48 70 80 42 79M87 68C58 72 58 43 72 34 66 7 101 6 105 27 129 45 113 70 87 68" fill="#89ad80" stroke="#607e61" stroke-width="2"/></svg>');
  }
  function update(gl, places) {
    const s = sessions.get(gl);
    if (!s) return;
    s.places = places;
    refresh(gl);
    afterMarkers(gl);
  }
  window.TofuMapArt = { install, update };
})();
