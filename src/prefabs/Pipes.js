import Phaser from 'phaser-ce';

export default class Pipes extends Phaser.Group {
  static spritePool;
  
  constructor(game, spritePool) {
    super(game);

    this.enableBody = true;
    this.spritePool = spritePool;
    
    this.init();
    console.log("New PipeGroup");
  }

  init() {
    this.alive = true;
    const hole = Math.floor(Math.random() * 5) + 1;
    
    // Add the 6 pipes 
    // With one big hole at position 'hole' and 'hole + 1'
    const holeIndex = [hole-1, hole, hole+1]
    const endingPipes = [hole - 2, hole + 2]
    for (var i = 0; i < 10; i++){
      if(holeIndex.indexOf(i) == -1) {
        var isEnding = endingPipes.indexOf(i) != -1;
        var invertPipe = (i == hole + 2);
        this.addOnePipe(320, i * 50, isEnding, invertPipe);   
      }
    }
    this.setAll('checkWorldBounds',true);
    this.setAll('outOfBoundsKill',true);
    this.setAll('body.immovable', true);
    this.setAll('body.allowGravity', false);
    this.setAll('body.velocity.x', -200);
    this.checkWorldBounds = true;
    this.outOfBoundsKill = true;
  }

  reset () {
    this.init();
  }

  update () {
    if(this.alive && this.IsOutOfWorld()) this.kill();
  }

  IsOutOfWorld () {
    return this.right <= 0;
  }

  addOnePipe (x, y, ending, invert) {
    const { game } = this;
    
    // Create a pipe at the position x and y
    var spriteIndex = ending ? 2 : 0;
    spriteIndex = invert ? 1 : spriteIndex;
    
    let pipe = this.spritePool.getFirstExists(false, false, x, y, 'obstacle', spriteIndex);
    if(!pipe) {
      pipe = this.game.add.sprite(x, y, 'obstacle', spriteIndex)
      this.spritePool.add(pipe);
    }else {
      pipe.reset(x, y);
    }
    this.add(pipe);
  }

  kill () {
    console.log("kill group");
    this.alive = false;
    this.callAll('kill');
    var sprites = [];
    this.forEach(function(pipe){
      sprites.push(pipe);
    }, this);
    
    sprites.forEach(function(pipe){
      this.spritePool.add(pipe);
    }, this);
  }

  stop () {
    this.forEach((sprite) => {
      sprite.body.velocity.x = 0;
    })
  }
}