import Phaser from 'phaser-ce';

export default class extends Phaser.Group {
  constructor (game, spritePool, numTiles, x, y, speed) {
    super(game);

    this.spritePool = spritePool;
    this.enableBody = true;

    this.tileSize = 40;

    this.prepare(numTiles, x, y, speed);
  }

  prepare (numTiles, x, y, speed) {
    this.alive = true;

    let i = 0;
    while (i < numTiles) {
      let tileOffset = i * this.tileSize;
      let floorTile = this.spritePool.getFirstExists(false, true, x + tileOffset, y, 'floor');
      floorTile.reset(x + tileOffset, y);
      this.add(floorTile);
      i++;
    }

    this.setAll('body.immovable', true);
    this.setAll('body.allowGravity', false);
    this.setAll('body.velocity.x', -speed);
  }

  kill () {
    this.alive = false;
    this.callAll('kill');

    let sprites = [];
    this.forEach((tile) => {
      sprites.push(tile);
    }, this);
    sprites.forEach((tile) => {
      this.spritePool.add(tile);
    });
  }
}
