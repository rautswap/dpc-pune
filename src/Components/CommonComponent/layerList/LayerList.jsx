import { useContext, useEffect, useState } from "react"
import EsriLayerList from "@arcgis/core/widgets/LayerList";
import Expand from "@arcgis/core/widgets/Expand"
import { MapViewContext } from "../../MapComponent/MapContext";

function LayerList({ addMapExpand }) {
    const { view } = useContext(MapViewContext);
    const [layerListExpand, setLayerListExpand] = useState();
    const [layerList, setLayerList] = useState();
    const widgetId = 'layer-list';
    useEffect(() => {
        if (view) {
            setLayerList(new EsriLayerList({
                view: view,
                listMode:"show"
            }));
        }

    }, [view])
    useEffect(() => {
        if (view) {
            if (!layerList) return;
            (async () => {
                const expand = new Expand({
                    view: view,
                    content: layerList,
                    expandTooltip: 'Expand Layer List',
                    expandIcon:'show-multiple-layers-at-a-time',
                    collapseTooltip: 'Collapse Layer List',
                    id: widgetId,
                });
                setLayerListExpand(expand);
            })();
        }
    }, [layerList, view]);

    useEffect(() => {
        if (view) {
            if (!layerListExpand) return;
            addMapExpand(layerListExpand);
            view.ui.add({
                component: layerListExpand,
                position: 'top-right',
                index: 1,
            });
        }
    }, [addMapExpand, layerListExpand, view]);
    return (<></>)
}
export default LayerList;