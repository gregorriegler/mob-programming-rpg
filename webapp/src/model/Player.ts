import { levelOf, levels, Role } from "./Roles";

export const avatars = [
    "dar1",
    "dev",
    "dodo",
    "drk1",
    "drk2",
    "gol1",
    "gzn1",
    "lad1",
    "lad2",
    "lad3",
    "lad4",
    "lad5",
    "mar1",
    "max1",
    "max2",
    "max3",
    "mut",
    "nin1",
    "pir1",
    "pir2",
    "pir3",
    "rat",
    "ske",
    "wer",
    "yed1",
];

export type Avatar = typeof avatars[number]

export class Score {
    points: number = 0

    private readonly MAXIMUM_SCORE = 3;

    constructor(value: number = 0) {
        this.points = value
    }

    isMaximum(): boolean {
        return this.points >= this.MAXIMUM_SCORE;
    }

    increaseScoreUntilMaximum(): Score {
        return new Score(Math.min(this.MAXIMUM_SCORE, this.points + 1));
    }
}

export class Player {
    private readonly _name: string;
    private _avatar: Avatar;
    // does Player needs to know anything about points?
    private readonly _points: Map<Role, Score>;
    private readonly _badges = new Set<Role>();

    static fromObject(json: { badges: Role[]; roles: { [key in Role]?: number }; name: string; avatar: Avatar; }): Player {
        const roles = new Map<Role, Score>();
        for (let role in json.roles) {
            roles.set(role as Role, new Score(json.roles[role]));
        }
        return new Player(json.name, json.avatar, roles, json.badges);
    }

    constructor(
        name: string,
        avatar: Avatar = 'dodo',
        points: Map<Role, Score> = new Map<Role, Score>(levels[0].map(role => [role, new Score()])),
        badges: Role[] = [],
    ) {
        this._name = name;
        this._avatar = avatar;
        this._points = points
        this._badges = new Set<Role>(badges);
    }

    name() {
        return this._name;
    }

    avatar() {
        return this._avatar;
    }

    changeAvatar(avatar: Avatar) {
        this._avatar = avatar;
    }

    level() {
        return Array.from(levels.keys())
            .reduce((reachedLevel, currentLevel) => {
                return this.hasCompleted(currentLevel) ? ++currentLevel : reachedLevel;
            }, 0);
    }

    badges() {
        return Array.from(this._badges);
    }

    selectableRoles() {
        for (let nextLevel = 1; nextLevel <= Array.from(levels.keys()).length; nextLevel++) {
            if (this.canSelectRoleFor(nextLevel)) {
                return levels[nextLevel];
            }
        }
        return [];
    }

    selectRole(role: Role) {
        if (this.hasRole(role)) {
            return;
        }
        if (!this.canSelectRoleFor(levelOf(role))) {
            throw Error("Need to complete the current Roles first");
        }
        this._points.set(role, new Score());
    }

    roles() {
        return Array.from(this._points.keys());
    }

    hasBadge(role: Role) {
        return this._badges.has(role)
    }

    scoreTimes(role: Role, times) {
        for (let i = 0; i < times; i++) {
            this.score(role);
        }
    }

    score(role: Role) {
        if (!this.hasRole(role)) {
            return;
        }
        this.increasePointsFor(role);
        const score = this._points.get(role);
        if (score?.isMaximum()) {
            this._badges.add(role);
        }
    }

    pointsFor(role: Role): number {
        if (!this.hasRole(role)) {
            return 0;
        }

        return this._points.get(role)!.points;
    }

    percentageFor(role: Role) {
        if (this.pointsFor(role) === 3) return 100
        return (this.pointsFor(role) * 33.3);
    }

    private hasCompleted(level: number) {
        return levels[level].some(it => this.hasBadge(it));
    }

    private increasePointsFor(role: Role) {
        const oldScore = this._points.get(role);
        this._points.set(role, oldScore!.increaseScoreUntilMaximum());
    }

    private canSelectRoleFor(level) {
        return this.hasCompleted(level - 1) && !this.hasRoleForLevel(level);
    }

    private hasRoleForLevel(level: number) {
        return this.roles().some(it => levels[level].includes(it));
    }

    private hasRole(role: Role) {
        return this._points.has(role);
    }

    toObject() {
        return {
            "name": this._name,
            "avatar": this._avatar,
            "roles": Object.fromEntries(Array.from(this._points.entries()).map(([role, point]) => ([role, point.points]))),
            "badges": Array.from(this._badges)
        };
    }
}
