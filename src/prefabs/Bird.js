import Phaser from 'phaser-ce';

export default class Bird extends Phaser.Sprite {
  constructor(game, x, y) {
    super(game, x, y, 'bird');
    this.scale.setTo(0.5, 0.5);
    this.anchor.setTo(-0.2, 0.5);
    this.jumpSound = this.game.add.audio('jump');
  }

  enablePhysics() {
    this.started = true;

    this.animations.add('fly');
    this.animations.play('fly', 12, true);
    this.body.gravity.y = 1000;
    this.body.setSize(70, 70, 20, 10);
  }

  update () {
    if(!this.started) return;
    if (this.angle < 20) this.angle += 1;
  }

  jump() {
    if(!this.alive) return;

    this.body.velocity.y = -350;
    this.jumpSound.play();
    this.game.add.tween(this).to({angle: -20}, 100).start(); 
  }
}