# 街歩き地図の修正・確認記録

## 修正した原因

MapLibre GL JS 5.24.0 に存在しない `supported()` を必須条件にしていたため、ベクター地図を起動せず概略SVGにフォールバックしていた。実ブラウザで `Map` が存在し、`supported` が undefined であることを確認した。

現在は Map の初期化を試み、失敗時には実際の地形・道路が読める地理院タイルを表示する。概略SVGは地図の選択肢から外した。

## 描画と出典

- 道路・路地・建物・川・公園・周辺施設: OpenFreeMap / OpenStreetMap のベクタータイル。ズームに応じて詳細化。座標や道路形状を装飾目的で変更しない。
- スタイル: `assets/map-style.json?v=4.0.0`。ライト／ダーク対応。
- 主要ランドマークは実際の外観写真を参考に作り直した透過PNGへ変更。出典・生成指示は [landmark-art.md](landmark-art.md)。イラストの中心を実座標に固定し、引き出し線や見栄えのための座標ずらしは行わない。
- シーボルトの湯・嬉野市役所新庁舎・湯っつら広場・嬉野温泉駅・うれしのお茶ちゃ村は特徴のある建物を描画。元祖忍者村は忍者、豊玉姫神社は神社建築ではなく白なまずを目印にした。
- シーボルトの湯・百年の湯: `TofuData` から取得した既存店舗データの名称と座標を使用。シーボルトの湯の架空の時計を撤去し、実物の尖塔と白い外壁を参考に描き直した。
- 表示中の施設名称は地図データの収録状況に依存する。バス停は小さく、観光地のイラストより優先度を下げる。
- 参考画像は配置・情報密度の参考とし、画像自体は転載していない。
- OpenFreeMapの実装資料: https://openfreemap.org/quick_start/
- OSM出典: https://www.openstreetmap.org/copyright

## 検証

- PC 1280px、スマホ390px（横幅390px／scrollWidth390px）。
- 地図の初期表示、2段階拡大時の道路・建物・施設名、店舗カード、ダーク表示。
- MapLibreのstyle loadedを確認。概略SVGではなくcanvasで描画。
- ブラウザの実行例外・errorログなし。
- `node --check js/app.js` / `js/ui/map-art.js` / `js/schema.js`。
- `npm run validate`: エラー0、既存警告21。
- Google Maps APIは初期表示では読み込まない。
- 最小ズーム13（MapLibreでは12）。縮小を8回押しても下回らないこと、クラスタ押下でMapLibreズーム15まで拡大することを確認。
- ごま・ゴマ・胡麻が各10件、たれのごま系が10件、共有URL `#place=akatsuki` を確認（同梱データ）。

画像: `map-polish-pc.png`（全体）／`map-polish-streets.png`（拡大）／`map-polish-mobile.png`（390px・カード）／`map-polish-dark.png`（ダーク）。
