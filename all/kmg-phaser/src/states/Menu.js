import Phaser from 'phaser'

export default class extends Phaser.State {
  init () {
    console.log(this.game.global)
  }

  shutdown () {
  }

  preload () {
    this.stage.backgroundColor = '#456'
  }

  create () {
    this.add.tileSprite(0, 0, 1024, 768, 'backboard-home')
    this.add.tileSprite(0, 0, 1024, 768, 'transparent-white-home')
    this.add.sprite(0, 130, 'left-home')
    this.add.sprite(334, 450, 'title_bg')
    this.add.button(0, 224, 'startbutton-home', () => {
      this.state.start('Select')
    }, this, 2, 0, 1, 0)
    this.add.button(0, 648, 'exitbtn-home', null, this, 2, 0, 1, 0)
    this.soundbtn = this.add.sprite(853, 30, 'sound')
    this.soundbtn.inputEnabled = true
    this.soundbtn.events.onInputDown.add(function () {
      triggerSound()
    }, this)
    let that = this
    
    function setSoundBtn() {
      if (that.game.global.hasSound == true) {
        that.soundbtn.loadTexture('sound', 0)
        that.game.global.bgm.loopFull()
      } else {
        that.soundbtn.loadTexture('nosound', 0)   
        that.game.global.bgm.stop()        
      }
    }

    function setSound(b) {
      that.game.global.hasSound = b
      setSoundBtn()
    }

    function triggerSound() {
      if (that.game.global.hasSound == true) {
        setSound(false)
      } else {
        setSound(true)
      }
    }
    let style = { font: '120px Arial', fill: '#fff', wordWrap: true, stroke: '#000000', strokeThickness: 10 }
    this.textIKM_I = this.add.text(370, 470, 'I', style)
    this.textIKM_K = this.add.text(420, 470, 'K', style)
    this.textIKM_M = this.add.text(510, 470, 'M', style)
    this.textIKM__ = this.add.text(620, 470, '-', style)
    this.textGAME_G = this.add.text(675, 470, 'G', style)
    this.textGAME_A = this.add.text(765, 470, 'A', style)
    this.textGAME_M = this.add.text(855, 470, 'M', style)
    this.textGAME_E = this.add.text(945, 470, 'E', style)

    this.add.tween(this.textIKM_I.position).to({y: 480}, 2000, Phaser.Easing.Back.InOut, true, 100, 20, true).loop(true)
    this.add.tween(this.textIKM_K.position).to({y: 450}, 2000, Phaser.Easing.Back.InOut, true, 100, 20, true).loop(true)
    this.add.tween(this.textIKM_M.position).to({y: 480}, 2000, Phaser.Easing.Back.InOut, true, 100, 20, true).loop(true)
    this.add.tween(this.textIKM__.position).to({y: 450}, 2000, Phaser.Easing.Back.InOut, true, 100, 20, true).loop(true)
    this.add.tween(this.textGAME_G.position).to({y: 480}, 2000, Phaser.Easing.Back.InOut, true, 100, 20, true).loop(true)
    this.add.tween(this.textGAME_A.position).to({y: 450}, 2000, Phaser.Easing.Back.InOut, true, 100, 20, true).loop(true)
    this.add.tween(this.textGAME_M.position).to({y: 480}, 2000, Phaser.Easing.Back.InOut, true, 100, 20, true).loop(true)
    this.add.tween(this.textGAME_E.position).to({y: 450}, 2000, Phaser.Easing.Back.InOut, true, 100, 20, true).loop(true)

    this.game.global.bgm = this.add.audio('menuMusic')

    setSoundBtn()
  }

  update () {

  }

  render () {

  }
}
