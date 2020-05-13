mapboxgl.accessToken = 'pk.eyJ1IjoiYmVubWF0aGVzb24iLCJhIjoiY2lmZDhyZXVxNTI5eHNtbHgyOTYwbHJtMyJ9.Ch8JQXvunpUrv6tGpeJMCA'

var map = new mapboxgl.Map({
  container: 'map1',
  // style: 'mapbox://styles/mapbox/light-v9',
  style: 'mapbox://styles/benmatheson/cjh2yaf301jjm2sru7r1uz7n7',
  center: [-1, 12],
  zoom: 4.2,
//   "transition": {
//   "duration": 800,
//   "delay": 0
// }
});

var red = './data/ras_ak_red.geojson';
var red_fake = './data/ras_ak_red_fake.geojson';
var red_fake = './data/ras_ak_red_fake.geojson';
var ak_simple_fake = './data/alaska_simplified_fake.geojson';
var cities_fake = './data/cities_fake.geojson';

map.on('load', function() {




map.addSource('cities', {
  type:'geojson',
  data: cities_fake


})

map.addSource('rasShape', {
  type: 'geojson',
  // data: 'https://rawgit.com/benmatheson/2011_test/master/ras_ak_red.geojson'
  data: ak_simple_fake
});


  map.addLayer({
        "id": "rasAk",
        "type": "fill",
      "source": "rasShape",


    'paint': {

            "fill-color": "whitesmoke"

    }


        



      })




map.addSource('ras1', {
  type: 'geojson',
  // data: 'https://rawgit.com/benmatheson/2011_test/master/ras_ak_red.geojson'
  data: red_fake
});








  map.addLayer({
        "id": "ras2",
        "type": "circle",
   		"source": "ras1",


		'paint': {
            // make circles larger as the user zooms from z12 to z22
            // 'circle-radius': {
            //     // 'base': 20,
            //     'stops': [[12, 7], [22, 20]]
            // },

'circle-radius': [
                'match',
                ['get', 'ProjectLocation'],
                'Anchorage', 24,
                'Juneau', 13,
                'Fairbanks', 19,
                /* other */ 6
            ],






            // color circles by ethnicity, using a match expression
            // https://www.mapbox.com/mapbox-gl-js/style-spec/#expressions-match
            'circle-color': [
                'match',
                ['get', 'Program'],
                'Tier 1', 'rgba(69, 178, 66, .3)',
                'Tier 2', 'rgba(178, 66, 69, .5)',
                'Individual Artist Award', '#33a02c',
                'Foundation Initiated', '#3bb2d0',
                /* other */ '#ccc'
            ],

            // 'circle-stroke-color': "darkblue",
            // 'circle-stroke-width': 1,
            // 'circle-color': 'rgba(0,0,0,0)'
        }





   		})
      //       // "icon-image": "{icon}-11",
      //       // "text-field": "{title}",
      //       "text-font": ["Open Sans Semibold", "Arial Unicode MS Bold"],
      //       "text-offset": [0, 0.6],
      //       "text-anchor": "top"
      //   }
	



map.addLayer({
        "id": "cities1",
        "type": "symbol",
      "source": "cities",


        "layout": {
            "text-field": "{Community Name}",
                        "text-offset": [1, 0.5],

            "text-font": ["Open Sans Bold","Arial Unicode MS Regular"],
            "text-size": 12,
            // "text-weight": "bold"
        },




    'paint': {
            // make circles larger as the user zooms from z12 to z22
            // 'circle-radius': 3,*********
            // color circles by ethnicity, using a match expression
            // https://www.mapbox.com/mapbox-gl-js/style-spec/#expressions-match
                    "text-halo-color": "#ffffff",
                    "text-halo-width": .9,
                    "text-halo-blur": .4


            // 'circle-stroke-color': "darkblue",
            // 'circle-stroke-width': 1,
            // 'circle-color': 'rgba(0,0,0,0)'
        }





      })





map.setFilter('ras2', ['in', 'Program', 'Tier 1', 'Tier 2']);

 // ["in", "class", "street_major", "street_minor", "street_limited"]

map.scrollZoom.disable();




})



    // Create a popup, but don't add it to the map yet.
    var popup = new mapboxgl.Popup({
        closeButton: false,
        closeOnClick: false
    });


map.on('mouseenter', 'ras2', function(e) {
        // Change the cursor style as a UI indicator.
        map.getCanvas().style.cursor = 'pointer';

        var coordinates = e.features[0].geometry.coordinates.slice();
        var des = e.features[0].properties['Web Title'];
        var name = e.features[0].properties['Organization Name'];
        var award = e.features[0].properties['Award Amount'];
        var projLoc= e.features[0].properties['ProjectLocation'];

        var popContent = `<div class="pop"><h3>Recipient: </h3>${name}<br />
					<h3>Project Location: </h3>${projLoc}  <br />      				
					<h3>Award: </h3>${award} 
        				<br />
        				<h3>Description: </h3>${des}</div>`

        // Ensure that if the map is zoomed out such that multiple
        // copies of the feature are visible, the popup appears
        // over the copy being pointed to.
        while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
            coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
        }

        // Populate the popup and set its coordinates
        // based on the feature found.
        popup.setLngLat(coordinates)
            .setHTML(popContent)
            .addTo(map);
    });

    map.on('mouseleave', 'ras2', function() {
        map.getCanvas().style.cursor = '';
        popup.remove();
    });


