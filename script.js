var map = L.map('map').setView([59.437, 24.753], 13);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

var kmlLayer = omnivore.kml('OmaKmlFail.kml')
    .on('ready', function() {
        map.fitBounds(kmlLayer.getBounds());

        kmlLayer.eachLayer(function(layer) {
            if (layer.feature && layer.feature.properties && layer.feature.properties.name) {
                layer.bindPopup("<b>" + layer.feature.properties.name + "</b>");
            } else {
                layer.bindPopup("Objekt kaardil");
            }
        });
    })
    .addTo(map);

var popup = L.popup();

function onMapClick(e) {
    popup
        .setLatLng(e.latlng)
        .setContent("You clicked the map at " + e.latlng.toString())
        .openOn(map);
}

map.on('click', onMapClick);