import WebGL from "three/addons/capabilities/WebGL.js";
import { initNetworking } from "../MULTIPLAYER/Networking";
import { gameEngine, guiController, root } from "../../Index";
import { animate } from "../../GameEngine";

class GUIController {
  constructor() {
    this.header = null;
    this.pauseMenu = null;
    this.ESCCounter = 0;
  }

  init() {
    
    createHeader();

    root.appendChild(this.header);

  }

  pauseMenu() {
    let pauseMenu = document.createElement("div");
    pauseMenu.classList.add("pause-menu");

    root.appendChild(pauseMenu);
  }

}

function createHeader() {
  let header = document.createElement("div");
  header.classList.add("header");
  header.classList.add("visible");

  let logoDiv = document.createElement("div");
  logoDiv.classList.add("logo");
  header.appendChild(logoDiv);

  let navSpan = document.createElement("span");
  navSpan.classList.add("navbar");
  header.appendChild(navSpan);

  let playButton = document.createElement("div");
  playButton.classList.add("nav-button");
  playButton.innerText = "Play!";
  playButton.addEventListener("click", () => {
    if (guiController.header.classList.contains("visible")) {
        guiController.header.classList.remove("visible");

      if (guiController.header.classList.contains("animate-header-in")) {
        guiController.header.classList.remove("animate-header-in");
      }

      guiController.header.classList.add("hidden");
    }

    if (gameEngine.running === true) {
      return;
    }

    if (WebGL.isWebGL2Available()) {
      gameEngine.init();
      gameEngine.loadWorldSelector();

      gameEngine.renderer.setAnimationLoop(animate);
      root.appendChild(gameEngine.renderer.domElement);

      window.addEventListener("pointermove", (event) => {
        gameEngine.pointer.x = (event.clientX / window.innerWidth) * 2 - 1;
        gameEngine.pointer.y = -(event.clientY / window.innerHeight) * 2 + 1;
      });

      window.addEventListener("pointerdown", () => {
        gameEngine.controls.mouse.leftMouse = true;
      });

      window.addEventListener("pointerup", () => {
        gameEngine.controls.mouse.leftMouse = false;
      });

      window.addEventListener("pointerleave", () => {
        gameEngine.controls.mouse.rightMouse = false;
        gameEngine.controls.mouse.leftMouse = false;
      });

      document.addEventListener("keydown", (event) => {
        let key = event.key.toUpperCase();
        // console.log(key)

        if (key === "ESCAPE") {

            console.log(key, guiController.ESCCounter)
          guiController.ESCCounter++;

          if (guiController.ESCCounter === 1) {
            gameEngine.pause("pause");
          }

          if (guiController.ESCCounter === 2) {
            guiController.header.classList.remove("hidden");

            guiController.header.classList.add("visible");
            guiController.header.classList.add("animate-header-in");
          }

          if (guiController.ESCCounter === 3) {
            guiController.header.classList.remove("visible");
            guiController.header.classList.remove("animate-header-in");

            guiController.header.classList.add("hidden");
            gameEngine.pause("unpause");
            guiController.ESCCounter = 0;
          }
        }

        if (key === "W") {
          gameEngine.controls.movement.jump = true;
        }

        if (key === "D") {
          gameEngine.controls.movement.right = true;
        }

        if (key === "A") {
          gameEngine.controls.movement.left = true;
        }

        if (key === "S") {
          gameEngine.controls.movement.down = true;
        }

        if (key === "Z") {
          if (gameEngine.camera.position.z > 1) {
            gameEngine.camera.position.z -= 1;
            console.log("camera pos", gameEngine.camera.position);
          }
        }

        if (key === "X") {
          if (gameEngine.camera.position.z < 7) {
            gameEngine.camera.position.z += 1;
            console.log("camera pos", gameEngine.camera.position);
          }
        }
      });

      document.addEventListener("keyup", (event) => {
        let key = event.key.toUpperCase();

        if (key === "W") {
          gameEngine.controls.movement.jump = false;
        }

        if (key === "D") {
          gameEngine.controls.movement.right = false;
        }

        if (key === "A") {
          gameEngine.controls.movement.left = false;
        }

        if (key === "S") {
          gameEngine.controls.movement.down = false;
        }

        if (key === "1") {
          gameEngine.controls.mouse.action = "Punch";
        }
        if (key === "2") {
          gameEngine.controls.mouse.action = "Place";
        }

        if (key === "-") {
            console.log('newWorld', key)
            gameEngine.socket.emit("request-world", "WORLDNAME");
        }

      });

      initNetworking();
      animate();

      gameEngine.running = true;

    } else {
      const warning = WebGL.getWebGL2ErrorMessage();
      document.getElementById("container").appendChild(warning);
    }
  });

  navSpan.appendChild(playButton);

  let settingsDiv = document.createElement("div");
  settingsDiv.classList.add("page-settings");
  header.appendChild(settingsDiv);

  guiController.header = header;

}

export default GUIController;
