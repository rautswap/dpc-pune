import React, { useCallback, useEffect, useState } from 'react'
import MapViewContextPrvider from './MapContext'
import BasemapGallary from '../CommonComponent/gallary/BasemapGallary'
import AdministratorLayer from '../Layers/AdministratorLayer'
import LogoComponent from '../CommonComponent/Logo'
import SearchLayerWidget from '../CommonComponent/search/SearchLayerWidget'
import LayerLegend from '../CommonComponent/layerLegend/LayerLegend'
import LayerList from '../CommonComponent/layerList/LayerList'
import Measurement from '../CommonComponent/measurement/Measurement'
import SidePanel from '../SelectPanel/SidePanel'
// import SearchLayerWidget from '../CommonComponent/SearchLayerWidget'
export default function MapComponent() {
    const [mapExpands, setMapExpands] = useState([]);
    const [searchSource, setSearchSource] = useState();
    useEffect(() => {
        if (!mapExpands) return;
        const onMapExpandOpen = (newVal, oldVal, propName, expand) => {
            mapExpands.forEach((mapExpand) => {
                if (newVal && mapExpand.expand.id !== expand.id) {
                    mapExpand.expand.view.ui.find(mapExpand.expand.id).collapse();
                }
            });
        };
        mapExpands.forEach((mapExpand) => {
            const expand = mapExpand.expand;
            if (mapExpand.watchHandle) {
                mapExpand.watchHandle.remove();
            }
            mapExpand.watchHandle = expand.own(expand.watch('expanded', onMapExpandOpen));
        });
    }, [mapExpands]);
    const addMapExpand = useCallback((expand) => {
        const mapExpand = {
            expand: expand,
            watchHandle: undefined,
        };
        setMapExpands((mapExpands) => [...mapExpands, mapExpand]);
    }, []);
    return (
        <MapViewContextPrvider>
            <LogoComponent />
            <SearchLayerWidget addMapExpand={addMapExpand} searchSource={searchSource} setSearchSource={setSearchSource} />
            <LayerList addMapExpand={addMapExpand} />
            <BasemapGallary addMapExpand={addMapExpand} />
            <AdministratorLayer searchSource={searchSource} setSearchSource={setSearchSource} />
            <LayerLegend addMapExpand={addMapExpand} />
            <Measurement addMapExpand={addMapExpand}/>
            <SidePanel/>
        </MapViewContextPrvider>
    )
}
