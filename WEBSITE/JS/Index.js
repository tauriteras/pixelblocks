import PixelBlocks from "./PixelBlocks";
import GUIController from "./GAME/GUI/GUIController";

export const root = document.getElementById("root");
export const pixelblocks = new PixelBlocks()
export const guiController = new GUIController()

document.addEventListener("DOMContentLoaded", () => {

  guiController.init();

});