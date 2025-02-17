import React, { useContext, useEffect, useState } from 'react'
import Search from "@arcgis/core/widgets/Search";
import Expand from '@arcgis/core/widgets/Expand';
import SearchLayer from './searchSource';
import { MapViewContext } from '../../MapComponent/MapContext';
import GeoJSONLayer from "@arcgis/core/layers/GeoJSONLayer";
function SearchLayerWidget({ addMapExpand }) {
  const { view } = useContext(MapViewContext)
  const [searchWidget, setSearchWidget] = useState();
  const [searchExpand, setSearchExpand] = useState();
  const widgetId = 'search-widget';
  useEffect(() => {

    if (view) {
      const customSources = SearchLayer({ GeoJSONLayer });
      setSearchWidget(new Search({
        view: view,
        sources: customSources,
        autoNavigate: true,
        locationEnabled: false,
        searchAllEnabled: true,
        suggestionsEnabled: true,
        maxSuggestions: 20,
        includeDefaultSources: false,
        popupEnabled: true,
        allPlaceholder: 'Search for Locations',
      }));
    }
  }, [view])
  useEffect(() => {
    if (view) {
      if (!searchWidget) return;
      (async () => {
        const expand = new Expand({
          view: view,
          content: searchWidget,
          expandTooltip: 'Search Widget',
          collapseTooltip: 'Collapse Search',
          id: widgetId,
        });
        setSearchExpand(expand);
      })();
    }
  }, [searchWidget, view]);
  useEffect(() => {
    if (view) {
      if (!searchExpand) return;
      addMapExpand(searchExpand);

      view.ui.add({
        component: searchExpand,
        position: 'top-trailing',
        index: 0,
      });
    }
  }, [addMapExpand, searchExpand, view]);
  return (<></>
  )
}

export default SearchLayerWidget