import MobProgrammingRPG from "./MobProgrammingRPG";
import { act, fireEvent, render, screen, within } from "@testing-library/react";
import React from "react";
import execa from "execa";

import { ClockStub, MilliSeconds } from "./model/Clock";
import { DEFAULT_TIMER, Game } from "./model/Game";
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

const randomPort = () => {
    return `${8000 + Math.floor(Math.random() * 100)}`;
}

describe('Mob Programming RPG', () => {

    beforeAll(() => {
        global.IS_REACT_ACT_ENVIRONMENT = false;
    })

    let server;
    let child;
    let port;


    beforeEach(async () => {
        // run an `npm start` in the ws folder
        // execa("npm start", { pwd: "../wsserver" })

        window.history.pushState({}, "GameId", "/")
        localStorage.clear();

        await execa("npm", ["install"], { cwd: "../wsserver" });
        port = randomPort();
        child = execa("npm", ["start"], { cwd: "../wsserver", all: true, env: { PORT: port } });
        await new Promise<string>(
            (resolve) => {
                child.all?.on("data", (d) => {
                    console.log("data: " + String(d));
                    if (/WS Server running/.test(String(d))) {
                        child.all?.removeAllListeners("data");
                        // child.all?.on("data", (d) => { console.log("server: " + String(d)); });
                        resolve(String(d));
                    }
                })
            }
        );

    }, 30000)

    // todo this is not running. The servers should just die on their own.
    afterEach(() => {
        child?.all?.removeAllListeners("data");
        child?.kill();
        // this kills all the wsservers:
        // kill -9 $(ps aux | grep ts-node | grep -v grep | grep -Po '    \d{5}')
    })

    xit('gamestate will be propagated to another instance of MobProgrammingRPG on an update', async () => {
        const result = render(
            <>
                <div id="rpg1"><MobProgrammingRPG initGame={new Game({ id: "gameId", players: ["Gregor", "Peter", "Rita", "Ben"] })} /></div>
                <div id="rpg2"><MobProgrammingRPG initGame={new Game({ id: "gameId" })} /></div>
            </>
        );

        await new Promise((resolve) => setTimeout(resolve, 1000));
        const rpg1 = document.getElementById('rpg1')!;
        const rpg2 = document.getElementById('rpg2')!;
        const playerList1 = within(rpg1).getByRole('list', { name: /Player List/ });
        expect(playerList1.childElementCount).toEqual(5);

        const playerList2 = within(rpg2).getByRole('list', { name: /Player List/ });
        expect(playerList2.childElementCount).toEqual(1);

        await act(async () => {
            const timerButton = within(rpg1).getByRole("button", { name: /Start/i })
            fireEvent.click(timerButton)
            await new Promise((resolve) => setTimeout(resolve, 1000));
        })

        expect(playerList2.childElementCount).toEqual(5);
    });

    const itButNotOnOurCi = process.env.CI ? xit : it;

    // TODO - are those actually two tests? should we separate them?
    itButNotOnOurCi('two games with the same init game - same players', async () => {
        const game = new Game({ id: "gameId2", players: ["Gregor", "Peter", "Rita", "Ben"], timer: 1 });

        const [
            client1,
            client2
        ] = await renderTwoGameClients(game);

        expectPlayerPositions(client1, ['Driver', 'Navigator', 'Mobber']);
        expectPlayerPositions(client2, ['Driver', 'Navigator', 'Mobber']);

        await startTimer(client1);

        await waitForRotation();

        expectPlayerPositions(client1, ['Mobber', 'Driver', 'Navigator']);
        expectPlayerPositions(client2, ['Mobber', 'Driver', 'Navigator']);
        // TODO:  Eddie suggested something about returning players vs ???
    });

    async function renderTwoGameClients(game: Game) {
        const URL = "ws://localhost:" + port;
        render(
            <>
                <div id="rpg1"><MobProgrammingRPG initGame={game} wsServer={URL} /></div>
                <div id="rpg2"><MobProgrammingRPG initGame={game} wsServer={URL} /></div>
            </>
        );

        await waitOneSecond();

        const client1Element = document.getElementById('rpg1')!
        const client2Element = document.getElementById('rpg1')!

        const playerList1 = within(client1Element).getByRole('list', { name: /Player List/ });
        expect(playerList1.childElementCount).toEqual(5);

        const playerList2 = within(client2Element).getByRole('list', { name: /Player List/ });
        expect(playerList2.childElementCount).toEqual(5);

        return [client1Element, client2Element];
    }
})

async function waitForRotation() {
    await new Promise((resolve) => setTimeout(resolve, 2500));
}

async function startTimer(client1: HTMLElement) {
    await act(async () => {
        const timerButton = within(client1).getByRole("button", { name: /Start/i });
        fireEvent.click(timerButton);
    });
}

function expectPlayerPositions(rpg2Element: HTMLElement, expectedPositions) {
    const cardList = within(rpg2Element).getByRole('list', { name: /Player List/ });
    const players = within(cardList).queryAllByRole("listitem");

    // We would like to get the role of the first player and make sure it is 'Driver'

    // extract - expectPositions
    expect(within(players[0]).queryAllByRole('heading', { level: 2 })[0]).toHaveTextContent(expectedPositions[0]);
    expect(within(players[1]).queryAllByRole('heading', { level: 2 })[0]).toHaveTextContent(expectedPositions[1]);
    expect(within(players[2]).queryAllByRole('heading', { level: 2 })[0]).toHaveTextContent(expectedPositions[2]);

    return players;
}

async function waitOneSecond() {
    await new Promise((resolve) => setTimeout(resolve, 1000));
}

