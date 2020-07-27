import React, { useState, useEffect } from 'react';
import FullScreen from '../assets/icons/fullscreen.png'
import ExitFullScreen from '../assets/icons/exit-fullscreen.png';

const FullScreenMode = () => {
    let [fullscreenMode, setFullScreen] = useState(false);

    useEffect(() => {
        document.onfullscreenchange = event => {
            if (document.fullscreenElement) {
                setFullScreen(true)
            } else {
                setFullScreen(false)
            }
        }
    })

    const disableFullScreen = () => {
        document.exitFullscreen();
    }
    const enableFullScreen = () => {
        document.getElementById('root').requestFullscreen();
    }
    return (<>
        {fullscreenMode ?
            <img src={ExitFullScreen} alt="ExitFullScreen" className="fullscreen opacity_anim" onClick={disableFullScreen} /> :
            <img src={FullScreen} alt="FullScreen" className="fullscreen opacity_anim" onClick={enableFullScreen} />}
    </>)
}

export default FullScreenMode;