import { REACT_APP_GEOSERVER_URI_WFS } from "../utils";
function SearchLayer({ GeoJSONLayer }) {
    return [
      {
        layer: new GeoJSONLayer({
          url:
            REACT_APP_GEOSERVER_URI_WFS +'&version=1.0.0&request=GetFeature&typeName=portal:District_Boundary&maxFeatures=50&outputFormat=application%2Fjson',
          title: 'District Boundary',
          visible: true,
          renderer: {
            type: 'simple',
            symbol: {
              type: 'simple-fill',
              color: 'white',
            },
          },
        }),
        searchFields: ['district','division'],
        suggestionTemplate: 'Layer:District_Boundary >> Division:{division} | District:{district}',
        exactMatch: false,
        outFields: ['*'],
        name: 'District Boundary',
        placeholder: 'Search for District',
        maxResults: 10,
        localSearchDisabled: false,
        zoomScale: 500000,
      },
      {
        layer: new GeoJSONLayer({
          url:
            REACT_APP_GEOSERVER_URI_WFS +'&version=1.0.0&request=GetFeature&typeName=portal:Taluka_Boundary&maxFeatures=50&outputFormat=application%2Fjson',
          title: 'Taluka Boundary',
          visible: true,
          renderer: {
            type: 'simple',
            symbol: {
              type: 'simple-fill',
              color: 'white',
            },
          },
        }),
        searchFields: ['dtname11','thname11'],
        suggestionTemplate: 'Layer:Taluka Boundary >> District:{dtname11} | Taluka:{thname11}',
        exactMatch: false,
        outFields: ['*'],
        name: 'Taluka Boundary',
        placeholder: 'Search for Taluka',
        maxResults: 10,
        localSearchDisabled: false,
        zoomScale: 500000,
      },
      {
        layer: new GeoJSONLayer({
          url:
            REACT_APP_GEOSERVER_URI_WFS +'&version=1.0.0&request=GetFeature&typeName=portal:Village_Boundary&maxFeatures=50&outputFormat=application%2Fjson',
          title: 'Village Boundary',
          visible: true,
          renderer: {
            type: 'simple',
            symbol: {
              type: 'simple-fill',
              color: 'white',
            },
          },
        }),
        searchFields: ['d_name','t_name','name'],
        suggestionTemplate: 'Layer:Village Boundary >> District:{d_name} | Taluka:{t_name} | Village:{name}',
        exactMatch: false,
        outFields: ['*'],
        name: 'Village Boundary',
        placeholder: 'Search for Village',
        maxResults: 10,
        localSearchDisabled: false,
        zoomScale: 500000,
      },
      {
        layer: new GeoJSONLayer({
          url:
            REACT_APP_GEOSERVER_URI_WFS +'&version=1.0.0&request=GetFeature&typeName=portal:Assembly_Constituencies&maxFeatures=50&outputFormat=application%2Fjson',
          title: 'Assembly Constituencies',
          visible: true,
          renderer: {
            type: 'simple',
            symbol: {
              type: 'simple-fill',
              color: 'white',
            },
          },
        }),
        searchFields: ['dist_name','name'],
        suggestionTemplate: 'Layer:Assembly Constituencies >> District:{dist_name} | Name:{name}',
        exactMatch: false,
        outFields: ['*'],
        name: 'Assembly Constituencies',
        placeholder: 'Search for Assembly Constituencies',
        maxResults: 10,
        localSearchDisabled: false,
        zoomScale: 500000,
      },
      {
        layer: new GeoJSONLayer({
          url:
            REACT_APP_GEOSERVER_URI_WFS +'&version=1.0.0&request=GetFeature&typeName=portal:Parliamentary_Constituency&maxFeatures=50&outputFormat=application%2Fjson',
          title: 'Parliamentary Constituency',
          visible: true,
          renderer: {
            type: 'simple',
            symbol: {
              type: 'simple-fill',
              color: 'white',
            },
          },
        }),
        searchFields: ['dist_name','name','pc_name'],
        suggestionTemplate: 'Layer:Parliamentary Constituency >> District:{dist_name} | Name:{name} | PC Name:{pc_name}',
        exactMatch: false,
        outFields: ['*'],
        name: 'Parliamentary Constituency',
        placeholder: 'Search for Parliamentary Constituency',
        maxResults: 10,
        localSearchDisabled: false,
        zoomScale: 500000,
      },
      {
        layer: new GeoJSONLayer({
          url:
            REACT_APP_GEOSERVER_URI_WFS +'&version=1.0.0&request=GetFeature&typeName=portal:Riverand_Waterboday&maxFeatures=50&outputFormat=application%2Fjson',
          title: 'River and Waterboday',
          visible: true,
          renderer: {
            type: 'simple',
            symbol: {
              type: 'simple-fill',
              color: 'white',
            },
          },
        }),
        searchFields: ['discr','name'],
        suggestionTemplate: 'Layer:River and Waterboday >> Discription:{discr} | Name:{name}',
        exactMatch: false,
        outFields: ['*'],
        name: 'River and Waterboday',
        placeholder: 'Search for River and Waterboday',
        maxResults: 10,
        localSearchDisabled: false,
        zoomScale: 500000,
      },
      {
        layer: new GeoJSONLayer({
          url:
            REACT_APP_GEOSERVER_URI_WFS +'&version=1.0.0&request=GetFeature&typeName=portal:Hospital_Location&maxFeatures=50&outputFormat=application%2Fjson',
          title: 'Hospital Location',
          visible: true,
          renderer: {
            type: 'simple',
            symbol: {
              type: 'simple-fill',
              color: 'white',
            },
          },
        }),
        searchFields: ['dist_namename','taluka'],
        suggestionTemplate: 'Layer:Hospital Location >> Name:{name} | Taluka:{taluka}',
        exactMatch: false,
        outFields: ['*'],
        name: 'Hospital Location',
        placeholder: 'Search for Hospital Location',
        maxResults: 10,
        localSearchDisabled: false,
        zoomScale: 500000,
      },
      {
        layer: new GeoJSONLayer({
          url:
            REACT_APP_GEOSERVER_URI_WFS +'&version=1.0.0&request=GetFeature&typeName=portal:Veterinary_Hospital&maxFeatures=50&outputFormat=application%2Fjson',
          title: 'Veterinary Hospital',
          visible: true,
          renderer: {
            type: 'simple',
            symbol: {
              type: 'simple-fill',
              color: 'white',
            },
          },
        }),
        searchFields: ['village','veterinary'],
        suggestionTemplate: 'Layer: Veterinary Hospital >> Village:{village} | Veterinary:{veterinary}',
        exactMatch: false,
        outFields: ['*'],
        name: 'Veterinary Hospital',
        placeholder: 'Search for Veterinary Hospital',
        maxResults: 10,
        localSearchDisabled: false,
        zoomScale: 500000,
      },{
        layer: new GeoJSONLayer({
          url:
            REACT_APP_GEOSERVER_URI_WFS +'&version=1.0.0&request=GetFeature&typeName=portal:police_station&maxFeatures=50&outputFormat=application%2Fjson',
          title: 'Police station',
          visible: true,
          renderer: {
            type: 'simple',
            symbol: {
              type: 'simple-fill',
              color: 'white',
            },
          },
        }),
        searchFields: ['name','taluka'],
        suggestionTemplate: 'Layer: Police station >> Name:{dist_name} | Taluka:{taluka}',
        exactMatch: false,
        outFields: ['*'],
        name: 'Police station',
        placeholder: 'Search for Police station',
        maxResults: 10,
        localSearchDisabled: false,
        zoomScale: 500000,
      },{
        layer: new GeoJSONLayer({
          url:
            REACT_APP_GEOSERVER_URI_WFS +'&version=1.0.0&request=GetFeature&typeName=portal:Monument_Location&maxFeatures=50&outputFormat=application%2Fjson',
          title: 'Monument Location',
          visible: true,
          renderer: {
            type: 'simple',
            symbol: {
              type: 'simple-fill',
              color: 'white',
            },
          },
        }),
        searchFields: ['place','name','taluka','district'],
        suggestionTemplate: 'Layer: Monument Location >>  Name:{name} | Place:{place} | District:{dist_name} | Taluka:{taluka}',
        exactMatch: false,
        outFields: ['*'],
        name: 'Monument Location',
        placeholder: 'Search for Monument Location',
        maxResults: 10,
        localSearchDisabled: false,
        zoomScale: 500000,
      },{
        layer: new GeoJSONLayer({
          url:
            REACT_APP_GEOSERVER_URI_WFS +'&version=1.0.0&request=GetFeature&typeName=portal:Fort&maxFeatures=50&outputFormat=application%2Fjson',
          title: 'Fort',
          visible: true,
          renderer: {
            type: 'simple',
            symbol: {
              type: 'simple-fill',
              color: 'white',
            },
          },
        }),
        searchFields: ['name'],
        suggestionTemplate: 'Layer:Fort >> Name:{name}',
        exactMatch: false,
        outFields: ['*'],
        name: 'Fort',
        placeholder: 'Search for Fort',
        maxResults: 10,
        localSearchDisabled: false,
        zoomScale: 500000,
      },{
        layer: new GeoJSONLayer({
          url:
            REACT_APP_GEOSERVER_URI_WFS +'&version=1.0.0&request=GetFeature&typeName=portal:govt_admin_depart&maxFeatures=50&outputFormat=application%2Fjson',
          title: 'Admin Department',
          visible: true,
          renderer: {
            type: 'simple',
            symbol: {
              type: 'simple-fill',
              color: 'white',
            },
          },
        }),
        searchFields: ['taluka','name'],
        suggestionTemplate: 'Layer: Admin Department >> Taluka:{taluka} | Name:{name}',
        exactMatch: false,
        outFields: ['*'],
        name: 'Admin Department',
        placeholder: 'Search for Admin Department',
        maxResults: 10,
        localSearchDisabled: false,
        zoomScale: 500000,
      },
      {
        layer: new GeoJSONLayer({
          url:
            REACT_APP_GEOSERVER_URI_WFS +'&version=1.0.0&request=GetFeature&typeName=portal:school_location&maxFeatures=50&outputFormat=application%2Fjson',
          title: 'School Location',
          visible: true,
          renderer: {
            type: 'simple',
            symbol: {
              type: 'simple-fill',
              color: 'white',
            },
          },
        }),
        searchFields: ['districtna','block_name','schoolname'],
        suggestionTemplate: 'Layer: School Location >> District:{districtna} | Block Name:{block_name} | School Name:{schoolname}',
        exactMatch: false,
        outFields: ['*'],
        name: 'School Location',
        placeholder: 'Search for School Location',
        maxResults: 10,
        localSearchDisabled: false,
        zoomScale: 500000,
      },
      {
        layer: new GeoJSONLayer({
          url:
            REACT_APP_GEOSERVER_URI_WFS +'&version=1.0.0&request=GetFeature&typeName=portal:transportation&maxFeatures=50&outputFormat=application%2Fjson',
          title: 'Transportation',
          visible: true,
          renderer: {
            type: 'simple',
            symbol: {
              type: 'simple-fill',
              color: 'white',
            },
          },
        }),
        searchFields: ['taluka','name'],
        suggestionTemplate: 'Layer: Transportation >> Taluka:{taluka} | Name:{name}',
        exactMatch: false,
        outFields: ['*'],
        name: 'Transportation',
        placeholder: 'Search for Transportation',
        maxResults: 10,
        localSearchDisabled: false,
        zoomScale: 500000,
      }
    ];
  }
  export default SearchLayer;