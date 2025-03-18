import "./Track.css";
import Map from 'ol/Map.js';
import View from 'ol/View.js';
import OSM from 'ol/source/OSM.js';
import TileLayer from 'ol/layer/Tile.js';
import { useEffect, useRef } from 'react';
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


export default function Track(){
    //reference to div element where map is drawn
    const mapRef = useRef(null);
    const key = 'maptiles api key';
    const attributions =
    '<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> ' +
    '<a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>';

    useEffect(() => {
        if (mapRef.current) {
            //Halmira Bridge
            const startingLocation = fromLonLat([93.94114639182163, 26.51823896692769]);
            //rahul home
            // const startingLocation = fromLonLat([93.793962, 26.549928]);

            //map object
            const map = new Map({
                layers: [
                    // new TileLayer({
                    //   source: new OSM(),
                    // }),
                    new TileLayer({
                        source: new ImageTile({
                          attributions: attributions,
                          url: 'https://api.maptiler.com/maps/satellite/{z}/{x}/{y}.jpg?key=' + key,
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
                    })
                ],
                view: new View({
                    center: startingLocation,
                    zoom: 15,
                }),
                controls: [
                    new ScaleLine(), // Add scale line to the map
                    new Zoom()
                ],
                target: mapRef.current,
              });
    
            return () => map.setTarget(undefined);
        }
    },[])

    return (
        <>
            <h3>Tracking</h3>
            <div ref={mapRef} className='border w-[100%] h-[800px]'></div>
        </>
    )
}