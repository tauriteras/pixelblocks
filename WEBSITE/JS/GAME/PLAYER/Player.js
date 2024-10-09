import * as THREE from "three";

class Player {
  constructor(socket, position) {
    this.socket = socket;
    this.position = position;
    this.userData = {
      name: "",
      level: 0,
      xp: 0,
      clothing: {},
      effects: {},
    };
    this.sprite = null;
  }

  spawn() {
    const geometry = new THREE.PlaneGeometry(0.7, 0.9);
    const material = new THREE.MeshBasicMaterial({
      side: THREE.DoubleSide,
      transparent: true,
      map: new THREE.TextureLoader().load("./dev_default.png"),
    });

    const player = new THREE.Mesh(geometry, material);

    player.position.x = this.position.x;
    player.position.y = this.position.y;

    player.userData.type = "SPRITE_Player";

    this.sprite = player;

    document.getElementsByClassName("select-world")[0].classList.add('hide-worlds-menu');

    return player;
  }

  updatePos() {
    if (this.sprite === null) {
      return;
    }

    this.sprite.position.x = this.position.x;
    this.sprite.position.y = this.position.y;
  }

  punch() {
    console.log("Player is punching!")
  }
}

export default Player;
