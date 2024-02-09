import React, {useEffect, useState} from "react";
import {Circle, FeatureGroup, MapContainer, Popup, TileLayer, useMapEvents} from "react-leaflet";
import "leaflet/dist/leaflet.css";

const App = () => {
    const initialZoom = 10;

    const [zoom, setZoom] = useState(initialZoom);
    const [lat, setLat] = useState(46.9639705);
    const [long, setLong] = useState(28.8933602);

    const handleDrag = (onClick: any) => {
        setLong(onClick.lat);
        setLong(onClick.lng)
    };

    const handleZoomChange = (data: any) => {
        const zoom = data._zoom;
        const lat = data.getCenter().lat;
        const long = data.getCenter().lng;
        setLong(long);
        setLat(lat);
        setZoom(zoom);
    };

    useEffect(() => {
        // eslint-disable-next-line @typescript-eslint/no-unused-expressions
        setZoom(9),
            setLat(46.9639705),
            setLong(28.8933602)
    }, []);

    return (
        <div>

            <MapContainer
                center={[lat, long]}
                zoom={initialZoom}
                style={{width: '100%', height: '93vh', zIndex: 1, opacity: 0.5, position: "absolute", color: "red"}}
                minZoom={3}
                maxZoom={9}
            >
                <TileLayer
                    opacity={0}
                    url="
                    https://tile.openstreetmap.org/{z}/{x}/{y}.png
                   "
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                ></TileLayer>

                <FeatureGroup pathOptions={{color: 'red'}}>
                    <Popup>Turbina 12</Popup>
                    <Circle center={[46.63674412, 29.41114253]} radius={4000}/>
                </FeatureGroup>
                <FeatureGroup pathOptions={{color: 'red'}}>
                    <Popup>Turbina 11</Popup>
                    <Circle center={[47.5011236, 28.36536236]} radius={4000}/>
                </FeatureGroup>
                <FeatureGroup pathOptions={{color: 'red'}}>
                    <Popup>Turbina 1</Popup>
                    <Circle center={[47.9639705, 28.8933602]} radius={4000}/>
                </FeatureGroup>
                <FeatureGroup pathOptions={{color: 'red'}}>
                    <Popup>Turbina 2</Popup>
                    <Circle center={[46.06169345, 28.83078123]} radius={4000}/>
                </FeatureGroup>
                <FeatureGroup pathOptions={{color: 'red'}}>
                    <Popup>Turbina 3</Popup>
                    <Circle center={[48.15659234, 28.28489453]} radius={4000}/>
                </FeatureGroup>
                <MapEvent onDrag={handleDrag} onZoomChange={handleZoomChange}/>
            </MapContainer>
            <div style={{zIndex: 100}}>

                <iframe
                    loading={'lazy'}
                    width={'100%'}
                    height={'900vh'}
                    src={`
                https://embed.windy.com/embed.html?type=map&location=location&metricRain=default&metricTemp=default&metricWind=default&zoom=${zoom}&overlay=wind&product=ecmwf&level=surface&lat=${lat}&lon=${long}
                `}
                ></iframe>
            </div>


        </div>
    );
};

// @ts-ignore
function MapEvent({onDrag, onZoomChange}) {
    useMapEvents({
        drag: (e) => {
            onDrag(e.target.getCenter())
        },
        zoom: (e) => {
            onZoomChange(e.target);
        }
    });
    return null
}

export default App;

