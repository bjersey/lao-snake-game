# Squarespace Snake Homework

Brian Lao's snake homework assignment -- enjoy!

## Build instructions

Tested with node version `8.9.0` and npm version `5.5.1`.

Steps:

1. Run `npm i -g rollup`
2. Change working directory to project root
3. In project root, run `npm i`
4. Build project
   * To build: `npm run build` 
   * To watch: `npm run watch`
6. Launch project (manually) by opening `./dist/main.html` in Chrome
   * can try running from project root `open ./dist/main.html`

## Notes before I started the project:

* use a queue to model snake's movements
* want to learn CSS grid
* want to implement a timer to control game flow and speed
* since I can't use a templating engine and I don't want to create static elements, dynamically create game board and make it easy to adjust

## TODO's:

* do cooler styling
* add debounce function to arrow keys
* add dev server
* add score tracking
