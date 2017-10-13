import Phaser from 'phaser'

export default class extends Phaser.State {
  init () {

  }

  preload () {
    this.load.image('logo', './assets/images/polyu_comp_logo.jpg')
    this.load.image('polylogo', './assets/images/polyu_logo.png')    
    this.load.audio('bgMusic', './assets/sounds/state1_bgm.mp3')
  }

  create () {
    // Set Background color to white
    this.stage.backgroundColor = '#FFF'

    // Load Polyu Comp logo image and BGMusic
    var logo = this.add.sprite(this.world.centerX, this.world.centerY, 'logo')
    var logo2 = this.add.sprite(this.world.centerX, this.world.centerY, 'polylogo')    
    var bgMsuic = this.add.audio('bgMusic')

    // Set Logo in center and its alpha to 0
    logo.anchor.setTo(0.5, 0.5)
    logo2.scale.setTo(0.4, 0.4)
    logo2.anchor.setTo(0.5, 0.5)
    logo.alpha = 0
    logo2.alpha = 0

    // Add animation to fade in logo
    this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL
    bgMsuic.play()
    this.game.add.tween(logo).to({x: 400, y: 200, alpha: 1}, 1000, Phaser.Easing.Quadratic.InOut, true)
    this.game.add.tween(logo2).to({x: 400, y: 400, alpha: 1}, 1000, Phaser.Easing.Quadratic.InOut, true)
    // this.add.tween(logo2).to({ alpha: 1 }, 2000, Phaser.Easing.Linear.None, true)    
    // this.add.tween(logo).to({ alpha: 1 }, 2000, Phaser.Easing.Linear.None, true)
    bgMsuic.fadeOut(2000)
  }
}
