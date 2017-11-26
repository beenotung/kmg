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
    this.load.image('backboard-select', './assets/images/backboard-select.jpg')
    this.load.image('audit', './assets/images/audit.png')
    this.load.image('consulting', './assets/images/consulting.png')
    this.load.image('IT', './assets/images/IT.png')
    this.load.image('media', './assets/images/media.png')
    this.load.image('publishing', './assets/images/publishing.png')
    this.load.image('select', './assets/images/select.png')
    this.load.image('finishbutton-select', './assets/images/finishbutton-select.png')
    this.load.image('homebutton-select', './assets/images/homebutton-select.png')
    this.load.image('transparent-white-home', './assets/images/transparent-white-home.png')
    this.load.image('status01', './assets/images/status01.png')
    this.load.image('status02', './assets/images/status02.png')
    this.load.image('status03', './assets/images/status03.png')
    this.load.image('status04', './assets/images/status04.png')
    this.load.image('status01b', './assets/images/status01b.png')
    this.load.image('status02b', './assets/images/status02b.png')
    this.load.image('status03b', './assets/images/status03b.png')
    this.load.image('status04b', './assets/images/status04b.png')
    this.load.image('Winner', './assets/images/Winner.png')    
    this.load.image('A', './assets/images/A.png')
    this.load.image('C', './assets/images/C.png')
    this.load.image('I', './assets/images/I.png')
    this.load.image('M', './assets/images/M.png')
    this.load.image('P', './assets/images/P.png')
    this.load.image('black1', './assets/images/black1.jpg')
    this.load.image('black2', './assets/images/black2.jpg')
    this.load.image('black3', './assets/images/black3.jpg')
    this.load.image('black4', './assets/images/black4.jpg')
    this.load.image('blue1', './assets/images/blue1.jpg')
    this.load.image('blue2', './assets/images/blue2.jpg')
    this.load.image('blue3', './assets/images/blue3.jpg')
    this.load.image('blue4', './assets/images/blue4.jpg')
    this.load.image('blue5', './assets/images/blue5.jpg')
    this.load.image('blue6', './assets/images/blue6.jpg')
    this.load.image('blue7', './assets/images/blue7.jpg')
    this.load.image('blue8', './assets/images/blue8.jpg')
    this.load.image('blue9', './assets/images/blue9.jpg')
    this.load.image('darkgreen1', './assets/images/darkgreen1.jpg')
    this.load.image('darkgreen2', './assets/images/darkgreen2.jpg')
    this.load.image('darkgreen3', './assets/images/darkgreen3.jpg')
    this.load.image('darkgreen4', './assets/images/darkgreen4.jpg')
    this.load.image('darkgreen5', './assets/images/darkgreen5.jpg')
    this.load.image('darkgreen6', './assets/images/darkgreen6.jpg')
    this.load.image('darkgreen7', './assets/images/darkgreen7.jpg')
    this.load.image('darkgreen8', './assets/images/darkgreen8.jpg')
    this.load.image('darkgreen9', './assets/images/darkgreen9.jpg')
    this.load.image('lightgreen1', './assets/images/lightgreen1.jpg')
    this.load.image('lightgreen2', './assets/images/lightgreen2.jpg')
    this.load.image('lightgreen3', './assets/images/lightgreen3.jpg')
    this.load.image('lightgreen4', './assets/images/lightgreen4.jpg')
    this.load.image('lightgreen5', './assets/images/lightgreen5.jpg')
    this.load.image('lightgreen6', './assets/images/lightgreen6.jpg')
    this.load.image('lightgreen7', './assets/images/lightgreen7.jpg')
    this.load.image('lightgreen8', './assets/images/lightgreen8.jpg')
    this.load.image('purple1', './assets/images/purple1.jpg')
    this.load.image('purple2', './assets/images/purple2.jpg')
    this.load.image('purple3', './assets/images/purple3.jpg')
    this.load.image('purple4', './assets/images/purple4.jpg')
    this.load.image('purple5', './assets/images/purple5.jpg')
    this.load.image('purple6', './assets/images/purple6.jpg')
    this.load.image('red1', './assets/images/red1.jpg')
    this.load.image('red2', './assets/images/red2.jpg')
    this.load.image('red3', './assets/images/red3.jpg')
    this.load.image('red4', './assets/images/red4.jpg')
    this.load.image('red5', './assets/images/red5.jpg')
    this.load.image('red6', './assets/images/red6.jpg')
    this.load.image('red7', './assets/images/red7.jpg')
    this.load.image('red8', './assets/images/red8.jpg')
    this.load.image('yellow1', './assets/images/yellow1.jpg')
    this.load.image('yellow2', './assets/images/yellow2.jpg')
    this.load.image('yellow3', './assets/images/yellow3.jpg')
    this.load.image('yellow4', './assets/images/yellow4.jpg')
    this.load.image('yellow5', './assets/images/yellow5.jpg')
    this.load.image('yellow6', './assets/images/yellow6.jpg')
    this.load.image('yellow7', './assets/images/yellow7.jpg')
    this.load.image('yellow8', './assets/images/yellow8.jpg')
    this.load.image('empty_card', './assets/images/empty_card.png')
    this.load.image('board_map', './assets/images/board_map.png')
    this.load.image('block_central', './assets/images/block_central.png')
    this.load.image('cardsection-map', './assets/images/cardsection-map.png')
    this.load.image('homebutton-map', './assets/images/homebutton-map.png')
    this.load.image('leftbutton-map', './assets/images/leftbutton-map.png')
    this.load.image('rightbutton-map', './assets/images/rightbutton-map.png')
    this.load.image('background-map', './assets/images/background-map.png')
    // for (let i = 1; i < 113; i++) {
    //   this.load.image('block_' + i, './assets/images/block_' + i + '.png')
    // }
    this.load.image('circle', './assets/images/circle.png')
    this.load.image('blackpattern', './assets/images/blackpattern.png')
    this.load.image('purplepattern', './assets/images/purplepattern.png')
    this.load.image('bluepattern', './assets/images/bluepattern.png')
    this.load.image('yellowpattern', './assets/images/yellowpattern.png')
    this.load.image('redpattern', './assets/images/redpattern.png')
    this.load.image('cross_button', './assets/images/cross_button.png')
    this.load.image('end_turn_button', './assets/images/end_turn_button.png')
    this.load.image('use_button', './assets/images/use_button.png')
    this.load.image('open_card_mask', './assets/images/open_card_mask.png')
    this.load.image('open_card_close', './assets/images/open_card_close.png')
    this.load.image('map_profile_question', './assets/images/map_profile_question.png')
    this.load.image('player_turn_mask', './assets/images/player_turn_mask.png')
    this.load.image('investment center', './assets/images/investment center.png')    
    this.load.image('NextTurn', './assets/images/NextTurn.png')  
    this.load.image('sound', './assets/images/sound.png')                
    this.load.image('nosound', './assets/images/nosound.png')    
    this.load.image('team', './assets/images/team.png')                
    this.load.image('detail screen', './assets/images/detail screen.png')                
    this.load.audio('bgMusic', './assets/sounds/state1_bgm.mp3')
    this.load.audio('menuMusic', './assets/sounds/mega_super_arcade_cup.mp3')
    this.load.audio('Closer - Alex Arcoleo Martin Felix Kaczmarski', './assets/sounds/Closer - Alex Arcoleo Martin Felix Kaczmarski.mp3') 
    this.load.audio('220212_4100837-lq', './assets/sounds/220212_4100837-lq.mp3')    
    
  }

  create () {
    this.state.start('PolyScreen')
  }
}