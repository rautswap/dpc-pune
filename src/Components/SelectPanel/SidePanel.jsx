import React, { useContext, useState } from 'react'
import { MapViewContext } from '../MapComponent/MapContext'
import { useEffect } from 'react'
import Expand from '@arcgis/core/widgets/Expand'
import './select.css';
import { SearchUtils } from './searchUtils';
function SidePanel() {
    const { view } = useContext(MapViewContext)
    const [years, setyears] = useState([]);
    const [talukas, setTalukas] = useState([]);
    const [status, setStatus] = useState([]);
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
    }, [view,years,talukas,status])

    useEffect(() => {
        if (view) {
            let distanceMeasureExpandWidget = new Expand({
                view: view,
                content: document.getElementById('selectBar'),
                expanded: false,
                expandIconClass: 'esri-icon-basemap',
                expandTooltip: 'expand select',
                collapseTooltip: 'Collapse select',
                id: "SidePanel",
            });
            view.ui.add(distanceMeasureExpandWidget, 'top-right');
        }
    }, [view])
    return (
        <div id="selectBar" className="esri-component esri-widget" style={{ width: '500px' }}>
            <div className="card">
                <div className="card-header">
                    <h5 className="card-title">Search Tool</h5>
                </div>
                <div className="card-body">
                    <div className="form-group">
                        <label htmlFor="yearSelect">Select Year</label>
                        <select className="form-control" id="yearSelect">
                            {years.map((year) => (
                                <option key={year.id} value={year.id}>
                                    {year.year}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="form-group">
                        <label htmlFor="talukaSelect">Select Taluka</label>
                        <select className="form-control" id="talukaSelect" >
                            {talukas.map((taluka,index) => (
                                <option key={index} value={taluka.id}>
                                    {taluka.taluka_name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="form-group">
                        <label htmlFor="statusSelect">Select Status</label>
                        <select className="form-control" id="statusSelect" >
                            {status.map((stat,index) => (
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