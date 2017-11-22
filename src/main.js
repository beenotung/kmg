import 'pixi'
import 'p2'
import Phaser from 'phaser'
import core from 'kmg-ionic'

import BootState from './states/Boot'
import SplashState from './states/Splash'
// import GameState from './states/Game'
import PolyScreen from './states/PolyuLogoScreen'
import Menu from './states/Menu'
import Select from './states/Select'
import MainGame from './states/MainGame'
import config from './config'

class Game extends Phaser.Game {
  constructor () {
    // const docElement = document.documentElement
    // const width = docElement.clientWidth > config.gameWidth ? config.gameWidth : docElement.clientWidth
    // const height = docElement.clientHeight > config.gameHeight ? config.gameHeight : docElement.clientHeight
    const width = config.gameWidth
    const height = config.gameHeight

    super(width, height, Phaser.CANVAS, 'content', null)

    this.state.add('Boot', BootState, false)
    this.state.add('Splash', SplashState, false)
    // this.state.add('Game', GameState, false)
    this.state.add('PolyScreen', PolyScreen, false)
    this.state.add('Menu', Menu, false)
    this.state.add('Select', Select, false)
    this.state.add('MainGame', MainGame, false)
    // this.state.start("PolyScreen")
    this.state.start('Boot')
  }
}

window.game = new Game()
window.game.global = {
  api: core,
  player: [
    {
      'pic': -1,
      'playerObj': null
    },
    {
      'pic': -1,
      'playerObj': null
    },
    {
      'pic': -1,
      'playerObj': null
    },
    {
      'pic': -1,
      'playerObj': null
    }
  ],
  bgm: null
}
