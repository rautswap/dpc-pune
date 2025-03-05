import { useContext, useEffect } from "react";
import WMSLayer from "@arcgis/core/layers/WMSLayer";
import esriRequest from "@arcgis/core/request";
import Graphic from "@arcgis/core/Graphic";
import { MapViewContext } from "../MapComponent/MapContext";
import { popupUtils } from "../CommonComponent/popupUtils";
import { REACT_APP_GEOSERVER_URI_WMS } from "../CommonComponent/utils";
import { LayerIds } from "../CommonComponent/utils/LayerIds";
// import * as reactiveUtils from "@arcgis/core/core/reactiveUtils";

const geoserver_wfs_ows = REACT_APP_GEOSERVER_URI_WMS;
function AdministratorLayer({ setSearchSource }) {
    const { view } = useContext(MapViewContext);
    useEffect(() => {
        if (view) {
            const adminLayer = new WMSLayer({
                title: 'Administrator Layers',
                url: geoserver_wfs_ows,
                id:LayerIds.adminLayerId,
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
                        name: LayerIds.transportation,
                        title: 'Transportation',
                        // popupTemplate: popupUtils.talukaPoupTemplates,
                        popupEnabled: true,
                        queryable: true,
                        visible: true,
                        legendUrl: geoserver_wfs_ows + "?REQUEST=GetLegendGraphic&VERSION=1.0.0&FORMAT=image/png&WIDTH=10&HEIGHT=10&LAYER=portal:"+LayerIds.transportation+"&legend_options=fontName:Times%20New%20Roman;fontAntiAliasing:true;fontColor:0x000033;fontSize:5;bgColor:0xFFFFEE;dpi:450",
                    },
                    {
                        name: LayerIds.schoolLocation,
                        title: 'School Location',
                        // popupTemplate: popupUtils.talukaPoupTemplates,
                        popupEnabled: true,
                        queryable: true,
                        visible: true,
                        legendUrl: geoserver_wfs_ows + "?REQUEST=GetLegendGraphic&VERSION=1.0.0&FORMAT=image/png&WIDTH=10&HEIGHT=10&LAYER=portal:"+LayerIds.schoolLocation+"&legend_options=fontName:Times%20New%20Roman;fontAntiAliasing:true;fontColor:0x000033;fontSize:5;bgColor:0xFFFFEE;dpi:450"
                    },
                    {
                        name: LayerIds.govtAdminDepart,
                        title: 'Admin Department',
                        // popupTemplate: popupUtils.talukaPoupTemplates,
                        popupEnabled: true,
                        queryable: true,
                        visible: true,
                        legendUrl: geoserver_wfs_ows + "?REQUEST=GetLegendGraphic&VERSION=1.0.0&FORMAT=image/png&WIDTH=10&HEIGHT=10&LAYER=portal:"+LayerIds.govtAdminDepart+"&legend_options=fontName:Times%20New%20Roman;fontAntiAliasing:true;fontColor:0x000033;fontSize:5;bgColor:0xFFFFEE;dpi:450"
                    },
                    {
                        name: LayerIds.fort,
                        title: 'Fort',
                        // popupTemplate: popupUtils.talukaPoupTemplates,
                        popupEnabled: true,
                        queryable: true,
                        visible: true,
                        legendUrl: geoserver_wfs_ows + "?REQUEST=GetLegendGraphic&VERSION=1.0.0&FORMAT=image/png&WIDTH=10&HEIGHT=10&LAYER=portal:"+LayerIds.fort+"&legend_options=fontName:Times%20New%20Roman;fontAntiAliasing:true;fontColor:0x000033;fontSize:5;bgColor:0xFFFFEE;dpi:450"
                    },
                    {
                        name: LayerIds.settlementPoint,
                        title: 'Settlement Location',
                        // popupTemplate: popupUtils.talukaPoupTemplates,
                        popupEnabled: true,
                        queryable: true,
                        visible: true,
                        legendUrl: geoserver_wfs_ows + "?REQUEST=GetLegendGraphic&VERSION=1.0.0&FORMAT=image/png&WIDTH=10&HEIGHT=10&LAYER=portal:"+LayerIds.settlementPoint+"&legend_options=fontName:Times%20New%20Roman;fontAntiAliasing:true;fontColor:0x000033;fontSize:5;bgColor:0xFFFFEE;dpi:450"
                    },
                    {
                        name: LayerIds.monumentLocation,
                        title: 'Monument Location',
                        // popupTemplate: popupUtils.talukaPoupTemplates,
                        popupEnabled: true,
                        queryable: true,
                        visible: true,
                        legendUrl: geoserver_wfs_ows + "?REQUEST=GetLegendGraphic&VERSION=1.0.0&FORMAT=image/png&WIDTH=10&HEIGHT=10&LAYER=portal:"+LayerIds.monumentLocation+"&legend_options=fontName:Times%20New%20Roman;fontAntiAliasing:true;fontColor:0x000033;fontSize:5;bgColor:0xFFFFEE;dpi:450"
                    },
                    {
                        name: LayerIds.policestation,
                        title: 'Police Station',
                        // popupTemplate: popupUtils.talukaPoupTemplates,
                        popupEnabled: true,
                        queryable: true,
                        visible: true,
                        legendUrl: geoserver_wfs_ows + "?REQUEST=GetLegendGraphic&VERSION=1.0.0&FORMAT=image/png&WIDTH=10&HEIGHT=10&LAYER=portal:"+LayerIds.policestation+"&legend_options=fontName:Times%20New%20Roman;fontAntiAliasing:true;fontColor:0x000033;fontSize:5;bgColor:0xFFFFEE;dpi:450"
                    },
                    {
                        name:LayerIds.veterinaryHospital,
                        title: 'Veterinary Hospital',
                        // popupTemplate: popupUtils.talukaPoupTemplates,
                        popupEnabled: true,
                        queryable: true,
                        visible: true,
                        legendUrl: geoserver_wfs_ows + "?REQUEST=GetLegendGraphic&VERSION=1.0.0&FORMAT=image/png&WIDTH=10&HEIGHT=10&LAYER=portal:"+LayerIds.veterinaryHospital+"&legend_options=fontName:Times%20New%20Roman;fontAntiAliasing:true;fontColor:0x000033;fontSize:5;bgColor:0xFFFFEE;dpi:450"
                    },
                    {
                        name: LayerIds.hospitalLocation,
                        title: 'Hospital Location',
                        // popupTemplate: popupUtils.talukaPoupTemplates,
                        popupEnabled: true,
                        queryable: true,
                        visible: true,
                        legendUrl: geoserver_wfs_ows + "?REQUEST=GetLegendGraphic&VERSION=1.0.0&FORMAT=image/png&WIDTH=10&HEIGHT=10&LAYER=portal:"+LayerIds.hospitalLocation+"&legend_options=fontName:Times%20New%20Roman;fontAntiAliasing:true;fontColor:0x000033;fontSize:5;bgColor:0xFFFFEE;dpi:450"
                    },
                    {
                        name: LayerIds.roadBlackSpot,
                        title: 'Road Black Spot',
                        // popupTemplate: popupUtils.talukaPoupTemplates,
                        popupEnabled: true,
                        queryable: true,
                        visible: true,
                        legendUrl: geoserver_wfs_ows + "?REQUEST=GetLegendGraphic&VERSION=1.0.0&FORMAT=image/png&WIDTH=10&HEIGHT=10&LAYER=portal:"+LayerIds.roadBlackSpot+"&legend_options=fontName:Times%20New%20Roman;fontAntiAliasing:true;fontColor:0x000033;fontSize:5;bgColor:0xFFFFEE;dpi:450"
                    },
                    {
                        name: LayerIds.railTrack,
                        title: 'Rail Track',
                        // popupTemplate: popupUtils.talukaPoupTemplates,
                        popupEnabled: true,
                        queryable: true,
                        visible: true,
                        legendUrl: geoserver_wfs_ows + "?REQUEST=GetLegendGraphic&VERSION=1.0.0&FORMAT=image/png&WIDTH=10&HEIGHT=10&LAYER=portal:"+LayerIds.railTrack+"&legend_options=fontName:Times%20New%20Roman;fontAntiAliasing:true;fontColor:0x000033;fontSize:5;bgColor:0xFFFFEE;dpi:450"
                    },
                    {
                        name: LayerIds.road,
                        title: 'Road',
                        // popupTemplate: popupUtils.talukaPoupTemplates,
                        popupEnabled: true,
                        queryable: true,
                        visible: false,
                        legendUrl: geoserver_wfs_ows + "?REQUEST=GetLegendGraphic&VERSION=1.0.0&FORMAT=image/png&WIDTH=10&HEIGHT=10&LAYER=portal:"+LayerIds.road+"&legend_options=fontName:Times%20New%20Roman;fontAntiAliasing:true;fontColor:0x000033;fontSize:5;bgColor:0xFFFFEE;dpi:450"
                    },
                    {
                        name: LayerIds.contour,
                        title: 'Contour',
                        // popupTemplate: popupUtils.talukaPoupTemplates,
                        popupEnabled: true,
                        queryable: true,
                        visible: false,
                        legendUrl: geoserver_wfs_ows + "?REQUEST=GetLegendGraphic&VERSION=1.0.0&FORMAT=image/png&WIDTH=10&HEIGHT=10&LAYER=portal:"+LayerIds.contour+"&legend_options=fontName:Times%20New%20Roman;fontAntiAliasing:true;fontColor:0x000033;fontSize:5;bgColor:0xFFFFEE;dpi:450"
                    },
                    {
                        name: LayerIds.riverandWaterboday,
                        title: 'River / Waterboday',
                        // popupTemplate: popupUtils.talukaPoupTemplates,
                        popupEnabled: true,
                        queryable: true,
                        visible: true,
                        legendUrl: geoserver_wfs_ows + "?REQUEST=GetLegendGraphic&VERSION=1.0.0&FORMAT=image/png&WIDTH=10&HEIGHT=10&LAYER=portal:"+LayerIds.riverandWaterboday+"&legend_options=fontName:Times%20New%20Roman;fontAntiAliasing:true;fontColor:0x000033;fontSize:5;bgColor:0xFFFFEE;dpi:450"

                    },
                    {
                        name: LayerIds.parliamentaryConstituency,
                        title: 'Parliamentary Constituency',
                        // popupTemplate: popupUtils.talukaPoupTemplates,
                        popupEnabled: true,
                        queryable: true,
                        visible: false,
                        legendUrl: geoserver_wfs_ows + "?REQUEST=GetLegendGraphic&VERSION=1.0.0&FORMAT=image/png&WIDTH=10&HEIGHT=10&LAYER=portal:"+LayerIds.parliamentaryConstituency+"&legend_options=fontName:Times%20New%20Roman;fontAntiAliasing:true;fontColor:0x000033;fontSize:5;bgColor:0xFFFFEE;dpi:450"
                    },
                    {
                        name: LayerIds.assemblyConstituencies,
                        title: 'Assembly Constituencies',
                        // popupTemplate: popupUtils.talukaPoupTemplates,
                        popupEnabled: true,
                        queryable: true,
                        visible: false,
                        legendUrl: geoserver_wfs_ows + "?REQUEST=GetLegendGraphic&VERSION=1.0.0&FORMAT=image/png&WIDTH=10&HEIGHT=10&LAYER=portal:"+LayerIds.assemblyConstituencies+"&legend_options=fontName:Times%20New%20Roman;fontAntiAliasing:true;fontColor:0x000033;fontSize:5;bgColor:0xFFFFEE;dpi:450"
                    },
                    {
                        name: LayerIds.villageBoundary,
                        title: 'Village Boundary',
                        // popupTemplate: popupUtils.talukaPoupTemplates,
                        popupEnabled: true,
                        queryable: true,
                        legendUrl: geoserver_wfs_ows + "?REQUEST=GetLegendGraphic&VERSION=1.0.0&FORMAT=image/png&WIDTH=10&HEIGHT=10&LAYER=portal:"+LayerIds.villageBoundary+"&legend_options=fontName:Times%20New%20Roman;fontAntiAliasing:true;fontColor:0x000033;fontSize:5;bgColor:0xFFFFEE;dpi:450"
                    },
                    {
                        name: LayerIds.talukaBoundary,
                        title: 'Taluka Boundary',
                        popupEnabled: true,
                        queryable: true,
                        legendUrl: geoserver_wfs_ows + "?REQUEST=GetLegendGraphic&VERSION=1.0.0&FORMAT=image/png&WIDTH=10&HEIGHT=10&LAYER=portal:"+LayerIds.talukaBoundary+"&legend_options=fontName:Times%20New%20Roman;fontAntiAliasing:true;fontColor:0x000033;fontSize:5;bgColor:0xFFFFEE;dpi:450"
                    },
                    {
                        name: LayerIds.districtBoundary,
                        title: 'District Boundary',
                        popupEnabled: true,
                        queryable: true,
                        legendUrl: geoserver_wfs_ows + "?REQUEST=GetLegendGraphic&VERSION=1.0.0&FORMAT=image/png&WIDTH=10&HEIGHT=10&LAYER=portal:"+LayerIds.districtBoundary+"&legend_options=fontName:Times%20New%20Roman;fontAntiAliasing:true;fontColor:0x000033;fontSize:5;bgColor:0xFFFFEE;dpi:450"
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