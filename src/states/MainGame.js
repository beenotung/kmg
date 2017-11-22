import Phaser from 'phaser'

export default class extends Phaser.State {
  init () {

  }

  shutdown () {}

  preload () {
    this.stage.backgroundColor = '#456'
  }

  create () {
    this.add.tileSprite(0, 0, 1024, 768, 'background-map')
    this.add.tileSprite(0, 0, 1024, 768, 'transparent-white-home')
    this.add.sprite(14, 24, 'map_profile_question')
    this.add.sprite(934, 24, 'map_profile_question')
    this.add.sprite(12, 524, 'map_profile_question')
    this.add.sprite(938, 524, 'map_profile_question')
    this.add.sprite(938, 524, 'map_profile_question')
    this.add.sprite(14, 108, 'status01')
    this.add.sprite(938, 108, 'status02')
    this.add.sprite(14, 440, 'status03')
    this.add.sprite(938, 440, 'status04')
    this.add.sprite(96, 18, 'board_map')
    // this.block_central = this.add.sprite(371, 237, "block_central");
    this.add.sprite(162, 636, 'cardsection-map')
    this.add.sprite(106, 678, 'leftbutton-map')
    this.add.sprite(878, 678, 'rightbutton-map')
    this.homebtn = this.add.sprite(0, 628, 'homebutton-map')
    this.homebtn.inputEnabled = true
    this.homebtn.events.onInputDown.add(function () {
      this.state.start('Menu')
    }, this)

    // this.block_central.inputEnabled = true;
    // this.block_central.events.onInputDown.add(function() {
    //   console.log("click central block!")
    // }, this);

    var blockInputLocation = {
      '1': {'x': 106, 'y': 26},
      '2': {'x': 105, 'y': 73},
      '3': {'x': 105, 'y': 126},
      '4': {'x': 105, 'y': 159},
      '5': {'x': 105, 'y': 209},
      '6': {'x': 105, 'y': 240},
      '7': {'x': 105, 'y': 379},
      '8': {'x': 105, 'y': 414},
      '9': {'x': 105, 'y': 462},
      '10': {'x': 105, 'y': 493},
      '11': {'x': 105, 'y': 547},
      '12': {'x': 0, 'y': 0},
      '13': {'x': 0, 'y': 0},
      '14': {'x': 0, 'y': 0},
      '15': {'x': 0, 'y': 0},
      '16': {'x': 0, 'y': 0},
      '17': {'x': 0, 'y': 0},
      '18': {'x': 0, 'y': 0},
      '19': {'x': 0, 'y': 0},
      '20': {'x': 0, 'y': 0},
      '21': {'x': 0, 'y': 0},
      '22': {'x': 0, 'y': 0},
      '23': {'x': 0, 'y': 0},
      '24': {'x': 0, 'y': 0},
      '25': {'x': 0, 'y': 0},
      '26': {'x': 0, 'y': 0},
      '27': {'x': 0, 'y': 0},
      '28': {'x': 0, 'y': 0},
      '29': {'x': 0, 'y': 0},
      '30': {'x': 0, 'y': 0},
      '31': {'x': 0, 'y': 0},
      '32': {'x': 0, 'y': 0},
      '33': {'x': 0, 'y': 0},
      '34': {'x': 0, 'y': 0},
      '35': {'x': 0, 'y': 0},
      '36': {'x': 0, 'y': 0},
      '37': {'x': 0, 'y': 0},
      '38': {'x': 0, 'y': 0},
      '39': {'x': 0, 'y': 0},
      '40': {'x': 0, 'y': 0},
      '41': {'x': 0, 'y': 0},
      '42': {'x': 0, 'y': 0},
      '43': {'x': 0, 'y': 0},
      '44': {'x': 0, 'y': 0},
      '45': {'x': 0, 'y': 0},
      '46': {'x': 0, 'y': 0},
      '47': {'x': 0, 'y': 0},
      '48': {'x': 0, 'y': 0},
      '49': {'x': 0, 'y': 0},
      '50': {'x': 0, 'y': 0},
      '51': {'x': 0, 'y': 0},
      '52': {'x': 0, 'y': 0},
      '53': {'x': 0, 'y': 0},
      '54': {'x': 0, 'y': 0},
      '55': {'x': 0, 'y': 0},
      '56': {'x': 0, 'y': 0},
      '57': {'x': 0, 'y': 0},
      '58': {'x': 0, 'y': 0},
      '59': {'x': 0, 'y': 0},
      '60': {'x': 0, 'y': 0},
      '61': {'x': 0, 'y': 0},
      '62': {'x': 0, 'y': 0},
      '63': {'x': 0, 'y': 0},
      '64': {'x': 0, 'y': 0},
      '65': {'x': 0, 'y': 0},
      '66': {'x': 0, 'y': 0},
      '67': {'x': 0, 'y': 0},
      '68': {'x': 0, 'y': 0},
      '69': {'x': 0, 'y': 0},
      '70': {'x': 0, 'y': 0},
      '71': {'x': 0, 'y': 0},
      '72': {'x': 0, 'y': 0},
      '73': {'x': 0, 'y': 0},
      '74': {'x': 0, 'y': 0},
      '75': {'x': 0, 'y': 0},
      '76': {'x': 0, 'y': 0},
      '77': {'x': 0, 'y': 0},
      '78': {'x': 0, 'y': 0},
      '79': {'x': 0, 'y': 0},
      '80': {'x': 0, 'y': 0},
      '81': {'x': 0, 'y': 0},
      '82': {'x': 0, 'y': 0},
      '83': {'x': 0, 'y': 0},
      '84': {'x': 0, 'y': 0},
      '85': {'x': 0, 'y': 0},
      '86': {'x': 0, 'y': 0},
      '87': {'x': 0, 'y': 0},
      '88': {'x': 0, 'y': 0},
      '89': {'x': 0, 'y': 0},
      '90': {'x': 0, 'y': 0},
      '91': {'x': 0, 'y': 0},
      '92': {'x': 0, 'y': 0},
      '93': {'x': 0, 'y': 0},
      '94': {'x': 0, 'y': 0},
      '95': {'x': 0, 'y': 0},
      '96': {'x': 0, 'y': 0},
      '97': {'x': 0, 'y': 0},
      '98': {'x': 0, 'y': 0},
      '99': {'x': 0, 'y': 0},
      '100': {'x': 0, 'y': 0},
      '101': {'x': 0, 'y': 0},
      '102': {'x': 0, 'y': 0},
      '103': {'x': 0, 'y': 0},
      '104': {'x': 0, 'y': 0},
      '105': {'x': 0, 'y': 0},
      '106': {'x': 0, 'y': 0},
      '107': {'x': 0, 'y': 0},
      '108': {'x': 0, 'y': 0},
      '109': {'x': 0, 'y': 0},
      '110': {'x': 0, 'y': 0},
      '111': {'x': 0, 'y': 0},
      '112': {'x': 0, 'y': 0}
    }
    for (var i = 1; i <= 112; i++) {
      console.log('block ' + i + ' inital!')
      this['block_' + i] = this.add.sprite(blockInputLocation[i]['x'], blockInputLocation[i]['y'], 'block_' + i)
      this['block_' + i].inputEnabled = true
      this['block_' + i].events.onInputDown.add(function () {
        console.log('click block' + i + '!')
      }, this)
    }
  }

  update () {}

  render () {}
}
