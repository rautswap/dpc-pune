import React, { useContext, useEffect, useState } from 'react'
import Search from "@arcgis/core/widgets/Search";
import Expand from '@arcgis/core/widgets/Expand';
import SearchLayer from './searchSource';
import { MapViewContext } from '../../MapComponent/MapContext';
import WFSLayer from "@arcgis/core/layers/WFSLayer";
import SimpleMarkerSymbol from "@arcgis/core/symbols/SimpleMarkerSymbol";
import { popupUtils } from '../popupUtils';
import * as reactiveUtils from "@arcgis/core/core/reactiveUtils";
function SearchLayerWidget({ addMapExpand }) {
  const { view } = useContext(MapViewContext)
  const [searchWidget, setSearchWidget] = useState();
  const [searchExpand, setSearchExpand] = useState();
  const widgetId = 'search-widget';
  useEffect(() => {

    if (view) {
      const customSources = SearchLayer({ WFSLayer });
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
          expanded: true,
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
  useEffect(() => {
    var marker = new SimpleMarkerSymbol({
      style: 'circle',
      color: 'red',
      size: 10, // pixels
      outline: {
        // autocasts as esri/symbols/SimpleLineSymbol
        color: 'Black',
        width: 1,
      },
    });
    if (searchWidget) {
      reactiveUtils.watch(
        () => view.popup.visible,
        (visible) => {
          if (!visible) searchWidget.clear();
        }
      );
      searchWidget.on('search-complete', function (event) {
        if (event) {
          if (event.searchTerm) {
            searchWidget.popupTemplate = popupUtils.popUpTemplates;
            searchWidget.popupTemplate.title=event.searchTerm;
            event.results[0].source.resultSymbol = marker;
            view.zoom = 13;
          }
        }
      });
    }

  }, [searchWidget,view])

  return (<></>
  )
}

export default SearchLayerWidget