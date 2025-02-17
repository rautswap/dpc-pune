import Expand from '@arcgis/core/widgets/Expand';
import React, { useContext, useEffect, useState } from 'react'
import { MapViewContext } from '../../MapComponent/MapContext';

import DistanceMeasurement2D from "@arcgis/core/widgets/DistanceMeasurement2D";
import AreaMeasurement2D from "@arcgis/core/widgets/AreaMeasurement2D";
function Measurement({ addMapExpand }) {
    const { view } = useContext(MapViewContext)
    const [distanceMeasureExpand, setDistanceMeasureExpand] = useState();
    const widgetId = 'measure-widget';

    useEffect(() => {
        if (view) {
            let distanceMeasureExpandWidget;
            (async () => {
                let activeWidget = null;
                distanceMeasureExpandWidget = new Expand({
                    view: view,
                    content: document.getElementById('measureBar'),
                    expanded: false,
                    expandIconClass: 'esri-icon-measure',
                    expandTooltip: 'Measurement Tool',
                    id: widgetId,
                });
                setDistanceMeasureExpand(distanceMeasureExpandWidget);

                view.ui.add('measureBar', 'top-left');
                document
                    .getElementById('distanceButton')
                    .addEventListener('click', function () {
                        setActiveWidget(null);
                        if (!this.classList.contains('active')) {
                            setActiveWidget('distance');
                        } else {
                            setActiveButton(null);
                        }
                    });

                document.getElementById('areaButton').addEventListener('click', function () {
                    setActiveWidget(null);
                    if (!this.classList.contains('active')) {
                        setActiveWidget('area');
                    } else {
                        setActiveButton(null);
                    }
                });
                document.getElementById('clearButton').addEventListener('click', function () {
                    setActiveWidget(null);
                    if (!this.classList.contains('active')) {
                        setActiveWidget('clear');
                    } else {
                        setActiveButton(null);
                    }
                });

                function setActiveWidget(type) {
                    switch (type) {
                        case 'distance':
                            activeWidget = new DistanceMeasurement2D({
                                view: view,
                            });

                            // skip the initial 'new measurement' button
                            activeWidget.viewModel.start();
                            view.ui.add(activeWidget, 'top-left');
                            setActiveButton(document.getElementById('distanceButton'));
                            break;
                        case 'area':
                            activeWidget = new AreaMeasurement2D({
                                view: view,
                            });

                            // skip the initial 'new measurement' button
                            activeWidget.viewModel.start();

                            view.ui.add(activeWidget, 'top-left');
                            setActiveButton(document.getElementById('areaButton'));
                            break;
                        case 'clear':
                            if (activeWidget) {
                                view.ui.remove(activeWidget);
                                activeWidget.destroy();
                                activeWidget = null;
                            }
                            break;
                        case null:
                            if (activeWidget) {
                                view.ui.remove(activeWidget);
                                activeWidget.destroy();
                                activeWidget = null;
                            }
                            break;
                        default:
                            if (activeWidget) {
                                view.ui.remove(activeWidget);
                                activeWidget.destroy();
                                activeWidget = null;
                            }
                            break;
                    }
                }
                function setActiveButton(selectedButton) {
                    // focus the view to activate keyboard shortcuts for sketching
                    view.focus();
                    var elements = document.getElementsByClassName('active');
                    for (var i = 0; i < elements.length; i++) {
                        elements[i].classList.remove('active');
                    }
                    if (selectedButton) {
                        selectedButton.classList.add('active');
                    }
                }
            })().catch((err) => {
                // eslint-disable-next-line
                console.error('error: ', err);
            });
        }
    }, [view]);

    useEffect(() => {
        if (!distanceMeasureExpand) return;
        addMapExpand(distanceMeasureExpand);
        view.ui.add({
            component: distanceMeasureExpand,
            position: 'top-right',
            index: 3,
        });
      
      }, [addMapExpand, distanceMeasureExpand, view]);
    return (
        <div id='measureBar' className='esri-component esri-widget  inline'>
            <button
                id='distanceButton'
                className='esri-widget--button esri-interactive esri-icon-measure-line'
                title='Distance Measurement Tool'
            ></button>
            <button
                id='areaButton'
                className='esri-widget--button esri-interactive esri-icon-measure-area'
                title='Area Measurement Tool'
            ></button>
            <button
                id='clearButton'
                className='esri-widget--button esri-interactive esri-icon-trash'
                title='Clear Measurements'
            ></button>
        </div>);
}

export default Measurement