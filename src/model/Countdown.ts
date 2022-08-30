import { Clock, format, MilliSeconds } from "./Clock";

export class Countdown {
    private readonly _from: MilliSeconds;
    private _startedAt: MilliSeconds;
    private _clock: Clock;
    private _onFinish: () => void;

    constructor(from: MilliSeconds, onFinish: () => void, clock: Clock) {
        this._from = from;
        this._clock = clock;
        this._onFinish = onFinish;
    }
    
    setOnFinish(callback: () => void) {
        this._onFinish = callback;
        
    }

    timeLeft(): MilliSeconds {
        return this._startedAt === undefined
            ? this._from
            : Math.max(0, this._from - this.timePassed());
    }

    timeLeftPretty() {
        return format(this.timeLeft());
    }

    private timePassed() {
        return this._clock.currentTime() - this._startedAt;
    }

    start() {
        this._startedAt = this._clock.currentTime();
        setTimeout(() => {
            if (this.timeLeft() === 0) {
                this._onFinish();
            }
        }, this._from);
    }
}