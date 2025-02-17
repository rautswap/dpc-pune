import React, {  createContext, useState } from "react";
import MapView from "@arcgis/core/views/MapView";
import EsriMap from "@arcgis/core/Map";
import { useEffect, useRef } from "react";
import './style.css'
   
export const MapViewContext = createContext();
function MapViewContextPrvider({children}) {
    const [view, setView] = useState();
    const mapDiv = useRef(null);
    useEffect(() => {
        if (mapDiv.current) {
            /**
             * Initialize application
             */
            const webmap = new EsriMap({
                basemap: "topo-vector"
            });

            const _view = new MapView({
                container: mapDiv.current, // The id or node representing the DOM element containing the view.
                map: webmap, // An instance of a Map object to display in the view.
                center: [73.8567, 18.5204],
                zoom: 8
            });
            _view.ui.move('zoom', 'bottom-left');
            setView(_view)
            return () => _view && _view.destroy();

        }
    }, []);

    return (<MapViewContext.Provider
        value={{view}}>
        <div  id="map" ref={mapDiv} ></div>
        {children}
    </MapViewContext.Provider>)
    // ;

}
export default MapViewContextPrvider;