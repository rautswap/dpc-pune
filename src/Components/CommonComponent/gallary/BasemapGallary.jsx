import { useContext, useEffect, useState } from "react";
import EsriBasemapGallery from "@arcgis/core/widgets/BasemapGallery";
import Basemap from "@arcgis/core/Basemap";
import Expand from "@arcgis/core/widgets/Expand"
import { MapViewContext } from "../../MapComponent/MapContext";
import WMSLayer from "@arcgis/core/layers/WMSLayer";
import { REACT_APP_bhuvan_GEOSERVER_URI_WMS } from "../utils";
const geoserver_wfs_ows = REACT_APP_bhuvan_GEOSERVER_URI_WMS;

function BasemapGallary({ addMapExpand }) {
    const { view } = useContext(MapViewContext)
    const [basemapGallery, setBasemapGallery] = useState();
    const [basemapExpand, setBasemapExpand] = useState();
    const widgetId = 'basemap-gallery';
    useEffect(() => {
        if (view) {
            const lulcBaseMap = new WMSLayer({
                url: geoserver_wfs_ows,
                sublayers: [
                    {
                        name: 'lulc:MH_LULC50K_1516',
                    }]
            });
            const bhuvanLulcBasemap = new Basemap({
                title: "LULC",
                id: "lulc",
                baseLayers: [lulcBaseMap]
            })
            setBasemapGallery(new EsriBasemapGallery({
                view: view,
                container: document.createElement("div"),
                source: [Basemap.fromId("topo-vector"), bhuvanLulcBasemap, Basemap.fromId("hybrid"), Basemap.fromId("dark-gray"), Basemap.fromId("gray"), Basemap.fromId("streets-vector"), Basemap.fromId("streets-night-vector"), Basemap.fromId("streets-navigation-vector"), Basemap.fromId("satellite"), Basemap.fromId("terrain"), Basemap.fromId("oceans")] // autocasts to LocalBasemapsSource
            }));
        }
    }, [view])
    useEffect(() => {
        if (view) {
            if (!basemapGallery) return;
            (async () => {
                const expand = new Expand({
                    expandIconClass: 'esri-icon-basemap',
                    view: view,
                    content: basemapGallery,
                    expandTooltip: 'Basemap Gallery',
                    collapseTooltip: 'Collapse Basemap Gallery',
                    id: widgetId,
                });
                setBasemapExpand(expand);
            })();
        }
    }, [basemapGallery, view]);

    useEffect(() => {
        if (view) {
            if (!basemapExpand) return;
            addMapExpand(basemapExpand);

            view.ui.add({
                component: basemapExpand,
                position: 'top-trailing',
                index: 1,
            });
        }
    }, [addMapExpand, basemapExpand, view]);
    return (<></>);
}
export default BasemapGallary;


