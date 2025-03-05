import React, { useEffect, useState, useCallback, useContext } from "react";
import "@arcgis/core/assets/esri/themes/light/main.css";
import SketchViewModel from "@arcgis/core/widgets/Sketch/SketchViewModel";
import Graphic from "@arcgis/core/Graphic";
import GraphicsLayer from "@arcgis/core/layers/GraphicsLayer";
import SimpleLineSymbol from "@arcgis/core/symbols/SimpleLineSymbol";
import SimpleFillSymbol from "@arcgis/core/symbols/SimpleFillSymbol";
import Color from "@arcgis/core/Color";
import { MapViewContext } from "../../MapComponent/MapContext";
import * as geometryEngine from '@arcgis/core/geometry/geometryEngine';
import Expand from "@arcgis/core/widgets/Expand";
import { LayerIds } from "../utils/LayerIds";
import { popupUtils } from "../popupUtils";
// import request from "@arcgis/core/request";
import * as projection from "@arcgis/core/geometry/projection";
import SpatialReference from "@arcgis/core/geometry/SpatialReference";
import createFeatureLayer from "../utils/utils-geojson";
import { REACT_APP_GEOSERVER_URI_WFS } from "../utils";
import GeoJSONLayer from "@arcgis/core/layers/GeoJSONLayer";

