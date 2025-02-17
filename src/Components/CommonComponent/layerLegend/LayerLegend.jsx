import { useContext, useEffect, useState } from "react"
import EsriLegend from "@arcgis/core/widgets/Legend";
import Expand from "@arcgis/core/widgets/Expand"
import { MapViewContext } from "../../MapComponent/MapContext";

function LayerLegend({ addMapExpand }) {
  const { view } = useContext(MapViewContext);
  const [basemapExpand, setBasemapExpand] = useState();
  useEffect(() => {
    if (view) {
      let legend = new EsriLegend({
        view: view
      });

      const bgExpand = new Expand({
        view: view,
        content: legend,
        expandTooltip: 'Legend',
        collapseTooltip: 'Collapse Legend',
      });
      setBasemapExpand(bgExpand);
    }

  }, [view])
  useEffect(() => {
    if (view) {
      if (!basemapExpand) return;
      addMapExpand(basemapExpand);
      view.ui.add({
        component: basemapExpand,
        position: 'bottom-right',
      });
    }
  }, [addMapExpand, basemapExpand, view]);
  return (<></>)
}
export default LayerLegend;