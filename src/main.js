import {getRandomInt} from './utils/utils';
import {Timer} from './utils/timer';

import {Snake} from './models/snake';
import {Square} from './models/square';

import {ROWS, COLUMNS, GAME_SPEED} from './constants/constants';


class Game {

	constructor() {
		this.timer = new Timer(GAME_SPEED);
	}

	createGame() {
		this._buildGameBoard();

		// initial location
		this.snake = new Snake(COLUMNS, ROWS, new Square(6, 7), new Square(7, 7), new Square(8, 7));

		this.apple = this.setApple();

		this.timer.subscribe(() => {
			this._progressFrame();
		});
	}

	setApple() {
		if (this.apple) {
			this._deleteApple(this.apple);
		}

		const square = this._getEmptySquare();

		this._addApple(square);

		return square;
	}

	_deleteApple(apple) {
		const squareElement = document.querySelector(`div.game__column--${apple.x} div.game__square--${apple.y}`);
		squareElement.classList.remove('apple');  
	}

	_addApple(square) {
		const squareElement = document.querySelector(`div.game__column--${square.x} div.game__square--${square.y}`);
		squareElement.classList.add('apple');
	}

	_progressFrame() {
		try {
			this.snake.move();
		} catch (e) {
			alert('game is over!');
			this._resetGame();
			return;
		}

		if (this.snake.head.x === this.apple.x && this.snake.head.y === this.apple.y) {
			// we hit an apple
			this.snake.extendTail();
			this.apple = this.setApple();
		}
	}

	_resetGame() {
		this.snake.reset();
		
		this.snake = new Snake(COLUMNS, ROWS, new Square(6, 7), new Square(7, 7), new Square(8, 7));

		this.apple = this.setApple();
	}

	_buildGameBoard() {
		const gameRoot = document.createElement('div');
		gameRoot.classList.add('game__root');

		for (let i = 0; i < COLUMNS; i++) {
			const column = document.createElement('div');
			column.classList.add('game__column', `game__column--${i+1}`);

			for (let j = 0; j < ROWS; j++) {
				const row = document.createElement('div');
				row.classList.add('game__square', `game__square--${ROWS-j}`);
				column.appendChild(row);
			}

			gameRoot.appendChild(column);
		}

		document.body.appendChild(gameRoot);
	}

	_getEmptySquare() {
		let x = getRandomInt(1, COLUMNS);
		let y = getRandomInt(1, ROWS);

		let square = new Square(x, y);

		while (this.snake.isSpaceOccupied(square)) {
			x = getRandomInt(1, COLUMNS);
			y = getRandomInt(1, ROWS);

			square = new Square(x, y);
		}

		return square;
	}
}

const game = new Game();
game.createGame();
