import { Clock, format, MilliSeconds } from "./Clock";

export class Countdown {
    private readonly _from: MilliSeconds;
    private _startedAt: MilliSeconds;
    private _clock: Clock;
    private _intervalId;
    private readonly _onFinish: () => void;
    private readonly _updateTime: (prettyTime: string) => void;

    constructor(from: MilliSeconds, onFinish: () => void, clock: Clock, updateTime: (prettyTime: string) => void = () => {}) {
        this._from = from;
        this._clock = clock;
        this._onFinish = onFinish;
        this._updateTime = updateTime;
        updateTime(this.timeLeftPretty());
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
        const atLeastEverySecond = () => {
            this._updateTime(this.timeLeftPretty())
        };
        this._intervalId = setInterval(atLeastEverySecond, 100);
        setTimeout(() => {
            if (this.timeLeft() === 0) {
                this._onFinish();
                clearInterval(this._intervalId);
            }
        }, this._from);
    }
}