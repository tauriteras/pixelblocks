import * as THREE from "three";
import { gameEngine, root } from "./Index";

class GameEngine {
  constructor() {
    (this.scene = null),
      (this.camera = null),
      (this.renderer = null),
      (this.raycaster = null),
      (this.pointer = null),
      (this.clock = null),
      (this.controls = {
        movement: {
          jump: false,
          left: false,
          right: false,
          down: false
        },
        mouse: {
          action: "Place",
          leftMouse: false,
          rightMouse: false,
        },
        camera: {
          zoomIn: false,
          zoomOut: false,
        },
      });
    this.running = false;
    this.socket = null;

    this.world = null;
    this.player = null;

    this.counters = {
      dt: 0,
      airTime: 0,
    };
  }

  init() {
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    this.renderer = new THREE.WebGLRenderer();
    this.raycaster = new THREE.Raycaster();
    this.pointer = new THREE.Vector2();
    this.clock = new THREE.Clock();

    this.camera.position.z = 5;

    this.renderer.setSize(window.innerWidth, window.innerHeight);
  }

  update() {
    if (this.controls.mouse.leftMouse === true) {
      this.raycaster.setFromCamera(this.pointer, this.camera);

      let intersects = this.raycaster.intersectObjects(this.scene.children);
      let clickedObject;

      for (let i = 0; i < intersects.length; i++) {
        let intersection = intersects[i].object;

        if (intersection === undefined) {
          break;
        }

        if (intersection.userData.type === "SPRITE_Player") {
          clickedObject = intersection;
        }

        if (intersection.userData.type === "SPRITE_Block") {
          if (
            this.controls.mouse.action === "Punch" &&
            this.world.blocks[intersection.userData.index].data.id != 0
          ) {
            clickedObject = intersection;
          }
          if (
            this.controls.mouse.action === "Place" &&
            this.world.blocks[intersection.userData.index].data.id === 0
          ) {
            clickedObject = intersection;
          }
        }

        if (intersection.userData.type === "SPRITE_BGBlock") {
          if (
            this.controls.mouse.action === "Punch" &&
            this.world.backgroundBlocks[intersection.userData.index].data.id !=
              0
          ) {
            clickedObject = intersection;
          }
          if (
            this.controls.mouse.action === "Place" &&
            this.world.backgroundBlocks[intersection.userData.index].data.id ===
              0
          ) {
            clickedObject = intersection;
          }
        }
      }

      if (clickedObject != undefined) {
        if (this.controls.mouse.action === "Punch") {
          this.player.punch();
          this.socket.emit("player-wants-to-punch", clickedObject.userData);
        }

        if (this.controls.mouse.action === "Place") {
          console.log("Place", clickedObject);
          if (clickedObject.userData.type === "SPRITE_Block") {
            this.world.blocks[clickedObject.userData.index].place(2);
          }
          if (clickedObject.userData.type === "SPRITE_BGBlock") {
            this.world.backgroundBlocks[clickedObject.userData.index].place(1);
          }
        }

        if (this.controls.mouse.action === "Settings") {
          console.log("Settings", clickedObject);
        }
      }
    }

    if (this.controls.movement.jump === true) {
      this.player.position.y += 5 * this.counters.dt;
    }

    if (this.controls.movement.down === true) {
      this.player.position.y -= 5 * this.counters.dt;
    }

    if (this.controls.movement.right === true) {
      this.player.position.x += 5 * this.counters.dt;
    }

    if (this.controls.movement.left === true) {
      this.player.position.x -= 5 * this.counters.dt;
    }

    if (this.player != null) {
      this.camera.position.x = this.player.position.x;
      this.camera.position.y = this.player.position.y;

      this.player.updatePos();
    }

    this.counters.dt = this.clock.getDelta();
    this.renderer.render(this.scene, this.camera);
  }

  loadWorldSelector() {
    let selectWorld = document.createElement("div");
    selectWorld.classList.add("select-world");


    let textboxDiv = document.createElement("div");
    textboxDiv.classList.add("select-world-textbox-div");

    let textboxP = document.createElement("p");
    textboxP.classList.add("select-world-textbox-p");
    textboxP.innerText = "World Name:"

    let textbox = document.createElement("input");
    textbox.classList.add("select-world-textbox");

    textbox.addEventListener("keydown", (event) => {
      let key = event.key.toUpperCase();

      if (key === "ENTER") {
        console.log(document.querySelector("input").value)

        this.socket.emit("request-world", document.querySelector("input").value.toUpperCase())
      }
    })

    textboxDiv.appendChild(textboxP);
    textboxDiv.appendChild(textbox);

    selectWorld.appendChild(textboxDiv);

    let menu = document.createElement("div");
    menu.classList.add("select-world-menu");

    selectWorld.appendChild(menu);

    root.appendChild(selectWorld);
  }

  pause(action) {
    if (action === "pause") {
      let pauseMenu = document.createElement("div");
      pauseMenu.classList.add("pause-menu");

      let optionsDiv = document.createElement("div");
      optionsDiv.classList.add("pause-menu-options");

      let exitButton = document.createElement("p");
      exitButton.classList.add("pause-menu-button");
      exitButton.innerText = "Exit World"

      let settingsButton = document.createElement("p");
      settingsButton.classList.add("pause-menu-button");
      settingsButton.innerText = "Settings"

      let closeButton = document.createElement("p");
      closeButton.classList.add("pause-menu-button");
      closeButton.innerText = "Close"

      closeButton.addEventListener("click", () => {
        gameEngine.pause("unpause")
      })

      optionsDiv.appendChild(exitButton);
      optionsDiv.appendChild(settingsButton);
      optionsDiv.appendChild(closeButton);

      pauseMenu.appendChild(optionsDiv);

      root.appendChild(pauseMenu);
    } else {
      root.removeChild(document.getElementsByClassName("pause-menu")[0]);
    }
  }
}

export function animate() {
  gameEngine.update();
}

export default GameEngine;
