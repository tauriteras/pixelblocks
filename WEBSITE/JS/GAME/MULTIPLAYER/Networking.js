import { io } from "socket.io-client";
import { gameEngine } from "../../Index";
import World from "../MAP/World";
import Player from "../PLAYER/Player";

export function initNetworking() {

    const socket = io("http://localhost:3069");

    gameEngine.socket = socket;

    socket.on("players-here", (data) => {
      console.log("players-here", data);
    });
    
    socket.on("player-joined", (data) => {
      console.log("player-joined", data);
    });
    
    socket.on("player-left", (data) => {
      console.log("player-left", data);
    });
    
    socket.on("other-player-moved", (data) => {
      console.log("other-player-moved", data)
    });
    
    socket.on("other-player-punch", (data) => {
      console.log("other-player-punch", data);
    });
    
    socket.on("other-player-punch-block", (data) => {
      console.log("other-player-punch-block", data);
    });
    
    socket.on("other-player-build", (data) => {
      console.log("other-player-build", data);
    });
    
    socket.on("player-punch-block", (index) => {
      console.log("player-punch-block", index);
      gameEngine.world.blocks[index].punch();
    });

    socket.on('player-punch-bgBlock', (index) => {
      console.log("player-punch-bgBlock", index);
      gameEngine.world.backgroundBlocks[index].punch();
    })
    
    socket.on("player-build", (data) => {
      console.log("player-build", data);
    });
    
    socket.on("update-block", (data) => {
      console.log("update-block", data);
    });

    socket.on('join-world', (data) => {
      console.log('join-world', data)

      gameEngine.camera.position.x = data.entry.x;
      gameEngine.camera.position.y = data.entry.y;

      gameEngine.world = new World(data);
      gameEngine.player = new Player(socket.id, data.entry);

      gameEngine.world.load(gameEngine.scene);
      gameEngine.scene.add(gameEngine.player.spawn());

    })
    
}