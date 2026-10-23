# 実在ランドマークの地図イラスト（2026-10-23）

## 外観と位置の根拠

- シーボルトの湯: [嬉野市の施設案内](https://www.city.ureshino.lg.jp/kanko/siebold.html)。白い外壁、オレンジ色の屋根、細長い尖塔。旧イラストの架空の時計を撤去。位置は `TofuData` の店舗座標。
- 豊玉姫神社・白なまず: [神社公式](https://toyotamahime-jinja.or.jp/sanpai.php) と依頼時の現地写真。神社建築ではなく、境内の白なまず像を描画。位置は OpenStreetMap / OpenFreeMap。
- 嬉野市役所（新庁舎）: [公式庁舎案内と地図](https://www.city.ureshino.lg.jp/shisei/soshiki/_24965.html)、[公式外観パース掲載ページ](https://www.city.ureshino.lg.jp/shisei/_25349/_26636.html)。4階建て、水平の庇、ガラス窓、最上部の縦ルーバー。公式地図の緯度33.101276・経度129.986866を採用。
- うれしのお茶ちゃ村: [嬉野温泉観光協会](https://spa-u.net/facility/2016/01/org-entry-209.php) と依頼時の外観写真。長い瓦屋根、木部、藍色の暖簾を反映。緯度33.079488・経度129.968292。
- 元祖忍者村 肥前夢街道: [施設公式アクセス](https://www.hizenyumekaidou.info/access/) と依頼時の写真。建物ではなく、施設を判別しやすい忍者の記号。緯度33.095641・経度129.9912809。
- 湯っつら広場: [佐賀県公共空間データベース](https://publicspace-db.pref.saga.lg.jp/publicspace/k0002/) と依頼時の現地写真。木柱と低い屋根の足湯東屋を反映。緯度33.09783212095889・経度129.9864069699743。
- 嬉野温泉駅: [JR九州](https://www.jrkyushu.co.jp/railway/station/1227475_1601.html) と依頼時の外観写真。長い駅舎、縦ルーバー、反り上がる入口庇を反映。緯度33.1066113・経度129.9989727。

参考写真はリポジトリに転載していない。内蔵 imagegen で参考写真から透過PNGの地図用イラストを作成し、`assets/landmarks/` に保存した。実写や測量図ではない。イラストの中心を実際の座標に固定し、引き出し線や位置をずらす処理は使用しない。

広域では小さく、拡大するにつれて絵を少し大きく表示する。店舗ピンや件数の丸が上に重なることを許容し、ズーム15以上では名称を省略しない。建築を確認していないその他の施設は名称表示とし、架空の建物を実物のように描かない。公園は樹木の汎用記号。

## 生成プロンプト（内蔵 imagegen、参考写真を添付）

### siebold.png

Create ONE isolated architectural illustration asset for an illustrated walking map of Ureshino, Japan. Reference image is the real Siebold no Yu building, use as exact architecture reference, not an edit target. Reproduce recognizable asymmetrical white two-storey Gothic/revival bathhouse: long orange red pitched roof, slender white square tower topped by very steep orange pyramid spire on left of center, timber red trim on gable ends, many gridded tall rectangular white windows, lower white flat-roof wing with balustrade on right. No invented clock: the real tower has windows, NOT a clock. Preserve proportions and distinctive roofline faithfully. Elegant hand-painted travel-map illustration, fine warm pencil outlines and subtle watercolor shading; muted cream, terracotta and sage accents. Three-quarter facade view from photograph, whole building from base to spire, tightly framed but no cropping; building occupies 90% of square canvas width. No river, sky, other buildings, text, labels, circular badge, people or background. Genuine transparent alpha background. Crisp silhouette and architectural clarity readable at 100px on a map; detailed enough at 200px. Save one square PNG.

### cityhall.png

Use case: stylized-concept. Create ONE isolated architectural map illustration of the new Ureshino City Hall precisely based on the attached official exterior rendering (architecture reference, not edit target). Preserve the four-storey broad rectangular building, three layered dark slate sloping horizontal eaves, continuous blue-gray glass window bands, cream concrete pillars, upper vertical white fins around the roofline, and slender ground-floor portico. Whole building in same three-quarter view with frontage to left and shorter right side visible. Elegant fine warm pencil outline with subtle watercolor shading, muted cream, slate blue and sage, recognizable structure at 120px. No sky, roads, cars, people, trees, text, signage, background or badge. Genuine transparent alpha. Square PNG, building tightly framed with modest transparent margin. Do not replace building with generic civic hall or traditional Japanese building.

### namazu.png

Use case: stylized-concept. Asset type: transparent illustrated landmark for a Japanese walking map. Input reference shows the real white catfish water statue at Toyotamahime Shrine. Create the landmark as the WHITE CATFISH, not the shrine building. Faithfully depict a friendly horizontal white ceramic catfish with broad head, open curved mouth, round eye, whiskers and long pale body, resting on a low dark charcoal stone water basin. Include a small light wooden ladle above pouring one simple stream of water onto its back. Slight three-quarter view, compact silhouette. Refined fine-pencil and subtle watercolor travel-map illustration matching the other map assets, pearl white, cool gray, charcoal and pale cedar. No hand/person, trees, shrine building, cup, text, label, circle, badge or background. Genuine transparent alpha. Square PNG. Readable at 70–100px.

### ochacha.png

Use case: stylized-concept. Asset type: transparent illustrated landmark for a Japanese walking map. Input reference is the real Ureshino Ochacha Mura tea shop exterior. Faithfully depict the long low two-storey Japanese tea shop: broad gray tiled roofs, warm cream plaster upper wall, dark brown timber storefront, narrow vertical upper windows, deep front eaves and indigo tea curtain at the left. Slight three-quarter front view, whole building tightly framed. Refined fine-pencil and subtle watercolor style matching existing travel-map architectural illustrations. Muted cream, charcoal, cedar brown and tea green. No mountain, sky, people, cars, text, logos, labels, badge, ground scenery or background. Genuine transparent alpha. Square PNG. Recognizable at 80–120px.

### ninja.png

Use case: stylized-concept. Asset type: transparent illustrated landmark for a Japanese walking map. Create a single compact dynamic black-clad ninja landmark symbol inspired by the characteristic live ninja attraction at Hizen Yume Kaido: one masked ninja in a mid-air leap, knees bent, holding a short sheathed-or-safe stylized sword horizontally. Elegant hand-painted travel-map illustration with fine warm pencil lines and restrained watercolor, black and charcoal clothing with a tiny deep red accent. Clear silhouette readable at 70px. No second person, no blood, no attack impact, no stage room, no text, logo, circle, badge or background. Genuine transparent alpha. Square PNG.

### yuttsura.png

Use case: stylized-concept. Asset type: transparent illustrated landmark for a Japanese walking map. Input reference is the real Yuttsura Hiroba footbath pavilion in Ureshino. Faithfully depict the distinctive open pavilion: wide low dark gray hipped metal roof, pale translucent ceiling panels in a wooden grid, warm square timber columns, horizontal cedar privacy fence behind, several low dark stone footbath basins including the small rounded pink-and-gray basin at front. Slightly elevated three-quarter view, whole pavilion tightly framed. Fine pencil and subtle watercolor travel-map architecture style, warm cedar, cream and stone gray. No adjacent tall building, sky, people, planters, text, labels, badge or background. Genuine transparent alpha. Square PNG. Recognizable at 80–120px.

### station.png

Use case: stylized-concept. Asset type: transparent illustrated landmark for a Japanese walking map. Input reference is the real Ureshino-Onsen Station exterior. Faithfully depict the long modern station facade: very wide low dark gray roof canopy, two-storey charcoal and gray facade with continuous upper glass band, dark vertical timber-like slats, dramatic gently upturned copper-brown entrance canopy supported by dark round columns. Three-quarter front view, compress the long width slightly while keeping its distinctive silhouette. Fine pencil and subtle watercolor travel-map architecture style, charcoal, muted brown, slate and glass blue. No cars, road, people, text, station lettering, signs, sky, labels, badge or background. Genuine transparent alpha. Square PNG. Recognizable at 80–120px.

## 追加検証

- JS構文チェック（app / map-art / schema）、データ検証エラー0（既存警告21）。
- 最も引けるズーム: Leaflet 13 / MapLibre 12。全体ボタンも同じ範囲へ戻す。パンは制限しない（現在地・遠方店舗の選択を維持）。
- PC1280px / スマホ390pxの地図・最大広域・カード・ダークを確認。初期Google読み込みなし。
- 店舗データ、schema、data API、configへの変更なし。

## バックエンドへの依頼

将来、非店舗ランドマークの名称・座標・外観参考URLを `TofuData` から提供できると、`assets/map-landmarks.json` の6施設も一元管理できます。今回は既存APIを変更せず、出典付きの地図用UI素材として分離しています。
