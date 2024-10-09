import PixelBlocks from "./PixelBlocks";
import GUIController from "./PIXELBLOCKS/GUI/GUIController";

export const root = document.getElementById("root");
export const pixelblocks = new PixelBlocks();
export const guiController = new GUIController()

document.addEventListener("DOMContentLoaded", () => {

  guiController.init();

});