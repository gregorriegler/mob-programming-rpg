import React, { useCallback, useRef, useState } from "react";
import { Countdown } from "./model/Countdown";
import { RealClock } from "./RealClock";

function useForceUpdate() {
    const [, updateState] = useState();
    // @ts-ignore
    return useCallback(() => updateState({}), []);
}

const TimerDisplay = (
    {
        rotateAfter = 60 * 4,
        clock = new RealClock(),
        onFinish = () => {},
        continuePlaying = () => {},
    }
) => {
    const forceUpdate = useForceUpdate();

    function createCountdown() {
        return new Countdown(rotateAfter * 1000, rotate, clock, forceUpdate);
    }

    const countdown = useRef(createCountdown());

    function rotate() {
        onFinish();
        countdown.current = createCountdown();
    }

    function start() {
        continuePlaying();
        countdown.current.start();
    }

    return (
        <div className="rpgui-container framed-golden-2 timer" title="timer">
            <div className="rpgui-container framed-grey">
                <p className="time">{countdown.current.timeLeftPretty()}</p>
            </div>
            <button className="rpgui-button golden" onClick={start}><p>Start</p></button>
        </div>
    );
};

export default TimerDisplay;
