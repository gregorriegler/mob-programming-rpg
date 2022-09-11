import MobProgrammingRPG from "./MobProgrammingRPG";
import { act, fireEvent, render, screen, within } from "@testing-library/react";
import React from "react";
import { ClockStub, MilliSeconds } from "./model/Clock";
import { DEFAULT_TIMER, Game } from "./model/Game";
import WS from "jest-websocket-mock";

function getPlayerListItems() {
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

    const wsServerUrl = "ws://localhost:8080";
    let server;
    

    beforeEach(() => {
        window.history.pushState({}, "GameId", "/")
        server = new WS(wsServerUrl);
        localStorage.clear();
    })

    afterEach(() => {
        WS.clean();
    });

    it('starts with an empty list of players', () => {
        render(<MobProgrammingRPG wsServer={wsServerUrl}/>);
        const playerList = screen.getByRole('list', {name: /Player List/});
        expect(playerList).toBeEmptyDOMElement();
    });

    it('continues a game', () => {
        localStorage.setItem("continueId", Game.withPlayers(["1"]).toJSON())
        window.history.pushState({}, "GameId", "/continueId")
        render(<MobProgrammingRPG wsServer={wsServerUrl}/>);

        const items = getPlayerListItems();
        expect(items).toHaveLength(1);
        expect(items[0]).toHaveTextContent('1');
    });

    it('creates a new game despite given localStorage', () => {
        localStorage.setItem("continueId", Game.withPlayers(["1"]).toJSON())
        window.history.pushState({}, "GameId", "/")
        render(<MobProgrammingRPG wsServer={wsServerUrl}/>);

        const playerList = screen.getByRole('list', {name: /Player List/});
        expect(playerList).toBeEmptyDOMElement();
    });

    it('changes url for the created game id', () => {
        window.history.pushState({}, "GameId", "/")

        render(<MobProgrammingRPG wsServer={wsServerUrl}/>);

        expect(global.window.location.pathname).toMatch(/\/[a-zA-Z0-9]+/);
        expect(global.window.location.pathname).not.toEqual("/undefined");
    });

    it('does not change a given id', () => {
        window.history.pushState({}, "GameId", "/existingId")

        render(<MobProgrammingRPG wsServer={wsServerUrl}/>);

        expect(global.window.location.pathname).toEqual("/existingId")
    });

    it('shows players roles', () => {
        render(<MobProgrammingRPG startingPlayers={["Gregor", "Peter", "Rita", "Ben"]} wsServer={wsServerUrl}/>);

        const items = getPlayerListItems();
        expect(items[0]).toHaveTextContent('Gregor (Driver)');
        expect(items[1]).toHaveTextContent('Peter (Navigator)');
        expect(items[2]).toHaveTextContent('Rita (Mobber)');
        expect(items[3]).toHaveTextContent('Ben (Mobber)');
    })

    it('has a rotate button that rotates the players', () => {
        render(<MobProgrammingRPG startingPlayers={["Gregor", "Peter", "Rita"]} wsServer={wsServerUrl}/>);

        fireEvent.click(getRotateButton());

        const items = getPlayerListItems();
        expect(items[0]).toHaveTextContent('Gregor (Mobber)');
        expect(items[1]).toHaveTextContent('Peter (Driver)');
        expect(items[2]).toHaveTextContent('Rita (Navigator)');
    })

    it("has a help button once clicked shows what a player should do", () => {
        render(<MobProgrammingRPG startingPlayers={["Gregor", "Peter", "Rita"]} wsServer={wsServerUrl}/>);

        const helpButton = screen.getByRole('button', {name: 'Help'});
        expect(helpButton).toBeInTheDocument();
        fireEvent.click(helpButton);
    })

    describe('has settings', () => {

        it('that shows the players', () => {
            render(<MobProgrammingRPG startingPlayers={["Gregor", "Peter"]} wsServer={wsServerUrl}/>);

            fireEvent.click(getSettingsButton());

            expect(screen.getByLabelText('Change Players')).toHaveTextContent("Gregor, Peter");
        })

        it('that toggle when you keep pressing the settings button', () => {
            render(<MobProgrammingRPG wsServer={wsServerUrl}/>);
            const settingsButton = getSettingsButton();

            fireEvent.click(settingsButton);
            expect(getPlayersTextarea()).toBeInTheDocument();

            fireEvent.click(settingsButton);
            expect(screen.queryByText('Change Players')).toBeNull();
        });

        it('that allow to change players', () => {
            render(<MobProgrammingRPG wsServer={wsServerUrl}/>);
            fireEvent.click(getSettingsButton());

            expect(getPlayersTextarea()).toBeInTheDocument();

            fireEvent.change(getPlayersTextarea(), {target: {value: 'Gregor,Max,Rita'}});
            fireEvent.click(screen.getByText("Save"));

            const items = getPlayerListItems();
            expect(items.length).toBe(3);
            expect(items[0]).toHaveTextContent('Gregor');
            expect(items[1]).toHaveTextContent('Max');
            expect(items[2]).toHaveTextContent('Rita');
        })

        it('close', () => {
            render(<MobProgrammingRPG wsServer={wsServerUrl}/>);
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

        afterEach(() => {
            jest.useRealTimers();
        })

        it('that shows the time left', () => {
            render(<MobProgrammingRPG startingPlayers={["Gregor", "Peter", "Rita"]} wsServer={wsServerUrl}/>);

            expect(screen.getByRole('button', {name: 'Start'})).toBeInTheDocument();
            const timer = screen.getByTitle("timer");
            expect(timer).toBeInTheDocument();
            expect(timer).toHaveTextContent('04:00');
        })

        it('that is configurable', () => {
            render(<MobProgrammingRPG rotateAfter={3} wsServer={wsServerUrl}/>);

            expect(screen.getByRole('button', {name: 'Start'})).toBeInTheDocument();
            const timer = screen.getByTitle("timer");
            expect(timer).toBeInTheDocument();
            expect(timer).toHaveTextContent('00:03');
        })

        it("that shows who's next when the time is over", () => {
            render(<MobProgrammingRPG rotateAfter={60 * 4}
                                      startingPlayers={["Gregor", "Peter", "Rita"]}
                                      clock={clock}
                                      wsServer={wsServerUrl}/>);
            fireEvent.click(screen.getByRole('button', {name: 'Start'}));

            advanceTimeBy(1000 * 60 * 4)

            expect(screen.getByText("Time is over")).toBeInTheDocument();
            expect(screen.getByTitle("Next Driver")).toHaveTextContent("Peter");
            expect(screen.getByTitle("Next Driver")).toHaveTextContent("Driver");
            expect(screen.getByTitle("Next Navigator")).toHaveTextContent("Rita");
            expect(screen.getByTitle("Next Navigator")).toHaveTextContent("Navigator");
        })

        it("that allows to continue after the time is over", () => {
            render(<MobProgrammingRPG rotateAfter={60 * 4}
                                      startingPlayers={["Gregor", "Peter", "Rita"]}
                                      clock={clock}
                                      wsServer={wsServerUrl}/>);
            fireEvent.click(screen.getByRole('button', {name: 'Start'}));
            advanceTimeBy(1000 * 60 * 4)
            fireEvent.click(screen.getByRole('button', {name: 'Close'}));
            expect(screen.queryByText("Time is over")).not.toBeInTheDocument();

            fireEvent.click(screen.getByRole('button', {name: 'Start'}));
            advanceTimeBy(1000 * 60)

            expect(screen.getByTitle("timer")).toHaveTextContent('03:00');
        })

        it('changed players remain until after countdown', () => {
            render(<MobProgrammingRPG rotateAfter={1} wsServer={wsServerUrl}/>);
            changePlayers('1,2,3');
            changePlayers('2,3');

            fireEvent.click(screen.getByRole('button', {name: 'Start'}));
            advanceTimeBy(1000);

            const items = getPlayerListItems();
            expect(items.length).toBe(2);
            expect(items[0]).toHaveTextContent('2');
            expect(items[1]).toHaveTextContent('3');
        })

    })

    describe('uses websockets', () => {

        it('initially subscribes the server', async () => {
            window.history.pushState({}, "GameId", "/gameId")

            render(<MobProgrammingRPG wsServer={wsServerUrl}/>);

            await expect(server).toReceiveMessage(JSON.stringify({"command": "subscribe", "id": "gameId"}))
        })

        it('handles a server notification', () => {
            window.history.pushState({}, "GameId", "/gameId")
            render(<MobProgrammingRPG wsServer={wsServerUrl}/>);

            server.send(Game.withPlayers(["1"], DEFAULT_TIMER, "gameId").toJSON())

            const items = getPlayerListItems();
            expect(items.length).toBe(1);
            expect(items[0]).toHaveTextContent('1');
        })

        it('updates the server', async () => {
            window.history.pushState({}, "GameId", "/gameId")
            render(<MobProgrammingRPG wsServer={wsServerUrl}/>);

            await expect(server).toReceiveMessage(JSON.stringify({"command": "subscribe", "id": "gameId"}))
            
            changePlayers('2,3');

            await expect(server).toReceiveMessage(
                JSON.stringify(
                    {
                        "command": "save",
                        "game": JSON.parse(Game.withPlayers(['2', '3'], DEFAULT_TIMER, 'gameId').toJSON())
                    }
                ));
        })
    });
})
