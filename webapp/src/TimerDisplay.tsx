import React, { useCallback, useEffect, useRef, useState } from "react";
import { Countdown } from "./model/Countdown";
import { RealClock } from "./infrastructure/RealClock";
import { Clock } from "./model/Clock";

function useForceUpdate() {
    const [, updateState] = useState();
    // @ts-ignore
    return useCallback(() => updateState({}), []);
}

type TimerDisplayProps = {
    rotateAfter?: number;
    status?: string
    clock?: Clock;
    onFinish?: () => void;
    onStart?: () => void;
}

const TimerDisplay = (
    {
        rotateAfter = 60 * 4,
        status = "STOPPED",
        clock = new RealClock(),
        onFinish = () => {},
        onStart = () => {},
    }: TimerDisplayProps
) => {
    const forceUpdate = useForceUpdate();

    function createCountdown() {
        return new Countdown(rotateAfter * 1000, rotate, clock, forceUpdate);
    }

    const countdown = useRef(createCountdown());
    document.title = countdown.current.timeLeftPretty();

    //todo there is no test synchronizing the start of the timers via ws
    useEffect(() => {
        if (countdown.current.status() === "STOPPED" && status === "STARTED") {
            start();
        }
    })

    function rotate() {
        onFinish();
        countdown.current = createCountdown();
    }

    function start() {
        onStart();
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
