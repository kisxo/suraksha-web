import "./Track.css";
import Map from 'ol/Map.js';
import View from 'ol/View.js';
import OSM from 'ol/source/OSM.js';
import TileLayer from 'ol/layer/Tile.js';
import { useEffect, useRef} from 'react';
import { fromLonLat } from 'ol/proj';

// Import additional controls and features
import ScaleLine from 'ol/control/ScaleLine';
import Zoom from 'ol/control/Zoom';
import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import { Feature } from "ol";
import { Point } from "ol/geom";
import Style from "ol/style/Style";
import Icon from "ol/style/Icon";
import { ImageTile } from "ol/source";
import { circular } from "ol/geom/Polygon";



export default function Track(){
    //reference to div element where map is drawn
    const mapRef = useRef<HTMLDivElement | null>(null);

    // api key safe only for magicminute.online
    const key = '5noTd0jsxwRqAPJGzPA1';

    const map = new Map();
    const userVector = new VectorSource()

    useEffect(() => {
        requestLocationPermission();

        if (mapRef.current) {
            //Halmira Bridge
            const startingLocation = fromLonLat([93.94114639182163, 26.51823896692769]);
            //rahul home
            // const startingLocation = fromLonLat([93.793962, 26.549928]);
            //manprabesh home 
            // const startingLocation = fromLonLat([93.9420671, 26.3415901]);


            const layers = [
                new TileLayer({
                  source: new OSM(),
                }),
                new TileLayer({
                    source: new ImageTile({
                      url: 'https://api.maptiler.com/maps/hybrid/{z}/{x}/{y}.jpg?key=' + key,
                      tileSize: 512,
                      maxZoom: 50,
                    }),
                }),
                new VectorLayer({
                    source: new VectorSource({
                        features: [
                            new Feature({
                                geometry:  new Point(startingLocation),
                            }),
                        ],
                    }),
                    style: new Style({
                        image: new Icon({
                          src: 'https://cdn4.iconfinder.com/data/icons/small-n-flat/24/map-marker-1024.png', // Example marker icon
                          scale: .04, // Resize the icon
                        })
                    })
                }),
                new VectorLayer({
                    source: userVector
                })
            ]

            const view: View = new View({
                center: startingLocation,
                zoom: 15,
            })

            
            map.setLayers(layers)
            map.setView(view)
            map.addControl(new ScaleLine())
            map.addControl(new Zoom())
            map.setTarget(mapRef.current)
    
            return () => map.setTarget(undefined);
        }
        
    },[])

    navigator.geolocation.watchPosition(
        function (pos) {
            const coords = [pos.coords.longitude, pos.coords.latitude];
            const accuracy = circular(coords, pos.coords.accuracy);
            userVector.clear(true);
            userVector.addFeatures([
            new Feature(
                accuracy.transform('EPSG:4326', map.getView().getProjection()),
            ),
            new Feature(new Point(fromLonLat(coords))),
            ]);
        },
        function (error) {
            alert(`ERROR: ${error.message}`);
        },
        {
            enableHighAccuracy: true,
        },
    );

    const requestLocationPermission = () => {
        console.log("Getting Permission")
        if ("geolocation" in navigator) {
          navigator.geolocation.getCurrentPosition(
            (position) => {
                console.log("Got Gps Permission")
                console.log(position)
                // setGpsPermission(true);
            },
            (error) => {
              if (error.code === error.PERMISSION_DENIED) {
                alert("Permission denied by the user.");
              } else {
                alert("Error getting location: " + error.message);
              }
            },
            {
              enableHighAccuracy: true,
              timeout: 10000,
              maximumAge: 0,
            }
          );
        } else {
          alert("Geolocation is not supported by this browser.");
        }
    };

    return (
        <>
            <h3 className="bg-red-500">Tracking</h3>
            <div ref={mapRef} className='h-[400px]'></div>
        </>
    )
}