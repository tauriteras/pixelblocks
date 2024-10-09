import WebGL from "three/addons/capabilities/WebGL.js";
import { initNetworking } from "../MULTIPLAYER/Networking";
import { pixelblocks, guiController, root } from "../../Index";
import { animate } from "../../PixelBlocks";

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

    if (pixelblocks.running === true) {
      return;
    }

    if (WebGL.isWebGL2Available()) {
      pixelblocks.init();
      pixelblocks.loadWorldSelector();

      pixelblocks.renderer.setAnimationLoop(animate);
      root.appendChild(pixelblocks.renderer.domElement);

      window.addEventListener("pointermove", (event) => {
        pixelblocks.pointer.x = (event.clientX / window.innerWidth) * 2 - 1;
        pixelblocks.pointer.y = -(event.clientY / window.innerHeight) * 2 + 1;
      });

      window.addEventListener("pointerdown", () => {
        pixelblocks.controls.mouse.leftMouse = true;
      });

      window.addEventListener("pointerup", () => {
        pixelblocks.controls.mouse.leftMouse = false;
      });

      window.addEventListener("pointerleave", () => {
        pixelblocks.controls.mouse.rightMouse = false;
        pixelblocks.controls.mouse.leftMouse = false;
      });

      document.addEventListener("keydown", (event) => {
        let key = event.key.toUpperCase();
        // console.log(key)

        if (key === "ESCAPE") {

            console.log(key, guiController.ESCCounter)
          guiController.ESCCounter++;

          if (guiController.ESCCounter === 1) {
            pixelblocks.pause("pause");
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
            pixelblocks.pause("unpause");
            guiController.ESCCounter = 0;
          }
        }

        if (key === "W") {
          pixelblocks.controls.movement.jump = true;
        }

        if (key === "D") {
          pixelblocks.controls.movement.right = true;
        }

        if (key === "A") {
          pixelblocks.controls.movement.left = true;
        }

        if (key === "S") {
          pixelblocks.controls.movement.down = true;
        }

        if (key === "Z") {
          if (pixelblocks.camera.position.z > 1) {
            pixelblocks.camera.position.z -= 1;
            console.log("camera pos", pixelblocks.camera.position);
          }
        }

        if (key === "X") {
          if (pixelblocks.camera.position.z < 7) {
            pixelblocks.camera.position.z += 1;
            console.log("camera pos", pixelblocks.camera.position);
          }
        }
      });

      document.addEventListener("keyup", (event) => {
        let key = event.key.toUpperCase();

        if (key === "W") {
          pixelblocks.controls.movement.jump = false;
        }

        if (key === "D") {
          pixelblocks.controls.movement.right = false;
        }

        if (key === "A") {
          pixelblocks.controls.movement.left = false;
        }

        if (key === "S") {
          pixelblocks.controls.movement.down = false;
        }

        if (key === "1") {
          pixelblocks.controls.mouse.action = "Punch";
        }
        if (key === "2") {
          pixelblocks.controls.mouse.action = "Place";
        }

        if (key === "-") {
            console.log('newWorld', key)
            pixelblocks.socket.emit("request-world", "WORLDNAME");
        }

      });

      initNetworking();
      animate();

      pixelblocks.running = true;

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
