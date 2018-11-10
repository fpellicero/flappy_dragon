import Phaser from 'phaser-ce';
import { basename } from 'path';

export default class Bird extends Phaser.Sprite {
  constructor(game, x, y) {
    super(game, x, y, 'bird');
    this.scale.setTo(0.5, 0.5);
    this.anchor.setTo(-0.2, 0.5);

    this.sounds = {
      jump: this.game.add.audio('jump'),
      crash: this.game.add.audio('crash')
    }; 
  }

  enablePhysics() {
    this.started = true;

    this.animations.add('fly');
    this.animations.play('fly', 12, true);
    this.body.gravity.y = 1000;
    this.body.setSize(70, 70, 20, 10);
  }

  kill() {
    this.sounds.crash.play();

    this.alive = false;
    this.body.gravity.y = 0;
    this.body.velocity.y = 0;
    this.animations.stop();

    setTimeout(() => {
      this.body.gravity.y = 1000;
    }, 1000);
  }

  update () {
    if (!this.started || !this.alive) return;
    if (this.angle < 20) this.angle += 1;
  }

  jump() {
    if(!this.alive) return;

    this.body.velocity.y = -350;
    this.sounds.jump.play();
    this.game.add.tween(this).to({angle: -20}, 100).start(); 
  }
}