map.addControl(new mapboxgl.NavigationControl());




//###############MAP 2



var map2 = new mapboxgl.Map({
  container: 'map2',
  // style: 'mapbox://styles/mapbox/light-v9',
  style: 'mapbox://styles/benmatheson/cjh2yaf301jjm2sru7r1uz7n7',
  center: [-1, 12],
  zoom: 4.2,
//   "transition": {
//   "duration": 800,
//   "delay": 0
// }
});


map2.on('load', function() {



map2.addSource('rasShape', {
  type: 'geojson',
  // data: 'https://rawgit.com/benmatheson/2011_test/master/ras_ak_red.geojson'
  data: ak_simple_fake
});


  map2.addLayer({
        "id": "rasAk",
        "type": "fill",
      "source": "rasShape",


    'paint': {

            "fill-color": "whitesmoke"

    }


        



      })



map2.scrollZoom.disable();

map2.addSource('ras1', {
  type: 'geojson',
  // data: 'https://rawgit.com/benmatheson/2011_test/master/ras_ak_red.geojson'
  data: red_fake
});

map2.addSource('cities', {
  type:'geojson',
  data: cities_fake


})


  map2.addLayer({
        "id": "ras2",
        "type": "circle",
      "source": "ras1",

     

    'paint': {
            // make circles larger as the user zooms from z12 to z22
            'circle-radius': {
                // 'base': 20,
                'stops': [[12, 7], [22, 20]]
            },
            // color circles by ethnicity, using a match expression
            // https://www.mapbox.com/mapbox-gl-js/style-spec/#expressions-match
            'circle-color': [
                'match',
                ['get', 'Program'],
                'Tier 1', 'rgba(69, 178, 66, .6)',
                'Tier 2', 'rgba(178, 66, 69, .5)',
                'Individual Artist Award', '#a02ca0',
                'Foundation Initiated', '#3bb2d0',
                'Sabbatical', 'red',

                /* other */ '#ccc'
            ],

             

            // 'circle-stroke-color': "darkblue",
            // 'circle-stroke-width': 1,
            // 'circle-color': 'rgba(0,0,0,0)'
        },







      })








map2.setFilter('ras2', ['in', 'Program', 'Individual Artist Award', 'Sabbatical']);

 // ["in", "class", "street_major", "street_minor", "street_limited"]


 map2.addLayer({
        "id": "cities1",
        "type": "symbol",
      "source": "cities",


        "layout": {
            "text-field": "{Community Name}",
                        "text-offset": [1, 0.5],

            "text-font": ["Open Sans Bold","Arial Unicode MS Regular"],
            "text-size": 12,
            // "text-weight": "bold"
        },




    'paint': {
            // make circles larger as the user zooms from z12 to z22
            // 'circle-radius': 3,*********
            // color circles by ethnicity, using a match expression
            // https://www.mapbox.com/mapbox-gl-js/style-spec/#expressions-match
                    "text-halo-color": "#ffffff",
                    "text-halo-width": .9,
                    "text-halo-blur": .4


            // 'circle-stroke-color': "darkblue",
            // 'circle-stroke-width': 1,
            // 'circle-color': 'rgba(0,0,0,0)'
        }





      })





    });






    // Create a popup, but don't add it to the map yet.
    var popup = new mapboxgl.Popup({
        closeButton: false,
        closeOnClick: false
    });


map2.on('mouseenter', 'ras2', function(e) {
        // Change the cursor style as a UI indicator.
        map2.getCanvas().style.cursor = 'pointer';

        var coordinates = e.features[0].geometry.coordinates.slice();
        var des = e.features[0].properties['Web Title'];
        var name = e.features[0].properties['Organization Name'];
        var award = e.features[0].properties['Award Amount'];
        var projLoc= e.features[0].properties['ProjectLocation'];

        var popContent = `<div class="pop"><h3>Recipient: </h3>${name}<br />
          <h3>Project Location: </h3>${projLoc}  <br />             
          <h3>Award: </h3>${award} 
                <br />
                <h3>Description: </h3>${des}</div>`


          var sideContent = `<h3>Recipient: </h3>${name}<br />
          <h3>Project Location: </h3>${projLoc}  <br />             
          <h3>Award: </h3><p class="side${award} 
                <br />
                <h3>Description: </h3>${des}`

        // Ensure that if the map is zoomed out such that multiple
        // copies of the feature are visible, the popup appears
        // over the copy being pointed to.
        while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
            coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
        }

        // Populate the popup and set its coordinates
        // based on the feature found.
        popup.setLngLat(coordinates)
            .setHTML(popContent)
            .addTo(map2);
    });

    map2.on('mouseleave', 'ras2', function() {
        map2.getCanvas().style.cursor = '';
        popup.remove();
    });




map2.addControl(new mapboxgl.NavigationControl());

