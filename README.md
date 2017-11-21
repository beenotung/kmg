# Ionic Horizon seed
This is a starter template for [Ionic](http://ionicframework.com/docs/) projects with [Horizon](http://horizon.io/docs/).

## How to use this template

*This template does not work on its own*. The shared files for each starter are found in the [ionic2-app-base repo](https://github.com/driftyco/ionic2-app-base).

To use this template, either create a new ionic project using the ionic node.js utility, or copy the files from this repository into the [Starter App Base](https://github.com/driftyco/ionic2-app-base).

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

## Modified from seed
This part helps updating the seed.
- gc

## To-Do
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
    2. how many card for each Nonaka-stage (1/4 cycle)?
