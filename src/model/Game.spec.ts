import { Game } from "./Game";

describe('Game', () => {
    it('starts with an empty list of players', () => {
        const game = new Game();

        expect(game.players()).toEqual([]);
    });

    it('can add a player', () => {
        const game = new Game();

        game.setPlayers('Max');

        expect(game.players()).toEqual(['Max']);
    });

    it('can many players, even with dirty whitespace', () => {
        const game = new Game();

        game.setPlayers('Max,Rita,  Peter');

        expect(game.players()).toEqual(['Max', 'Rita', 'Peter']);
    });

    it('can set players by array', () => {
        const game = new Game();

        game.setPlayers(['Max', 'Rita', 'Peter']);

        expect(game.players()).toEqual(['Max', 'Rita', 'Peter']);
    });

    it('has the first player starting as a driver', () => {
        const game = new Game();

        game.setPlayers('Max,Rita,  Peter');

        expect(game.driver()).toEqual('Max');
        expect(game.navigator()).toEqual('Rita');
        expect(game.next()).toEqual('Peter');
    });

    it('rotates', () => {
        const game = new Game();
        game.setPlayers('Max,Rita,Peter');

        game.rotate();

        expect(game.driver()).toEqual('Rita');
        expect(game.navigator()).toEqual('Peter');
        expect(game.next()).toEqual('Max');
    });
});
