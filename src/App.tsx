import React, {useState} from "react";
import {Circle, FeatureGroup, MapContainer, Marker, Popup, TileLayer, useMapEvents} from "react-leaflet";
import "leaflet/dist/leaflet.css";

const App = () => {
    const initialZoom = 10;
    const width_set = 765;
    const height_set = 1365;

    const [zoom, setZoom] = useState(initialZoom);
    const [lat, setLat] = useState(46.9639705);
    const [long, setLong] = useState(28.8933602);

    const handleCord = (onClick: any) => {
        const locations = onClick;
        console.log('location', locations.lat);
        setLat(locations.lat);
        setLong(locations.lng)
    };

    const handleZoomChange = (newZoom: any) => {
        setZoom(newZoom);
        console.log("zoom:", newZoom);
    };

    return (
        <div>

            <MapContainer
                center={[lat, long]}
                zoom={initialZoom}
                style={{width: width_set, height: height_set, opacity: 0.4, zIndex: 1, position: "absolute", color: "red"}}
            >
                <TileLayer
                    url="
                    https://{s}.tile.openstreetmap.fr/osmfr/{z}/{x}/{y}.png
                    "
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                ></TileLayer>
                <FeatureGroup pathOptions={{color: 'purple'}}>
                    <Popup>Turbina 12</Popup>
                    <Circle center={[47.2315535, 28.8933602]} radius={4000}/>
                </FeatureGroup>
                <FeatureGroup pathOptions={{color: 'purple'}}>
                    <Popup>Turbina 11</Popup>
                    <Circle center={[47.5532364, 28.8933602]} radius={4000}/>
                </FeatureGroup>
                <FeatureGroup pathOptions={{color: 'purple'}}>
                    <Popup>Turbina 1</Popup>
                    <Circle center={[47.9639705, 28.8933602]} radius={4000}/>
                </FeatureGroup>
                <FeatureGroup pathOptions={{color: 'purple'}}>
                    <Popup>Turbina 2</Popup>
                    <Circle center={[45.9639705, 27.8933602]} radius={4000}/>
                </FeatureGroup>
                <FeatureGroup pathOptions={{color: 'purple'}}>
                    <Popup>Turbina 3</Popup>
                    <Circle center={[45.9639705, 27.8933602]} radius={4000}/>
                </FeatureGroup>
                <ZoomTracker onZoomChange={handleZoomChange}/>
                {/*<AddMarkerToClick/>*/}
                <MyComponent onClick={handleCord}/>
            </MapContainer>
            <div style={{opacity: 0.9, zIndex: 100, width: '765px', height: '1365px'}}>
                <iframe
                    id="windyMap"
                    title="Windy Map"
                    width={width_set}
                    height={height_set}
                    src={`
                https://embed.windy.com/embed.html?type=map&location=location&metricRain=default&metricTemp=default&metricWind=default&zoom=${zoom}&overlay=wind&product=ecmwf&level=surface&lat=${lat}&lon=${long}
                `}
                ></iframe>
            </div>
        </div>
    );
};
// @ts-ignore
const ZoomTracker = ({onZoomChange}) => {
    useMapEvents({
        zoomend: (event) => {
            const newZoom = event.target._zoom;
            onZoomChange(newZoom);
        },
    });

    return null;
};

// @ts-ignore
function MyComponent({onClick}) {
    const map = useMapEvents({
        dragend: (e) => {
            console.log("map center", e);
            onClick(e.target.getCenter())
        },
        predrag: (e) => {
            console.log('predrag', e);
        }
    });
    return null
}

function AddMarkerToClick() {

    const [markers, setMarkers] = useState([]);

    const map = useMapEvents({
        click(e) {
            const newMarker = e.latlng;
            // @ts-ignore
            setMarkers([...markers, newMarker]);
        },
    });

    return (
        <>
            {markers.map(marker =>
                <Marker position={marker}>
                    <Popup>!!!</Popup>
                </Marker>
            )}
        </>
    )
}

export default App;

