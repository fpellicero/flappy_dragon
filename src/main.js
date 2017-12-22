import Phaser from 'phaser-ce';

import Config from './config';

import BootState from './states/Boot';
import PreloadState from './states/Preload';
import GameState from './states/Game';


class Game extends Phaser.Game {
  constructor () {
    super(Config.gameWidth, Config.gameHeight, Phaser.CANVAS);

    console.log(`new Game(${Config.gameHeight}, ${Config.gameWidth})`)

    this.state.add('Game', GameState);
    this.state.add('Preload', PreloadState);
    this.state.add('Boot', BootState, true)
  }
}

window.Game = new Game();
console.log(window.Game.scale);
