import * as THREE from "three";
import React, { useRef, useEffect, useState } from "react";

import "./CSS/Pixelblocks.css";

import GameLogin from "./GAME-DOM-GUI/GameLogin";
import Worldselector from "./GAME-DOM-GUI/Worldselector";
import Header from "./Components/Header";
import Pausemenu from "./GAME-DOM-GUI/Pausemenu";

export const pixelblocks = {
  THREE: {
    scene: new THREE.Scene(),
    camera: new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    ),
    renderer: new THREE.WebGLRenderer(),
    clock: new THREE.Clock(),
    raycaster: new THREE.Raycaster(),

    gameplay: {
      world: undefined,
      player: undefined,
    },
  },
  controls: {
    ESC: {
      pressed: false,
      toggle: false,
    },
    movement: {
      jump: false,
      left: false,
      right: false,
      down: false,
    },
    mouse: {
      pointer: new THREE.Vector2(0, 0),
      action: "Punch",
      leftMouse: false,
      rightMouse: false,
    },
    camera: {
      zoomIn: false,
      zoomOut: false,
    },
  },
  gameStates: {
    inPauseMenu: false,
  },
  dt: 0,
};

document.addEventListener("keydown", (event) => {
  let key = event.key.toUpperCase();

  if (key === "W") {
    pixelblocks.controls.movement.jump = true;
  }

  if (key === "A") {
    pixelblocks.controls.movement.left = true;
  }

  if (key === "S") {
    pixelblocks.controls.movement.down = true;
  }

  if (key === "D") {
    pixelblocks.controls.movement.right = true;
  }

  if (key === "ESCAPE") {
    pixelblocks.controls.ESC.pressed = true;
  }

  console.log(key);
});

document.addEventListener("keyup", (event) => {
  let key = event.key.toUpperCase();

  if (key === "W") {
    pixelblocks.controls.movement.jump = false;
  }

  if (key === "A") {
    pixelblocks.controls.movement.left = false;
  }

  if (key === "S") {
    pixelblocks.controls.movement.down = false;
  }

  if (key === "D") {
    pixelblocks.controls.movement.right = false;
  }

  if (key === "ESCAPE") {
    pixelblocks.controls.ESC.pressed = false;
    pixelblocks.controls.ESC.toggle = false;
  }
});

document.addEventListener("pointermove", (event) => {
  pixelblocks.controls.mouse.pointer.x =
    (event.clientX / window.innerWidth) * 2 - 1;
  pixelblocks.controls.mouse.pointer.y =
    -(event.clientY / window.innerHeight) * 2 + 1;
});

document.addEventListener("pointerdown", () => {
  pixelblocks.controls.mouse.leftMouse = true;
});

document.addEventListener("pointerup", () => {
  pixelblocks.controls.mouse.leftMouse = false;
});

window.addEventListener("resize", () => {
  pixelblocks.THREE.camera.aspect = window.innerWidth / window.innerHeight;
  pixelblocks.THREE.camera.updateProjectionMatrix();
  pixelblocks.THREE.renderer.setSize(window.innerWidth, window.innerHeight);
});

export default function Pixelblocks() {
  const rendererRef = useRef(null);

  const [gamePage, setGamePage] = useState("login");
  let currentPage;

  const [pauseState, setPauseState] = useState(pixelblocks.gameStates.inPauseMenu);
  // login connecting menu world
  var gameLoop = function () {
    requestAnimationFrame(gameLoop);

    if (pixelblocks.controls.mouse.leftMouse === true) {
      // TODO: Clicking in-game
    }

    if (pixelblocks.controls.ESC.pressed === true) {
      if (gamePage === "world") {
        if (
          pixelblocks.gameStates.inPauseMenu === true &&
          pixelblocks.controls.ESC.toggle === false
        ) {
          pixelblocks.controls.ESC.toggle = true;

          pixelblocks.gameStates.inPauseMenu = false;
          setPauseState(false)
        }

        if (
          pixelblocks.gameStates.inPauseMenu === false &&
          pixelblocks.controls.ESC.toggle === false
        ) {
          pixelblocks.controls.ESC.toggle = true;

          pixelblocks.gameStates.inPauseMenu = true;
          setPauseState(true)
        }
      }
    }

    if (pixelblocks.THREE.gameplay.player !== undefined) {
      if (pixelblocks.controls.movement.down === true) {
        pixelblocks.THREE.gameplay.player.sprite.position.y -=
          1 * pixelblocks.dt;
      }

      if (pixelblocks.controls.movement.jump === true) {
        pixelblocks.THREE.gameplay.player.sprite.position.y +=
          1 * pixelblocks.dt;
      }

      if (pixelblocks.controls.movement.left === true) {
        pixelblocks.THREE.gameplay.player.sprite.position.x -=
          1 * pixelblocks.dt;
      }

      if (pixelblocks.controls.movement.right === true) {
        pixelblocks.THREE.gameplay.player.sprite.position.x +=
          1 * pixelblocks.dt;
      }

      pixelblocks.THREE.camera.position.x =
        pixelblocks.THREE.gameplay.player.sprite.position.x;
      pixelblocks.THREE.camera.position.y =
        pixelblocks.THREE.gameplay.player.sprite.position.y;
    }

    pixelblocks.dt = pixelblocks.THREE.clock.getDelta();
    pixelblocks.THREE.renderer.render(
      pixelblocks.THREE.scene,
      pixelblocks.THREE.camera
    );
  };

  useEffect(() => {
    pixelblocks.THREE.renderer.setSize(window.innerWidth, window.innerHeight);
    rendererRef.current &&
      rendererRef.current.appendChild(pixelblocks.THREE.renderer.domElement);

    pixelblocks.THREE.camera.position.x = 0;
    pixelblocks.THREE.camera.position.y = 0;
    pixelblocks.THREE.camera.position.z = 5;

    const geometry = new THREE.PlaneGeometry(1, 1);
    const material = new THREE.MeshBasicMaterial({
      side: THREE.DoubleSide,
      transparent: true,
      color: new THREE.Color("blue"),
    });

    const DUMMY = new THREE.Mesh(geometry, material);

    pixelblocks.THREE.scene.add(DUMMY);

    gameLoop();
  });

  switch (gamePage) {
    case "login":
      currentPage = <GameLogin setGamePage={setGamePage} />;
      break;
    case "connecting":
      currentPage = <></>;
      break;
    case "worldselector":
      currentPage = <Worldselector setGamePage={setGamePage} />;
      break;
    case "world":
      currentPage = <div ref={rendererRef}></div>;
      break;
    default:
      currentPage = <h1>ERROR IN SWITCH</h1>;
  }

  return (
    <div className="pixelblocks">
      <Header />
      {pauseState && gamePage === 'world' ? <Pausemenu setPauseState={setPauseState} setGamePage={setGamePage}/> : ""}
      {currentPage}
    </div>
  );
}
