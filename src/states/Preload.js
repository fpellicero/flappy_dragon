import Phaser from 'phaser-ce';

const IMAGE_PATH = 'assets/images/';
const AUDIO_PATH = 'assets/audio/';
export default class extends Phaser.State {
  preload () {
    const {game} = this;

    game.load.spritesheet('bird', 'assets/grumpy_bird/sprite.png', 100, 102, 8); 
    game.load.spritesheet('obstacle', 'assets/obstacle/obstacle.png', 37, 50);

    game.load.image('background7', 'assets/background/layer07_Sky.png');
    game.load.image('background6', 'assets/background/layer06_Rocks.png');
    game.load.image('background5', 'assets/background/layer05_Hills.png');
    game.load.image('background4', 'assets/background/layer04_Clouds.png');
    game.load.image('background3', 'assets/background/layer03_Hills_Castle.png');
    game.load.image('background2', 'assets/background/layer02_Trees_rocks.png');
    game.load.image('background1', 'assets/background/layer01_Ground.png');
    
    game.load.image('background', 'assets/backgrounds.png')
    game.load.audio('jump', 'assets/jump.wav');
  }

  create () {
    this.state.start('Game');
  }
}
