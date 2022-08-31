import React, { useEffect, useState } from "react";
import { Countdown } from "./model/Countdown";
import { RealClock } from "./RealClock";
import { format } from "./model/Clock";

const TimerDisplay = (
    {
        rotateAfter = 60 * 4,
        clock = new RealClock(),
        onFinish = () => {}
    }
) => {
    const [timeLeft, setTimeLeft] = useState(format(rotateAfter * 1000));
    const [started, setStarted] = useState(false);

    useEffect(() => {
        function createCountdown() {
            return new Countdown(rotateAfter * 1000, rotate, clock, setTimeLeft);
        }

        let countdown = createCountdown();

        function rotate() {
            let countdown = createCountdown();
            setTimeLeft(countdown.timeLeftPretty());
            setStarted(false);
            onFinish();
            
        }

        if (started) {
            countdown.start();
        }
    },[started]);

    function start() {
        setStarted(true);
    }

    return (
        <div className="timer" title="timer">
            <span className="time-display">{timeLeft}</span>
            <button onClick={() => start()}>Start</button>
        </div>
    );
};

export default TimerDisplay;
