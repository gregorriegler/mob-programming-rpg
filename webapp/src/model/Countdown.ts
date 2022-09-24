import {Clock, format, MilliSeconds} from "./Clock";
import {F, noOp} from "./Func";

export type CountdownStatus = "STOPPED" | "RUNNING";

export class Countdown {
    private readonly _from: MilliSeconds;
    private _startedAt: MilliSeconds;
    private _status: CountdownStatus;
    private _clock: Clock;
    private _intervalId;
    private readonly _onFinish: () => void;
    private readonly _updateTime: (prettyTime: string) => void;

    static fromMinutes(from: number, onFinish: F<void>, updateTime = noOp, clock: Clock) {
        return new Countdown(from * 60000, onFinish, updateTime, clock)
    }

    constructor(from: MilliSeconds, onFinish: F<void>, updateTime = noOp, clock: Clock) {
        this._from = from;
        this._status = "STOPPED";
        this._clock = clock;
        this._onFinish = onFinish;
        this._updateTime = updateTime;
    }

    from() {
        return this._from
    }

    startsFromMinutes(seconds) {
        return this._from === seconds * 60000
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
        if (this._status === "RUNNING") return;
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