export function generateWorld(width, height) {
  let worldData = {
    size: {
      width: width,
      height: height,
    },
    entry: {
      x: Math.floor(Math.random() * width),
      // x: 1,
      y: 24,
    },
    blocks: [],
    backgroundBlocks: [],
  };

  if (worldData.entry.x < 3) {
    worldData.entry.x = 3;
  }

  if (worldData.entry.x > (worldData.size.width - 3)) {
    worldData.entry.x = (worldData.size.width - 3);
  }


  let x = 1;
  let y = 1;

  for (let i = 0; i < worldData.size.width * worldData.size.height; i++) {
    let random = Math.floor(Math.random() * 100);

    let block = {
      id: 3,
      data: {},
    };

    // 4 Rows of bedrock
    if (y <= 4) {
      worldData.blocks.push({
        id: 2,
        data: {},
      });

      worldData.backgroundBlocks.push({
        id: 1,
        data: {},
      });
    }

    // Dirt, Lava, Stone
    if (y > 4 && y <= 23) {
      // Spawn lava
      if (y <= 9 && random < 20) {
        block = {
          id: 5,
          data: {},
        };
      }

      // Spawn stone
      if (y > 9 && y <= 19 && random < 5) {
        block = {
          id: 4,
          data: {},
        };
      }

      // Spawn bedrock under entry door
      if (y === 23 && x === worldData.entry.x) {
        block = {
          id: 2,
          data: {},
        };
      }

      worldData.backgroundBlocks.push({
        id: 1,
        data: {},
      });
      worldData.blocks.push(block);
    }

    if (y > 23) {

      block = {
        id: 0,
        data: {}
      }

      if (y === 24 && x === worldData.entry.x) {
        block = {
          id: 1,
          data: {},
        };
      }

      worldData.backgroundBlocks.push({
        id: 0,
        data: {},
      });

      worldData.blocks.push(block);
    }

    if (x === worldData.size.width) {
      x = 0;
      y++;
    }

    x++;
  }

  return worldData;
  
}
