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
import DragRotateAndZoom from 'ol/interaction/DragRotateAndZoom.js';


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
    // const deviceOrientation = new DeviceOrientationEvent('deviceorientation')
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
            accuracyFeature.setGeometry(geolocation.getAccuracyGeometry());
        });

        const positionFeature = new Feature();
        positionFeature.setStyle(
            new Style({
                image: new CircleStyle({
                    radius: 8,
                    fill: new Fill({color: '#007FFF'}),
                    stroke: new Stroke({color: 'white', width: 2}),
                }),
            })
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

            map.addInteraction(new DragRotateAndZoom())
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
            fill: new Fill({color: '#E32636'}),
            stroke: new Stroke({color: 'white', width: 2}),
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
        <div>
            <div className="flex justify-between content-center py-5 px-4 text-slate-600">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" className="w-7 h-7">
                    <rect width="256" height="256" fill="none"/>
                    <line x1="216" y1="128" x2="40" y2="128" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/>
                    <polyline points="112 56 40 128 112 200" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/>
                </svg>
                <span className="content-center text-xl font-semibold">Location Tracking</span>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" className="w-7 h-7">
                    <rect width="256" height="256" fill="none"/>
                    <circle cx="128" cy="128" r="40" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/>
                    <path d="M41.43,178.09A99.14,99.14,0,0,1,31.36,153.8l16.78-21a81.59,81.59,0,0,1,0-9.64l-16.77-21a99.43,99.43,0,0,1,10.05-24.3l26.71-3a81,81,0,0,1,6.81-6.81l3-26.7A99.14,99.14,0,0,1,102.2,31.36l21,16.78a81.59,81.59,0,0,1,9.64,0l21-16.77a99.43,99.43,0,0,1,24.3,10.05l3,26.71a81,81,0,0,1,6.81,6.81l26.7,3a99.14,99.14,0,0,1,10.07,24.29l-16.78,21a81.59,81.59,0,0,1,0,9.64l16.77,21a99.43,99.43,0,0,1-10,24.3l-26.71,3a81,81,0,0,1-6.81,6.81l-3,26.7a99.14,99.14,0,0,1-24.29,10.07l-21-16.78a81.59,81.59,0,0,1-9.64,0l-21,16.77a99.43,99.43,0,0,1-24.3-10l-3-26.71a81,81,0,0,1-6.81-6.81Z" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/>
                </svg>

            </div>
            <div className="relative">
                <div ref={mapRef} className='h-[400px] relative'></div>
                <div className="bg-white rounded-t-3xl absolute w-full bottom-0 text-center py-5 font-semibold text-xl text-blue-500 border-b">
                    Live Tracking
                </div>
            </div>
            
            <div onClick={()=> {startTracking()}} className="bg-blue-500 w-1/3 mx-auto text-center text-white rounded py-2 my-4">Start Tracking</div>
               
                
        </div>
    )
}