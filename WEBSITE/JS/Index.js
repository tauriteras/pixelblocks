import GameEngine from "./GameEngine";
import GUIController from "./GAME/GUI/GUIController";

export const root = document.getElementById("root");
export const gameEngine = new GameEngine()
export const guiController = new GUIController()

document.addEventListener("DOMContentLoaded", () => {

  guiController.init();

});