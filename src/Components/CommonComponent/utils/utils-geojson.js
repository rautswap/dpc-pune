
export default function createFeatureLayer(
  GeoJSONLayer,
  url,
  id,
  name,
  title,
  bBox,
  visibility,
  listMode,
) {
  let layer = new GeoJSONLayer({
    url:
      url +
      '&version=1.0.0&request=GetFeature&typeName=' +
      name +
      '&outputFormat=application/json&bbox=' +
      bBox,
    id: id,
    title: title,
    visible: visibility,
    outFields: ['*'],
    popupEnabled: false,
    listMode:listMode
  });
  return layer;
}
