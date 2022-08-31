import React, { useEffect, useState } from "react";
import { Countdown } from "./model/Countdown";
import { RealClock } from "./RealClock";
import { format } from "./model/Clock";

let countdown;

const TimerDisplay = (
    {
        rotateAfter = 60 * 4,
        clock = new RealClock(),
        onFinish = () => {}
    }
) => {
    const [timeLeft, setTimeLeft] = useState(format(rotateAfter * 1000));

    function createCountdown() {
        return new Countdown(rotateAfter * 1000, rotate, clock, setTimeLeft);
    }

    function rotate() {
        countdown = createCountdown()
        onFinish();
    }
    
    useEffect(() => {
        countdown = createCountdown();
    },[]);

    return (
        <div className="timer" title="timer">
            <span className="time-display">{timeLeft}</span>
            <button onClick={() => countdown.start()}>Start</button>
        </div>
    );
};

export default TimerDisplay;
