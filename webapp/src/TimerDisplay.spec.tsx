import { act, ByRoleOptions, fireEvent, render, screen } from "@testing-library/react";
import React from "react";
import { ClockStub, MilliSeconds } from "./model/Clock";
import { getButton } from "./TestHarnessConvenienceFunctions";
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
        expect(global.document.title).toEqual('04:00');
    })

    it('shows the chosen time', () => {
        render(<TimerDisplay clock={clock} timer={3}/>);

        const timer = screen.getByTitle("timer");
        expect(timer).toHaveTextContent('03:00');
    })

    it('plays the time', () => {
        render(<TimerDisplay clock={clock} timer={1}/>);
        const timer = screen.getByTitle("timer");
        const startButton = screen.getByRole("button", {name: /start/i});
        fireEvent.click(startButton);

        act(() => {
            advanceTimeBy(30000)
        })

        expect(global.document.title).toEqual('00:30');
        expect(timer).toHaveTextContent('00:30');
    })

    it('notifies when over', () => {
        const notify = jest.fn();
        render(<TimerDisplay clock={clock} timer={1} onFinish={notify}/>);
        const startButton = getButton({ name: /start/i });
        fireEvent.click(startButton);

        act(() => {
            advanceTimeBy(60000)
        })

        expect(notify).toHaveBeenCalled();
    })

    it('starts the time again', () => {
        const notify = jest.fn();
        render(<TimerDisplay clock={clock} timer={1} onFinish={notify}/>);
        const timer = screen.getByTitle("timer");
        const startButton = screen.getByRole("button", {name: /start/i});
        fireEvent.click(startButton);

        act(() => {
            advanceTimeBy(60000)
        })
        expect(timer).toHaveTextContent('01:00')
        
        fireEvent.click(startButton);
        act(() => {
            advanceTimeBy(1000)
        })
        expect(timer).toHaveTextContent('00:59')

        act(() => {
            advanceTimeBy(59000)
        })
        expect(notify).toHaveBeenCalledTimes(2);
    })

    function advanceTimeBy(time: MilliSeconds) {
        clock.advanceTime(time);
        jest.advanceTimersByTime(time);
    }
});

