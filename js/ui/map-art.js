/* 実在建築の外観を参考にした目印。すべてのズームで実座標に固定する。 */
(function () {
  'use strict';
  const sessions = new WeakMap();
  const collection = features => ({ type: 'FeatureCollection', features });
  const point = (coordinates, properties) => ({ type: 'Feature', geometry: { type: 'Point', coordinates }, properties });

  function refresh(gl) {
    const s = sessions.get(gl);
    if (!s || s.removed || !gl.getSource('building-art')) return;
    const features = s.fixed.concat(s.places.filter(p => p.name.includes('シーボルト') && Number.isFinite(p.lat) && Number.isFinite(p.lng)).map(p =>
      point([p.lng, p.lat], { name: 'シーボルトの湯', art: 'siebold' })));
    gl.getSource('building-art').setData(collection(features));
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
        gl.setFilter('landmark-labels', ['all', s.filter, ['!', ['in', ['get', 'name'], ['literal', [
          '豊玉姫神社', '元祖忍者村 肥前夢街道', '嬉野温泉駅', '湯っつら広場', 'うれしのお茶ちゃ村',
        ]]]]]);
      }
      if (!gl.getSource('building-art')) {
        gl.addSource('building-art', { type: 'geojson', data: collection([]) });
        gl.addLayer({ id: 'building-art', type: 'symbol', source: 'building-art', layout: {
          'icon-image': ['concat', 'building-', ['get', 'art']], 'icon-size': ['interpolate', ['linear'], ['zoom'], 12, 0.28, 15, 0.52, 18, 0.68], 'icon-optional': true,
          'icon-anchor': 'center', 'icon-allow-overlap': true,
          'text-field': ['get', 'name'], 'text-font': ['Noto Sans Regular'], 'text-size': ['interpolate', ['linear'], ['zoom'], 12, 10, 15, 12, 18, 13],
          'text-anchor': 'top', 'text-offset': ['interpolate', ['linear'], ['zoom'], 12, ['literal', [0, 2.2]], 15, ['literal', [0, 3]], 18, ['literal', [0, 3.8]]], 'text-max-width': 8,
          // 広域では地名を間引き、街歩きの縮尺では目印名を必ず読めるようにする。
          'text-allow-overlap': ['step', ['zoom'], false, 15, true],
          'text-ignore-placement': ['step', ['zoom'], false, 15, true], 'text-optional': true,
        }, paint: { 'text-color': '#584c43', 'text-halo-color': '#fff7e7', 'text-halo-width': 2.5 } });
      }
      refresh(gl);
    };
    gl.on('load', () => { s.loaded = true; setup(); });
    gl.on('remove', () => { s.removed = true; });
    fetch('assets/map-landmarks.json?v=2026-10-23-3').then(r => {
      if (!r.ok) throw new Error('landmarks');
      return r.json();
    }).then(data => { s.fixed = data.features; refresh(gl); }).catch(() => { /* 店舗由来の目印は引き続き表示 */ });
    Promise.all(['siebold', 'cityhall', 'namazu', 'ochacha', 'ninja', 'yuttsura', 'station'].map(key => new Promise(resolve => {
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
  }
  window.TofuMapArt = { install, update };
})();
