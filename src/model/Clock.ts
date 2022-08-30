export interface Clock {
    currentTime(): MilliSeconds;
}

export class ClockStub implements Clock {
    private _time: MilliSeconds = 0;

    currentTime() {
        return this._time;
    }

    advanceTime(time: MilliSeconds) {
        this._time = this._time + time;
    }
}

export type MilliSeconds = number;

export function format(time: MilliSeconds) {
    return new Date(time).toISOString().substr(14, 5);
}