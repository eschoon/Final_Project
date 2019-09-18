var map = L.map('map', {
    center: [40.7128, -74.0060], 
    zoom: 15
  });
 
  L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
    attribution: "Map data &copy; <a href='https://www.openstreetmap.org/'>OpenStreetMap</a> contributors, <a href='https://creativecommons.org/licenses/by-sa/2.0/'>CC-BY-SA</a>, Imagery © <a href='https://www.mapbox.com/'>Mapbox</a>",
    maxZoom: 18,
    id: "mapbox.streets",
    accessToken: API_KEY
  }).addTo(map);
  


  function geojsonMarkerOptions(feature){

    return{
      radius: 4,
      fillColor: "red",
      color: "#000000",  //correct
      weight: 1,
      opacity: 1,
      fillOpacity: 0.8
    };
    }
 
  var customLayer = L.geoJson(null, {
    onEachFeature: function(feature, layer) {
      layer.bindPopup("<h3>" + feature.properties.school_name +
      "</h3><hr><p>" + (feature.properties.address) + "</p>"+
      "</h3><hr><p>" + (feature.properties.school_income_estimate) + "</p>")
      },
      pointToLayer: function (feature, latlng) {
        return L.circleMarker(latlng, geojsonMarkerOptions(feature)
        );
      }
  });
  var runLayer = omnivore.csv('school file.csv', null, customLayer)
      .on('ready', function() {
          
          map.fitBounds(runLayer.getBounds());
      })
      .addTo(map);

      console.log(customLayer)