import MobProgrammingRPG from "./MobProgrammingRPG";
import { act, fireEvent, render, screen, within } from "@testing-library/react";
import React from "react";
import execa from "execa";

import { ClockStub, MilliSeconds } from "./model/Clock";
import { DEFAULT_TIMER, Game } from "./model/Game";
import WS from "jest-websocket-mock";
import { DRIVER_THEN_NAVIGATOR, NAVIGATOR_THEN_DRIVER } from "./model/Roles";

function getPlayerListItems() {
    const playerList = screen.getByRole('list', { name: /Player List/ });
    return within(playerList).queryAllByRole("listitem");
}

function getSettingsButton() {
    return screen.getByRole('button', { name: 'Settings' });
}

function getPlayersTextarea() {
    return screen.getByLabelText('Change Players');
}

function getTimerInput() {
    return screen.getByLabelText(/Change Timer/);
}

function getRotateButton() {
    return screen.getByRole('button', { name: 'Rotate' });
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
        // run an `npm start` in the ws folder
        // execa("npm start", { pwd: "../wsserver" })
        
        window.history.pushState({}, "GameId", "/")
        server = new WS(wsServerUrl);
        localStorage.clear();
    })

    afterEach(() => {
        WS.clean();
    });

    xit('starts with an empty list of players', async () => {
        const child = execa("/home/gitpod/.nvm/versions/node/v16.18.1/bin/npm", ["start"],{ cwd: "../wsserver" });

        const idk = await new Promise<string>(
            (resolve) => {
                child.stdout?.on("data", (d) => {
                    console.log("data: " + String(d));
                    if (/WS Server running/.test(String(d))) {
                        resolve(String(d));
                    }
                })
            } 
        );
        expect(idk).toEqual('');
        render(<MobProgrammingRPG />);
        const playerList = screen.getByRole('list', { name: /Player List/ });
        expect(playerList.childElementCount).toEqual(1);
        expect(playerList).toHaveTextContent('Add Player');
    });

    xit('continues a game', () => {
        localStorage.setItem("continueId", Game.withPlayers(["1"]).toJSON())
        window.history.pushState({}, "GameId", "/continueId")

        render(<MobProgrammingRPG initGame={Game.withId("continueId")} />);

        const items = getPlayerListItems();
        expect(items).toHaveLength(1);
        expect(items[0]).toHaveTextContent('1');
    });

    xit('stores its state to localStorage', () => {
        render(<MobProgrammingRPG />);

        fireEvent.click(screen.getByRole('button', { name: 'Start' }));
        changePlayers('1,2')

        // @ts-ignore
        const gameFromLocalStorage = localStorage.getItem(window.location.pathname.splxit('/').pop());
        const savedGame = Game.fromJSON(gameFromLocalStorage!!);
        expect(savedGame.playerNames()).toEqual('1, 2');
        expect(savedGame.timerStatus()).toEqual('STARTED');
    });

    xit('creates a new game despite given localStorage', () => {
        localStorage.setItem("continueId", Game.withPlayers(["1"]).toJSON())
        window.history.pushState({}, "GameId", "/")
        render(<MobProgrammingRPG />);

        const playerList = screen.getByRole('list', { name: /Player List/ });
        expect(playerList.childElementCount).toEqual(1);
        expect(playerList).toHaveTextContent('Add Player');
    });

    xit('changes url for the created game id', () => {
        window.history.pushState({}, "GameId", "/")

        render(<MobProgrammingRPG />);

        expect(global.window.location.pathname).toMatch(/\/[a-zA-Z0-9]+/);
        expect(global.window.location.pathname).not.toEqual("/undefined");
    });

    xit('does not change a given id', () => {
        window.history.pushState({}, "GameId", "/existingId")

        render(<MobProgrammingRPG />);

        expect(global.window.location.pathname).toEqual("/existingId")
    });

    xit('shows players roles', () => {
        render(<MobProgrammingRPG initGame={Game.withPlayers(["Gregor", "Peter", "Rita", "Ben"])} />);

        const items = getPlayerListItems();
        expect(items[0]).toHaveTextContent('Gregor');
        expect(items[1]).toHaveTextContent('Peter');
        expect(items[2]).toHaveTextContent('Rita');
        expect(items[3]).toHaveTextContent('Ben');
    })

    xit('has a button to add a new player', () => {
        render(<MobProgrammingRPG />);

        fireEvent.click(screen.getByText("Add Player"));

        expect(screen.getByPlaceholderText(/Player Name/i)).toBeInTheDocument();
        expect(screen.getByText('Add')).toBeInTheDocument();
    })

    xit('adds a single player', () => {
        render(<MobProgrammingRPG />);
        fireEvent.click(screen.getByText("Add Player"));

        fireEvent.change(screen.getByPlaceholderText(/Player Name/i), { target: { value: "1" } });
        fireEvent.click(screen.getByAltText(/dev/i));
        fireEvent.click(screen.getByText('Add'));

        expect((getPlayerListItems())[0]).toHaveTextContent('1');
        expect((getPlayerListItems())[0]).toContainElement(screen.getByAltText('dev'));
        expect(screen.queryByPlaceholderText(/Player Name/i)).toBeNull();
    })

    xit('does not add a player that has no name', () => {
        render(<MobProgrammingRPG />);
        fireEvent.click(screen.getByText("Add Player"));

        fireEvent.change(screen.getByPlaceholderText(/Player Name/i), { target: { value: "    " } });
        fireEvent.click(screen.getByAltText(/dev/i));
        fireEvent.click(screen.getByText('Add'));

        expect((getPlayerListItems())).toHaveLength(0)
        expect(screen.getByPlaceholderText(/Player Name/i)).toBeInTheDocument();
        expect(screen.getByText('Add')).toBeInTheDocument();
    })

    xit('cancels adding a single player', () => {
        render(<MobProgrammingRPG />);
        fireEvent.click(screen.getByText("Add Player"));

        fireEvent.click(screen.getByText(/Cancel/i));

        expect(screen.queryByPlaceholderText(/Player Name/i)).toBeNull();
    })

    xit('has a rotate button that rotates the players', () => {
        render(<MobProgrammingRPG initGame={Game.withPlayers(["Gregor", "Peter", "Rita"])} />);

        fireEvent.click(getRotateButton());

        const items = getPlayerListItems();
        expect(items[0]).toHaveTextContent('Mobber');
        expect(items[1]).toHaveTextContent('Driver');
        expect(items[2]).toHaveTextContent('Navigator');
    })

    it("has a help button once clicked shows what a player should do", () => {
        render(<MobProgrammingRPG initGame={Game.withPlayers(["Gregor", "Peter", "Rita"])} />);

        const helpButton = screen.getByRole('button', { name: 'Help' });
        expect(helpButton).toBeInTheDocument();
        fireEvent.click(helpButton);
    })

    describe('has settings', () => {

        xit('that shows the players', () => {
            render(<MobProgrammingRPG initGame={Game.withPlayers(["Gregor", "Peter"])} />);

            fireEvent.click(getSettingsButton());

            expect(screen.getByLabelText('Change Players')).toHaveTextContent("Gregor, Peter");
        })

        xit('that toggle when you keep pressing the settings button', () => {
            render(<MobProgrammingRPG />);
            const settingsButton = getSettingsButton();

            fireEvent.click(settingsButton);
            expect(getPlayersTextarea()).toBeInTheDocument();

            fireEvent.click(settingsButton);
            expect(screen.queryByText('Change Players')).toBeNull();
        });

        xit('that allow to change players', () => {
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

        xit('that shows the timer in minutes', () => {
            render(<MobProgrammingRPG />);

            fireEvent.click(getSettingsButton());

            expect(getTimerInput()).toHaveValue("4");
        })

        xit('that allows to change the timer', () => {
            render(<MobProgrammingRPG />);
            fireEvent.click(getSettingsButton());

            fireEvent.change(getTimerInput(), { target: { value: '10' } });
            fireEvent.click(screen.getByText("Save"));

            expect(screen.getByTitle("timer")).toHaveTextContent('10:00');
        })

        xit('that allows to change rotation direction (Navigator -> Driver) <-> (Driver -> Navigator)', () => {
            render(<MobProgrammingRPG />);
            fireEvent.click(getSettingsButton());

            fireEvent.click(screen.getByRole('button', { name: NAVIGATOR_THEN_DRIVER }));
            expect(screen.getByRole('button', { name: DRIVER_THEN_NAVIGATOR })).toBeInTheDocument();

            fireEvent.click(screen.getByRole('button', { name: DRIVER_THEN_NAVIGATOR }));
            expect(screen.getByRole('button', { name: NAVIGATOR_THEN_DRIVER })).toBeInTheDocument();
        })

        xit('that allows to change rotation direction to (Navigator,Driver)', () => {
            const game = Game.withPlayers(["Gregor", "Peter", "Rita"]);
            jest.spyOn(game, "navigatorThenDriver");
            render(<MobProgrammingRPG initGame={game} />);
            fireEvent.click(getSettingsButton());

            fireEvent.click(screen.getByRole('button', { name: NAVIGATOR_THEN_DRIVER }));
            fireEvent.click(screen.getByText("Save"));

            expect(game.navigatorThenDriver).toHaveBeenCalledTimes(1);
        })

        xit('that allows to change rotation direction back to (Driver,Navigator)', () => {
            const game = Game.withPlayers(["Gregor", "Peter", "Rita"]);
            jest.spyOn(game, "navigatorThenDriver");
            jest.spyOn(game, "driverThenNavigator");
            render(<MobProgrammingRPG initGame={game} />);
            fireEvent.click(getSettingsButton());

            fireEvent.click(screen.getByRole('button', { name: NAVIGATOR_THEN_DRIVER }));
            fireEvent.click(screen.getByRole('button', { name: DRIVER_THEN_NAVIGATOR }));
            fireEvent.click(screen.getByText("Save"));

            expect(game.navigatorThenDriver).not.toHaveBeenCalled();
            expect(game.driverThenNavigator).toHaveBeenCalledTimes(1);
        })

        xit('close', () => {
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

        xit('that shows the time left', () => {
            render(<MobProgrammingRPG
                initGame={Game.withPlayers(["Gregor", "Peter", "Rita"])}
                wsServer={wsServerUrl}
            />);

            expect(screen.getByRole('button', { name: 'Start' })).toBeInTheDocument();
            const timer = screen.getByTitle("timer");
            expect(timer).toBeInTheDocument();
            expect(timer).toHaveTextContent('04:00');
        })

        xit('that keeps the timer stopped unless somebody starts it', () => {
            render(<MobProgrammingRPG />);

            advanceTimeBy(4000);

            const timer = screen.getByTitle("timer");
            expect(timer).toBeInTheDocument();
            expect(timer).toHaveTextContent('04:00');
        })

        xit('that shows the timer as was set in localStorage', () => {
            localStorage.setItem("continueId", Game.withPlayers([], 60, "continueId").toJSON())

            render(<MobProgrammingRPG initGame={Game.withId("continueId")} />);

            expect(screen.getByTitle("timer")).toHaveTextContent('01:00');
        })

        xit('that starts if games timer was started', () => {
            localStorage.setItem(
                "continueId",
                new Game(
                    "continueId",
                    [],
                    2,
                    "STARTED"
                ).toJSON()
            )
            render(<MobProgrammingRPG initGame={Game.withId("continueId")} />);

            advanceTimeBy(1000)

            expect(screen.getByTitle("timer")).toHaveTextContent('00:01');
        })

        xit('that is configurable', () => {
            render(<MobProgrammingRPG initGame={Game.withProps({ timer: 3 })} />);

            expect(screen.getByRole('button', { name: 'Start' })).toBeInTheDocument();
            const timer = screen.getByTitle("timer");
            expect(timer).toBeInTheDocument();
            expect(timer).toHaveTextContent('00:03');
        })

        it("that shows who's next when the time is over", () => {
            render(<MobProgrammingRPG
                initGame={Game.withProps({ players: ["Gregor", "Peter", "Rita"], timer: 60 * 4 })}
                clock={clock}
            />);
            fireEvent.click(screen.getByRole('button', { name: 'Start' }));

            advanceTimeBy(1000 * 60 * 4)

            expect(screen.getByText("Time is over")).toBeInTheDocument();
            expect(screen.getByTitle("Next Driver")).toHaveTextContent("Peter");
            expect(screen.getByTitle("Next Driver")).toHaveTextContent("Driver");
            expect(screen.getByTitle("Next Navigator")).toHaveTextContent("Rita");
            expect(screen.getByTitle("Next Navigator")).toHaveTextContent("Navigator");
        })

        it("that allows to continue after the time is over", () => {
            render(<MobProgrammingRPG
                initGame={Game.withProps({ players: ["Gregor", "Peter", "Rita"], timer: 60 * 4 })}
                clock={clock}
            />);
            fireEvent.click(screen.getByRole('button', { name: 'Start' }));
            advanceTimeBy(1000 * 60 * 4)
            fireEvent.click(screen.getByRole('button', { name: 'Close' }));
            expect(screen.queryByText("Time is over")).not.toBeInTheDocument();

            fireEvent.click(screen.getByRole('button', { name: 'Start' }));
            advanceTimeBy(1000 * 60)

            expect(screen.getByTitle("timer")).toHaveTextContent('03:00');
        })

        xit('changed players remain until after countdown', () => {
            render(<MobProgrammingRPG
                initGame={Game.withProps({ timer: 1 })}
                clock={clock}
            />);
            changePlayers('1,2,3');
            changePlayers('2,3');

            fireEvent.click(screen.getByRole('button', { name: 'Start' }));
            advanceTimeBy(1000);

            const items = getPlayerListItems();
            expect(items.length).toBe(2);
            expect(items[0]).toHaveTextContent('2');
            expect(items[1]).toHaveTextContent('3');
        })

    })

    describe('uses websockets', () => {

        xit('initially subscribes the server', async () => {
            render(<MobProgrammingRPG initGame={Game.withId("gameId")} wsServer={wsServerUrl} />);

            await expect(server).toReceiveMessage(JSON.stringify({ "command": "subscribe", "id": "gameId" }))
        })

        xit('handles a server notification', () => {
            render(<MobProgrammingRPG initGame={Game.withId("gameId")} wsServer={wsServerUrl} />);

            server.send(Game.withPlayers(["1"], DEFAULT_TIMER, "gameId").toJSON())

            const items = getPlayerListItems();
            expect(items.length).toBe(1);
            expect(items[0]).toHaveTextContent('1');
        })

        xit('updates the server', async () => {
            render(<MobProgrammingRPG initGame={Game.withId("gameId")} wsServer={wsServerUrl} />);

            await expect(server).toReceiveMessage(JSON.stringify({ "command": "subscribe", "id": "gameId" }))

            changePlayers('2,3');

            await expect(server).toReceiveMessage(
                JSON.stringify(
                    {
                        "command": "save",
                        "game": JSON.parse(Game.withPlayers(['2', '3'], DEFAULT_TIMER, 'gameId').toJSON())
                    }
                )
            );
        })
    });
})
