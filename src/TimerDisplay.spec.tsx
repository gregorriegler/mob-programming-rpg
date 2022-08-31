import { act, fireEvent, render, screen } from "@testing-library/react";
import React from "react";
import { ClockStub, MilliSeconds } from "./model/Clock";
import TimerDisplay from "./TimerDisplay";

describe('TimerDisplay', () => {

    let clock;

    beforeEach(() => {
        clock = new ClockStub();
        jest.useFakeTimers();
    })

    it('shows 4 min by default', () => {
        render(<TimerDisplay clock={clock}/>);

        const timer = screen.getByTitle("timer");
        expect(timer).toBeInTheDocument();
        expect(timer).toHaveTextContent('04:00');
    })

    it('shows the chosen time', () => {
        render(<TimerDisplay clock={clock} rotateAfter={3}/>);

        const timer = screen.getByTitle("timer");
        expect(timer).toHaveTextContent('00:03');
    })

    it('plays the time', () => {
        render(<TimerDisplay clock={clock} rotateAfter={3}/>);
        const timer = screen.getByTitle("timer");
        const startButton = screen.getByRole("button", {name: /start/i});
        fireEvent.click(startButton);

        act(() => {
            advanceTimeBy(1000)
        })

        expect(timer).toHaveTextContent('00:02');
    })

    it('notifies when over', () => {
        const notify = jest.fn();
        render(<TimerDisplay clock={clock} rotateAfter={3} onFinish={notify}/>);
        const startButton = screen.getByRole("button", {name: /start/i});
        fireEvent.click(startButton);

        act(() => {
            advanceTimeBy(3000)
        })

        expect(notify).toHaveBeenCalled();
    })

    function advanceTimeBy(time: MilliSeconds) {
        clock.advanceTime(time);
        jest.advanceTimersByTime(time);
    }
});