# kmg-core
Knowledge Management Game - core module

The logic and data structure, regardless of the UI layout and rendering

## Guide for beginner developer / QA

Install global packages (only for first time):

```bash
$ ./install-dev
```

Then, run:

```bash
$ yarn
$ ./serve
```

## When used as Library
### Build
```bash
$ ./build-lib
```
### Path for peer submodule kmg-game
```javascript
var core = require('../kmg-ionic/lib/model/core');
```
### Required polyfill
1. Promise
2. Map
3. Set
4. Object.assign

## To-Do

1. [x] use card
2. [x] get backpack card list
3. [x] event when change 4 prop and current color (per player)
4. [x] get movable grid list (player method)
5. [x] event when target meet (whole game, not per user), content is the winning player
6. [x] event when new card appear/remove on map
    - card
    - position
    - appear / remove
7. [ ] add company type audit
    - waiting Edie
8. [x] add method at game to end turn
9. [ ] event for player can move
    - content is movable grid

## To-Do (old)
### [Lib] Create Event for Client
- when four property of player change (per player)
    - emit player
- when player change stage (4 model) (per player)
    - emit player
- when a grid has new card
    - emit card info (e.g. color)
- when a card is taken
- when a player step in a grid
### [Design] To Discuss and Design
1. center position of each grid
2. transparent circle (for moving hint)
3. small card on map
4. middle card in backpack (how to open)
5. large card (detail) (how to close, use)
    - about 1/3 screen height
6. when can player user a card?
    1. after pick up, immediate
    2. from backpack, anytime, when player's turn
    3. unlimited per turn? or use a card in max?
7. how to end the turn?
    1. after user 1 card?
    2. click skip (if don't use card)
    -> unlimited card use, unless use click 'finish turn'
    -> can move 1 or 0 step
### [Discuss] To ask Edie
1. what is the target of each round?
    1. how many Nonaka-Model cycle?
        -> not restrictly, as long as the target is need, next round can start
    2. how many card for each Nonaka-stage (1/4 cycle)?
        -> one card of correct color is enough
