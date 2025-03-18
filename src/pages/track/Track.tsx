import Map from 'ol/Map.js';
import View from 'ol/View.js';
import OSM from 'ol/source/OSM.js';
import TileLayer from 'ol/layer/Tile.js';
import { useEffect, useRef } from 'react';


export default function Track(){
    //reference to div element where map is drawn
    const mapRef = useRef(null);

    useEffect(() => {
        if (mapRef.current) {

            //map object
            const map = new Map({
                layers: [
                  new TileLayer({source: new OSM()}),
                ],
                view: new View({
                  center: [0, 0],
                  zoom: 2,
                }),
                target: mapRef.current,
              });
    
            return () => map.setTarget(undefined);
        }
    },[])

    return (
        <>
            <h3>Tracking</h3>
            <div ref={mapRef} className='border w-[100%] h-[400px]'></div>
        </>
    )
}