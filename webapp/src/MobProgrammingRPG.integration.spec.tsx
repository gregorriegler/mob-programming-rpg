import { act, fireEvent, render, within } from "@testing-library/react";
import React from "react";
import execa from "execa";
import MobProgrammingRPG from "./MobProgrammingRPG";
import { Game } from "./model/Game";
import { withinElementGetButton } from "./TestHarnessConvenienceFunctions";

const randomPort = () => {
    return `${8000 + Math.floor(Math.random() * 100)}`;
}

describe('Mob Programming RPG', () => {

    beforeAll(() => {
        global.IS_REACT_ACT_ENVIRONMENT = false;
    })

    let child;
    let port;

    const makeGame = () => new Game({ id: "gameId2", players: ["Gregor", "Peter", "Rita", "Ben"], timer: 1 });

    beforeEach(async () => {
        window.history.pushState({}, "GameId", "/")
        localStorage.clear();

        await execa("npm", ["install"], { cwd: "../wsserver" });
        port = randomPort();
        child = execa("timeout", ["20", "npm", "start"], { cwd: "../wsserver", all: true, env: { PORT: port } });
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

    afterEach(() => {
        child?.all?.removeAllListeners("data");
        child?.kill();
        // this kills all the wsservers:
        // kill -9 $(ps aux | grep ts-node | grep -v grep | grep -Po '    \d{4}')
    })

    const itButNotOnOurCi = process.env.CI ? xit : it;

    itButNotOnOurCi('two games with the same init game - same initial player positions', async () => {
        const [
            client1,
            client2
        ] = await renderTwoGameClients(makeGame());

        expectPlayerPositions(client1, ['Typing', 'Talking', 'Observing']);
        expectPlayerPositions(client2, ['Typing', 'Talking', 'Observing']);
    });

    itButNotOnOurCi('two game clients with the same init game - same positions after rotation', async () => {
        const [
            client1,
            client2
        ] = await renderTwoGameClients(makeGame());

        await startTimer(client1);
        await waitForRotation();

        expectPlayerPositions(client1, ['Observing', 'Typing', 'Talking']);
        expectPlayerPositions(client2, ['Observing', 'Typing', 'Talking']);
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
        const client2Element = document.getElementById('rpg2')!

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
        const timerButton = withinElementGetButton(client1, { name: /Start/i });
        fireEvent.click(timerButton);
    });
}

function expectPlayerPositions(rpg2Element: HTMLElement, expectedPositions:string[]) {
    const cardList = within(rpg2Element).getByRole('list', { name: /Player List/ });
    const playerCards = within(cardList).queryAllByRole("listitem");
    
    expectedPositions.forEach((position, i) => expect(getPositionFromCard(playerCards[i])).toHaveTextContent(position))
}

function getPositionFromCard(playerCard): HTMLElement {
    return within(playerCard).queryAllByRole('heading', { level: 2 })[0];
}

async function waitOneSecond() {
    await new Promise((resolve) => setTimeout(resolve, 1000));
}

