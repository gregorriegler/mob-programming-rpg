enum RoleIndex {
    Driver,
    Navigator,
    Next
}

class Game {
    private _players = [];
    private _rotations = 0;

    players() {
        return this._players;
    }

    setPlayers(players: string) {
        this._players = players.split(',')
            .map(player => player.trim())
            .filter(it => it !== "");
    }

    driver() {
        return this.roleOf(RoleIndex.Driver);
    }

    navigator() {
        return this.roleOf(RoleIndex.Navigator);
    }

    next() {
        return this.roleOf(RoleIndex.Next);
    }

    private roleOf(index: RoleIndex) {
        return this._players[(index + this._rotations) % this._players.length];
    }

    rotate() {
        this._rotations++;
    }
}

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
