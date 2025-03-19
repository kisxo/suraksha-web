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
import { getVectorContext } from "ol/render";
import Geolocation from 'ol/Geolocation.js';
import Feature from "ol/Feature";
import VectorSource from "ol/source/Vector";
import VectorLayer from 'ol/layer/Vector.js';


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

    // api key safe only for magicminute.online
    const key = 'W3C2voHBykIfczgyCU9x ';

    const map = new Map();
    const view = new View({
        center: startingLocation,
        zoom: 14,
    })
    // hybrid satellite map layer
    const hybridTile = new TileLayer({
        source: new ImageTile({
          url: 'https://api.maptiler.com/maps/hybrid/{z}/{x}/{y}.jpg?key=' + key,
          tileSize: 512,
          maxZoom: 50,
        }),
    })

    const geolocation = new Geolocation({
        trackingOptions: {
          enableHighAccuracy: true,
        },
        projection: view.getProjection(),
    });

    const displayMap = async () => {
        await drawMap();
    }

    const startTracking = async() => {
        geolocation.setTracking(true);
        console.log("start tracking")
        console.log(geolocation.getPosition())

        const accuracyFeature = new Feature();
        
        geolocation.on('change:accuracyGeometry', function () {
            // @ts-ignore
            accuracyFeature.setGeometry();
        });

        const positionFeature = new Feature();
        positionFeature.setStyle(
            new Style({
                image: new CircleStyle({
                radius: 6,
                fill: new Fill({
                    color: '#3399CC',
                }),
                stroke: new Stroke({
                    color: '#fff',
                    width: 2,
                }),
                }),
            }),
        );

        geolocation.on('change:position', function () {
            const coordinates = geolocation.getPosition();
            // @ts-ignore
            positionFeature.setGeometry(coordinates ? new Point(coordinates) : null);
        });

        new VectorLayer({
            map: map,
            source: new VectorSource({
              features: [accuracyFeature, positionFeature],
            }),
          });
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
                hybridTile,
            ]

            
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
            <div ref={mapRef} className='h-[600px]'></div>

                <h3>Map</h3>
                <label>
                    track position
                    <button onClick={()=> {startTracking()}} className="bg-blue-500">Tract</button>
                </label>
                
        </>
    )
}