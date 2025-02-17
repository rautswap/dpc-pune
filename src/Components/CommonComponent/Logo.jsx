import React, { useContext, useEffect } from 'react'
import { MapViewContext } from '../MapComponent/MapContext';
import logo from '../../images/pune_logo.png'
export default function LogoComponent() {
    const { view } = useContext(MapViewContext)
    useEffect(() => {
        if (view) {
            view.ui.add({
                component: document.getElementById('defaultMap'),
                position: 'top-left',
                index: 7,
            });
        }
    }, [view])
    return (
        <div id='defaultMap'>
           <div className="user-info">
                <div className="image"  style={{alignItems:'center',gridTemplateColumns:'1fr 1fr 1fr',columnGap: '5px',backgroundColor:'orange'}}>
                    <img src={logo} width="48" height="48" alt="logo" /> 
                    <span style={{color:'black',fontSize:'20px',margin:'10px',fontWeight:'bolder'}}
                    >जिनिस - जीआयएस प्रणाली</span>
                </div>
            </div>
        </div>
    )
}
