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
import CircleStyle from 'ol/style/Circle.js';
import Fill from 'ol/style/Fill.js';
import Stroke from 'ol/style/Stroke.js';
import Style from 'ol/style/Style.js';
import { Point } from "ol/geom";
import { ImageTile } from "ol/source";
import { useGeolocated } from "react-geolocated";
import { getVectorContext } from "ol/render";


export default function Track(){
    //Halmira Bridge
    let x =93.94114639182163;
    const startingLocation = fromLonLat([93.94114639182163, 26.51823896692769]);
    //rahul home
    // const startingLocation = fromLonLat([93.793962, 26.549928]);
    //manprabesh home 
    // const startingLocation = fromLonLat([93.9420671, 26.3415901]);
    //reference to div element where map is drawn
    const mapRef = useRef<HTMLDivElement | null>(null);
    const { coords, isGeolocationAvailable, isGeolocationEnabled } =
        useGeolocated({
            positionOptions: {
                enableHighAccuracy: false,
            },
        userDecisionTimeout: 50000,
    });

    // api key safe only for magicminute.online
    const key = 'W3C2voHBykIfczgyCU9x ';

    const map = new Map();
    const hybridTile = new TileLayer({
        source: new ImageTile({
          url: 'https://api.maptiler.com/maps/hybrid/{z}/{x}/{y}.jpg?key=' + key,
          tileSize: 512,
          maxZoom: 50,
        }),
    })


    const displayMap = async () => {
        await drawMap();
    }

    useEffect(() => {

        displayMap()
        
    },[])

    const drawMap = async () => {
        if (mapRef.current) {

            const layers = [
                new TileLayer({
                  source: new OSM(),
                }),
                hybridTile
            ]

            const view: View = new View({
                center: startingLocation,
                zoom: 14,
            })

            
            map.setLayers(layers)
            map.setView(view)
            map.addControl(new ScaleLine())
            map.addControl(new Zoom())
            map.setTarget(mapRef.current)
    
            return () => map.setTarget(undefined);
        }
    }


    
    const userMarker = new Style({
        image: new CircleStyle({
            radius: 8,
            fill: new Fill({color: 'yellow'}),
            stroke: new Stroke({color: 'red', width: 1}),
        }),
    });

    hybridTile.on('postrender', function (event) {
        const vectorContext = getVectorContext(event);

        //set user location
        let userPoint = new Point(fromLonLat([x += 0.00001, 26.51823896692769]));

        //render user point
        vectorContext.setStyle(userMarker);
        vectorContext.drawGeometry(userPoint);
      
        map.render();
    })

    map.render()

    return (
        <>
            <h3>Tracking</h3>
            <div ref={mapRef} className='h-[800px]'></div>
            {!isGeolocationAvailable ? 
            (   
                <h3>Location not avilable</h3>
            ):!isGeolocationEnabled ?
            (
                <h3>Geo Location not enabled</h3>
            ):coords?
            (
               <>
               {console.log(coords)}
               </>
            ):
            (
                <div>Getting the location data&hellip; </div>
            )}
                <h3>Map</h3>
                
        </>
    )
}