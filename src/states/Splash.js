import Phaser from 'phaser'
import { centerGameObjects } from '../utils'

export default class extends Phaser.State {
  init () {}

  preload () {
    this.loaderBg = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'loaderBg')
    this.loaderBar = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'loaderBar')
    centerGameObjects([this.loaderBg, this.loaderBar])

    this.load.setPreloadSprite(this.loaderBar)
    //
    // load your assets
    //
    this.load.image('logo', './assets/images/polyu_comp_logo.jpg')
    this.load.image('polylogo', './assets/images/polyu_logo.png')
    this.load.image('backboard-home', './assets/images/backboard-home.jpg')   
    this.load.atlas('exitbtn-home', './assets/images/exitbtn-home.png', './assets/images/exitbtn-home.json')
    this.load.image('left-home', './assets/images/left-home.png')    
    this.load.image('startbutton-home_clicked', './assets/images/startbutton-home_clicked.png')    
    this.load.image('startbutton-home_hover', './assets/images/startbutton-home_hover.png')    
    // this.load.image('startbutton-home', './assets/images/startbutton-home.png')    
    this.load.atlas('startbutton-home', './assets/images/startbtn_home`.png', './assets/images/startbtn_home`.json')
    this.load.image('title_bg', './assets/images/title_bg.png')        
    this.load.audio('bgMusic', './assets/sounds/state1_bgm.mp3')
    this.load.audio('menuMusic', './assets/sounds/mega_super_arcade_cup.mp3')    
  }

  create () {
    this.state.start('PolyScreen')
  }
}
