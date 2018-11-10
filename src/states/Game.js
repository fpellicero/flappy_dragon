import Phaser from 'phaser-ce';
import Config from '../config';
import Pipe from '../prefabs/Pipes';
import CastleBackground from '../prefabs/CastleBackground';
import Bird from '../prefabs/Bird';

//TODO: Add pool for sprites.
//TODO: Move pipes to a prefab

const MAX_JUMP_DISTANCE = 120;
export default class extends Phaser.State {
  init () {
    this.pipePool = this.game.add.group();
    this.spritePool = this.game.add.group();
    
    this.started = false;
    this.score = 0;
  }
  
  create () {
    const {game, spritePool} = this;
    
    this.background = new CastleBackground(game, spritePool);
    this.bird = new Bird(game, 20, this.game.height / 2); 
    this.game.add.existing(this.bird);
    
    this.bird.checkWorldBounds = true;
    this.bird.events.onOutOfBounds.add(this.restartGame, this);

    this.initControls();
    
    // Create an empty group
    this.pipes = game.add.group(); 

    this.labelScore = game.add.text(20, 20, "0", { font: "30px Arial", fill: "#ffffff" });
  }

  initControls() {
    var spaceKey = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    spaceKey.onDown.add(this.jump, this);     
    this.game.input.onTap.add(this.jump, this);
  }

  update () {
    this.background.update(); 
    if(!this.started) return;
    this.pipes.forEachAlive((pipe) => {
      this.game.physics.arcade.overlap(this.bird, pipe, this.hitPipe, null, this);
    }, this);
  }
  
  render () {
    if(window.debug) this.game.debug.body(this.bird);
  }
  
  jump () {
    const { game } = this;
    if(!this.started) this.startGame();
    this.bird.jump();
  }
  
  startGame () {
    const { bird, game } = this;
    
    this.started = true;
    this.background.start();

    game.physics.startSystem(Phaser.Physics.ARCADE);
    game.physics.arcade.enable(bird);
    
    this.bird.enablePhysics();

    this.timer = game.time.events.loop(1500, this.createNewPipe, this); 
  }

  createNewPipe () {
    let pipe = this.pipes.getFirstDead();
    if(!pipe) {
      pipe = new Pipe(this.game, this.spritePool);
      this.pipes.add(pipe);
    }else {
      pipe.reset();
    }

    this.UpdateScore(1);
  }

  UpdateScore(n) {
    this.score += n;
    this.labelScore.text = this.score;
  }

  restartGame () {
    this.game.state.start('Game');
  }
   
  hitPipe () {
    if (!this.bird.alive) return;

    this.background.stop();
    
    // Set the alive property of the bird to false
    this.bird.kill();
    
    // Prevent new pipes from appearing
    this.game.time.events.remove(this.timer);
    
    // Go through all the pipes, and stop their movement
    this.pipes.forEach(function(p){
      p.stop();
    }, this);
  }
}
