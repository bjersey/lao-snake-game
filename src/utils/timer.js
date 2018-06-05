import {KEY_DOWN_MAP} from '../constants/constants';

// pub sub timer to control game flow
export class Timer {
	constructor(interval) {
		this._subscribers = [];
		this._gameClock = undefined;
		this._clockInterval = interval;
		this._startClock();

		window.addEventListener('keypress', keypress => {
			if (keypress.keyCode === KEY_DOWN_MAP.SPACE){
				this._setTimerState();
			}
		});
	}

	_setTimerState() {
		if (this._gameClock) {
			this._stopClock();
		} else {
			this._startClock();
		}
	}

	_startClock() {
		this._gameClock = setInterval(() => {
			this._tick();
		}, this._clockInterval);
	}

	_stopClock() {
		clearInterval(this._gameClock);
		this._gameClock = undefined;
	}

	_tick() {
		this._subscribers.forEach(fn => {
			fn();
		});
	}

	subscribe(fn) {
		this._subscribers.push(fn);
	}
}
