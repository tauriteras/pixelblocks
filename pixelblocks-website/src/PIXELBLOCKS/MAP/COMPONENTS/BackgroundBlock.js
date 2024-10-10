import * as THREE from "three";

import bgBlockDATA from '../../../../../public/bgBlockDATA.json';

import Block from "./Block";

import { pixelblocks } from "../../Index";

class BackgroundBlock extends Block {
  constructor(id, x, y, index, data) {
    super(id, x, y, index, data);
  }

  create() {

    const geometry = new THREE.PlaneGeometry(1, 1);
    const material = new THREE.MeshBasicMaterial({
      side: THREE.DoubleSide,
      transparent: true,
      map: new THREE.TextureLoader().load(
        "./TEXTURES/BACKGROUNDBLOCKS/" + bgBlockDATA[this.data.id].texture
      ),
    });

    const bgBlock = new THREE.Mesh(geometry, material);

    bgBlock.position.x = this.data.position.x;
    bgBlock.position.y = this.data.position.y;

    bgBlock.userData.type = "SPRITE_BGBlock";
    bgBlock.userData.index = this.index;

    this.data.collisions = bgBlockDATA[this.data.id].collisions;

    this.sprite = bgBlock;
    return bgBlock;

  }

  break() {
    console.log("Break!", this);

    this.sprite.remove(this.sprite.children[0]);
    this.data.id = 0;
    this.sprite.material.map = new THREE.TextureLoader().load(
      "./TEXTURES/BLOCKS/Nothing.png"
    );
    this.data.collisions = bgBlockDATA[0].collisions;

    if (this.data.position.x > 1) {
      pixelblocks.world.backgroundBlocks[this.index - 1].updateTexture();
    }
    if (this.data.position.x < 100) {
      pixelblocks.world.backgroundBlocks[this.index - 1].updateTexture();
    }
    if (this.data.position.y < 56) {
      pixelblocks.world.backgroundBlocks[this.index + 100].updateTexture();
    }
    if (this.data.position.y > 1) {
      pixelblocks.world.backgroundBlocks[this.index - 100].updateTexture();
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
      (this.punchCount / bgBlockDATA[this.data.id].hardness) * 100;

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

    if (this.punchCount === bgBlockDATA[this.data.id].hardness) {
      this.break();
    }
  }

  place(newID) {
    console.log("Place!", this);

    this.data.id = newID;
    this.sprite.material.map = new THREE.TextureLoader().load(
      "./TEXTURES/BLOCKS/" + bgBlockDATA[newID].texture
    );
    
    if (this.data.position.x > 1) {
      pixelblocks.world.backgroundBlocks[this.index - 1].updateTexture();
    }
    if (this.data.position.x < 100) {
      pixelblocks.world.backgroundBlocks[this.index - 1].updateTexture();
    }
    if (this.data.position.y < 56) {
      pixelblocks.world.backgroundBlocks[this.index + 100].updateTexture();
    }
    if (this.data.position.y > 1) {
      pixelblocks.world.backgroundBlocks[this.index - 100].updateTexture();
    }
  }

  updateTexture() {
    if (
      pixelblocks.world.backgroundBlocks[this.index].data.id ===
        pixelblocks.world.backgroundBlocks[this.index + 100].data.id &&
      bgBlockDATA[pixelblocks.world.backgroundBlocks[this.index].data.id].altTexture.top != "NONE"
    ) {
      pixelblocks.world.backgroundBlocks[this.index].sprite.material.map =
        new THREE.TextureLoader().load(
          "./TEXTURES/BACKGROUNDBLOCKS/" +
            bgBlockDATA[pixelblocks.world.backgroundBlocks[this.index].data.id].altTexture.top
        );
    }
    if (
      pixelblocks.world.backgroundBlocks[this.index].data.id !=
      pixelblocks.world.backgroundBlocks[this.index + 100].data.id
    ) {
      pixelblocks.world.backgroundBlocks[this.index].sprite.material.map =
        new THREE.TextureLoader().load(
          "./TEXTURES/BACKGROUNDBLOCKS/" + bgBlockDATA[pixelblocks.world.backgroundBlocks[this.index].data.id].texture
        );
    }
  }

}

export default BackgroundBlock;
