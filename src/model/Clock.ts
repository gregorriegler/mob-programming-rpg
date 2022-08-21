export interface Clock {
    currentTime(): MilliSeconds;
}

export class ClockStub implements Clock {
    private _time: MilliSeconds = 0;

    currentTime() {
        return this._time;
    }

    setTime(time: MilliSeconds) {
        this._time = time;
    }
}

export type MilliSeconds = number;