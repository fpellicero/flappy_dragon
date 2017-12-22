import Phaser from 'phaser-ce'
import Config from '../config'

export default class CastleBackground {
  static keys = [
    'background7',
    'background6',
    'background5',
    'background4',
    'background3',
    'background2',
    'background1'    
  ]

  static layerSpeed = [
    10,
    30,
    50,
    100,
    50,
    170,
    200  
  ];
  
  constructor(game) {
    this.game = game;

    this.layers = this.createLayers();
  }

  createLayers () {
    return CastleBackground.keys.map((key) => this.addLayer(key));
  }

  addLayer (key) {
    return this.game.add.tileSprite(0, 0, Config.gameWidth, Config.gameHeight, key)
  }

  update () {
    this.game.world.bringToTop(this.layers[6]);
  }

  start () { 
    this.layers.forEach((layer, i) => {
      layer.autoScroll(-CastleBackground.layerSpeed[i], 0);
    });
  }

  stop() {
    this.layers.forEach((layer, i) => {
      layer.autoScroll(0, 0);
    });
  }
}