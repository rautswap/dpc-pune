import { useContext, useEffect } from "react";
import WMSLayer from "@arcgis/core/layers/WMSLayer";
import esriRequest from "@arcgis/core/request";
import Graphic from "@arcgis/core/Graphic";
import { MapViewContext } from "../MapComponent/MapContext";
import { popupUtils } from "../CommonComponent/popupUtils";
import { REACT_APP_GEOSERVER_URI_WMS } from "../CommonComponent/utils";
// import * as reactiveUtils from "@arcgis/core/core/reactiveUtils";

const geoserver_wfs_ows = REACT_APP_GEOSERVER_URI_WMS;
function AdministratorLayer({ setSearchSource }) {
    const { view } = useContext(MapViewContext);
    useEffect(() => {
        if (view) {
            const adminLayer = new WMSLayer({
                title: 'Administrator Layers',
                url: geoserver_wfs_ows,
                featureInfoFormat: 'application/json',
                featureInfoFormats: 'application/json',
                featureInfoUrl: geoserver_wfs_ows + "?",
                fetchFeatureInfoFunction: async (query) => {
                    query.info_format = "application/json";
                    const { data } = await esriRequest(adminLayer.featureInfoUrl, { query });
                    // Convert each GeoJSON feature into an Esri graphic.
                    return data.features.map(
                        (feature) =>
                            new Graphic({
                                attributes: {...feature.properties,id: ((feature.id).split(".")[0]).replace(/_/g, ' ').toUpperCase()},
                                outFields: ['*'],
                                popupTemplate: popupUtils.popUpTemplates
                            })
                    );
                },
                sublayers: [
                    {
                        name: 'transportation',
                        title: 'Transportation',
                        // popupTemplate: popupUtils.talukaPoupTemplates,
                        popupEnabled: true,
                        queryable: true,
                        visible: true,
                        legendUrl: geoserver_wfs_ows + "?REQUEST=GetLegendGraphic&VERSION=1.0.0&FORMAT=image/png&WIDTH=10&HEIGHT=10&LAYER=portal:transportation&legend_options=fontName:Times%20New%20Roman;fontAntiAliasing:true;fontColor:0x000033;fontSize:5;bgColor:0xFFFFEE;dpi:450",
                    },
                    {
                        name: 'school_location',
                        title: 'School Location',
                        // popupTemplate: popupUtils.talukaPoupTemplates,
                        popupEnabled: true,
                        queryable: true,
                        visible: true,
                        legendUrl: geoserver_wfs_ows + "?REQUEST=GetLegendGraphic&VERSION=1.0.0&FORMAT=image/png&WIDTH=10&HEIGHT=10&LAYER=portal:school_location&legend_options=fontName:Times%20New%20Roman;fontAntiAliasing:true;fontColor:0x000033;fontSize:5;bgColor:0xFFFFEE;dpi:450"
                    },
                    {
                        name: 'govt_admin_depart',
                        title: 'Admin Department',
                        // popupTemplate: popupUtils.talukaPoupTemplates,
                        popupEnabled: true,
                        queryable: true,
                        visible: true,
                        legendUrl: geoserver_wfs_ows + "?REQUEST=GetLegendGraphic&VERSION=1.0.0&FORMAT=image/png&WIDTH=10&HEIGHT=10&LAYER=portal:govt_admin_depart&legend_options=fontName:Times%20New%20Roman;fontAntiAliasing:true;fontColor:0x000033;fontSize:5;bgColor:0xFFFFEE;dpi:450"
                    },
                    {
                        name: 'Fort',
                        title: 'Fort',
                        // popupTemplate: popupUtils.talukaPoupTemplates,
                        popupEnabled: true,
                        queryable: true,
                        visible: true,
                        legendUrl: geoserver_wfs_ows + "?REQUEST=GetLegendGraphic&VERSION=1.0.0&FORMAT=image/png&WIDTH=10&HEIGHT=10&LAYER=portal:Fort&legend_options=fontName:Times%20New%20Roman;fontAntiAliasing:true;fontColor:0x000033;fontSize:5;bgColor:0xFFFFEE;dpi:450"
                    },
                    {
                        name: 'Settlement_Point',
                        title: 'Settlement Location',
                        // popupTemplate: popupUtils.talukaPoupTemplates,
                        popupEnabled: true,
                        queryable: true,
                        visible: true,
                        legendUrl: geoserver_wfs_ows + "?REQUEST=GetLegendGraphic&VERSION=1.0.0&FORMAT=image/png&WIDTH=10&HEIGHT=10&LAYER=portal:Settlement_Point&legend_options=fontName:Times%20New%20Roman;fontAntiAliasing:true;fontColor:0x000033;fontSize:5;bgColor:0xFFFFEE;dpi:450"
                    },
                    {
                        name: 'Monument_Location',
                        title: 'Monument Location',
                        // popupTemplate: popupUtils.talukaPoupTemplates,
                        popupEnabled: true,
                        queryable: true,
                        visible: true,
                        legendUrl: geoserver_wfs_ows + "?REQUEST=GetLegendGraphic&VERSION=1.0.0&FORMAT=image/png&WIDTH=10&HEIGHT=10&LAYER=portal:Monument_Location&legend_options=fontName:Times%20New%20Roman;fontAntiAliasing:true;fontColor:0x000033;fontSize:5;bgColor:0xFFFFEE;dpi:450"
                    },
                    {
                        name: 'police_station',
                        title: 'Police Station',
                        // popupTemplate: popupUtils.talukaPoupTemplates,
                        popupEnabled: true,
                        queryable: true,
                        visible: true,
                        legendUrl: geoserver_wfs_ows + "?REQUEST=GetLegendGraphic&VERSION=1.0.0&FORMAT=image/png&WIDTH=10&HEIGHT=10&LAYER=portal:police_station&legend_options=fontName:Times%20New%20Roman;fontAntiAliasing:true;fontColor:0x000033;fontSize:5;bgColor:0xFFFFEE;dpi:450"
                    },
                    {
                        name: 'Veterinary_Hospital',
                        title: 'Veterinary Hospital',
                        // popupTemplate: popupUtils.talukaPoupTemplates,
                        popupEnabled: true,
                        queryable: true,
                        visible: true,
                        legendUrl: geoserver_wfs_ows + "?REQUEST=GetLegendGraphic&VERSION=1.0.0&FORMAT=image/png&WIDTH=10&HEIGHT=10&LAYER=portal:Veterinary_Hospital&legend_options=fontName:Times%20New%20Roman;fontAntiAliasing:true;fontColor:0x000033;fontSize:5;bgColor:0xFFFFEE;dpi:450"
                    },
                    {
                        name: 'Hospital_Location',
                        title: 'Hospital Location',
                        // popupTemplate: popupUtils.talukaPoupTemplates,
                        popupEnabled: true,
                        queryable: true,
                        visible: true,
                        legendUrl: geoserver_wfs_ows + "?REQUEST=GetLegendGraphic&VERSION=1.0.0&FORMAT=image/png&WIDTH=10&HEIGHT=10&LAYER=portal:Hospital_Location&legend_options=fontName:Times%20New%20Roman;fontAntiAliasing:true;fontColor:0x000033;fontSize:5;bgColor:0xFFFFEE;dpi:450"
                    },
                    {
                        name: 'road_black_spot',
                        title: 'Road Black Spot',
                        // popupTemplate: popupUtils.talukaPoupTemplates,
                        popupEnabled: true,
                        queryable: true,
                        visible: true,
                        legendUrl: geoserver_wfs_ows + "?REQUEST=GetLegendGraphic&VERSION=1.0.0&FORMAT=image/png&WIDTH=10&HEIGHT=10&LAYER=portal:road_black_spot&legend_options=fontName:Times%20New%20Roman;fontAntiAliasing:true;fontColor:0x000033;fontSize:5;bgColor:0xFFFFEE;dpi:450"
                    },
                    {
                        name: 'Rail_Track',
                        title: 'Rail Track',
                        // popupTemplate: popupUtils.talukaPoupTemplates,
                        popupEnabled: true,
                        queryable: true,
                        visible: true,
                        legendUrl: geoserver_wfs_ows + "?REQUEST=GetLegendGraphic&VERSION=1.0.0&FORMAT=image/png&WIDTH=10&HEIGHT=10&LAYER=portal:Rail_Track&legend_options=fontName:Times%20New%20Roman;fontAntiAliasing:true;fontColor:0x000033;fontSize:5;bgColor:0xFFFFEE;dpi:450"
                    },
                    {
                        name: 'Road',
                        title: 'Road',
                        // popupTemplate: popupUtils.talukaPoupTemplates,
                        popupEnabled: true,
                        queryable: true,
                        visible: false,
                        legendUrl: geoserver_wfs_ows + "?REQUEST=GetLegendGraphic&VERSION=1.0.0&FORMAT=image/png&WIDTH=10&HEIGHT=10&LAYER=portal:Road&legend_options=fontName:Times%20New%20Roman;fontAntiAliasing:true;fontColor:0x000033;fontSize:5;bgColor:0xFFFFEE;dpi:450"
                    },
                    {
                        name: 'Contour',
                        title: 'Contour',
                        // popupTemplate: popupUtils.talukaPoupTemplates,
                        popupEnabled: true,
                        queryable: true,
                        visible: false,
                        legendUrl: geoserver_wfs_ows + "?REQUEST=GetLegendGraphic&VERSION=1.0.0&FORMAT=image/png&WIDTH=10&HEIGHT=10&LAYER=portal:Contour&legend_options=fontName:Times%20New%20Roman;fontAntiAliasing:true;fontColor:0x000033;fontSize:5;bgColor:0xFFFFEE;dpi:450"
                    },
                    {
                        name: 'Riverand_Waterboday',
                        title: 'River / Waterboday',
                        // popupTemplate: popupUtils.talukaPoupTemplates,
                        popupEnabled: true,
                        queryable: true,
                        visible: true,
                        legendUrl: geoserver_wfs_ows + "?REQUEST=GetLegendGraphic&VERSION=1.0.0&FORMAT=image/png&WIDTH=10&HEIGHT=10&LAYER=portal:Riverand_Waterboday&legend_options=fontName:Times%20New%20Roman;fontAntiAliasing:true;fontColor:0x000033;fontSize:5;bgColor:0xFFFFEE;dpi:450"

                    },
                    {
                        name: 'Parliamentary_Constituency',
                        title: 'Parliamentary Constituency',
                        // popupTemplate: popupUtils.talukaPoupTemplates,
                        popupEnabled: true,
                        queryable: true,
                        visible: false,
                        legendUrl: geoserver_wfs_ows + "?REQUEST=GetLegendGraphic&VERSION=1.0.0&FORMAT=image/png&WIDTH=10&HEIGHT=10&LAYER=portal:Parliamentary_Constituency&legend_options=fontName:Times%20New%20Roman;fontAntiAliasing:true;fontColor:0x000033;fontSize:5;bgColor:0xFFFFEE;dpi:450"
                    },
                    {
                        name: 'Assembly_Constituencies',
                        title: 'Assembly Constituencies',
                        // popupTemplate: popupUtils.talukaPoupTemplates,
                        popupEnabled: true,
                        queryable: true,
                        visible: false,
                        legendUrl: geoserver_wfs_ows + "?REQUEST=GetLegendGraphic&VERSION=1.0.0&FORMAT=image/png&WIDTH=10&HEIGHT=10&LAYER=portal:Assembly_Constituencies&legend_options=fontName:Times%20New%20Roman;fontAntiAliasing:true;fontColor:0x000033;fontSize:5;bgColor:0xFFFFEE;dpi:450"
                    },
                    {
                        name: 'Village_Boundary',
                        title: 'Village Boundary',
                        // popupTemplate: popupUtils.talukaPoupTemplates,
                        popupEnabled: true,
                        queryable: true,
                        legendUrl: geoserver_wfs_ows + "?REQUEST=GetLegendGraphic&VERSION=1.0.0&FORMAT=image/png&WIDTH=10&HEIGHT=10&LAYER=portal:Village_Boundary&legend_options=fontName:Times%20New%20Roman;fontAntiAliasing:true;fontColor:0x000033;fontSize:5;bgColor:0xFFFFEE;dpi:450"
                    },
                    {
                        name: 'Taluka_Boundary',
                        title: 'Taluka Boundary',
                        popupEnabled: true,
                        queryable: true,
                        legendUrl: geoserver_wfs_ows + "?REQUEST=GetLegendGraphic&VERSION=1.0.0&FORMAT=image/png&WIDTH=10&HEIGHT=10&LAYER=portal:Taluka_Boundary&legend_options=fontName:Times%20New%20Roman;fontAntiAliasing:true;fontColor:0x000033;fontSize:5;bgColor:0xFFFFEE;dpi:450"
                    },
                    {
                        name: 'District_Boundary',
                        title: 'District Boundary',
                        popupEnabled: true,
                        queryable: true,
                        legendUrl: geoserver_wfs_ows + "?REQUEST=GetLegendGraphic&VERSION=1.0.0&FORMAT=image/png&WIDTH=10&HEIGHT=10&LAYER=portal:District_Boundary&legend_options=fontName:Times%20New%20Roman;fontAntiAliasing:true;fontColor:0x000033;fontSize:5;bgColor:0xFFFFEE;dpi:450"
                    }
                ],
            });
            view.map.add(adminLayer);
            // console.log(adminLayer)
            // view.when(function () {
            //     view.popup.autoOpenEnabled = false;
            //     view.on("click", function (event) {
            //         var info = adminLayer.getFeatureInfo();
            //         console.log(info)
            //         view.popup.open({
            //             location: event.mapPoint
            //         });
            //     });
            // })
        }

    }, [view, setSearchSource])

    return (<></>);
}
export default AdministratorLayer;