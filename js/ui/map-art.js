/* 地図上の目印。道路や施設の位置はOpenStreetMapのベクタータイルを使用。
 * 絵はこのサイト用のSVG。道路を絵で置換せず、施設の座標に描く。
 */
(function () {
  'use strict';
  const tree = '<path d="M17 66V43" stroke="#8d7252" stroke-width="3"/><path d="M17 51L9 44m8 1 8-8" fill="none"/><path d="M7 42C-1 29 7 20 14 23 17 11 29 18 29 26 39 34 31 48 22 45 15 52 9 48 7 42Z" fill="#91b486"/><path d="M12 27C5 33 8 40 11 41" stroke="#c5d9a6" fill="none" stroke-width="3"/>';
  const drawings = {
    siebold: '<ellipse cx="49" cy="77" rx="45" ry="5" fill="#cbd1b3" stroke="none"/><path d="M8 43h78v31H8z" fill="#f6e6b7"/><path d="M2 44l13-17h62l14 17z" fill="#cb8155"/><path d="M16 32h13v42H16zM66 32h13v42H66z" fill="#f8eac9"/><path d="M32 27h31v47H32z" fill="#f6e7c1"/><path d="M29 28c3-8 3-13 7-18l12-9 12 9c4 5 4 10 7 18z" fill="#cc865b"/><path d="M37 11h22v15H37z" fill="#f8e8b9"/><path d="M33 11 48 0l15 11z" fill="#a76549"/><circle cx="48" cy="19" r="5" fill="#fff8df"/><path d="M48 16v4h3M38 29v43m20-43v43" fill="none"/><path d="M20 46h6v16h-6zm50 0h6v16h-6zM10 48h4v14h-4zm71 0h3v14h-3z" fill="#88b5bc"/><path d="M42 73V54a6 6 0 0 1 12 0v19z" fill="#819b9d"/><path d="M5 73h84v5H5z" fill="#bda887"/><path d="M43 38h10v7H43z" fill="#9ab8bb"/>',
    castle: '<path d="M9 75h78l-9-16H19z" fill="#a8a695"/><path d="M23 58V39h49v21zM32 33V17h32v20z" fill="#efe4c3"/><path d="M15 40l34-18 31 18-8 5H22zM25 17 48 4l23 13-7 5H32z" fill="#7e8c7b"/><path d="M30 47h7v9h-7zm30 0h7v9h-7zM43 28h10v8H43z" fill="#746b55"/><path d="M43 62V48h11v14" fill="#b7946d"/><path d="M14 70h69M21 63l5 12m41-12 6 12" fill="none"/>',
    park: '<path d="M7 68Q43 51 91 67L79 77 17 77Z" fill="#ccdba3"/>'+tree+'<g transform="translate(56 -8) scale(.9)">'+tree+'</g><path d="M35 62h25v6H35zm3 6v7m19-7v7m-23-18h27v5H34z" fill="#d3ad76"/><path d="M39 77Q44 65 48 74L52 80" fill="#f8edd4" stroke="none"/>',
    shrine: '<path d="M5 75h86l-8-7H15z" fill="#c9cbb6"/><path d="M30 62V36h44v26z" fill="#e7d4ad"/><path d="M24 37Q44 29 52 22 62 32 83 37L75 42H29z" fill="#727d68"/><path d="M47 44h13v18H47z" fill="#987d60"/><path d="M17 27h7v46h-7zm58 0h7v46h-7z" fill="#b86e58"/><path d="M9 19Q48 26 90 19l-3 8Q47 32 12 27zM13 36h73v6H13z" fill="#c78065"/><path d="M10 18Q48 25 90 18" fill="none" stroke="#65594c" stroke-width="3"/><path d="M47 30v8h6v-8" fill="#e0c184"/>',
    bath: '<ellipse cx="48" cy="74" rx="43" ry="7" fill="#d7d2ad" stroke="none"/><path d="M11 41h72v31H11z" fill="#f8e7b8"/><path d="M5 42l13-14h59l13 14z" fill="#b87559"/><path d="M20 28l11-10h30l15 10z" fill="#d69967"/><path d="M37 20V9h23v14" fill="#f6dfae"/><path d="M33 9l15-8 16 8z" fill="#ab7657"/><path d="M42 12h12v8H42z" fill="#92aeb0"/><path d="M17 49h10v13H17zm16 0h10v13H33zm22 0h10v13H55zm16 0h7v13H71z" fill="#8faeb1"/><path d="M43 72V55a7 7 0 0 1 14 0v17" fill="#8a7157"/><path d="M8 70h78v5H8z" fill="#bba789"/><path d="M71 20c-6-5 5-9 0-15m10 16c-5-5 5-9 0-15" fill="none" stroke="#a4aaa0" stroke-width="2"/>',
    station: '<path d="M8 73h83l-8-8H16z" fill="#c9c8b1"/><path d="M13 31h70v37H13z" fill="#e4d0aa"/><path d="M6 32l42-19 42 19-8 5H14z" fill="#8b9b81"/><path d="M20 43h16v16H20zm39 0h16v16H59z" fill="#a4c4c5"/><path d="M40 46h15v22H40z" fill="#7b7764"/><circle cx="48" cy="30" r="6" fill="#fff7db"/><path d="M48 26v5l4 1" fill="none"/><path d="M18 72l-5 7m64-7 5 7M12 77h71" fill="none" stroke-width="2"/>',
    landmark: '<path d="M11 73h78l-8-8H19z" fill="#c5cbb3"/><path d="M18 35h60v33H18z" fill="#f0ddba"/><path d="M11 35l37-22 37 22z" fill="#889a82"/><path d="M28 43h9v17h-9zm32 0h9v17h-9z" fill="#9fbcc0"/><path d="M43 68V48h12v20z" fill="#a58a69"/><path d="M14 67h69v6H14z" fill="#cdb797"/>',
  };
  function install(gl) {
    // Add icons before style evaluation; no third-party photos or remote image requests.
    const images = Object.entries(drawings).map(([key, drawing]) => new Promise(resolve => {
      const img = new Image(192, 168);
      img.onload = () => resolve(['walk-' + key, img]);
      img.onerror = () => resolve(null);
      img.src = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" width="192" height="168" viewBox="0 0 96 84"><g stroke="#75654f" stroke-width="1.3" stroke-linejoin="round" stroke-linecap="round">' + drawing + '</g></svg>');
    }));
    let removed = false;
    gl.on('remove', () => { removed = true; });
    Promise.all(images).then(items => {
      const add = () => { if (removed) return; items.filter(Boolean).forEach(([id, img]) => { if (!gl.hasImage(id)) gl.addImage(id, img, { pixelRatio: 2 }); }); };
      if (gl.isStyleLoaded()) add();
      gl.on('style.load', add);
    });
  }
  window.TofuMapArt = { install };
})();
