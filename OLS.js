var view = new ol.View({
    center: ol.proj.fromLonLat([24.753, 59.437]),
    zoom: 13
});

var tileLayer = new ol.layer.Tile({
    source: new ol.source.OSM()
});

var vectorSource = new ol.source.Vector({
    url: 'OmaKmlFail.kml',
    format: new ol.format.KML()
});

var vectorLayer = new ol.layer.Vector({
    source: vectorSource
});

var map = new ol.Map({
    target: 'map',
    layers: [
        tileLayer,
        vectorLayer
    ],
    view: view
});

vectorSource.on('addfeature', function() {
    view.fit(vectorSource.getExtent(), { padding: [50, 50, 50, 50], maxZoom: 16 });
});

map.on('click', function(evt) {
    map.forEachFeatureAtPixel(evt.pixel, function(feature) {
        var name = feature.get('name');
        if (name) {
            alert("Objekt: " + name);
        } else {
            alert("Tundmatu objekt");
        }
    });
});