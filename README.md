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
    - cancelled by Edie
8. [x] add method at game to end turn
9. [x] event for player can move
    - content is movable grid
10. [ ] make sure when init card, don't put multiple card on same grid
11. [ ] fix grid type, now is empty when a new card is placed (in the event)

## Discussion
1. what is the target of each round?
    1. how many Nonaka-Model cycle?
        -> not restrictly, as long as the target is need, next round can start
    2. how many card for each Nonaka-stage (1/4 cycle)?
        -> one card of correct color is enough
