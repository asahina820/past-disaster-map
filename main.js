// ベースマップを作成する
// ここでは3DのOpenStreetMapを表示する
var map =  new maplibregl.Map({
    container: 'map',
    style: 'https://tile2.openstreetmap.jp/styles/osm-bright/style.json',
    center: [140.44682363, 36.34173699],
    zoom: 9,
    hash: true,
    pitch: 0,
    localIdeographFontFamily: false
})

// UIツール
// 右下のズームレベルの＋−ボタンを表示する
map.addControl(new maplibregl.NavigationControl(), 'bottom-right');
// 右上の現在位置の取得ボタンを表示する
map.addControl(new maplibregl.GeolocateControl({positionOptions: {enableHighAccuracy: true},trackUserLocation: true}), 'top-right');
// 左下の尺度を表示する
map.addControl(new maplibregl.ScaleControl() );

// TODO: attribution表示
// TODO: 画面がロードされたら地図にレイヤを追加する
map.on('load', function () {
    //rasterを追加
    map.addSource('bousai', {
        'type': 'raster',
        'tiles': [
            `https://w-hazardmap.nhk.or.jp/flood/flood-all/20220720/{z}/{x}/{y}.png`
        ],
        'tileSize': 256,
        
    });
    map.addLayer({
        'id': 'bousai_raster',
        'type': 'raster',
        'source': 'bousai',
        
    });


    // 避難所情報レイヤを追加
    map.addSource('ibaraki_polygon', {
        type: 'geojson',
        data: './data/ibaraki_polygon.geojson'
    });
    //
    map.addLayer({
        'id': 'ibaraki_polygon',
		'type': 'fill',
		'source': 'ibaraki_polygon',
        'layout': {},
        'paint': {
            'fill-color': '#088',
            'fill-outline-color': '#000',
            'fill-opacity': 0.2
        }
    });
});
