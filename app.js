var map = L.map('map', {
    center: [40.7128, -74.0060], 
    zoom: 10
  });
 
  L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
    attribution: "Map data &copy; <a href='https://www.openstreetmap.org/'>OpenStreetMap</a> contributors, <a href='https://creativecommons.org/licenses/by-sa/2.0/'>CC-BY-SA</a>, Imagery © <a href='https://www.mapbox.com/'>Mapbox</a>",
    maxZoom: 18,
    id: "mapbox.streets",
    accessToken: API_KEY
  }).addTo(map);
  

function getColor(d) {
	return d >= 0.8 ? 'red' :
	       d >= 0.6  ? 'orange' :
	       d >= 0.4  ? 'yellow' :
	       d >= 0.2  ? 'green' :
	                  'black';
}
  function geojsonMarkerOptions(feature){

    return{
      radius: 6,
      fillColor: getColor(feature.properties.economic_need_index), 
      color: "#000000",  
      weight: 1,
      opacity: 1,
      fillOpacity: 0.8
    };
    }
 
  var customLayer = L.geoJson(null, {
    onEachFeature: function(feature, layer) {
      layer.bindPopup("School Name: " + feature.properties.school_name +
      "<br>Address: " + (feature.properties.address) + "</br>"+
      "<br>Economic Need Index: " + (feature.properties.economic_need_index) + "</br>")
      },
      pointToLayer: function (feature, latlng) {
        return L.circleMarker(latlng, geojsonMarkerOptions(feature)
        );
      }
  });

 //create legend

var legend = L.control({position: 'bottomright'});

legend.onAdd = function (map) {

  var div = L.DomUtil.create('div', 'info legend'),
  
		grades = [0, .2, .4, .6, .8],
		labels = ['<strong> Economic Need Index </strong><br></br>'];

	// loop through our density intervals and generate a label with a colored square for each interval
	for (var i = 0; i < grades.length; i++) {
		div.innerHTML = labels += 
			'<i style="background:' + getColor(grades[i]) + '"></i> ' +
			grades[i] + (grades[i + 1] ? '&ndash;' + grades[i + 1] + '<br>' : '+');
	}

	return div;
};



legend.addTo(map);


  
  var runLayer = omnivore.csv('school file.csv', null, customLayer)
      .on('ready', function() {
          
          map.fitBounds(runLayer.getBounds());
      })
      .addTo(map);

      console.log(customLayer)