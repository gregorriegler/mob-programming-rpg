import { act, fireEvent, render, screen, within } from "@testing-library/react";
import WS from "jest-websocket-mock";
import React from "react";
import { gameIdFromUrl } from "./infrastructure/GameIdFromUrl";
import MobProgrammingRPG from "./MobProgrammingRPG";
import { ClockStub, MilliSeconds } from "./model/Clock";
import { GAMEPLAY_ORDER_DRIVER_THEN_NAVIGATOR, Game, GAMEPLAY_ORDER_NAVIGATOR_THEN_DRIVER } from "./model/Game";
import { getButton } from "./TestHarnessConvenienceFunctions";

function getPlayerListItems() {
    const playerList = screen.getByRole('list', { name: /Player List/ });
    return within(playerList).queryAllByRole("listitem");
}

function getSettingsButton() {
    return getButton({ name: 'Settings' });
}

function getPlayersTextarea() {
    return screen.getByLabelText('Change Players');
}

function getTimerInput() {
    return screen.getByLabelText(/Change Timer/);
}

function getRotateButton() {
    return getButton({ name: 'Rotate' });
}

function changePlayers(players: string) {
    fireEvent.click(getSettingsButton());
    fireEvent.change(screen.getByLabelText('Change Players'), { target: { value: players } });
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
        render(<MobProgrammingRPG />);
        const playerList = screen.getByRole('list', { name: /Player List/ });
        expect(playerList.childElementCount).toEqual(1);
        expect(playerList).toHaveTextContent('Add Player');
    });

    it('continues a game', () => {
        localStorage.setItem("continueId", new Game({players:["1"]}).toJSON())
        window.history.pushState({}, "GameId", "/continueId")

        render(<MobProgrammingRPG initGame={new Game({id: "continueId"})} />);

        const items = getPlayerListItems();
        expect(items).toHaveLength(1);
        expect(items[0]).toHaveTextContent('1');
    });

    it('stores its state to localStorage', () => {
        render(<MobProgrammingRPG />);

        fireEvent.click(getButton({ name: 'Start' }));
        changePlayers('1,2')

        // @ts-ignore
        const gameFromLocalStorage = localStorage.getItem(window.location.pathname.split('/').pop());
        const savedGame = Game.fromJSON(gameFromLocalStorage!!);
        expect(savedGame.playerNames()).toEqual('1, 2');
        expect(savedGame.timerStatus()).toEqual('STARTED');
    });

    it('creates a new game despite given localStorage', () => {
        localStorage.setItem("continueId", new Game({players:["1"]}).toJSON())
        window.history.pushState({}, "GameId", "/")
        render(<MobProgrammingRPG />);

        const playerList = screen.getByRole('list', { name: /Player List/ });
        expect(playerList.childElementCount).toEqual(1);
        expect(playerList).toHaveTextContent('Add Player');
    });

    it('changes url for the created game id', () => {
        render(<MobProgrammingRPG initGame={new Game({id: "ab5Cc3"})}/>);

        expect(global.window.location.pathname).toEqual("/ab5Cc3");
    });

    it('does not change a given id', () => {
        window.history.pushState({}, "GameId", "/existingId")

        render(<MobProgrammingRPG initGame={new Game({ id: gameIdFromUrl() })}/>);

        expect(global.window.location.pathname).toEqual("/existingId")
    });

    it('shows players roles', () => {
        render(<MobProgrammingRPG initGame={new Game({players:["Gregor", "Peter", "Rita", "Ben"]})} />);

        const items = getPlayerListItems();
        expect(items[0]).toHaveTextContent('Gregor');
        expect(items[1]).toHaveTextContent('Peter');
        expect(items[2]).toHaveTextContent('Rita');
        expect(items[3]).toHaveTextContent('Ben');
    })

    it('has a button to add a new player', () => {
        render(<MobProgrammingRPG />);

        fireEvent.click(screen.getByText("Add Player"));

        expect(screen.getByPlaceholderText(/Player Name/i)).toBeInTheDocument();
        expect(screen.getByText('Add')).toBeInTheDocument();
    })

    it('adds a single player', () => {
        render(<MobProgrammingRPG />);
        fireEvent.click(screen.getByText("Add Player"));

        fireEvent.change(screen.getByPlaceholderText(/Player Name/i), { target: { value: "1" } });
        fireEvent.click(screen.getByAltText(/dev/i));
        fireEvent.click(screen.getByText('Add'));

        expect((getPlayerListItems())[0]).toHaveTextContent('1');
        expect((getPlayerListItems())[0]).toContainElement(screen.getByAltText('dev'));
        expect(screen.queryByPlaceholderText(/Player Name/i)).toBeNull();
    })

    it('does not add a player that has no name', () => {
        render(<MobProgrammingRPG />);
        fireEvent.click(screen.getByText("Add Player"));

        fireEvent.change(screen.getByPlaceholderText(/Player Name/i), { target: { value: "    " } });
        fireEvent.click(screen.getByAltText(/dev/i));
        fireEvent.click(screen.getByText('Add'));

        expect((getPlayerListItems())).toHaveLength(0)
        expect(screen.getByPlaceholderText(/Player Name/i)).toBeInTheDocument();
        expect(screen.getByText('Add')).toBeInTheDocument();
    })

    it('cancels adding a single player', () => {
        render(<MobProgrammingRPG />);
        fireEvent.click(screen.getByText("Add Player"));

        fireEvent.click(screen.getByText(/Cancel/i));

        expect(screen.queryByPlaceholderText(/Player Name/i)).toBeNull();
    })

    it('has a rotate button that rotates the players to their next position', () => {
        render(<MobProgrammingRPG initGame={new Game({players:["Gregor", "Peter", "Rita"]})} />);

        fireEvent.click(getRotateButton());

        const items = getPlayerListItems();
        // TODO: role has a different meaning here as its defined by the testing framework
        // we should change this test to not create this confusion
        // role has two contexts: testing framework, the game player
        expect(within(items[0]).getAllByRole('heading', { level: 2 })[0]).toHaveTextContent('Mobber')
        expect(within(items[1]).getAllByRole('heading', { level: 2 })[0]).toHaveTextContent('Typing')
        expect(within(items[2]).getAllByRole('heading', { level: 2 })[0]).toHaveTextContent('Navigator')
    })

    it("has a help button once clicked shows what a player should do", () => {
        render(<MobProgrammingRPG initGame={new Game({players:["Gregor", "Peter", "Rita"]})} />);

        const helpButton = getButton({ name: 'Help' });
        expect(helpButton).toBeInTheDocument();
        fireEvent.click(helpButton);
    })

    describe('has settings', () => {

        it('that shows the players', () => {
            render(<MobProgrammingRPG initGame={new Game({players:["Gregor", "Peter"]})} />);

            fireEvent.click(getSettingsButton());

            expect(screen.getByLabelText('Change Players')).toHaveTextContent("Gregor, Peter");
        })

        it('that toggle when you keep pressing the settings button', () => {
            render(<MobProgrammingRPG />);
            const settingsButton = getSettingsButton();

            fireEvent.click(settingsButton);
            expect(getPlayersTextarea()).toBeInTheDocument();

            fireEvent.click(settingsButton);
            expect(screen.queryByText('Change Players')).toBeNull();
        });

        it('that allow to change players', () => {
            render(<MobProgrammingRPG />);
            fireEvent.click(getSettingsButton());

            expect(getPlayersTextarea()).toBeInTheDocument();

            fireEvent.change(getPlayersTextarea(), { target: { value: 'Gregor,Max,Rita' } });
            fireEvent.click(screen.getByText("Save"));

            const items = getPlayerListItems();
            expect(items.length).toBe(3);
            expect(items[0]).toHaveTextContent('Gregor');
            expect(items[1]).toHaveTextContent('Max');
            expect(items[2]).toHaveTextContent('Rita');
        })

        it('that shows the timer in minutes', () => {
            render(<MobProgrammingRPG />);

            fireEvent.click(getSettingsButton());

            expect(getTimerInput()).toHaveValue("4");
        })

        it('that allows to change the timer', () => {
            render(<MobProgrammingRPG />);
            fireEvent.click(getSettingsButton());

            fireEvent.change(getTimerInput(), { target: { value: '10' } });
            fireEvent.click(screen.getByText("Save"));

            expect(screen.getByTitle("timer")).toHaveTextContent('10:00');
        })

        it('that allows to change rotation direction (Navigator -> Typing) <-> (Typing -> Navigator)', () => {
            render(<MobProgrammingRPG />);
            fireEvent.click(getSettingsButton());

            fireEvent.click(getButton({ name: GAMEPLAY_ORDER_NAVIGATOR_THEN_DRIVER }));
            expect(getButton({ name: GAMEPLAY_ORDER_DRIVER_THEN_NAVIGATOR })).toBeInTheDocument();

            fireEvent.click(getButton({ name: GAMEPLAY_ORDER_DRIVER_THEN_NAVIGATOR }));
            expect(getButton({ name: GAMEPLAY_ORDER_NAVIGATOR_THEN_DRIVER })).toBeInTheDocument();
        })

        it('that allows to change rotation direction to (Navigator,Typing)', () => {
            const game = new Game({players:["Gregor", "Peter", "Rita"]});
            jest.spyOn(game, "navigatorThenTyping");
            render(<MobProgrammingRPG initGame={game} />);
            fireEvent.click(getSettingsButton());

            fireEvent.click(getButton({ name: GAMEPLAY_ORDER_NAVIGATOR_THEN_DRIVER }));
            fireEvent.click(screen.getByText("Save"));

            expect(game.navigatorThenTyping).toHaveBeenCalledTimes(1);
        })

        it('that allows to change rotation direction back to (Typing,Navigator)', () => {
            const game = new Game({players:["Gregor", "Peter", "Rita"]});
            jest.spyOn(game, "navigatorThenTyping");
            jest.spyOn(game, "typingThenNavigator");
            render(<MobProgrammingRPG initGame={game} />);
            fireEvent.click(getSettingsButton());

            fireEvent.click(getButton({ name: GAMEPLAY_ORDER_NAVIGATOR_THEN_DRIVER }));
            fireEvent.click(getButton({ name: GAMEPLAY_ORDER_DRIVER_THEN_NAVIGATOR }));
            fireEvent.click(screen.getByText("Save"));

            expect(game.navigatorThenTyping).not.toHaveBeenCalled();
            expect(game.typingThenNavigator).toHaveBeenCalledTimes(1);
        })

        it('close', () => {
            render(<MobProgrammingRPG />);
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
            render(<MobProgrammingRPG
                initGame={new Game({players:["Gregor", "Peter", "Rita"]})}
                wsServer={wsServerUrl}
            />);

            expect(getButton({ name: 'Start' })).toBeInTheDocument();
            const timer = screen.getByTitle("timer");
            expect(timer).toBeInTheDocument();
            expect(timer).toHaveTextContent('04:00');
        })

        it('that keeps the timer stopped unless somebody starts it', () => {
            render(<MobProgrammingRPG />);

            advanceTimeBy(4000);

            const timer = screen.getByTitle("timer");
            expect(timer).toBeInTheDocument();
            expect(timer).toHaveTextContent('04:00');
        })

        it('that shows the timer as was set in localStorage', () => {
            localStorage.setItem("continueId", new Game({timer: 60, id: "continueId"}).toJSON())

            render(<MobProgrammingRPG initGame={new Game({id: "continueId"})} />);

            expect(screen.getByTitle("timer")).toHaveTextContent('01:00');
        })

        it('that starts if games timer was started', () => {
            localStorage.setItem(
                "continueId",
                new Game(
                    {
                        id: "continueId",
                        timer: 2,
                        timerStatus: "STARTED"
                    }
                ).toJSON()
            )
            render(<MobProgrammingRPG initGame={new Game({id: "continueId"})} />);

            advanceTimeBy(1000)

            expect(screen.getByTitle("timer")).toHaveTextContent('00:01');
        })

        it('that is configurable', () => {
            render(<MobProgrammingRPG initGame={new Game({ timer: 3 })} />);

            expect(getButton({ name: 'Start' })).toBeInTheDocument();
            const timer = screen.getByTitle("timer");
            expect(timer).toBeInTheDocument();
            expect(timer).toHaveTextContent('00:03');
        })

        it("that shows who's next when the time is over", () => {
            render(<MobProgrammingRPG
                initGame={new Game({ players: ["Gregor", "Peter", "Rita"], timer: 60 * 4 })}
                clock={clock}
            />);
            fireEvent.click(getButton({ name: 'Start' }));

            advanceTimeBy(1000 * 60 * 4)

            expect(screen.getByText("Time is over")).toBeInTheDocument();
            expect(screen.getByTitle("Next Typing")).toHaveTextContent("Peter");
            expect(screen.getByTitle("Next Typing")).toHaveTextContent("Typing");
            expect(screen.getByTitle("Next Navigator")).toHaveTextContent("Rita");
            expect(screen.getByTitle("Next Navigator")).toHaveTextContent("Navigator");
        })

        it("that allows to continue after the time is over", () => {
            render(<MobProgrammingRPG
                initGame={new Game({ players: ["Gregor", "Peter", "Rita"], timer: 60 * 4 })}
                clock={clock}
            />);
            fireEvent.click(getButton({ name: 'Start' }));
            advanceTimeBy(1000 * 60 * 4)
            fireEvent.click(getButton({ name: 'Close' }));
            expect(screen.queryByText("Time is over")).not.toBeInTheDocument();

            fireEvent.click(getButton({ name: 'Start' }));
            advanceTimeBy(1000 * 60)

            expect(screen.getByTitle("timer")).toHaveTextContent('03:00');
        })

        it('changed players remain until after countdown', () => {
            render(<MobProgrammingRPG
                initGame={new Game({ timer: 1 })}
                clock={clock}
            />);
            changePlayers('1,2,3');
            changePlayers('2,3');

            fireEvent.click(getButton({ name: 'Start' }));
            advanceTimeBy(1000);

            const items = getPlayerListItems();
            expect(items.length).toBe(2);
            expect(items[0]).toHaveTextContent('2');
            expect(items[1]).toHaveTextContent('3');
        })

    })

    describe('uses websockets', () => {

        it('initially subscribes the server', async () => {
            render(<MobProgrammingRPG initGame={new Game({id: "gameId"})} wsServer={wsServerUrl} />);

            await expect(server).toReceiveMessage(JSON.stringify({ "command": "subscribe", "id": "gameId" }))
        })

        it('handles a server notification', () => {
            render(<MobProgrammingRPG initGame={new Game({id: "gameId"})} wsServer={wsServerUrl} />);

            server.send(new Game({players: ["1"], id: "gameId"}).toJSON())

            const items = getPlayerListItems();
            expect(items.length).toBe(1);
            expect(items[0]).toHaveTextContent('1');
        })

        it('updates the server', async () => {
            render(<MobProgrammingRPG initGame={new Game({id: "gameId"})} wsServer={wsServerUrl} />);

            await expect(server).toReceiveMessage(JSON.stringify({ "command": "subscribe", "id": "gameId" }))

            changePlayers('2,3');

            await expect(server).toReceiveMessage(
                JSON.stringify(
                    {
                        "command": "save",
                        "game": JSON.parse(new Game({players:['2', '3'],id: 'gameId'}).toJSON())
                    }
                )
            );
        })
    });
})
