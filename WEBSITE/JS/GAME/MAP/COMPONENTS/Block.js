import * as THREE from "three";

import blockDATA from "../../../../public/blockDATA.json";
import { gameEngine } from "../../../Index";

class Block {
  constructor(id, x, y, index, data) {
    this.sprite = null;
    this.index = index;
    this.data = {
      id: id,
      position: {
        x: x,
        y: y,
      },
      collisions: {},
    };

    this.customData = data;
    this.punchCount = 0;
  }

  create() {
    const geometry = new THREE.PlaneGeometry(1, 1);
    const material = new THREE.MeshBasicMaterial({
      side: THREE.DoubleSide,
      transparent: true,
      map: new THREE.TextureLoader().load(
        "./TEXTURES/BLOCKS/" + blockDATA[this.data.id].texture
      ),
    });

    const block = new THREE.Mesh(geometry, material);

    block.position.x = this.data.position.x;
    block.position.y = this.data.position.y;

    block.userData.type = "SPRITE_Block";
    block.userData.index = this.index;

    this.sprite = block;
    this.data.collisions = blockDATA[this.data.id].collisions;

    return block;
  }

  place(newID) {
    console.log("Place!", this);

    this.data.id = newID;
    this.sprite.material.map = new THREE.TextureLoader().load(
      "./TEXTURES/BLOCKS/" + blockDATA[newID].texture
    );
    this.data.collisions = blockDATA[newID].collisions;
    
    if (this.data.position.x > 1) {
      gameEngine.world.blocks[this.index - 1].updateTexture();
    }
    if (this.data.position.x < 100) {
      gameEngine.world.blocks[this.index - 1].updateTexture();
    }
    if (this.data.position.y < 56) {
      gameEngine.world.blocks[this.index + 100].updateTexture();
    }
    if (this.data.position.y > 1) {
      gameEngine.world.blocks[this.index - 100].updateTexture();
    }
  }

  punch() {
    // console.log("Punch!", this)

    if (this.punchCount === 0) {
      const geometry = new THREE.PlaneGeometry(1, 1);
      const material = new THREE.MeshBasicMaterial({
        side: THREE.DoubleSide,
        transparent: true,
        map: new THREE.TextureLoader().load(
          "./TEXTURES/BREAKING/Breaking-1.png"
        ),
      });

      const breakingOverlay = new THREE.Mesh(geometry, material);

      this.sprite.add(breakingOverlay);
    }

    this.punchCount += 1;

    let breakPercentage =
      (this.punchCount / blockDATA[this.data.id].hardness) * 100;

    if (breakPercentage > 20 && breakPercentage < 40) {
      this.sprite.children[0].material.map = new THREE.TextureLoader().load(
        "./TEXTURES/BREAKING/Breaking-2.png"
      );
    }

    if (breakPercentage > 40 && breakPercentage < 60) {
      this.sprite.children[0].material.map = new THREE.TextureLoader().load(
        "./TEXTURES/BREAKING/Breaking-3.png"
      );
    }

    if (breakPercentage > 60 && breakPercentage < 80) {
      this.sprite.children[0].material.map = new THREE.TextureLoader().load(
        "./TEXTURES/BREAKING/Breaking-4.png"
      );
    }

    if (breakPercentage > 80 && breakPercentage < 100) {
      this.sprite.children[0].material.map = new THREE.TextureLoader().load(
        "./TEXTURES/BREAKING/Breaking-5.png"
      );
    }

    if (this.punchCount === blockDATA[this.data.id].hardness) {
      this.break();
    }
  }

  break() {
    console.log("Break!", this);

    this.sprite.remove(this.sprite.children[0]);
    this.data.id = 0;
    this.punchCount = 0;
    this.sprite.material.map = new THREE.TextureLoader().load(
      "./TEXTURES/BLOCKS/Nothing.png"
    );
    this.data.collisions = blockDATA[0].collisions;

    if (this.data.position.x > 1) {
      gameEngine.world.blocks[this.index - 1].updateTexture();
    }
    if (this.data.position.x < 100) {
      gameEngine.world.blocks[this.index - 1].updateTexture();
    }
    if (this.data.position.y < 56) {
      gameEngine.world.blocks[this.index + 100].updateTexture();
    }
    if (this.data.position.y > 1) {
      gameEngine.world.blocks[this.index - 100].updateTexture();
    }
  }

  updateTexture() {
    if (
      gameEngine.world.blocks[this.index].data.id ===
        gameEngine.world.blocks[this.index + 100].data.id &&
      blockDATA[gameEngine.world.blocks[this.index].data.id].altTexture.top != "NONE"
    ) {
      gameEngine.world.blocks[this.index].sprite.material.map =
        new THREE.TextureLoader().load(
          "./TEXTURES/BLOCKS/" +
            blockDATA[gameEngine.world.blocks[this.index].data.id].altTexture.top
        );
    }
    if (
      gameEngine.world.blocks[this.index].data.id !=
      gameEngine.world.blocks[this.index + 100].data.id
    ) {
      gameEngine.world.blocks[this.index].sprite.material.map =
        new THREE.TextureLoader().load(
          "./TEXTURES/BLOCKS/" + blockDATA[gameEngine.world.blocks[this.index].data.id].texture
        );
    }
  }
}

export default Block;
