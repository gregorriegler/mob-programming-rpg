import React, {useCallback, useEffect, useRef, useState} from "react";
import {Countdown} from "./model/Countdown";
import {RealClock} from "./infrastructure/RealClock";
import {Clock, Minutes} from "./model/Clock";
import {noOp} from "./model/Func";

function useForceUpdate() {
    const [, updateState] = useState();
    // @ts-ignore
    return useCallback(() => updateState({}), []);
}

type TimerDisplayProps = {
    timer?: Minutes;
    status?: string
    clock?: Clock;
    onFinish?: () => void;
    onStart?: () => void;
}

const TimerDisplay = (
    {
        timer = 4,
        status = "STOPPED",
        clock = new RealClock(),
        onFinish = noOp,
        onStart = noOp,
    }: TimerDisplayProps
) => {
    const forceUpdate = useForceUpdate();

    function createCountdown() {
        return Countdown.fromMinutes(timer, rotate, forceUpdate, clock);
    }

    const rotate = () => {
        onFinish();
        countdown.current = createCountdown();
    };

    const countdown = useRef(createCountdown());
    
    if (!countdown.current.startsFromMinutes(timer)) {
        countdown.current = createCountdown();
    }

    document.title = countdown.current.timeLeftPretty();
    //todo there is no test synchronizing the start of the timers via ws

    useEffect(() => {
        if (countdown.current.status() === "STOPPED" && status === "STARTED") {
            start();
        }
    })

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
