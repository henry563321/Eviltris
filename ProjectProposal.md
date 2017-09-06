# Eviltris

### Background

Eviltris is a website game based on JavaScript which is inspired by tetris.
It has the basic idea of tetris but has more evil models, like speed up mode(
  piece fall down double speed),can't seen mode(piece show up after half of
screen), evil mode(the piece you want most won't ever show up!)

### Function and MVP

In this game, user are able to:
start, pause, reset the game
choose the game model when reset the game
change the form of piece and the location of piece with keyboard.


### Technology and Architecture

This project will be implemented with the following technologies:

JavaScript for game logic,
canvas in HTML5 for effects rendering,
webpack to bundle js files.

And the files system will have

grid.js: display the board as a UI can interact with user and show the game

piece.js: the piece of tetris which I need for this game

mode.js: inner logic of different mode of game

### WireFrames

At top we have button for user to start, pause, and reset game.
At left we show the score for the current game
At right, we have button for user to change game mode.
At center, we have the main board of the Eviltris game.

![link](/wireframes.png)


### Implement timeline

day1: set up the entry file, build the board with canvas, set up the

item file, build each piece with different shape and color.

day2: write the logic of piece fall down and use keyboard to control it.

day3: build the different mode of game, use different logic or render method

### Bonus Feature:

Include some API to add gravity influence to this game!
