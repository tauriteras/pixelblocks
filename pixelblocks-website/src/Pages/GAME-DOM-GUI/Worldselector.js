import React, { useCallback } from 'react'

import '../CSS/Worldselector.css'
import { pixelblocks } from '../Pixelblocks'
import Player from '../../PIXELBLOCKS/PLAYER/Player'

function Worldselector({ setGamePage }) {

  const handleJoinClick = useCallback(() => {

    pixelblocks.THREE.gameplay.player = new Player({ x: 0, y: 0 })
    pixelblocks.THREE.scene.add(pixelblocks.THREE.gameplay.player.spawn())

    setGamePage('world')
  }, [setGamePage])

  return (
    <div className='backdrop'>
      <div className='choose-world'>
        <span className='choose-world-textbox'>
          <label htmlFor='worldname' className='worldname-input-label'>world name</label>
          <input type='text' id='worldname' className='worldname-input'></input>
        </span>
        <button className='join-world-button' onClick={() => handleJoinClick()}>join</button>
      </div>
    </div>
  )
}

export default Worldselector