import React, { useContext, useState } from 'react'
import { MapViewContext } from '../MapComponent/MapContext'
import { useEffect } from 'react'
import Expand from '@arcgis/core/widgets/Expand'
import './select.css';
import { SearchUtils } from './searchUtils';
function SidePanel({ addMapExpand }) {
    const { view } = useContext(MapViewContext)
    const [years, setyears] = useState([]);
    const [talukas, setTalukas] = useState([]);
    const [status, setStatus] = useState([]);
    const [selectExpand, setSelectExpand] = useState();
    useEffect(() => {
        if (view) {
            (async () => {
                if (years.length === 0) {
                    let result = await SearchUtils.getYear();
                    setyears(result)
                }
                if (talukas.length === 0) {
                    let result = await SearchUtils.getTaluka();
                    setTalukas(result)
                }
                if (status.length === 0) {
                    let result = await SearchUtils.getStaus();
                    setStatus(result)
                }
            })();
        }
    }, [view, years, talukas, status])

    useEffect(() => {
        if (view) {
            let selectPanelExpandWidget = new Expand({
                view: view,
                content: document.getElementById('selectBar'),
                expanded: false,
                expandIcon: 'filter-expand',
                collapseIcon: 'extent-filter',
                expandTooltip: 'Expand Filter',
                collapseTooltip: 'Collapse Filter',
                id: "SidePanel",
            });
            setSelectExpand(selectPanelExpandWidget);
            // view.ui.add(selectPanelExpandWidget, 'top-right');
        }
    }, [view])
    function handleTalukaChange(event) {
        console.log(event.target.value)
    }

    useEffect(() => {
        if (view) {
            if (!selectExpand) return;
            addMapExpand(selectExpand);

            view.ui.add({
                component: selectExpand,
                position: 'top-right',
                index: 0,
            });
        }
    }, [addMapExpand, selectExpand, view]);
    return (
        <div id="selectBar" className="esri-component esri-widget" style={{ width: '500px' }}>
            <div className="card">
                <div className="card-header">
                    <h5 className="card-title">Search Tool</h5>
                </div>
                <div className="card-body">
                    <div className="form-group">
                        <label htmlFor="yearSelect">Select Year</label>
                        <select className="form-control optionClass" id="yearSelect">
                            {years.map((year) => (
                                <option key={year.id} value={year.id}>
                                    {year.year}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="form-group">
                        <label htmlFor="talukaSelect">Select Taluka</label>
                        <select className="form-control optionClass" id="talukaSelect" onChange={handleTalukaChange} >
                            {talukas.map((taluka, index) => (
                                <option key={index} value={taluka.id}>
                                    {taluka.taluka_name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="form-group">
                        <label htmlFor="statusSelect ">Select Status</label>
                        <select className="form-control optionClass" id="statusSelect" >
                            {status.map((stat, index) => (
                                <option key={index} value={stat.id}>
                                    {stat.status}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default SidePanel