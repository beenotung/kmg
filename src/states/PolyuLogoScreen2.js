import Phaser from 'phaser'

export default class extends Phaser.State {
  preload () {
    this.load.image('logo', './assets/images/polyu_comp_logo.jpg')
    this.load.audio('bgMusic', './assets/sounds/state1_bgm.mp3')
  }

  create () {
    // Set Background color to white
    game.stage.backgroundColor = '#FFF'

    // Load Polyu Comp logo image and BGMusic
    var logo = game.add.sprite(game.world.centerX, game.world.centerY, 'logo')
    var bgMsuic = game.add.audio('bgMusic')

    // Set Logo in center and its alpha to 0
    logo.anchor.setTo(0.5, 0.5)
    logo.alpha = 0

    // Add animation to fade in logo
    game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL
    bgMsuic.play()
    game.add
      .tween(logo)
      .to({ alpha: 1 }, 2000, Phaser.Easing.Linear.None, true)
    bgMsuic.fadeOut(2000)
  }
}
