import {Square} from './square';
import {DIRECTION, KEY_DOWN_MAP} from '../constants/constants';

export class Snake {

	constructor(xBound, yBound, ...initialLocation) {
		this._occupiedSpaces = initialLocation;  // snake location and movement is modeled after a queue
		this._currentDirection = DIRECTION.RIGHT;
		this._lastTail = undefined;  // used to extend snake when apple is eaten
		this._paintSquares();

		this._xBound = xBound;
		this._yBound = yBound;

		window.addEventListener('keydown', keypress => {
			switch (keypress.keyCode) {
			case KEY_DOWN_MAP.LEFT:
				if (this._currentDirection !== DIRECTION.RIGHT) this._currentDirection = DIRECTION.LEFT;
				break;
			case KEY_DOWN_MAP.UP:
				if (this._currentDirection !== DIRECTION.DOWN) this._currentDirection = DIRECTION.UP;
				break;
			case KEY_DOWN_MAP.RIGHT:
				if (this._currentDirection !== DIRECTION.LEFT) this._currentDirection = DIRECTION.RIGHT;
				break;
			case KEY_DOWN_MAP.DOWN:
				if (this._currentDirection !== DIRECTION.UP) this._currentDirection = DIRECTION.DOWN;
				break;
			}
		});
	}

	get head() {
		return this._occupiedSpaces.slice(-1)[0];
	}

	reset() {
		this._unpaintSquares();
	}

	isSpaceOccupied(square) {
		const squareElement = document.querySelector(`div.game__column--${square.x} div.game__square--${square.y}`);
		return squareElement.classList.contains('occupied');
	}

	_paintSquares(squares) {
		const squaresToPaint = squares ? squares : this._occupiedSpaces;

		squaresToPaint.forEach(square => {
			const squareElement = document.querySelector(`div.game__column--${square.x} div.game__square--${square.y}`);
			squareElement.classList.add('occupied');
		});
	}

	_unpaintSquares(squares) {
		const squaresToUnpaint = squares ? squares : this._occupiedSpaces;

		squaresToUnpaint.forEach(square => {
			const squareElement = document.querySelector(`div.game__column--${square.x} div.game__square--${square.y}`);
			squareElement.classList.remove('occupied');
		});
	}

	extendTail() {  // when an apple is eaten
		this._occupiedSpaces.unshift(this._lastTail);
	}

	_isGameOver(square) {
		// snake hits self
		if (this.isSpaceOccupied(square)) {
			return true;
		}

		// snake goes out of bound
		if (square.x < 1 || square.x > this._xBound || square.y < 1 || square.y > this._yBound ) {
			return true;
		}
	}

	move() {
		let newHead;
		switch (this._currentDirection) {
		case DIRECTION.RIGHT:
			newHead = new Square(this.head.x + 1, this.head.y);
			if (this._isGameOver(newHead)) throw 'Game Over';
			this._occupiedSpaces.push(newHead);
			break;
		case DIRECTION.LEFT:
			newHead = new Square(this.head.x - 1, this.head.y);
			if (this._isGameOver(newHead)) throw 'Game Over';
			this._occupiedSpaces.push(newHead);
			break;
		case DIRECTION.UP:
			newHead = new Square(this.head.x, this.head.y + 1);
			if (this._isGameOver(newHead)) throw 'Game Over';
			this._occupiedSpaces.push(newHead);
			break;
		case DIRECTION.DOWN:
			newHead = new Square(this.head.x, this.head.y - 1);
			if (this._isGameOver(newHead)) throw 'Game Over';
			this._occupiedSpaces.push(newHead);
			break;
		}
		this._lastTail = this._occupiedSpaces.shift();
		this._unpaintSquares([this._lastTail]);
		this._paintSquares([newHead]);
	}
}
