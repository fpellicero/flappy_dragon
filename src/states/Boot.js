import Phaser from 'phaser-ce';

export default class extends Phaser.State {
  init () {
    this.game.stage.backgroundColor = '#FFF';
    
    this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    this.game.scale.pageAlignHorizontally = true;
    this.game.scale.pageAlignVertically = true;

    this.game.physics.startSystem(Phaser.Physics.ARCADE);
  }

  preload () {
    this.load.image('preloadbar', 'assets/images/preloader-bar.png');
  }

  create () {
    this.state.start('Preload');
  }
}
