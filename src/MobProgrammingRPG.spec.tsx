import MobProgrammingRPG from "./MobProgrammingRPG";
import { act, fireEvent, render, screen, within } from "@testing-library/react";
import React from "react";
import { ClockStub, MilliSeconds } from "./model/Clock";

function getPlayerListitems() {
    const playerList = screen.getByRole('list', {name: /Player List/});
    return within(playerList).getAllByRole("listitem");
}

function getSettingsButton() {
    return screen.getByRole('button', {name: 'Settings'});
}

function getPlayersTextarea() {
    return screen.getByLabelText('Change Players');
}

function getRotateButton() {
    return screen.getByRole('button', {name: 'Rotate'});
}

function changePlayers(players: string) {
    fireEvent.click(getSettingsButton());
    fireEvent.change(screen.getByLabelText('Change Players'), {target: {value: players}});
    fireEvent.click(screen.getByText("Save"));
    fireEvent.click(screen.getByText("Close"));
}


describe('Mob Programming RPG', () => {
    beforeEach(() => {
        localStorage.clear();

    })

    it('starts with an empty list of players', () => {
        render(<MobProgrammingRPG/>);
        const playerList = screen.getByRole('list', {name: /Player List/});
        expect(playerList).toBeEmptyDOMElement();
    });

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

    it("has a help button once clicked shows what a player should do", () => {
        render(<MobProgrammingRPG startingPlayers={["Gregor", "Peter", "Rita"]}/>);

        const helpButton = screen.getByRole('button', {name: 'Help'});
        expect(helpButton).toBeInTheDocument();
        fireEvent.click(helpButton);
    })

    describe('has settings', () => {

        it('shows playing players in settings', () => {
            render(<MobProgrammingRPG startingPlayers={["Gregor", "Peter"]}/>);

            fireEvent.click(getSettingsButton());

            expect(screen.getByLabelText('Change Players')).toHaveTextContent("Gregor, Peter");
        })

        it('toggles the settings when you keep pressing the settings button', () => {
            render(<MobProgrammingRPG/>);
            const settingsButton = getSettingsButton();

            fireEvent.click(settingsButton);
            expect(getPlayersTextarea()).toBeInTheDocument();

            fireEvent.click(settingsButton);
            expect(screen.queryByText('Change Players')).toBeNull();
        });

        it('changes players', () => {
            render(<MobProgrammingRPG/>);
            fireEvent.click(getSettingsButton());

            expect(getPlayersTextarea()).toBeInTheDocument();

            fireEvent.change(getPlayersTextarea(), {target: {value: 'Gregor,Max,Rita'}});
            fireEvent.click(screen.getByText("Save"));

            const items = getPlayerListitems();
            expect(items.length).toBe(3);
            expect(items[0]).toHaveTextContent('Gregor');
            expect(items[1]).toHaveTextContent('Max');
            expect(items[2]).toHaveTextContent('Rita');
        })

        it('closes the settings', () => {
            render(<MobProgrammingRPG/>);
            fireEvent.click(getSettingsButton());

            fireEvent.click(screen.getByText("Close"));

            expect(screen.queryByText('Change Players')).toBeNull();
        });
    });

    describe('has a countdown', () => {

        let clock;

        function advanceTimeBy(time: MilliSeconds) {
            act(() => {
                clock.advanceTime(time)
                jest.advanceTimersByTime(time);
            })
        }

        beforeEach(() => {
            jest.useFakeTimers()
            clock = new ClockStub();
        });

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

        it("can continue after the time is over", () => {
            render(<MobProgrammingRPG rotateAfter={60 * 4}
                                      startingPlayers={["Gregor", "Peter", "Rita"]}
                                      clock={clock}/>);
            fireEvent.click(screen.getByRole('button', {name: 'Start'}));

            advanceTimeBy(1000 * 60 * 4)

            fireEvent.click(screen.getByRole('button', {name: 'Close'}));
            expect(screen.queryByText("Time is over")).not.toBeInTheDocument();
        })

        it("shows who's next when the time is over", () => {
            render(<MobProgrammingRPG rotateAfter={60 * 4}
                                      startingPlayers={["Gregor", "Peter", "Rita"]}
                                      clock={clock}/>);
            fireEvent.click(screen.getByRole('button', {name: 'Start'}));

            advanceTimeBy(1000 * 60 * 4)

            expect(screen.getByTitle("Next Driver")).toHaveTextContent("Peter");
            expect(screen.getByTitle("Next Driver")).toHaveTextContent("Driver");
            expect(screen.getByTitle("Next Navigator")).toHaveTextContent("Rita");
            expect(screen.getByTitle("Next Navigator")).toHaveTextContent("Navigator");
        })

        it('changed players remain until after countdown', () => {
            render(<MobProgrammingRPG rotateAfter={1}/>);
            changePlayers('1,2,3');
            changePlayers('2,3');

            fireEvent.click(screen.getByRole('button', {name: 'Start'}));
            advanceTimeBy(1000);

            const items = getPlayerListitems();
            expect(items.length).toBe(2);
            expect(items[0]).toHaveTextContent('2');
            expect(items[1]).toHaveTextContent('3');
        })
    })
})