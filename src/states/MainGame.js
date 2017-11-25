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

    this.game.global.bgm = this.add.audio('Closer - Alex Arcoleo Martin Felix Kaczmarski')
    this.game.global.bgm.loopFull()

    let playerTurnMaskLocation = {
      '1': {'x': 4, 'y': 8},
      '2': {'x': 929, 'y': 9},
      '3': {'x': 4, 'y': 426},
      '4': {'x': 931, 'y': 425}
    }

    for (let x = 1; x < 5; x++) {
      that['player_' + x + '_turn_mask'] = that.add.sprite(playerTurnMaskLocation[x]['x'], playerTurnMaskLocation[x]['y'], 'player_turn_mask')
      that['player_' + x + '_turn_mask'].visible = false
    }

    let currentPlayer = 1
    that['player_' + currentPlayer + '_turn_mask'].visible = true

    function changePlayer (p) {
      that['player_' + currentPlayer + '_turn_mask'].visible = false
      currentPlayer = p
      that['player_' + currentPlayer + '_turn_mask'].visible = true
    }

    function nextPlayer () {
      if ((currentPlayer + 1) > 4) {
        changePlayer(1)
      } else {
        changePlayer(currentPlayer + 1)
      }
    }

    that.player_1_profile = this.add.sprite(14, 24, 'map_profile_question')
    that.player_2_profile = this.add.sprite(934, 24, 'map_profile_question')
    that.player_3_profile = this.add.sprite(12, 524, 'map_profile_question')
    that.player_4_profile = this.add.sprite(938, 524, 'map_profile_question')
    that.endTurnBtn = that.add.sprite(890, 620, 'end_turn_button')
    that.player_1_status = that.add.sprite(14, 108, 'status01')
    that.player_2_status = that.add.sprite(938, 108, 'status02')
    that.player_3_status = that.add.sprite(14, 440, 'status03')
    that.player_4_status = that.add.sprite(938, 440, 'status04')
    this.add.sprite(96, 18, 'board_map')
    // this.block_central = this.add.sprite(371, 237, "block_central");
    this.add.sprite(162, 636, 'cardsection-map')
    that.bag_left = that.add.sprite(106, 678, 'leftbutton-map')
    that.bag_right = that.add.sprite(878, 678, 'rightbutton-map')
    this.homebtn = this.add.sprite(0, 628, 'homebutton-map')
    this.homebtn.inputEnabled = true
    that.bag_left.inputEnabled = true
    that.bag_right.inputEnabled = true
    this.homebtn.events.onInputDown.add(function () {
      this.state.start('Menu')
    }, this)

    that.bag_left.events.onInputDown.add(function () {
      this.state.start('Left')
      redrawCardListPreviousPage()
    }, this)

    that.bag_right.events.onInputDown.add(function () {
      this.state.start('Right')
      redrawCardListNextPage()
    }, this)

    that.endTurnBtn.inputEnabled = true
    that.endTurnBtn.events.onInputDown.add(function () {
      endTurnEvent()
    }, this)

    function endTurnEvent () {
      console.log('end turn!')
      disableAllBlock()
      openCardCloseEvent()
      that.game.global.game.endTurn()
      setCurrentRound()
    }

    // this.block_central.inputEnabled = true;
    // this.block_central.events.onInputDown.add(function() {
    //   console.log("click central block!")
    // }, this);

    function playerChangeStatus (playerId, status) {
      that['player_' + playerId + '_status'].loadTexture('status0' + status, 0)
    }

    let blockInputLocation = {
      '1': {'x': 3.92, 'y': 1.09},
      '2': {'x': 3.99, 'y': 2.75},
      '3': {'x': 3.88, 'y': 4.55},
      '4': {'x': 4.06, 'y': 6.56},
      '5': {'x': 4.02, 'y': 7.94},
      '6': {'x': 3.88, 'y': 8.89},
      '7': {'x': 4.02, 'y': 13.44},
      '8': {'x': 4.02, 'y': 14.64},
      '9': {'x': 3.88, 'y': 16.37},
      '10': {'x': 3.95, 'y': 17.57},
      '11': {'x': 3.88, 'y': 19.47},
      '12': {'x': 7.27, 'y': 1.20},
      '13': {'x': 6.46, 'y': 4.55},
      '14': {'x': 7.94, 'y': 5.75},
      '15': {'x': 7.62, 'y': 7.66},
      '16': {'x': 6.53, 'y': 9.84},
      '17': {'x': 7.62, 'y': 13.12},
      '18': {'x': 7.94, 'y': 14.53},
      '19': {'x': 6.46, 'y': 16.37},
      '20': {'x': 7.41, 'y': 18.03},
      '21': {'x': 8.71, 'y': 1.09},
      '22': {'x': 9.00, 'y': 2.75},
      '23': {'x': 10.48, 'y': 1.06},
      '24': {'x': 10.51, 'y': 2.26},
      '25': {'x': 10.44, 'y': 3.60},
      '26': {'x': 10.62, 'y': 5.08},
      '27': {'x': 9.63, 'y': 6.70},
      '28': {'x': 8.57, 'y': 9.31},
      '29': {'x': 9.98, 'y': 9.35},
      '30': {'x': 11.47, 'y': 9.88},
      '31': {'x': 9.70, 'y': 13.05},
      '32': {'x': 10.55, 'y': 15.52},
      '33': {'x': 10.44, 'y': 17.04},
      '34': {'x': 10.55, 'y': 18.52},
      '35': {'x': 8.68, 'y': 19.44},
      '36': {'x': 10.51, 'y': 19.86},
      '37': {'x': 12.49, 'y': 1.16},
      '38': {'x': 12.07, 'y': 3.60},
      '39': {'x': 13.19, 'y': 5.79},
      '40': {'x': 12.45, 'y': 7.97},
      '41': {'x': 12.52, 'y': 12.74},
      '42': {'x': 13.19, 'y': 14.32},
      '43': {'x': 12.03, 'y': 17.04},
      '44': {'x': 12.49, 'y': 18.94},
      '45': {'x': 16.33, 'y': 1.16},
      '46': {'x': 14.01, 'y': 2.12},
      '47': {'x': 14.22, 'y': 3.60},
      '48': {'x': 14.96, 'y': 5.68},
      '49': {'x': 14.53, 'y': 9.38},
      '50': {'x': 15.66, 'y': 3.53},
      '51': {'x': 16.40, 'y': 5.04},
      '52': {'x': 16.05, 'y': 7.06},
      '53': {'x': 17.00, 'y': 8.04},
      '54': {'x': 16.97, 'y': 12.91},
      '55': {'x': 16.05, 'y': 14.22},
      '56': {'x': 14.96, 'y': 15.38},
      '57': {'x': 16.40, 'y': 15.20},
      '58': {'x': 14.15, 'y': 16.51},
      '59': {'x': 14.01, 'y': 18.56},
      '60': {'x': 15.70, 'y': 17.18},
      '61': {'x': 16.37, 'y': 18.94},
      '62': {'x': 20.53, 'y': 2.12},
      '63': {'x': 21.24, 'y': 3.67},
      '64': {'x': 20.39, 'y': 5.68},
      '65': {'x': 21.73, 'y': 5.79},
      '66': {'x': 22.65, 'y': 7.94},
      '67': {'x': 22.68, 'y': 12.70},
      '68': {'x': 21.73, 'y': 14.32},
      '69': {'x': 20.39, 'y': 15.35},
      '70': {'x': 21.20, 'y': 16.51},
      '71': {'x': 20.53, 'y': 18.59},
      '72': {'x': 22.65, 'y': 1.16},
      '73': {'x': 22.51, 'y': 3.60},
      '74': {'x': 23.88, 'y': 5.12},
      '75': {'x': 24.24, 'y': 6.70},
      '76': {'x': 23.46, 'y': 9.91},
      '77': {'x': 25.19, 'y': 9.28},
      '78': {'x': 24.24, 'y': 13.23},
      '79': {'x': 23.92, 'y': 15.52},
      '80': {'x': 22.54, 'y': 17.11},
      '81': {'x': 22.68, 'y': 18.94},
      '82': {'x': 24.66, 'y': 17.11},
      '83': {'x': 24.17, 'y': 18.56},
      '84': {'x': 26.28, 'y': 18.03},
      '85': {'x': 24.55, 'y': 19.76},
      '86': {'x': 26.14, 'y': 19.37},
      '87': {'x': 24.55, 'y': 1.06},
      '88': {'x': 24.24, 'y': 2.33},
      '89': {'x': 24.73, 'y': 3.60},
      '90': {'x': 26.14, 'y': 1.09},
      '91': {'x': 26.28, 'y': 2.79},
      '92': {'x': 27.90, 'y': 1.20},
      '93': {'x': 27.31, 'y': 4.23},
      '94': {'x': 27.38, 'y': 5.79},
      '95': {'x': 27.02, 'y': 7.66},
      '96': {'x': 26.71, 'y': 9.35},
      '97': {'x': 27.06, 'y': 13.34},
      '98': {'x': 27.41, 'y': 14.57},
      '99': {'x': 27.38, 'y': 16.47},
      '100': {'x': 27.90, 'y': 18.13},
      '101': {'x': 30.13, 'y': 1.09},
      '102': {'x': 29.49, 'y': 2.75},
      '103': {'x': 30.30, 'y': 4.55},
      '104': {'x': 28.89, 'y': 6.63},
      '105': {'x': 28.93, 'y': 8.11},
      '106': {'x': 28.01, 'y': 9.95},
      '107': {'x': 30.30, 'y': 8.82},
      '108': {'x': 28.93, 'y': 12.38},
      '109': {'x': 30.37, 'y': 14.71},
      '110': {'x': 30.37, 'y': 16.40},
      '111': {'x': 29.49, 'y': 17.64},
      '112': {'x': 30.09, 'y': 19.47}
    }

    const scale = 28.5
    for (let i = 1; i <= 112; i++) {
      that['block_' + i + '_card'] = that.add.sprite(blockInputLocation[i]['x'] * scale, blockInputLocation[i]['y'] * scale, 'blackpattern')
      that['block_' + i + '_card'].visible = false
    }

    for (let i = 1; i <= 112; i++) {
      // console.log('block ' + i + ' inital!')
      that['block_' + i] = that.add.sprite(blockInputLocation[i]['x'] * scale, blockInputLocation[i]['y'] * scale, 'circle')
      that['block_' + i].inputEnabled = true
      const no = parseInt(i)
      that['block_' + i].events.onInputDown.add(function () {
        blockClickEvent(no)
      }, that)
      that['block_' + i].visible = false
    }

    that.add.sprite(464, 268, 'investment center')    

    function blockClickEvent (i) {
      console.log('click block' + i + '!')
      moveChessToBlock(currentPlayer, i)
    }

    function enableBlock (i, boolean) {
      that['block_' + i].visible = boolean
    }

    function enableBlockCard (i, type, boolean) {
      switch (type) {
        case 'random':
          that['block_' + i + '_card'].loadTexture('blackpattern', 0)
          break

        case 'socialization':
          that['block_' + i + '_card'].loadTexture('redpattern', 0)
          break

        case 'externalization':
          that['block_' + i + '_card'].loadTexture('yellowpattern', 0)
          break

        case 'combination':
          that['block_' + i + '_card'].loadTexture('bluepattern', 0)
          break

        case 'internalization':
          that['block_' + i + '_card'].loadTexture('purplepattern', 0)
          break
      }
      that['block_' + i + '_card'].visible = boolean
    }

    function blockConvert (i, data) {
      return blockInputLocation[i][data] * scale
    }

    that.player_1_chess = that.add.sprite(blockConvert(1, 'x'), blockConvert(1, 'y'), 'I')
    that.player_2_chess = that.add.sprite(blockConvert(101, 'x'), blockConvert(101, 'y'), 'P')
    that.player_3_chess = that.add.sprite(blockConvert(11, 'x'), blockConvert(11, 'y'), 'C')
    that.player_4_chess = that.add.sprite(blockConvert(112, 'x'), blockConvert(112, 'y'), 'M')

    function chessMove (playerNo, toBlock) {
      that.game.add.tween(that['player_' + playerNo + '_chess']).to({ x: blockConvert(toBlock, 'x'), y: blockConvert(toBlock, 'y') }, 1000, Phaser.Easing.Linear.Out, true)
    }

    function moveChessToBlock (playerNo, toBlock) {
      that.block_click_sound = that.add.audio('220212_4100837-lq')    
      that.block_click_sound.play()  
      chessMove(playerNo, toBlock)
      console.log(getPlayerById(that.game.global.players[playerNo - 1].id))
      console.log(window.game.global.game.gameMap.grids.get(toBlock))
      that.game.global.game.gameMap.move(getPlayerById(that.game.global.players[playerNo - 1].id), window.game.global.game.gameMap.grids.get(toBlock))
      disableAllBlock()
      redrawCardList()
    }

    function disableAllBlock () {
      for (let i = 1; i <= 112; i++) {
        enableBlock(i, false)
      }
    }

    function getPlayerById (id) {
      return that.game.global.game.players.filter(x => x.id === id)[0]
    }

    const fgridValueStyle = { font: '12px Arial', fill: '#000', wordWrap: true, align: 'right' }
    that.player_4_p_stateValue = that.game.add.text(952, 462, '0', fgridValueStyle)
    that.player_4_y_stateValue = that.game.add.text(979, 462, '0', fgridValueStyle)
    that.player_4_p_stateValue = that.game.add.text(952, 489, '0', fgridValueStyle)
    that.player_4_b_stateValue = that.game.add.text(979, 489, '0', fgridValueStyle)

    that.player_3_p_stateValue = that.game.add.text(33, 462, '0', fgridValueStyle)
    that.player_3_y_stateValue = that.game.add.text(60, 462, '0', fgridValueStyle)
    that.player_3_p_stateValue = that.game.add.text(33, 489, '0', fgridValueStyle)
    that.player_3_b_stateValue = that.game.add.text(60, 489, '0', fgridValueStyle)

    that.player_1_p_stateValue = that.game.add.text(33, 132, '0', fgridValueStyle)
    that.player_1_y_stateValue = that.game.add.text(60, 132, '0', fgridValueStyle)
    that.player_1_p_stateValue = that.game.add.text(33, 163, '0', fgridValueStyle)
    that.player_1_b_stateValue = that.game.add.text(60, 163, '0', fgridValueStyle)

    that.player_2_p_stateValue = that.game.add.text(950, 132, '0', fgridValueStyle)
    that.player_2_y_stateValue = that.game.add.text(980, 132, '0', fgridValueStyle)
    that.player_2_p_stateValue = that.game.add.text(950, 163, '0', fgridValueStyle)
    that.player_2_b_stateValue = that.game.add.text(980, 163, '0', fgridValueStyle)

    function updateStateValue (p, c, value) {
      that['player_' + p + '_' + c + '_stateValue'].setText(value.toString())
    }

    let bagPosition = {
      '1': {'x': 176, 'y': 655},
      '2': {'x': 292, 'y': 655},
      '3': {'x': 411, 'y': 655},
      '4': {'x': 525, 'y': 655},
      '5': {'x': 643, 'y': 655},
      '6': {'x': 760, 'y': 655}
    }

    for (let x = 1; x < 7; x++) {
      that['bag_card_' + x] = that.game.add.sprite(bagPosition[x]['x'], bagPosition[x]['y'], 'black3')
      that['bag_card_' + x].scale.setTo(0.09, 0.09)
      that['bag_card_' + x].inputEnabled = true
      const no = parseInt(x)
      that['bag_card_' + x].events.onInputDown.add(function () {
        cardClickEvent(no)
      }, that)
    }

    function cardClickEvent (i) {
      console.log('click card index ', i)
      console.log('click card ', currentCardIndex[i - 1])
      openCardOpenEvent(currentCardIndex[i - 1])
    }

    function clearAllCardView () {
      for (let x = 1; x < 7; x++) {
        that['bag_card_' + x].loadTexture('empty_card', 0)
        that['bag_card_' + x].visible = false
        that.bag_left.visible = false
        that.bag_right.visible = false
      }
    }

    let currentCardIndex = null

    function setCardView (hasLeft, hasRight, ShowList) {
      currentCardIndex = ShowList

      that.bag_left.visible = !!hasLeft

      that.bag_right.visible = !!hasRight

      for (let x = 0; x < ShowList.length; x++) {
        console.log(ShowList[x])
        that['bag_card_' + (x + 1)].loadTexture(convertCardNameToCardImageId(ShowList[x].name), 0)
        that['bag_card_' + (x + 1)].visible = true
      }

      if (ShowList.length < 6) {
        for (let x = ShowList.length; x < 6; x++) {
          that['bag_card_' + (x + 1)].loadTexture('empty_card', 0)
          that['bag_card_' + (x + 1)].visible = false
        }
      }
    }

    function convertCardNameToCardImageId (name) {
      switch (name) {
        case 'Brain-storming':
          return 'red3'
        case 'Communities of practice':
          return 'red1'
        case 'Apprenticeship':
          return 'red2'
        case 'Seminars':
          return 'red5'
        case 'Interview':
          return 'red6'
        case 'Storytelling':
          return 'red4'
        case 'Observing':
          return 'red7'
        case 'Imitating':
          return 'red8'
        case 'Documentation':
          return 'yellow1'
        case 'Archive':
          return 'yellow2'
        case 'Library':
          return 'yellow3'
        case 'Video Record':
          return 'yellow4'
        case 'Hackathon':
          return 'yellow5'
        case 'Modeling':
          return 'yellow6'
        case 'Creating metaphors':
          return 'yellow7'
        case 'Analogic':
          return 'yellow8'
        case 'Text mining':
          return 'blue1'
        case 'Intranet':
          return 'blue2'
        case 'Database':
          return 'blue3'
        case 'Cluster Data':
          return 'blue4'
        case 'Sorting':
          return 'blue5'
        case 'Adding':
          return 'blue6'
        case 'Categorizing':
          return 'blue7'
        case 'Methodology':
          return 'blue8'
        case 'Best practices':
          return 'blue9'
        case 'Lesson Learned':
          return 'purple2'
        case 'E-Learning':
          return 'purple1'
        case 'Article, Paper':
          return 'purple3'
        case 'Data Visualization':
          return 'purple4'
        case 'Access to codified knowledge':
          return 'purple5'
        case 'Goal based training':
          return 'purple6'
        case 'Knowledge Retention':
          return 'darkgreen1'
        case 'Low employee turnover':
          return 'darkgreen2'
        case 'Research & Development':
          return 'darkgreen3'
        case 'Good learning culture':
          return 'darkgreen4'
        case 'Confidentiality agreement':
          return 'darkgreen5'
        case 'High external collaboration':
          return 'darkgreen6'
        case 'Proper IP handling':
          return 'darkgreen7'
        case 'Good talent management':
          return 'darkgreen8'
        case 'Adequate training':
          return 'darkgreen9'
        case 'Revenue Increase':
          return 'lightgreen1'
        case 'Innovation & Creative':
          return 'lightgreen2'
        case 'Increase Efficiency':
          return 'lightgreen3'
        case 'Better problem-solving skills':
          return 'lightgreen4'
        case 'Increase Market Share':
          return 'lightgreen5'
        case 'Better & faster decision making':
          return 'lightgreen6'
        case 'Quality Improved':
          return 'lightgreen7'
        case 'Avoid making the same mistakes':
          return 'lightgreen8'
        case 'Knowledge Deficiency':
          return 'black2'
        case 'Knowledge Loss':
          return 'black1'
        case 'Knowledge Leakage':
          return 'black4'
        case 'Knowledge Obsolescence':
          return 'black3'
      }
    }

    let currentCardsListFirstIndex = 0

    function redrawCardList () {
      clearAllCardView()
      showCardsPage(0)
      // openRiskCardOpenEvent
      if (getRiskCard().length > 0) {
        openRiskCardOpenEvent(getRiskCard()[0])
        that.game.global.game.currentPlayer.useCard(getRiskCard()[0])
      }
    }

    function getRiskCard () {
      return that.game.global.game.currentBackpackCardList.filter(x => (x.type === 'risk' || x.type === 'transient_profit'))
    }

    function redrawCardListNextPage () {
      clearAllCardView()
      showCardsPage(currentCardsListFirstIndex + 1)
    }

    function redrawCardListPreviousPage () {
      clearAllCardView()
      showCardsPage(currentCardsListFirstIndex - 1)
    }

    function showCardsPage (page) {
      currentCardsListFirstIndex = page
      let select = that.game.global.game.currentBackpackCardList.slice(currentCardsListFirstIndex, that.game.global.game.currentBackpackCardList.length)
      let hasLeft = false
      let hasRight = false
      if (select.length > 7) {
        select = select.slice(0, 7)
        hasRight = true
      }
      setCardView(hasLeft, hasRight, select)
    }

    clearAllCardView()
    setCardView(true, true, ['red2', 'red3', 'red4'])

    that.open_card_mask = that.add.sprite(139, 58, 'open_card_mask')
    that.open_card_close = that.add.sprite(774, 83, 'open_card_close')
    that.open_card = that.add.sprite(205, 88, 'red2')
    that.open_card.scale.setTo(0.4, 0.4)
    that.open_card_use_btn = that.add.sprite(666, 356, 'use_button')
    that.open_card_use_btn.inputEnabled = true
    that.open_card_use_btn.events.onInputDown.add(function () {
      useEvent()
    }, that)
    that.open_card_close.inputEnabled = true
    that.open_card_close.events.onInputDown.add(function () {
      openCardCloseEvent()
    }, that)

    function useEvent () {
      console.log('Use this card')
      that.game.global.game.currentPlayer.useCard(openCard)
      openCardCloseEvent()
      redrawCardList()
    }

    function openCardCloseEvent () {
      that.open_card.loadTexture('empty_card', 0)
      that.open_card_mask.visible = false
      that.open_card_close.visible = false
      that.open_card.visible = false
      that.open_card_use_btn.visible = false
      openCard = null
      enableMainControl()
      redrawCardList()
    }
    let openCard = null
    function openCardOpenEvent (card) {
      disableMainControl()
      that.open_card.loadTexture(convertCardNameToCardImageId(card.name), 0)
      openCard = card
      that.open_card_mask.visible = true
      that.open_card_close.visible = true
      that.open_card.visible = true
      if (openCard.type === that.game.global.game.currentPlayer.current.stage || openCard.type === 'portable_profit') {
        that.open_card_use_btn.visible = true
      }
    }

    function openRiskCardOpenEvent (card) {
      disableMainControl()
      that.open_card.loadTexture(convertCardNameToCardImageId(card.name), 0)
      openCard = card
      that.open_card_mask.visible = true
      that.open_card_close.visible = true
      that.open_card.visible = true
    }

    function disableMainControl () {
      for (let x = 1; x < 7; x++) {
        // that['bag_card_' + (x)].inputEnabled = false
      }

      for (let x = 1; x <= 112; x++) {
        // that['block_' + i].inputEnabled = false
      }

      that.endTurnBtn.inputEnabled = false
    }

    function enableMainControl () {
      for (let x = 1; x < 7; x++) {
        // that['bag_card_' + (x)].inputEnabled = true
      }

      for (let x = 1; x <= 112; x++) {
        // console.log('try ' + x)
        // that['block_' + i].inputEnabled = true
      }

      that.endTurnBtn.inputEnabled = true
    }

    that.game.global.event = []

    function playerChangeSubjectEvent (x, id) {
      console.log('playerChangeSubjectEvent')
      console.log(x)
      console.log(id)
      that['player_' + (id+1) + '_status'].loadTexture(that.getStatusImgId(x.stage), 0)
    }

    for (let i = 0; i < 4; i++) {
      that.game.global.event.push(window.game.global.game.players[i].current.changeSubject.subscribe(x => {
        const id = i
        playerChangeSubjectEvent(x, id)
      }, e => {}, f => {}))
    }

    function cardEventSubjectEvent (x) {
      // console.log(x)
      if (x.type === 'appear') {
        if (x.grid.type === 'random') {
          enableBlockCard(x.grid.id, 'random', true)
        } else if (x.grid.type === 'action') {
          enableBlockCard(x.grid.id, x.card.type, true)
        }
      } else if (x.type === 'disappear') {
        enableBlockCard(x.grid.id, 'random', false)
      }
    }
    that.game.global.event.push(that.game.global.game.gameMap.cardEventSubject.subscribe(x => {
      cardEventSubjectEvent(x)
    }, e => {}, o => {}))
    that.next_turn_mask = that.add.sprite(154, 199, 'NextTurn')
    that.next_turn_mask.alpha = 0          
    that.next_turn_mask_icon = that.add.sprite(625, 265, 'media')   
    that.next_turn_mask_icon.scale.setTo(0.6, 0.6)
    that.next_turn_mask_icon.alpha = 0          
    
    function showNextTurnAnimate () {
      that.next_turn_mask.alpha = 0      
      that.next_turn_mask_icon.alpha = 0    
      that.next_turn_mask_icon.loadTexture(that.convertCompanyTypeToPicImage(that.game.global.game.currentPlayer.companyType))        
      that.game.add.tween(that.next_turn_mask).to( { alpha: 1 }, 500, Phaser.Easing.Linear.None, true, 0, 0, false).onComplete.add(function () {
        that.game.time.events.add(Phaser.Timer.SECOND * 1, function () {
          that.game.add.tween(that.next_turn_mask).to( { alpha: 0 }, 500, Phaser.Easing.Linear.None, true, 0, 0, false)          
        }, that)
      })

      that.game.add.tween(that.next_turn_mask_icon).to( { alpha: 1 }, 500, Phaser.Easing.Linear.None, true, 0, 0, false).onComplete.add(function () {
        that.game.time.events.add(Phaser.Timer.SECOND * 1, function () {
          that.game.add.tween(that.next_turn_mask_icon).to( { alpha: 0 }, 500, Phaser.Easing.Linear.None, true, 0, 0, false)          
        }, that)
      })
    }

    const TimeValue = { font: '50px Arial', fill: '#000', wordWrap: true, align: 'right' }
    that.time_valueText = that.game.add.text(32, 686, '0', TimeValue)
    that.timer = that.game.time.create(false)
    that.time_value = 60
    that.timer.loop(1000, function () {
      that.time_value = that.time_value - 1
      if (that.time_value < 0) {
        endTurnEvent()
      } else {
        that.time_valueText.setText(that.time_value)
      }
    }, this)
    that.game.global.game.start()
    that.timer.start()
    showNextTurnAnimate()
    openCardCloseEvent()
    
    that.game.global.players = {
      0: {'companyType': null, 'id': null},
      1: {'companyType': null, 'id': null},
      2: {'companyType': null, 'id': null},
      3: {'companyType': null, 'id': null}
    }
    for (let index = 0; index < that.game.global.game.players.length; index++) {
      if (that.game.global.game.players[index].grid.id === 1) {
        that.game.global.players[0]['companyType'] = that.game.global.game.players[index].companyType
        that.game.global.players[0]['id'] = that.game.global.game.players[index].id
        that.player_1_status.loadTexture(that.getStatusImgId(that.game.global.game.players[index].current.stage), 0)
        that.player_1_chess.loadTexture(that.convertCompanyTypeToChessImage(that.game.global.game.players[index].companyType))
        chessMove(1, 1)
      } else if (that.game.global.game.players[index].grid.id === 101) {
        that.game.global.players[1]['companyType'] = that.game.global.game.players[index].companyType
        that.game.global.players[1]['id'] = that.game.global.game.players[index].id
        that.player_2_status.loadTexture(that.getStatusImgId(that.game.global.game.players[index].current.stage), 0)
        that.player_2_chess.loadTexture(that.convertCompanyTypeToChessImage(that.game.global.game.players[index].companyType))
        chessMove(2, 101)
      } else if (that.game.global.game.players[index].grid.id === 11) {
        that.game.global.players[2]['companyType'] = that.game.global.game.players[index].companyType
        that.game.global.players[2]['id'] = that.game.global.game.players[index].id
        that.player_3_status.loadTexture(that.getStatusImgId(that.game.global.game.players[index].current.stage), 0)
        that.player_3_chess.loadTexture(that.convertCompanyTypeToChessImage(that.game.global.game.players[index].companyType))
        chessMove(3, 11)
      } else if (that.game.global.game.players[index].grid.id === 112) {
        that.game.global.players[3]['companyType'] = that.game.global.game.players[index].companyType
        that.game.global.players[3]['id'] = that.game.global.game.players[index].id
        that.player_4_status.loadTexture(that.getStatusImgId(that.game.global.game.players[index].current.stage), 0)
        that.player_4_chess.loadTexture(that.convertCompanyTypeToChessImage(that.game.global.game.players[index].companyType))
        chessMove(4, 112)
      }
    }
    that.player_1_profile.loadTexture(that.convertCompanyTypeToPicImage(that.game.global.players[0]['companyType']), 0)
    that.player_1_profile.scale.setTo(0.5, 0.5)
    that.player_2_profile.loadTexture(that.convertCompanyTypeToPicImage(that.game.global.players[1]['companyType']), 0)
    that.player_2_profile.scale.setTo(0.5, 0.5)
    that.player_3_profile.loadTexture(that.convertCompanyTypeToPicImage(that.game.global.players[2]['companyType']), 0)
    that.player_3_profile.scale.setTo(0.5, 0.5)
    that.player_4_profile.loadTexture(that.convertCompanyTypeToPicImage(that.game.global.players[3]['companyType']), 0)
    that.player_4_profile.scale.setTo(0.5, 0.5)

    function playerIdtoThisId (id) {
      for (let x = 0; x < 4; x++) {
        if (that.game.global.players[x].id === id) {
          return (x + 1)
        }
      }
      return null
    }

    function setCurrentRound () {
      that.game.global.game.currentPlayer.getMovableGrids().forEach(element => {
        enableBlock(element.id, true)
      })
      changePlayer(playerIdtoThisId(that.game.global.game.currentPlayer.id))
      redrawCardList()
      showNextTurnAnimate()
      that.time_value = 60      
    }

    setCurrentRound()
  }

  getStatusImgId (x) {
    switch (x) {
      case 'socialization':
        return 'status01'

      case 'externalization':
        return 'status02'

      case 'combination':
        return 'status04'

      case 'internalization':
        return 'status03'
    }
  }

  convertCompanyTypeToPicImage (type) {
    switch (type) {
      case 'Education':
        return 'consulting'
      case 'ITCompany':
        return 'IT'
      case 'MediaFirm':
        return 'media'
      case 'Publishing':
        return 'publishing'
      case 'Auditing':
        return 'audit'
    }
  }

  convertCompanyTypeToChessImage (type) {
    switch (type) {
      case 'Education':
        return 'C'
      case 'ITCompany':
        return 'I'
      case 'MediaFirm':
        return 'M'
      case 'Publishing':
        return 'P'
      case 'Auditing':
        return 'A'
    }
  }

  update () {}

  render () {}
}
