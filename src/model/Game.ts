import { Player } from "./Player";

enum RoleIndex {
    Driver,
    Navigator
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
        this._players = players;
        this._rotations = rotations;
    }

    private _players: Player[];

    private _rotations;
    
    players() {
        return this._players;
    }

    setPlayers(players: string) {
        this._players = players.split(',')
            .map(player => player.trim())
            .filter(it => it !== "").map(it => new Player(it));
    }

    driver() {
        return this.whoIs(RoleIndex.Driver);
    }

    navigator() {
        return this.whoIs(RoleIndex.Navigator);
    }
    
    next() {
        return this.getPlayer(RoleIndex.Navigator + 1).name();
    }

    private whoIs(index: RoleIndex) {
        return this.getPlayer(index).name();
    }

    private getPlayer(index: number) {
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
        return 'Mobber';
    }

    toJSON() {
        return JSON.stringify({
            players: this._players.map(it => it.toObject()),
            rotations: this._rotations,
        })
    }
}
