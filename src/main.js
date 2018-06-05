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
		this.snake = new Snake(new Square(6, 7), new Square(7, 7), new Square(8, 7));

		this.apple = this.setApple();

		this.timer.subscribe(() => {
			this._progressFrame();
		});
	}

	setApple() {
		if (this.apple) {
			const squareElement = document.querySelector(`div.game__column--${this.apple.x} div.game__square--${this.apple.y}`);
			squareElement.classList.remove('apple');  
		}

		const square = this._getEmptySquare();

		const squareElement = document.querySelector(`div.game__column--${square.x} div.game__square--${square.y}`);
		squareElement.classList.add('apple');

		return square;

	}

	_progressFrame() {
		this.snake.move();
		// progress snake
		if (this.snake.head.x === this.apple.x && this.snake.head.y === this.apple.y) {
			this.snake.extendTail();
			this.apple = this.setApple();
		}
		// if snake eats apple, create new apple
		// if snake hits wall or self, end game
	}

	_resetGame() {

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

		while (this.snake.occupiedSpacesSet.has(square)) {
			x = getRandomInt(1, COLUMNS);
			y = getRandomInt(1, ROWS);

			square = new Square(x, y);
		}

		return square;

	}

	isSquareOccupied() {
    
	}


}



const game = new Game();
game.createGame();
