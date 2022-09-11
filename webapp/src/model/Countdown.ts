import { Clock, format, MilliSeconds } from "./Clock";

export type CountdownStatus = "STOPPED" | "RUNNING";

export class Countdown {
    private readonly _from: MilliSeconds;
    private _startedAt: MilliSeconds;
    private _status: CountdownStatus;
    private _clock: Clock;
    private _intervalId;
    private readonly _onFinish: () => void;
    private readonly _updateTime: (prettyTime: string) => void;

    constructor(from: MilliSeconds, onFinish: () => void, clock: Clock, updateTime: (prettyTime: string) => void = () => {}) {
        this._from = from;
        this._status = "STOPPED";
        this._clock = clock;
        this._onFinish = onFinish;
        this._updateTime = updateTime;
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
        if(this._status === "RUNNING") return;
        this._status = "RUNNING";
        this._startedAt = this._clock.currentTime();
        const atLeastEverySecond = () => {
            this._updateTime(this.timeLeftPretty())
        };
        this._intervalId = setInterval(atLeastEverySecond, 100);
        setTimeout(() => {
            if (this.timeLeft() === 0) {
                this._status = "STOPPED";
                this._onFinish();
                clearInterval(this._intervalId);
            }
        }, this._from);
    }

    status() {
        return this._status;
    }
}