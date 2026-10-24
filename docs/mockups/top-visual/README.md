# トップビジュアル更新（2026-10-24）

## 生成方法と保存先

内蔵 imagegen を使用。`og-image.png` は温泉湯どうふの料理表現、`assets/landmarks/yuttsura.webp` は手描き水彩のタッチを合わせるための参考画像として使用した。生成元PNGはリポジトリへ入れず、WebPへ縮小・圧縮した完成画像だけを `assets/` に保存している。

画像内に文字は生成せず、実際の画面では各画像の隅にHTML/CSSで「イメージ」を重ねる。人物の顔、実在店のロゴ・看板は使用していない。

## 最終プロンプトセット（要約）

- PCヒーロー: 白く濁った温泉湯どうふ、角がとろけた四角い豆腐、箸で持ち上げる1枚の薄い膜状の湯葉、湯気。左にコピー用の余白がある横長の自然な料理写真。春菊・麺・きのこ・人物・文字なし。
- スマホヒーロー: 同じ料理表現を縦長にし、上部から中央にコピーを置ける暗めの余白を確保。春菊・麺・きのこ・人物・文字なし。
- ランチ: 湯気の立つ白い温泉湯どうふの土鍋を中心にした昼食膳。
- 旅館・ホテル: 桃色の浴衣と、温泉湯どうふを含む旅館の朝食膳。
- 持ち帰り: 豆腐パックと調理水の瓶が入ったクラフト紙袋。
- 日帰り: 木造の足湯東屋、湯気、タオル。
- 美肌の湯のまちで: 石の温泉槽、湯気、木の柄杓、セージ色の葉。
- とろける豆腐、白いスープ: 白く濁ったスープと角がほどけた豆腐の土鍋。
- 野菜たっぷり、軽やかに: 豆腐、白菜、人参、ねぎ、葉野菜と小さな土鍋。
- 湯葉まで、ゆっくり: 箸で1枚の薄い半透明の湯葉を白いスープから持ち上げる場面。麺状・束状は禁止。

カード8枚は、サイトのピンク・クリーム・セージを基調に、地図の目印と同じ細い鉛筆線＋やわらかな水彩で統一した。

## 画像サイズ

| 画像 | 寸法 | 容量 |
| --- | ---: | ---: |
| hero-yudofu.webp | 1440×960 | 100,502 B |
| hero-yudofu-mobile.webp | 720×1080 | 56,292 B |
| journey-lunch.webp | 480×480 | 27,346 B |
| journey-hotel.webp | 480×480 | 51,328 B |
| journey-takeout.webp | 480×480 | 36,190 B |
| journey-daytrip.webp | 420×420 | 58,636 B |
| taste-onsen.webp | 640×480 | 55,204 B |
| taste-soup.webp | 640×480 | 30,194 B |
| taste-vegetables.webp | 640×480 | 46,722 B |
| taste-yuba.webp | 640×480 | 30,294 B |

## ビフォー／アフター

各項目についてPCと390pxを撮影した。

1. ヒーロー: `before-hero-{pc,mobile}.png` / `after-hero-{pc,mobile}.png`
2. ヒーロー直下の地図: `before-order-{pc,mobile}.png` / `after-order-{pc,mobile}.png`
3. 選び方カード: `before-journeys-{pc,mobile}.png` / `after-journeys-{pc,mobile}.png`
4. 4つの魅力: `before-taste-{pc,mobile}.png` / `after-taste-{pc,mobile}.png`

追加で `after-hero-gallery-mobile.png`（写真ギャラリー状態でも背景を維持）と `after-dark-mobile.png`（ダーク）を保存した。

## 検証

- PC 1280px / 390px、ライト / ダーク。
- 390pxの `scrollWidth` は390px。横スクロールなし。
- Google写真ギャラリー用クラスが付いた状態でもヒーロー背景画像の `display` は `block` のまま。
- ブラウザの実行例外・errorログなし。
- JS構文チェック、データ検証エラー0、`git diff --check`。
