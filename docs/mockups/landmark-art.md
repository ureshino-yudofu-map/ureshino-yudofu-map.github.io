# 実在建築のランドマーク（2026-10-23）

## 外観と位置の根拠

- シーボルトの湯: [嬉野市の施設案内](https://www.city.ureshino.lg.jp/kanko/siebold.html)。白い外壁、オレンジ色の屋根、細長い尖塔。旧イラストの架空の時計を撤去。位置は `TofuData` の店舗座標。
- 豊玉姫神社: [神社公式の拝殿写真](https://toyotamahime-jinja.or.jp/sanpai.php)。朱色の柱、白壁、反った灰色の屋根。位置は OpenStreetMap / OpenFreeMap。
- 嬉野市役所（新庁舎）: [公式庁舎案内と地図](https://www.city.ureshino.lg.jp/shisei/soshiki/_24965.html)、[公式外観パース掲載ページ](https://www.city.ureshino.lg.jp/shisei/_25349/_26636.html)。4階建て、水平の庇、ガラス窓、最上部の縦ルーバー。公式地図の緯度33.101276・経度129.986866を採用。旧塩田庁舎の位置ではない。

参考写真はリポジトリに転載していない。内蔵 imagegen で外観を参考にした透過PNGイラストを作成し、`assets/landmarks/{siebold,toyotama,cityhall}.png` に保存。実写や測量図ではない。イラストの誇張や細部の省略があるため、実際の位置を点と引き出し線で別に示す。

広域では3施設を常時表示。詳細表示では絵を小さくし、店舗ピンとの重なりを減らす。建築を確認していないその他の施設は名称表示とし、架空の建物を実物のように描かない。公園は樹木の汎用記号。

## 生成プロンプト（内蔵ツール、参考写真を各1枚添付）

### siebold.png

Create ONE isolated architectural illustration asset for an illustrated walking map of Ureshino, Japan. Reference image is the real Siebold no Yu building, use as exact architecture reference, not an edit target. Reproduce recognizable asymmetrical white two-storey Gothic/revival bathhouse: long orange red pitched roof, slender white square tower topped by very steep orange pyramid spire on left of center, timber red trim on gable ends, many gridded tall rectangular white windows, lower white flat-roof wing with balustrade on right. No invented clock: the real tower has windows, NOT a clock. Preserve proportions and distinctive roofline faithfully. Elegant hand-painted travel-map illustration, fine warm pencil outlines and subtle watercolor shading; muted cream, terracotta and sage accents. Three-quarter facade view from photograph, whole building from base to spire, tightly framed but no cropping; building occupies 90% of square canvas width. No river, sky, other buildings, text, labels, circular badge, people or background. Genuine transparent alpha background. Crisp silhouette and architectural clarity readable at 100px on a map; detailed enough at 200px. Save one square PNG.

### toyotama.png

Create ONE isolated architectural illustration asset for an illustrated walking map in Ureshino Japan. Use the reference photograph as accurate architecture reference of Toyotamahime Shrine worship hall. Reproduce actual broad dark gray sweeping irimoya roof with concave curved eaves, front gabled projection, vermilion red wooden columns and railings, cream-white wall panels, golden little beam-end details, three front door bays with shimenawa ropes and white paper streamers, raised wooden veranda and low gray stone steps/base. This is the distinctive vermilion worship hall from the image, NOT a generic torii, NOT a pagoda. Whole building in a slightly elevated three-quarter view matching photograph, tightly framed with 8% transparent margin. Elegant fine pencil outline and muted watercolor architectural travel-map illustration in warm red, slate gray, sage and cream, consistent refined Japanese walking map style. No trees, sky, people, stone lion obstructing the building, signs, text, label, circle or background. Genuine transparent alpha background. Recognizable silhouette readable at 100px but rich faithful architecture at 200px. Square PNG.

### cityhall.png

Use case: stylized-concept. Create ONE isolated architectural map illustration of the new Ureshino City Hall precisely based on the attached official exterior rendering (architecture reference, not edit target). Preserve the four-storey broad rectangular building, three layered dark slate sloping horizontal eaves, continuous blue-gray glass window bands, cream concrete pillars, upper vertical white fins around the roofline, and slender ground-floor portico. Whole building in same three-quarter view with frontage to left and shorter right side visible. Elegant fine warm pencil outline with subtle watercolor shading, muted cream, slate blue and sage, recognizable structure at 120px. No sky, roads, cars, people, trees, text, signage, background or badge. Genuine transparent alpha. Square PNG, building tightly framed with modest transparent margin. Do not replace building with generic civic hall or traditional Japanese building.

## 追加検証

- JS構文チェック（app / map-art / schema）、データ検証エラー0（既存警告21）。
- 最も引けるズーム: Leaflet 13 / MapLibre 12。全体ボタンも同じ範囲へ戻す。パンは制限しない（現在地・遠方店舗の選択を維持）。
- PC1280px / スマホ390pxの地図・最大広域・カード・ダークを確認。初期Google読み込みなし。
- 店舗データ、schema、data API、configへの変更なし。

## バックエンドへの依頼

将来、非店舗ランドマークの名称・座標・外観参考URLを `TofuData` から提供できると、`assets/map-landmarks.json` の2施設も一元管理できます。今回は既存APIを変更せず、出典付きの地図用UI素材として分離しています。
