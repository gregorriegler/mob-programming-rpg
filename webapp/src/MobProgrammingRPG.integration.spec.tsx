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
    return `${8000 + Math.floor(Math.random()*100)}`;
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

        await execa("/home/gitpod/.nvm/versions/node/v16.18.1/bin/npm", ["install"], { cwd: "../wsserver" });
        port = randomPort();
        child = execa("/home/gitpod/.nvm/versions/node/v16.18.1/bin/npm", ["start"], { cwd: "../wsserver", all: true, env: { PORT: port } });
        await new Promise<string>(
            (resolve) => {
                child.all?.on("data", (d) => {
                    console.log("data: " + String(d));
                    if (/WS Server running/.test(String(d))) {
                        child.all?.removeAllListeners("data");
                        child.all?.on("data", (d) => { console.log("server: " + String(d)); });
                        resolve(String(d));
                    }
                })
            }
        );

    })

    afterEach(() => {
        child?.all?.removeAllListeners("data");
        child.kill();
    })

    xit('gamestate will be propagated to another instance of MobProgrammingRPG on an update', async () => {
        const result = render(
            <>
                <div id="rpg1"><MobProgrammingRPG initGame={Game.withProps({ id: "gameId", players: ["Gregor", "Peter", "Rita", "Ben"] })} /></div>
                <div id="rpg2"><MobProgrammingRPG initGame={Game.withProps({ id: "gameId" })} /></div>
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

    xit('two games with the same init game - same players', async () => {
        const game = Game.withProps({ id: "gameId2", players: ["Gregor", "Peter", "Rita", "Ben"], timer: 1 });
        const URL="ws://localhost:" + port;
        const result = render(
            <>
                <div id="rpg1"><MobProgrammingRPG initGame={game} wsServer={URL} /></div>
                <div id="rpg2"><MobProgrammingRPG initGame={game} wsServer={URL} /></div>
            </>
        );

        await new Promise((resolve) => setTimeout(resolve, 1000));
        const rpg1 = document.getElementById('rpg1')!;
        const rpg2 = document.getElementById('rpg2')!;
        const playerList1 = within(rpg1).getByRole('list', { name: /Player List/ });
        expect(playerList1.childElementCount).toEqual(5);

        const playerList2 = within(rpg2).getByRole('list', { name: /Player List/ });
        expect(playerList2.childElementCount).toEqual(5);


        const players = within(playerList2).queryAllByRole("listitem");
        expect(within(players[0]).queryAllByRole('heading', { level: 2 })[0]).toHaveTextContent('Driver');
        expect(within(players[1]).queryAllByRole('heading', { level: 2 })[0]).toHaveTextContent('Navigator');
        expect(within(players[2]).queryAllByRole('heading', { level: 2 })[0]).toHaveTextContent('Mobber');
        // check role "typist" - who is it?

        await act(async () => {
            const timerButton = within(rpg1).getByRole("button", { name: /Start/i })
            fireEvent.click(timerButton)
        })

        await new Promise((resolve) => setTimeout(resolve, 2500));


        // now the role is the following player
        expect(within(players[0]).queryAllByRole('heading', { level: 2 })[0]).toHaveTextContent('Mobber');
        expect(within(players[1]).queryAllByRole('heading', { level: 2 })[0]).toHaveTextContent('Driver');
        expect(within(players[2]).queryAllByRole('heading', { level: 2 })[0]).toHaveTextContent('Navigator');

    });
})
