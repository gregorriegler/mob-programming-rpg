import { Player } from "./Player";

enum RoleIndex {
    Driver,
    Navigator
}

export type GameId = string;
type Seconds = number;
export type TimerStatus = "STOPPED" | "STARTED";

export const DEFAULT_TIMER = 4 * 60;

function generateId() {
    return Math.random().toString(36).replace('0.', '');
}

export class Game {
    static fromJSON(json: string) {
        const parsedObject = JSON.parse(json);
        return new Game(
            parsedObject.id,
            parsedObject.players.map(it => Player.fromObject(it)),
            parsedObject.timer.value,
            parsedObject.timer.status,
            parsedObject.rotations
        );
    }

    static withPlayers(players: string[], timer: Seconds = DEFAULT_TIMER, id: GameId = generateId()) {
        return new Game(id, players.map(name => new Player(name)), timer);
    }

    private readonly _id: GameId;
    private _players: Player[];
    private _timer: Seconds;
    private _timerStatus: TimerStatus;
    private _rotations;

    constructor(
        id: GameId,
        players: Player[] = [],
        timer: Seconds = DEFAULT_TIMER,
        timerStatus: TimerStatus = "STOPPED",
        rotations: number = 0
    ) {
        this._id = id;
        this._players = players;
        this._timer = timer;
        this._timerStatus = timerStatus;
        this._rotations = rotations;
    }

    id() {
        return this._id;
    }

    players() {
        return this._players;
    }

    playerNames() {
        return this._players.map(player => player.name()).join(", ")
    }

    timer() {
        return this._timer;
    }

    timerStatus() {
        return this._timerStatus;
    }

    startTimer() {
        this._timerStatus = "STARTED";
    }

    stopTimer() {
        this._timerStatus = "STOPPED";
    }

    setPlayers(players: string) {
        this._players = players.split(',')
            .map(player => player.trim())
            .filter(it => it !== "")
            .map(it => this.findPlayerByName(it) || new Player(it));
    }

    addPlayer(name: string) {
        this._players.push(new Player(name))
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
            id: this._id,
            players: this._players.map(it => it.toObject()),
            timer: {
                value: this._timer,
                status: this._timerStatus
            },
            rotations: this._rotations,
        })
    }

    clone() {
        return Object.assign(Object.create(Object.getPrototypeOf(this)), this);
    }

    private findPlayerByName(name: string) {
        return this._players.find(it => it.name() === name)
    }

    private whoIs(index: RoleIndex) {
        const player = this.getPlayer(index);
        if (!player) return "???"
        return player.name();
    }

    private getPlayer(index: number) {
        return this._players[(index + this._rotations) % this._players.length];
    }
}
