import React, { useCallback } from "react";

import "../CSS/Desktop/Worldselector.css";
import { pixelblocks } from "../Pixelblocks";
import Player from "../../PIXELBLOCKS/PLAYER/Player";
import Button from "./Components/Button";
import { writeToDb } from "../../BACKEND/Firebase";

function Worldselector({ setGamePage }) {

  const handleJoinClick = useCallback(() => {

    const fetchWorldData = new Promise((resolve, reject) => {

      reject('')

    })

    fetchWorldData
    .then((worldData) => {

      console.log('worldd', worldData)

      pixelblocks.THREE.gameplay.player = new Player({ x: 0, y: 0 });
      pixelblocks.THREE.scene.add(pixelblocks.THREE.gameplay.player.spawn());
      setGamePage("world");

    }, 
    (rejectReason) => {

      console.log(rejectReason)

    })

  }, [setGamePage]);

  const backButtonClicked = useCallback(() => {
    setGamePage("login");
  }, [setGamePage]);

  return (
    <div className="backdrop">
      <Button
        type={"back"}
        color={'orange'}
        scale={1.35}
        text={"v"}
        onClick={() => backButtonClicked()}
      />

      <div className="choose-world">
        <span className="choose-world-textbox">
          <label htmlFor="worldname" className="worldname-input-label">
            world name
          </label>
          <input type="text" id="worldname" className="worldname-input" onChange={() => {
            console.log(document.querySelector('#worldname').value)
          }}></input>
        </span>

        <Button
            text="create"
            color="green"
            scale="1.5"
            onClick={() => handleJoinClick()}
          />

          <Button text={'update-db'} onClick={() => writeToDb('worlds/' + document.querySelector('#worldname').value, { blocks: [1, 1, 1]})}/>
      </div>
    </div>
  );
}

export default Worldselector;
