# kmg-ionic
KMG - Knowledge Management Game (Ionic module)

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
        -> not restrictly, as long as the target is need, next round can start
    2. how many card for each Nonaka-stage (1/4 cycle)?
        -> one card of correct color is enough
