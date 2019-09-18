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
  
//economic index color switch
function magColor(economic_need_index) {
  switch (true){
    case economic_need_index > 0.9 :
      return "#FF3F33";
    case economic_need_index > 0.7:
      return "#FFA833";
    case economic_need_index > 0.5:
      return "#FCFF33";
    case economic_need_index > 0.3:
      return "#B2FF33"
    case economic_need_index > 0.1:
      return "#33FF52";
    default:
      return "#33FFE3"
  }
} 

  function geojsonMarkerOptions(feature){

    return{
      radius: 6,
      fillColor: magColor(feature.properties.economic_need_index), 
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
 var legend  = L.control({
  position: "bottomright"
})


// add details to legend
legend.onAdd = function(){
  // const title = '<h3>Economic Need Index:</h3>';
  var div = L.DomUtil.create("div", "info legend");
  var grades = [0, .1, .3, .5, .7, .9, 1];
  var colors = [
  "#98ee00",
  "#d4ee00",
  "#eecc00",
  "#ee9c00",
  "ea822cc",
  "blue",
  "ea2c2c"
];
  // for (var i = 0; i < grades.length; i++) {
  //   div.innerHTML +=
  //    "<i style='background:"  +  colors[i] + "'></i> " + 
  //    grades[i] + (grades[i + 1] ? '&ndash;' + grades[i + 1] + "<br>" : "+");
  //   }
  //   return div;
  // };
  for (var i = 0; i < grades.length; i++) {
    div.innerHTML += '<i style="background: ' + colors + '"></i> ' + grades[i] + (grades[i + 1] ? '&ndash;' + grades[i + 1] + '<br>' : '+');
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