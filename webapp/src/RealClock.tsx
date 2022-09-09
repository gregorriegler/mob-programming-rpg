import { Clock, MilliSeconds } from "./model/Clock";

export class RealClock implements Clock {
    currentTime(): MilliSeconds {
        return new Date().getTime();
    }
}