const bufferLayers = [LayerIds.schoolLocation, LayerIds.veterinaryHospital];
export default function BufferTools({ addMapExpand }) {
  const { view } = useContext(MapViewContext)
  const [bufferExpand, setBufferExpand] = useState();
  const [sketchVM, setSketchVM] = useState(null);
  const [graphicsLayer, setGraphicsLayer] = useState(null);
  const wfsUrl = REACT_APP_GEOSERVER_URI_WFS;
  useEffect(() => {
    if (view) {
      const graphicsLayer = new GraphicsLayer(
        {
          listMode: "hide",
          spatialReference: {
            wkid: "4326"
          }
        }
      );
      view.map.add(graphicsLayer);
      setGraphicsLayer(graphicsLayer);

      const sketchVM = new SketchViewModel({
        view: view,
        layer: graphicsLayer,
      });

      setSketchVM(sketchVM);
    }
  }, [view])

  const handleDrawPoint = () => {
    if (sketchVM) {
      handleClearDrawing();
      sketchVM.create("point"); // Start point drawing
    }
  };

  // Start drawing a line
  const handleDrawLine = () => {
    if (sketchVM) {
      handleClearDrawing();
      sketchVM.create("polygon"); // Start line drawing
    }
  };

  // Clear all drawn graphics
  const handleClearDrawing = useCallback(() => {
    if (graphicsLayer) {
      graphicsLayer.removeAll(); // Clear all drawn graphics
    }
  }, [graphicsLayer]);


  const handleBufferCreation = useCallback(async (geometry) => {
    if (geometry) {
      // Step 1: Create a buffer (e.g., 1000 meters) around the drawn geometry
      const bufferGeometry = geometryEngine.buffer(geometry, 1000, 'meters');

      // Step 2: Create a symbol for the buffer
      const bufferSymbol = new SimpleFillSymbol({
        color: new Color([255, 255, 0, 0.3]), // Yellow with some transparency
        outline: new SimpleLineSymbol({
          color: new Color([255, 0, 0]), // Red outline
          width: 2,
        }),
      });

      // Step 3: Create a graphic for the buffer
      const bufferGraphic = new Graphic({
        geometry: bufferGeometry,
        symbol: bufferSymbol,
      });

      // Step 4: Add the buffer graphic to the graphics layer
      graphicsLayer.add(bufferGraphic);

      try {
        let gextent = bufferGeometry.extent;
        view.goTo({
          target: gextent,
          zoom: 14,
        });
      } catch (e) { }
      let outSpatialReference = new SpatialReference({
        wkid: 4326 //Sphere_Sinusoidal projection
      });
      let gom = projection.project(bufferGeometry, outSpatialReference);
      // console.log(">>>:", gom)

      // const layers = result.sublayers
      //   .filter(({ visible, queryable, name }) => visible && queryable && name)
      //   .map(({ name }) => name)
      //   .join();

      // console.log(">>>", layers)
      const { xmin, ymin, xmax, ymax, spatialReference: { latestWkid, wkid } } = gom.extent;
      const bbox = `${xmin},${ymin},${xmax},${ymax}`;
      // const crs = `EPSG:${latestWkid ?? wkid}`;
      // console.log(">>>", bbox)
      // console.log(">>>", crs)
      // const { data } = await request(result.featureInfoUrl, {
      //   query: {
      //     SERVICE: "WMS",
      //     LAYERS: layers,
      //     QUERY_LAYERS: layers,
      //     REQUEST: "GetFeatureInfo",
      //     INFO_FORMAT: "application/json",
      //     BBOX: bbox,
      //     CRS: crs,
      //     WIDTH: view.width,
      //     HEIGHT: view.height,
      //     I: Math.round(gom.centroid.x),
      //     J: Math.round(gom.centroid.y)
      //   }
      // });

      // console.log(">>>geoJson", data);
      let featureArray = [];
      let result = popupUtils.getLayerByName(view, "Administrator Layers");
      // Step 1: Push the relevant layers into the feature array
      featureArray = bufferLayers.map((res) => {
        return result.allSublayers.items.find((layer) => layer.name === res);
      });

      // Step 2: Query features within the buffer
      bufferLayers.forEach((layer) => {
        if (layer) {
          const queryParams = {
            geometry: bufferGeometry, // Use the buffer geometry
            // spatialRelationship: 'intersects', // Spatial relationship
            outFields: ['*'], // Get all fields, adjust as needed
            returnGeometry: true, // Return the geometry of the features
          };
          let geojsonLayer = createFeatureLayer(GeoJSONLayer, wfsUrl, "Feature_" + layer, layer, layer, bbox, false, "hide");
          geojsonLayer.queryFeatures(queryParams)
            .then((results) => {
              // Handle the result here
              const featuresWithinBuffer = results.features;
              console.log('>>> Features within buffer:', featuresWithinBuffer);
              // Optionally, add these features to the map or process them further
            })
            .catch((error) => {
              console.error('>>>>Error querying features:', error);
            });
        }
      });


    }
  }, [graphicsLayer, view, wfsUrl]);


  useEffect(() => {
    if (sketchVM) {
      sketchVM.on('create', (event) => {
        if (event.state === 'complete') {
          const drawnGraphic = event.graphic;
          // Add the drawn graphic to the graphics layer
          graphicsLayer.add(drawnGraphic);
          // Create a buffer around the drawn geometry
          handleBufferCreation(drawnGraphic.geometry);
        }
      });
    }
  }, [sketchVM, graphicsLayer, handleBufferCreation]);
  useEffect(() => {
    if (view) {
      (async () => {
        const expand = new Expand({
          expandIconClass: 'esri-icon-basemap',
          view: view,
          content: document.getElementById("bufferTool"),
          expandTooltip: 'Buffer Tools',
          expandIcon: 'rings-largest',
          collapseIcon: 'rings-x-bar',
          collapseTooltip: 'Collapse Buffer Tools',
          id: "buffer-tool",
        });
        setBufferExpand(expand);
      })();
    }
  }, [view]);

  useEffect(() => {
    if (view) {
      if (!bufferExpand) return;
      addMapExpand(bufferExpand);
      view.ui.add({
        component: bufferExpand,
        position: 'top-trailing',
        index: 1,
      });
    }
  }, [addMapExpand, bufferExpand, view]);

  return (
    <>
      <div id='bufferTool' className='esri-component esri-widget'>
        <button
          id='distanceButton'
          className='esri-widget--button esri-interactive esri-icon-radio-checked'
          title='Point Buffer'
          onClick={handleDrawPoint}
        ></button>
        <button
          id='areaButton'
          className='esri-widget--button esri-interactive esri-icon-polygon'
          title='Buffer Polygone'
          onClick={handleDrawLine}
        ></button>
        <button
          id='clearButton'
          className='esri-widget--button esri-interactive esri-icon-trash'
          title='Clear'
          onClick={handleClearDrawing}
        ></button>
      </div>
    </>
  )
}
