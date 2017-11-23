import Phaser from 'phaser'

export default class extends Phaser.State {
  init () {

  }

  shutdown () {}

  preload () {
    this.stage.backgroundColor = '#456'
  }

  create () {
    const that = this
    this.add.tileSprite(0, 0, 1024, 768, 'background-map')
    this.add.tileSprite(0, 0, 1024, 768, 'transparent-white-home')

    var playerTurnMaskLocation = {
      '1': {'x': 4, 'y': 8},
      '2': {'x': 929, 'y': 9},
      '3': {'x': 4, 'y': 426},
      '4': {'x': 931, 'y': 425}      
    }

    for (var x = 1; x < 5; x++) {
      that['player_' + x + '_turn_mask'] = that.add.sprite(playerTurnMaskLocation[x]['x'], playerTurnMaskLocation[x]['y'], 'player_turn_mask')
      that['player_' + x + '_turn_mask'].visible = false
    }

    var currentPlayer = 1
    that['player_' + currentPlayer + '_turn_mask'].visible = true

    function changePlayer(p) {
      that['player_' + currentPlayer + '_turn_mask'].visible = false
      currentPlayer = p
      that['player_' + currentPlayer + '_turn_mask'].visible = true      
    }

    function nextPlayer() {
      if ((currentPlayer + 1) > 4) {
        changePlayer(1)
      } else {
        changePlayer(currentPlayer + 1)
      }
    }

    this.add.sprite(14, 24, 'map_profile_question')
    this.add.sprite(934, 24, 'map_profile_question')
    this.add.sprite(12, 524, 'map_profile_question')
    this.add.sprite(938, 524, 'map_profile_question')
    this.add.sprite(938, 524, 'map_profile_question')
    that.player_1_status = that.add.sprite(14, 108, 'status01')
    that.player_2_status = that.add.sprite(938, 108, 'status02')
    that.player_3_status = that.add.sprite(14, 440, 'status03')
    that.player_4_status = that.add.sprite(938, 440, 'status04')
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

    function playerChangeStatus (playerId, status) {
      that['player_' + playerId + '_status'].loadTexture('status0' + status, 0)
    }


    var blockInputLocation = {
      '1':   {'x':  3.92, 'y':  1.09},
      '2':   {'x':  3.99, 'y':  2.75},
      '3':   {'x':  3.88, 'y':  4.55},
      '4':   {'x':  4.06, 'y':  6.56},
      '5':   {'x':  4.02, 'y':  7.94},
      '6':   {'x':  3.88, 'y':  8.89},
      '7':   {'x':  4.02, 'y':  13.44},
      '8':   {'x':  4.02, 'y':  14.64},
      '9':   {'x':  3.88, 'y':  16.37},
      '10':  {'x':  3.95, 'y':  17.57},
      '11':  {'x':  3.88, 'y':  19.47},
      '12':  {'x':  7.27, 'y':  1.20},
      '13':  {'x':  6.46, 'y':  4.55},
      '14':  {'x':  7.94, 'y':  5.75},
      '15':  {'x':  7.62, 'y':  7.66},
      '16':  {'x':  6.53, 'y':  9.84},
      '17':  {'x':  7.62, 'y':  13.12},
      '18':  {'x':  7.94, 'y':  14.53},
      '19':  {'x':  6.46, 'y':  16.37},
      '20':  {'x':  7.41, 'y':  18.03},
      '21':  {'x':  8.71, 'y':  1.09},
      '22':  {'x':  9.00, 'y':  2.75},
      '23':  {'x':  10.48,  'y':  1.06},      
      '24':  {'x':  10.51,  'y':  2.26},
      '25':  {'x':  10.44, 'y': 3.60},
      '26':  {'x':  10.62, 'y': 5.08},
      '27':  {'x':  9.63, 'y':  6.70},
      '28':  {'x':  8.57, 'y':  9.31},
      '29':  {'x':  9.98, 'y':  9.35},
      '30':  {'x':  11.47, 'y': 9.88},
      '31':  {'x':  9.70, 'y':  13.05},
      '32':  {'x':  10.55, 'y': 15.52},
      '33':  {'x':  10.44, 'y': 17.04},
      '34':  {'x':  10.55, 'y': 18.52},
      '35':  {'x':  8.68, 'y':  19.44},
      '36':  {'x':  10.51, 'y': 19.86},
      '37':  {'x':  12.49, 'y': 1.16},
      '38':  {'x':  12.07, 'y': 3.60},
      '39':  {'x':  13.19, 'y': 5.79},
      '40':  {'x':  12.45, 'y': 7.97},
      '41':  {'x':  12.52, 'y': 12.74},
      '42':  {'x':  13.19, 'y': 14.32},
      '43':  {'x':  12.03, 'y': 17.04},
      '44':  {'x':  12.49, 'y': 18.94},
      '45':  {'x':  16.33, 'y': 1.16},
      '46':  {'x':  14.01, 'y': 2.12},
      '47':  {'x':  14.22, 'y': 3.60},
      '48':  {'x':  14.96, 'y': 5.68},
      '49':  {'x':  14.53, 'y': 9.38},
      '50':  {'x':  15.66, 'y': 3.53},
      '51':  {'x':  16.40, 'y': 5.04},
      '52':  {'x':  16.05, 'y': 7.06},
      '53':  {'x':  17.00, 'y': 8.04},
      '54':  {'x':  16.97, 'y': 12.91},
      '55':  {'x':  16.05, 'y': 14.22},
      '56':  {'x':  14.96, 'y': 15.38},
      '57':  {'x':  16.40, 'y': 15.20},
      '58':  {'x':  14.15, 'y': 16.51},
      '59':  {'x':  14.01, 'y': 18.56},
      '60':  {'x':  15.70, 'y': 17.18},
      '61':  {'x':  16.37, 'y': 18.94},
      '62':  {'x':  20.53, 'y': 2.12},
      '63':  {'x':  21.24, 'y': 3.67},
      '64':  {'x':  20.39, 'y': 5.68},
      '65':  {'x':  21.73, 'y': 5.79},
      '66':  {'x':  22.65, 'y': 7.94},
      '67':  {'x':  22.68, 'y': 12.70},
      '68':  {'x':  21.73, 'y': 14.32},
      '69':  {'x':  20.39, 'y': 15.35},
      '70':  {'x':  21.20, 'y': 16.51},
      '71':  {'x':  20.53, 'y': 18.59},
      '72':  {'x':  22.65, 'y': 1.16},
      '73':  {'x':  22.51, 'y': 3.60},
      '74':  {'x':  23.88, 'y': 5.12},
      '75':  {'x':  24.24, 'y': 6.70},
      '76':  {'x':  23.46, 'y': 9.91},
      '77':  {'x':  25.19, 'y': 9.28},
      '78':  {'x':  24.24, 'y': 13.23},
      '79':  {'x':  23.92, 'y': 15.52},
      '80':  {'x':  22.54, 'y': 17.11},
      '81':  {'x':  22.68, 'y': 18.94},
      '82':  {'x':  24.66, 'y': 17.11},
      '83':  {'x':  24.17, 'y': 18.56},
      '84':  {'x':  26.28, 'y': 18.03},
      '85':  {'x':  24.55, 'y': 19.76},
      '86':  {'x':  26.14, 'y': 19.37},
      '87':  {'x':  24.55, 'y': 1.06},
      '88':  {'x':  24.24, 'y': 2.33},
      '89':  {'x':  24.73, 'y': 3.60},
      '90':  {'x':  26.14, 'y': 1.09},
      '91':  {'x':  26.28, 'y': 2.79},
      '92':  {'x':  27.90, 'y': 1.20},
      '93':  {'x':  27.31, 'y': 4.23},
      '94':  {'x':  27.38, 'y': 5.79},
      '95':  {'x':  27.02, 'y': 7.66},
      '96':  {'x':  26.71, 'y': 9.35},
      '97':  {'x':  27.06, 'y': 13.34},
      '98':  {'x':  27.41, 'y': 14.57},
      '99':  {'x':  27.38, 'y': 16.47},
      '100': {'x':  27.90, 'y': 18.13},
      '101': {'x':  30.13, 'y': 1.09},
      '102': {'x':  29.49, 'y': 2.75},
      '103': {'x':  30.30, 'y': 4.55},
      '104': {'x':  28.89, 'y': 6.63},
      '105': {'x':  28.93, 'y': 8.11},
      '106': {'x':  28.01, 'y': 9.95},
      '107': {'x':  30.30, 'y': 8.82},
      '108': {'x':  28.93, 'y': 12.38},
      '109': {'x':  30.37, 'y': 14.71},
      '110': {'x':  30.37, 'y': 16.40},
      '111': {'x':  29.49, 'y': 17.64},
      '112': {'x':  30.09, 'y': 19.47}
    }

    const scale = 28.5
    for (var i = 1; i <= 112; i++) {
      console.log('block ' + i + ' inital!')
      that['block_' + i] = that.add.sprite(blockInputLocation[i]['x'] * scale, blockInputLocation[i]['y'] * scale, 'circle')
      that['block_' + i].inputEnabled = true
      const no = parseInt(i)      
      that['block_' + i].events.onInputDown.add(function () {
        blockClickEvent(no)
      }, that)
      that['block_' + i].visible = false
    }

    function blockClickEvent (i) {
      console.log('click block' + i + '!') 
      moveChessToBlock(currentPlayer, i)   
      nextPlayer()   
    }

    function enableBlock (i, boolean) {
      that['block_' + i].visible = boolean      
    }
    
    function blockConvert (i, data) {
      return blockInputLocation[i][data] * scale
    }

    that.player_1_chess = that.add.sprite(blockConvert(1, 'x'), blockConvert(1, 'y'), 'I')
    that.player_2_chess = that.add.sprite(blockConvert(101, 'x'), blockConvert(101, 'y'), 'P')
    that.player_3_chess = that.add.sprite(blockConvert(11, 'x'), blockConvert(11, 'y'), 'C')
    that.player_4_chess = that.add.sprite(blockConvert(112, 'x'), blockConvert(112, 'y'), 'M')

    for (var x = 1; x < 113; x++) {
      if (x !== 1 && x !== 11 && x !== 101 && x !== 112) {
        enableBlock(x, true)        
      }
    }

    function chessMove (playerNo, toBlock) {
      that.game.add.tween(that['player_' + playerNo + '_chess']).to( { x:  blockConvert(toBlock, 'x'), y:  blockConvert(toBlock, 'y') }, 1000, Phaser.Easing.Linear.Out, true)
    }

    function moveChessToBlock (playerNo, toBlock) {
      chessMove(playerNo, toBlock)
      enableBlock(toBlock, false)
    }

    const fgridValueStyle = { font: "12px Arial", fill: "#000", wordWrap: true, align: "right" }
    that.player_4_p_stateValue = that.game.add.text(952, 462, "0", fgridValueStyle)
    that.player_4_y_stateValue = that.game.add.text(979, 462, "0", fgridValueStyle)
    that.player_4_p_stateValue = that.game.add.text(952, 489, "0", fgridValueStyle)
    that.player_4_b_stateValue = that.game.add.text(979, 489, "0", fgridValueStyle)

    that.player_3_p_stateValue = that.game.add.text(33, 462, "0", fgridValueStyle)
    that.player_3_y_stateValue = that.game.add.text(60, 462, "0", fgridValueStyle)
    that.player_3_p_stateValue = that.game.add.text(33, 489, "0", fgridValueStyle)
    that.player_3_b_stateValue = that.game.add.text(60, 489, "0", fgridValueStyle)

    that.player_1_p_stateValue = that.game.add.text(33, 132, "0", fgridValueStyle)
    that.player_1_y_stateValue = that.game.add.text(60, 132, "0", fgridValueStyle)
    that.player_1_p_stateValue = that.game.add.text(33, 163, "0", fgridValueStyle)
    that.player_1_b_stateValue = that.game.add.text(60, 163, "0", fgridValueStyle)

    that.player_2_p_stateValue = that.game.add.text(950, 132, "0", fgridValueStyle)
    that.player_2_y_stateValue = that.game.add.text(980, 132, "0", fgridValueStyle)
    that.player_2_p_stateValue = that.game.add.text(950, 163, "0", fgridValueStyle)
    that.player_2_b_stateValue = that.game.add.text(980, 163, "0", fgridValueStyle)
    
    function updateStateValue(p, c, value) {
      that['player_' + p + '_' + c + '_stateValue'].setText(value.toString())
    }

    updateStateValue(1, 'p', 12)
  }

  update () {}

  render () {}
}
