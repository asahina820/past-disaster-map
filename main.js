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

    //避難施設を追加
    // 避難所情報レイヤを追加
    map.addSource('shelter_point', {
        type: 'geojson',
        data: './data/hinanjo.geojson'
    });
    map.loadImage(
        './data/shelter.png',
        function (error, image) {
            if (error) throw error;
            map.addImage('shelter_icon', image);
        }
    );
    map.addLayer({
        'id': 'shelter_point',
        'type': 'symbol',
        'source': 'shelter_point',
        'layout': {
        'icon-image': 'shelter_icon',
        'icon-size': 0.1
        }
    });

    // 避難所情報の地物をクリックしたときに、コメントを表示する
    map.on('click', 'shelter_point', function (e) {
        var coordinates = e.features[0].geometry.coordinates.slice();
        var name = e.features[0].properties.P20_002;

        while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
        coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
        }
        var html=(
            //`<div class="popup">${name}</div>`
            `<div >
                    ${name}
            </div>`
        )

        
        // ポップアップを表示する
        new maplibregl.Popup({
            className: 'my-class', 
            closeButton: false,
        })
        .setLngLat(coordinates)
        .setHTML(html)
        .addTo(map);
  
    });

    map.on('click', 'ibaraki_polygon', (e) => {

        var h=(
            //`<div class="popup">${name}</div>`
            `<div >
                    ${e.features[0].properties.N03_004}<br>
                    ${e.features[0].properties.タイトル}
                    ${e.features[0].properties.動画のURL}
            </div>`
        )

        
      

        new maplibregl.Popup({
            className: 'my-class', 
            closeButton: false,
        })
        .setLngLat(e.lngLat)
        .setHTML(h)
        .addTo(map);
    });

        
         
        // Change the cursor to a pointer when
        // the mouse is over the states layer.
        map.on('mouseenter', 'ibaraki_polygon', () => {
        map.getCanvas().style.cursor = 'pointer';
        });
         
        // Change the cursor back to a pointer
        // when it leaves the states layer.
        map.on('mouseleave', 'ibaraki_polygon', () => {
        map.getCanvas().style.cursor = '';
        });


});
