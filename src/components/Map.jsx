import React, { useRef, useEffect, useState } from "react";
import mapboxgl from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax
import axios from "axios";
import '../styles.css';

const Map = ({annee, arr, movieName, producerName, directorName}) => {

    mapboxgl.accessToken = 'pk.eyJ1IjoiY2xhaXJlMTIzNDU2NzgiLCJhIjoiY2wxeGNoZmduMDBsYTNpbXRvYWtmbXkzeiJ9.2_d4igbbYVzzjw3XZpp7DA';

    const mapContainer = useRef(null);
    const map = useRef(null);
    const [lng, setLng] = useState(2.3522219);
    const [lat, setLat] = useState(48.856614);
    const [zoom, setZoom] = useState(11.5);

    useEffect(() => {
        map.current = new mapboxgl.Map({
            container: mapContainer.current,
            style: 'mapbox://styles/mapbox/streets-v11',
            center: [lng, lat],
            zoom: zoom
        });
        console.log('arr passed in post request:', annee);
        console.log('arr passed in post request:', arr);
        map.current.on('load', async () => {
            let response = await axios.post('http://localhost:8000/', {
              "year": annee,
              "ardt": arr,
              "nom_tournage" : movieName,
              "nom_realisateur" : directorName,
              "nom_producteur" : producerName
          });

            let tournageData = response.data;

            let arrond = await axios.get('http://localhost:8000/arrondissements-limits');

            let arrondData = arrond.data;

            const arrMapbox = arrondData.features.map(arrondissement => {
                return {
                      type: 'Feature',
                      'geometry': {
                        'type': 'Polygon',
                        'coordinates': arrondissement.geometry.coordinates
                      },
                      "properties": {
                        "code_postal": arrondissement.properties.c_arinsee,
                      }
                };
              });

            map.current.loadImage(
                'https://docs.mapbox.com/mapbox-gl-js/assets/custom_marker.png',
                (error, image) => {
                    if (error) throw error;
                    map.current.addImage('custom-marker', image);

                map.current.addSource('points', {
                    'type': 'geojson',
                    'data': {
                        'type': 'FeatureCollection',
                        'features': tournageData,
                    }
                });

                map.current.addSource('arr', {
                  'type': 'geojson',
                  'data': {
                        type: 'FeatureCollection',
                        features: arrMapbox
                      }
                });

                map.current.addLayer({
                  id: 'arr',
                  type: 'line',
                  source: 'arr',
                  layout: {},
                  'paint': {
                    'line-color': '#000',
                    'line-width': 1
                  }
                });

                map.current.addLayer({
                    'id': 'points',
                    'type': 'symbol',
                    'source': 'points',
                    'layout': {
                      'icon-image': 'custom-marker',
                      'text-field': ['get', 'nom_tournage'],
                      'text-font': [
                        'Open Sans Semibold',
                        'Arial Unicode MS Bold'
                      ],
                      'text-offset': [0, 1.25],
                      'text-anchor': 'top'
                    }
                  });

                  map.current.on('click', (event) => {
                    const features = map.current.queryRenderedFeatures(event.point, {
                      layers: ['points']
                    });
                    if (!features.length) {
                      return;
                    }
                    const feature = features[0];

                    const popup = new mapboxgl.Popup()
                    .setLngLat(feature.geometry.coordinates)
                    .setHTML(
                      `<h3>${feature.properties.nom_tournage}</h3><p> de ${feature.properties.nom_realisateur}, ${feature.properties.annee_tournage}</p><p>Producteur : ${feature.properties.nom_producteur}</p><p>${feature.properties.adresse_lieu}</p>`
                    )
                    .addTo(map.current);
                  });
            });
        });
    }, [annee, arr, movieName, producerName, directorName]);

    return (
        <div>
            <div ref={mapContainer} className="map-container" />
        </div>
    );
};

export default Map;
