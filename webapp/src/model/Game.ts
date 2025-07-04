import { Avatar, Player } from "./Player";

const TYPER = "Typing";
const NAVIGATOR = "Talking";
export const GAMEPLAY_ORDER_TYPER_THEN_NAVIGATOR: string = "Typing,Talking"
export const GAMEPLAY_ORDER_NAVIGATOR_THEN_TYPER: string = "Talking,Typing"

export type GameId = string;
type Seconds = number;
export type TimerStatus = "STOPPED" | "STARTED";

export const DEFAULT_TIMER = 4 * 60;

function generateId() {
    return Math.random().toString(36).replace('0.', '');
}

export type GameProps = {
    id?: GameId,
    players?: string[],
    playerObjects?: Player[],
    timer?: Seconds,
    timerStatus?: TimerStatus,
    rotations?: number,
    targetRotation?: number | undefined,
}

export class Game {
    static fromJSON(json: string) {
        const parsedObject = JSON.parse(json);

        return new Game({
            id: parsedObject.id,
            playerObjects: parsedObject.players.map(it => Player.fromObject(it)),
            timer: parsedObject.timer.value,
            timerStatus: parsedObject.timer.status,
            rotations: parsedObject.rotations,
            targetRotation: parsedObject.targetRotation
        });
    }

    private readonly _id: GameId;
    private _mob: Player[];
    private _timer: Seconds;
    private _timerStatus: TimerStatus;
    private _targetRotation;
    private _rotations;
    private _roleIndex = [TYPER, NAVIGATOR];

    constructor({
        id = generateId(),
        players = [],
        playerObjects,
        timer = DEFAULT_TIMER,
        timerStatus = "STOPPED",
        rotations = 0,
        targetRotation = undefined,
    }: GameProps = {}) {
        this._id = id;
        this._mob = playerObjects || players.map(name => new Player(name));
        this._timer = timer;
        this._timerStatus = timerStatus;
        this._rotations = rotations;
        this._targetRotation = targetRotation;
    }

    id() {
        return this._id;
    }

    // game.mob.getPlayers()
    // game.mob.names()
    // game.mob.getTyper()
    // game.mob.getTyper()

    mob() {
        return this._mob;
    }

    playerNames() {
        return this._mob.map(player => player.name).join(", ")
    }

    timer() {
        return this._timer;
    }

    timerInMinutes() {
        return this._timer / 60;
    }

    changeTimer(timer: number) {
        this._timer = timer;
    }

    timerStatus() {
        return this._timerStatus;
    }

    startTimer() {
        this._timerStatus = "STARTED";
        this._targetRotation = this._rotations + 1;
    }

    stopTimer() {
        this._timerStatus = "STOPPED";
    }

    setPlayers(players: string) {
        this._mob = players.split(',')
            .map(player => player.trim())
            .filter(it => it !== "")
            .map(it => this.findPlayerByName(it) || new Player(it));
    }

    addPlayer(name: string, avatar: Avatar) {
        this._mob.push(new Player(name.trim(), avatar))
    }

    typer() {
        return this.whoIs(this.indexOfTyper());
    }

    private indexOfTyper() {
        return this._roleIndex.indexOf(TYPER);
    }

    navigator() {
        return this.whoIs(this.indexOfNavigator());
    }

    next() {
        return this.getPlayer(2).name;
    }

    private indexOfNavigator() {
        return this._roleIndex.indexOf(NAVIGATOR);
    }

    rotate() {
        this._rotations++;
    }

    rotateToTarget() {
        this._rotations = this._targetRotation;
    }

    rotations() {
        return this._rotations;
    }

    targetRotation(): number | undefined {
        return this._targetRotation;
    }

    positionOf(player: string) {
        if (this.typer() === player) return TYPER;
        if (this.navigator() === player) return NAVIGATOR;
        return 'Observing';
    }

    toJSON() {
        return JSON.stringify({
            id: this._id,
            players: this._mob.map(it => it.toObject()),
            timer: {
                value: this._timer,
                status: this._timerStatus
            },
            rotations: this._rotations,
            targetRotation: this._targetRotation,
        })
    }

    clone() {
        return Object.assign(Object.create(Object.getPrototypeOf(this)), this);
    }

    private findPlayerByName(name: string) {
        return this._mob.find(it => it.name === name)
    }

    private whoIs(index: number) {
        const player = this.getPlayer(index);
        if (!player) return "???"
        return player.name;
    }

    private getPlayer(index: number) {
        return this._mob[(index + this._rotations) % this._mob.length];
    }

    navigatorThenTyping() {
        this._roleIndex = [NAVIGATOR, TYPER];
    }

    typingThenNavigator() {
        this._roleIndex = [TYPER, NAVIGATOR];
    }
}
