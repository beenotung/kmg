import Phaser from 'phaser'

let url = 'http://localhost:8100'
export default class extends Phaser.State {
  constructor () {
    super()
    this.onMessage = this.onMessage.bind(this)
    this.sendMessage('constructor')
    this.debug = {}
  }

  init () {
    this.sendMessage('init')
    window.addEventListener('message', this.onMessage, false)
  }

  shutdown () {
    this.sendMessage('shutdown')
    window.removeEventListener('message', this.onMessage, false)
  }

  preload () {
    this.sendMessage('preload')
  }

  create () {
    this.sendMessage('create')

    // Set Background color to white
    this.stage.backgroundColor = '#FFF'

    // Load Polyu Comp logo image and BGMusic
    this.add.sprite(152, 240, 'team')

    this.time.events.add(Phaser.Timer.SECOND * 3, () => {
      this.state.start('Menu')
    }, this)
  }

  update () {
    if (this.debug.tps) {
      this.lastTick = this.currentTick
      this.currentTick = Date.now()
      const tps = 1000 / (this.currentTick - this.lastTick)
      if (Number.isNaN(tps)) {
        return
      }
      // console.log('tps:', this.tps);
      const msg = {tps}
      this.sendMessage(msg)
    }
  }

  render () {
    if (this.debug.fps) {
      this.lastFrame = this.currentFrame
      this.currentFrame = Date.now()
      const fps = 1000 / (this.currentFrame - this.lastFrame)
      if (Number.isNaN(fps)) {
        return
      }
      // console.log('fps:', this.fps);
      const msg = {fps}
      this.sendMessage(msg)
    }
  }

  onMessage (event) {
    if (event.origin !== url) {
      return
    }
    const data = event.data
    if (typeof data.debug === 'object' && data.debug !== null) {
      if (typeof data.debug.fps === 'boolean') {
        this.debug.fps = data.debug.fps
      }
      if (typeof data.debug.tps === 'boolean') {
        this.debug.tps = data.debug.tps
      }
      return
    }
    console.debug('received from parent:', event.data)
  }

  sendMessage (msg) {
    window.parent.postMessage(msg, url)
  }
}
