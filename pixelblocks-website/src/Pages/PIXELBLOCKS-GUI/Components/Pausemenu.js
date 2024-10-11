import React, { useCallback } from 'react'

import '../../CSS/Desktop/Pausemenu.css'
import { pixelblocks } from '../../Pixelblocks';

function Pausemenu({ setGamePage, setPauseState }) {

    const exitWorld = useCallback(() => {
        pixelblocks.gameStates.inPauseMenu = false;
        setGamePage("worldselector");
        setPauseState(pixelblocks.gameStates.inPauseMenu);
      },
      [setGamePage, setPauseState]
    );

    const backButton = useCallback(() => {
      pixelblocks.gameStates.inPauseMenu = false;
      setPauseState(pixelblocks.gameStates.inPauseMenu);
    }, [setPauseState])

  return (
    <div className='backdrop'>
        <div className='pause-menu'>
            <h1 className='exit-world-button' onClick={() => exitWorld()}>exit world</h1>
            <h2 className='pause-menu-button'>setting</h2>
            <h2 className='pause-menu-button'>setting</h2>
            <h2 className='pause-menu-button'>setting</h2>
            <h2 className='pause-menu-button'>setting</h2>
            <h2 className='pause-menu-button' onClick={() => backButton()}>back</h2>
        </div>
    </div>
  )
}

export default Pausemenu