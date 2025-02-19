import { REACT_APP_GEOSERVER_URI_WFS } from "../utils";

export default function createFeatureLayer(
    GeoJSONLayer,
    id,
    title,
    visibility
) {
    let layer = new GeoJSONLayer({
        url:
            REACT_APP_GEOSERVER_URI_WFS + '&version=1.0.0&request=GetFeature&typeName=portal:' + id + '&outputFormat=application/json',
        id: id,
        title: title,
        visible: visibility,
        outFields: ['*'],
        popupEnabled: false,
        renderer: {
            type: 'simple',
            symbol: {
              type: 'simple-fill',
              color: 'white',
            },
          },
        //   labelsVisible: true,
        // refreshInterval: 2.0, //0.3=18 seconds, 2.0=2 minutes
        //   labelingInfo: {
        //     symbol: {
        //       type: 'text',
        //       color: 'white',
        //       haloColor: 'blue',
        //       haloSize: 1,
        //       font: {
        //         family: 'sans-serif',
        //         size: 7,
        //         weight: 'bold',
        //       },
        //     },
        //     labelPlacement: 'above-center',
        //     labelExpressionInfo: {
        //       expression: '$feature.shipName',
        //     },
        //   },
        //   editingEnabled: true,
        // renderer: vesselHelper.getRotationRenderer(),
        //   popupTemplate: autocast.vesselPopupTemplate,
    });

    // if (isDataRefreshRequired === true) {
    //   layer['refreshInterval'] = 2.0; //0.3=18 seconds, 2.0=2 minutes
    // }

    // if (type) {
    //   layer['renderer'] = vesselHelper.getCirclenRenderer();
    // } else {
    //   layer['renderer'] = vesselHelper.getRotationRenderer();
    // }
    // if (!isListmodeNotRequired) {
    //   layer['listMode'] = 'hide';
    // }

    return layer;
}