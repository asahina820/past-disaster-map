# ハザログ
## 概要
2022/10/22~23に開催された「NHKハッカソン２０２２～防災編」の成果物です。

地域ごとの災害情報をマップ上にアーカイブしたサービスです。

過去の災害情報と避難所ポイント、ハザードマップの洪水浸水深ランクを地図上に可視化しました。

資料は[こちら](https://drive.google.com/drive/folders/1uXpqR4i4NUYQsi-kHH3t5DeB8jN4T4cB)

## コンセプト
「災害=そばにあるもの(よくおきるもの)」として、親しみをもって知ってほしい。

注意・警戒の「黄色」をつかって、ポップなロゴイメージに。

<img src="https://github.com/hinamei/past-disaster-map/blob/main/data/logo.png?raw=true" id="logo" width="1000px">

今回は、エリアを「茨城県」に限定しプロトタイプを作成。

## 利用データ
- NHK 災害アーカイブス API
    - APIから情報を取得し、市区町村を調査してGeoJSONに組み込み
- NHK全国ハザードマップ
    - ラスタタイルを利用
- 避難所データ
    - 国土数値情報から取得
- ベースマップ
    - OpenStreetMapを利用

## 技術スタック
- MapLibre GL JS（地図ライブラリ）
- Semantic UI（CSSフレームワーク）
- GitHub Pages（ホスティング）