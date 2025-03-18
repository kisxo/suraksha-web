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


export default function Track(){
    //reference to div element where map is drawn
    const mapRef = useRef(null);

    useEffect(() => {
        if (mapRef.current) {
            //Halmira Bridge
            const startingLocation = fromLonLat([93.94114639182163, 26.51823896692769]);
            // const startingLocation = fromLonLat([26.6700, 47.4768]);



            //map object
            const map = new Map({
                layers: [
                    new TileLayer({source: new OSM()}),
                ],
                view: new View({
                    center: startingLocation,
                    zoom: 12,
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