import React, { useEffect, useState } from "react";
import { Countdown } from "./model/Countdown";
import { RealClock } from "./RealClock";
import { format } from "./model/Clock";

let countdown;

const TimerDisplay = (
    {
        rotateAfter = 60 * 4,
        clock = new RealClock(),
        onFinish = () => {},
        continuePlaying = () => {},
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
    
    function start(){
        continuePlaying();
        countdown.start();
    }
    
    useEffect(() => {
        countdown = createCountdown();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[onFinish]);

    return (
        <div className="rpgui-container framed-golden-2 timer" title="timer">
            <div className="rpgui-container framed-grey"><p className="time">{timeLeft}</p></div>
            <button className="rpgui-button golden" onClick={() => start()}><p>Start</p></button>
        </div>
    );
};

export default TimerDisplay;
