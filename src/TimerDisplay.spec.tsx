
import { act, fireEvent, render, screen, within } from "@testing-library/react";
import React from "react";
import { ClockStub } from "./model/Clock";
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
        render(<TimerDisplay clock={clock} rotateAfter={3*1000}/>);

        const timer = screen.getByTitle("timer");
        expect(timer).toHaveTextContent('00:03');
    })

    // it('plays the timer', () => {
    //     jest.useFakeTimers()
    //     const clock = new ClockStub();
    //     render(<MobProgrammingRPG startingPlayers={["Gregor", "Peter", "Rita"]} clock={clock}/>);
    //     const timer = screen.getByTitle("timer");
    //     expect(timer).toHaveTextContent('04:00');
    //
    //     const startButton = screen.getByRole('button', {name: 'Start'});
    //     fireEvent.click(startButton);
    //
    //     act(() => {
    //         clock.setTime(1000 * 60 * 2)
    //         jest.advanceTimersByTime(1000 * 60 * 2);
    //     })
    //
    //     expect(timer).toHaveTextContent('02:00');
    // })
});