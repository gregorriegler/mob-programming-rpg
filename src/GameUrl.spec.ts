import { gameIdFromUrl } from "./GameIdFromUrl";

describe('GameUrl', () => {

    it('reads the given gameId from the uri', () => {
        process.env.PUBLIC_URL = "/mob"
        window.history.pushState({}, "", "/mob/1")

        const gameId = gameIdFromUrl();

        expect(gameId).toEqual("1");
    });

    it('reads the gameId when env is empty', () => {
        process.env.PUBLIC_URL = ""
        window.history.pushState({}, "", "/1")

        const gameId = gameIdFromUrl();

        expect(gameId).toEqual("1");
    });

    it('yields no gameId when it is missing in the uri', () => {
        process.env.PUBLIC_URL = "/mob"
        window.history.pushState({}, "", "/mob")

        const gameId = gameIdFromUrl();

        expect(gameId).toBeUndefined();
    });

    it('yields no gameId when it is missing in the uri and env is empty', () => {
        process.env.PUBLIC_URL = ""
        window.history.pushState({}, "", "/")

        const gameId = gameIdFromUrl();

        expect(gameId).toBeUndefined();
    });
});