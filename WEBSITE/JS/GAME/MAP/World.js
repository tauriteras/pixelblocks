import * as THREE from "three";

import Block from "./COMPONENTS/Block";
import BackgroundBlock from "./COMPONENTS/SPECIAL-BLOCKS/BackgroundBlock";

import blockDATA from "../../../public/blockDATA.json";
import bgBlockDATA from '../../../public/bgBlockDATA.json';

class World {
  constructor(data) {
    this.data = data;

    this.blocks = [];
    this.backgroundBlocks = [];
    this.players = [];
  }

  load(scene) {

    const geometry = new THREE.PlaneGeometry(100, 56);
    const material = new THREE.MeshBasicMaterial({
      side: THREE.DoubleSide,
      color: new THREE.Color("blue")
    });

    const background = new THREE.Mesh(geometry, material);

    background.position.x = 50;
    background.position.y = 28;

    scene.add(background)

    let x = 1;
    let y = 1;

    for (let i = 0; i < this.data.blocks.length; i++) {
      let block = new Block(
        this.data.blocks[i].id,
        x,
        y,
        i,
        this.data.blocks[i].data
      );

      let backgroundBlock = new BackgroundBlock(
        this.data.backgroundBlocks[i].id,
        x,
        y,
        i,
        this.data.backgroundBlocks[i].data
      );

      this.blocks.push(block);
      this.backgroundBlocks.push(backgroundBlock);
      scene.add(backgroundBlock.create());
      scene.add(block.create());

      if (x === this.data.size.width) {
        x = 0;
        y++;
      }

      x++;

    }

    this.updateTextures();

  }

  updateTextures() {
    for (let i = 0; i < this.blocks.length - 100; i++) {
      if (
        this.blocks[i].data.id === this.blocks[i + 100].data.id &&
        blockDATA[this.blocks[i].data.id].altTexture.top != "NONE"
      ) {
        this.blocks[i].sprite.material.map = new THREE.TextureLoader().load(
          "./TEXTURES/BLOCKS/" +
            blockDATA[this.blocks[i].data.id].altTexture.top
        );
      }
    }
    for (let i = 0; i < this.backgroundBlocks.length - 100; i++) {
      if (
        this.backgroundBlocks[i].data.id === this.backgroundBlocks[i + 100].data.id &&
        bgBlockDATA[this.backgroundBlocks[i].data.id].altTexture.top != "NONE"
      ) {
        this.backgroundBlocks[i].sprite.material.map = new THREE.TextureLoader().load(
          "./TEXTURES/BLOCKS/" +
            bgBlockDATA[this.blocks[i].data.id].altTexture.top
        );
      }
    }
  }
}

export default World;
