import * as THREE from "three";

class Player {
  constructor(position) {
    this.position = position;
    this.sprite = undefined;
  }

  spawn() {
    const geometry = new THREE.PlaneGeometry(0.7, 0.9);
    const material = new THREE.MeshBasicMaterial({
      side: THREE.DoubleSide,
      transparent: true,
      map: new THREE.TextureLoader().load("./GAME-ASSETS/dev_default.png")
    });

    const player = new THREE.Mesh(geometry, material);

    player.position.x = this.position.x;
    player.position.y = this.position.y;

    player.userData.type = "SPRITE_Player";

    this.sprite = player;

    return player;
    
  }
}

export default Player;
