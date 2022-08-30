import React, { useEffect, useState } from "react";
import { Countdown } from "./model/Countdown";
import { RealClock } from "./RealClock";
import { format } from "./model/Clock";

const TimerDisplay = ({rotateAfter= 60*1000*4, clock = new RealClock()}) => {
    const [timeLeft, setTimeLeft] = useState(format(rotateAfter));

    useEffect(() => {
        const interval = setInterval(() => {
            setTimeLeft(countdown.timeLeftPretty());
        }, 1000);

        function rotate() {
            setTimeLeft(countdown.timeLeftPretty());
            clearInterval(interval);
        }

        const countdown = new Countdown(240000, rotate, clock);

        countdown.start();
    })

    // TODO: separate ui from game state?

    function start() {
    }

    return (
        <div className="timer" title="timer">
            <span className="time-display">{timeLeft}</span>
            <button onClick={() => start()}>Start</button>
        </div>
    );
};

export default TimerDisplay;
