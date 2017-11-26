import Phaser from 'phaser'

export default class extends Phaser.State {
  constructor () {
    super()
  }

  init () {
  }

  shutdown () {
  }

  preload () {
  }

  create () {
    // Set Background color to white
    this.stage.backgroundColor = '#FFF'

    // Load Polyu Comp logo image and BGMusic
    this.add.sprite(152, 240, 'team')

    this.time.events.add(Phaser.Timer.SECOND * 3, () => {
      this.state.start('Menu')
    }, this)
  }

  update () {
  }

  render () {
  }
}
