import React, {useEffect, useState} from "react";
import {Circle, FeatureGroup, MapContainer, Marker, Popup, TileLayer, useMapEvents} from "react-leaflet";
import "leaflet/dist/leaflet.css";

const initialData = {
    zoom: 10,
    lat: 46.9639705,
    long: 28.8933602
};
const App = () => {
    const initialZoom = 10;

    const [data, setData] = useState(initialData);

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
        setData(initialData);
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
                style={{width: '100%', height: '93vh', opacity: 1, position: "absolute", color: "red"}}
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


                <FeatureGroup pathOptions={{color: 'red',}}>
                    <Marker position={[46.06169345, 28.83078123]} zIndexOffset={300} opacity={1}>
                        <Circle center={[46.63674412, 29.41114253]} opacity={1} radius={4000}/>
                    </Marker>
                    <Popup>Turbina 12</Popup>
                    <Circle center={[46.63674412, 29.41114253]} opacity={1} radius={4000}/>
                </FeatureGroup>
                {/*<FeatureGroup pathOptions={{color: 'red'}}>*/}
                {/*    <Popup>Turbina 11</Popup>*/}
                {/*    <Circle center={[47.5011236, 28.36536236]} radius={4000}/>*/}
                {/*</FeatureGroup>*/}
                {/*<FeatureGroup pathOptions={{color: 'red'}}>*/}
                {/*    <Popup>Turbina 1</Popup>*/}
                {/*    <Circle center={[47.9639705, 28.8933602]} radius={4000}/>*/}
                {/*</FeatureGroup>*/}
                {/*<FeatureGroup pathOptions={{color: 'red'}}>*/}
                {/*    <Popup>Turbina 2</Popup>*/}
                {/*    <Circle center={[46.06169345, 28.83078123]} radius={4000}/>*/}
                {/*</FeatureGroup>*/}
                {/*<FeatureGroup pathOptions={{color: 'red'}}>*/}
                {/*    <Popup>Turbina 3</Popup>*/}
                {/*    <Circle center={[48.15659234, 28.28489453]} radius={4000}/>*/}
                {/*</FeatureGroup>*/}
                <MapEvent onDrag={handleDrag} onZoomChange={handleZoomChange}/>
            </MapContainer>
            <iframe
                style={{position: "relative", opacity: 1}}
                loading={'lazy'}
                width={'100%'}
                height={'900vh'}
                src={`
                https://embed.windy.com/embed.html?type=map&location=location&metricRain=default&metricTemp=default&metricWind=default&zoom=${zoom}&overlay=wind&product=ecmwf&level=surface&lat=${lat}&lon=${long}
                `}
            ></iframe>

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

