import MobProgrammingRPG from "./MobProgrammingRPG";
import { act, fireEvent, render, screen, within } from "@testing-library/react";
import React from "react";
import { ClockStub } from "./model/Clock";

describe('Mob Programming RPG', () => {

    function getPlayerListitems() {
        const playerList = screen.getByRole('list', {name: /Player List/});
        return within(playerList).getAllByRole("listitem");
    }

    function getSettingsButton() {
        return screen.queryByRole('button', {name: 'Settings'});
    }

    function getRotateButton() {
        return screen.queryByRole('button', {name: 'Rotate'});
    }

    function changePlayers(players: string) {
        fireEvent.click(getSettingsButton());
        fireEvent.change(screen.getByLabelText('Change Players'), {target: {value: players}});
        fireEvent.click(screen.getByText("Save"));
        fireEvent.click(screen.getByText("Close"));
    }

    beforeEach(() => {
        localStorage.clear();
    })

    it('starts with an empty list of players', () => {
        render(<MobProgrammingRPG/>);
        const playerList = screen.getByRole('list', {name: /Player List/});
        expect(playerList).toBeEmptyDOMElement();
    });

    it('toggles the settings', () => {
        render(<MobProgrammingRPG/>);
        const settingsButton = getSettingsButton();
        fireEvent.click(settingsButton);
        fireEvent.click(settingsButton);

        const playersTextarea = screen.queryByText('Change Players');
        expect(playersTextarea).toBeNull();
    });

    it('closes the settings', () => {
        render(<MobProgrammingRPG/>);
        const settingsButton = getSettingsButton();
        fireEvent.click(settingsButton);

        fireEvent.click(screen.getByText("Close"));

        const playersTextarea = screen.queryByText('Change Players');
        expect(playersTextarea).toBeNull();
    });

    it('changes players', () => {
        render(<MobProgrammingRPG/>);
        fireEvent.click(getSettingsButton());
        const playersTextarea = screen.getByLabelText('Change Players');
        expect(playersTextarea).toBeInTheDocument();

        fireEvent.change(playersTextarea, {target: {value: 'Gregor,Max,Rita'}});
        fireEvent.click(screen.getByText("Save"));

        const items = getPlayerListitems();
        expect(items.length).toBe(3);
        expect(items[0]).toHaveTextContent('Gregor');
        expect(items[1]).toHaveTextContent('Max');
        expect(items[2]).toHaveTextContent('Rita');
    })

    fit('changed players remain until after countdown', () => {
        jest.useFakeTimers()
        const clock = new ClockStub();
        render(<MobProgrammingRPG rotateAfter={1}/>);
        
        changePlayers('1,2,3');
        changePlayers('2,3');
        
        fireEvent.click(screen.getByRole('button', {name: 'Start'}));
        act(() => {
            clock.advanceTime(1000)
            jest.advanceTimersByTime(1000);
        })
        
        const items = getPlayerListitems();
        expect(items.length).toBe(2);
        expect(items[0]).toHaveTextContent('2');
        expect(items[1]).toHaveTextContent('3');
        
    })

    it('shows playing players in settings', () => {
        render(<MobProgrammingRPG startingPlayers={["Gregor", "Peter"]}/>);

        fireEvent.click(getSettingsButton());

        expect(screen.getByLabelText('Change Players')).toHaveTextContent("Gregor, Peter");
    })

    it('shows players roles', () => {
        render(<MobProgrammingRPG startingPlayers={["Gregor", "Peter", "Rita", "Ben"]}/>);

        const items = getPlayerListitems();
        expect(items[0]).toHaveTextContent('Gregor (Driver)');
        expect(items[1]).toHaveTextContent('Peter (Navigator)');
        expect(items[2]).toHaveTextContent('Rita (Mobber)');
        expect(items[3]).toHaveTextContent('Ben (Mobber)');
    })

    it('has a rotate button that rotates the players', () => {
        render(<MobProgrammingRPG startingPlayers={["Gregor", "Peter", "Rita"]}/>);

        fireEvent.click(getRotateButton());

        const items = getPlayerListitems();
        expect(items[0]).toHaveTextContent('Gregor (Mobber)');
        expect(items[1]).toHaveTextContent('Peter (Driver)');
        expect(items[2]).toHaveTextContent('Rita (Navigator)');
    })

    it('has a timer', () => {
        render(<MobProgrammingRPG startingPlayers={["Gregor", "Peter", "Rita"]}/>);

        expect(screen.getByRole('button', {name: 'Start'})).toBeInTheDocument();
        const timer = screen.getByTitle("timer");
        expect(timer).toBeInTheDocument();
        expect(timer).toHaveTextContent('04:00');
    })

    it('can configure the timer', () => {
        render(<MobProgrammingRPG rotateAfter={3}/>);

        expect(screen.getByRole('button', {name: 'Start'})).toBeInTheDocument();
        const timer = screen.getByTitle("timer");
        expect(timer).toBeInTheDocument();
        expect(timer).toHaveTextContent('00:03');
    })

    it("shows who's next when the time is over", () => {
        jest.useFakeTimers()
        const clock = new ClockStub();
        render(<MobProgrammingRPG startingPlayers={["Gregor", "Peter", "Rita"]} clock={clock}/>);
        fireEvent.click(screen.getByRole('button', {name: 'Start'}));

        act(() => {
            clock.advanceTime(1000 * 60 * 4)
            jest.advanceTimersByTime(1000 * 60 * 4);
        })

        expect(screen.getByTitle("Driver")).toHaveTextContent("Peter");
        expect(screen.getByTitle("Driver")).toHaveTextContent("Driver");
        expect(screen.getByTitle("Navigator")).toHaveTextContent("Rita");
        expect(screen.getByTitle("Navigator")).toHaveTextContent("Navigator");
    })

    it("can continue after the time is over", () => {
        jest.useFakeTimers()
        const clock = new ClockStub();
        render(<MobProgrammingRPG startingPlayers={["Gregor", "Peter", "Rita"]} clock={clock}/>);
        fireEvent.click(screen.getByRole('button', {name: 'Start'}));

        act(() => {
            clock.advanceTime(1000 * 60 * 4)
            jest.advanceTimersByTime(1000 * 60 * 4);
        })

        fireEvent.click(screen.getByRole('button', {name: 'Close'}));
        expect(screen.queryByText("Time is over")).not.toBeInTheDocument();
    })

    it("clicking help shows what I should do", () => {
        render(<MobProgrammingRPG startingPlayers={["Gregor", "Peter", "Rita"]}/>);

        const helpButton = screen.getByRole('button', {name: 'Help'});
        expect(helpButton).toBeInTheDocument();
        fireEvent.click(helpButton);
    })
})
