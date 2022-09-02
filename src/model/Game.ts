import { Player } from "./Player";

enum RoleIndex {
    Driver,
    Navigator,
    Next
}

export class Game {
    static fromJSON(json: string) {
        const parsedObject = JSON.parse(json);
        return new Game(
            parsedObject.players.map(it => Player.fromObject(it)),
            parsedObject.rotations
        );
    }

    static withPlayers(players: string[]) {
        return new Game(players.map(name => new Player(name)));
    }

    constructor(players: Player[] = [], rotations: number = 0) {
        this._players = players.map(it => it.name());
        this._playersNew = players;
        this._rotations = rotations;
    }
    private _players: string[];

    private _playersNew: Player[];

    private _rotations;

    getPlayers() {
        return this._players;
    }

    players() {
        return this._playersNew;
    }

    setPlayers(players: string) {
        this._players = players.split(',')
            .map(player => player.trim())
            .filter(it => it !== "");
        this._playersNew = this._players.map(it => new Player(it));
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
    
    rotations() {
        return this._rotations;
    }

    roleOf(player: string) {
        if (this.driver() === player) return 'Driver';
        if (this.navigator() === player) return 'Navigator';
        if (this.next() === player) return 'Next';
        return undefined;
    }

    toJSON() {
        return JSON.stringify({
            players: this._playersNew.map(it => it.toObject()),
            rotations: this._rotations,
        })
    }
}
