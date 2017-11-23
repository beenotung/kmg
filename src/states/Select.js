import Phaser from 'phaser'

export default class extends Phaser.State {
  init () {
    this.game.global.player[0]['pic'] = -1
    this.game.global.player[1]['pic'] = -1
    this.game.global.player[2]['pic'] = -1
    this.game.global.player[3]['pic'] = -1
  }

  shutdown () {}

  preload () {
    this.stage.backgroundColor = '#456'
  }

  create () {
    this.add.tileSprite(0, 0, 1024, 768, 'backboard-select')
    this.player1 = this.add.sprite(124, 154, 'select')
    this.player2 = this.add.sprite(336, 154, 'select')
    this.player3 = this.add.sprite(544, 154, 'select')
    this.player4 = this.add.sprite(750, 154, 'select')
    let that = this
    this.player1.inputEnabled = true
    this.player2.inputEnabled = true
    this.player3.inputEnabled = true
    this.player4.inputEnabled = true

    this.player1.events.onInputDown.add(function () {
      that.changeProfile(this.player1, '1')
    }, this)

    this.player2.events.onInputDown.add(function () {
      that.changeProfile(this.player2, '2')
    }, this)

    this.player3.events.onInputDown.add(function () {
      that.changeProfile(this.player3, '3')
    }, this)

    this.player4.events.onInputDown.add(function () {
      that.changeProfile(this.player4, '4')
    }, this)

    this.add.button(
      2,
      636,
      'homebutton-select',
      function () {
        this.init()
        this.game.global.bgm.stop()
        this.state.start('Menu')
      },
      this,
      2,
      0,
      1,
      0
    )
    this.add.button(
      866,
      636,
      'finishbutton-select',
      function () {
        this.game.global.bgm.stop()
        this.state.start('MainGame')
      },
      this,
      2,
      0,
      1,
      0
    )
  }

  changeProfile (obj, playerId) {
    let playerData

    switch (playerId) {
      case '1':
        playerData = this.game.global.player[0]
        break
      case '2':
        playerData = this.game.global.player[1]
        break
      case '3':
        playerData = this.game.global.player[2]
        break
      case '4':
        playerData = this.game.global.player[3]
        break
    }

    switch (playerData['pic']) {
      case -1:
        playerData['pic'] = 0
        obj.loadTexture('audit', 0)
        break
      case 0:
        playerData['pic'] = 1
        obj.loadTexture('consulting', 0)
        break
      case 1:
        playerData['pic'] = 2
        obj.loadTexture('IT', 0)
        break
      case 2:
        playerData['pic'] = 3
        obj.loadTexture('media', 0)
        break
      case 3:
        playerData['pic'] = 4
        obj.loadTexture('publishing', 0)
        break
      case 4:
        playerData['pic'] = 0
        obj.loadTexture('audit', 0)
        break
    }
  }

  update () {}

  render () {}
}
