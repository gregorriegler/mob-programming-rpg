enum RoleIndex {
    Driver,
    Navigator,
    Next
}

export class Game {
    constructor(players: string[] = []) {
        this._players = players
    }

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
        return this.whoIs(RoleIndex.Driver);
    }

    navigator() {
        return this.whoIs(RoleIndex.Navigator);
    }

    next() {
        return this.whoIs(RoleIndex.Next);
    }

    private whoIs(index: RoleIndex) {
        return this._players[(index + this._rotations) % this._players.length];
    }

    rotate() {
        this._rotations++;
    }

    roleOf(player: string) {
        if (this.driver() === player) return 'Driver';
        if (this.navigator() === player) return 'Navigator';
        if (this.next() === player) return 'Next';
        return undefined;
    }
}
