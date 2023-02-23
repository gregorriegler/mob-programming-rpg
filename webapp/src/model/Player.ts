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

    incrementScoreUntilMaximum(): Score {
        return new Score(Math.min(this.MAXIMUM_SCORE, this.points + 1));
    }

    asPercentage() {
        if (this.points === this.MAXIMUM_SCORE) return 100
        return (this.points * this.roundToOneDecimal(100 / this.MAXIMUM_SCORE));
    }

    private roundToOneDecimal(input: number) {
        return Math.round(input * 10) / 10
    }
}

class RoleSheets {
    public readonly _roleSheets: Map<Role, Score>;

    static empty(): RoleSheets {
        return new RoleSheets(new Map<Role, Score>(levels[0].map(role => [role, new Score()])));
    }

    static fromObject(roles: { [key in Role]?: number }): RoleSheets {
        const _roles = new Map<Role, Score>();
        for (let role in roles) {
            _roles.set(role as Role, new Score(roles[role]));
        }
        return new RoleSheets(_roles);
    }

    constructor(points: Map<Role, Score>) {
        this._roleSheets = points;
    }
}

export class Player {
    private readonly _name: string;
    private _avatar: Avatar;
    // does Player needs to know anything about points?
    private readonly _roleSheets: RoleSheets;
    private readonly _badges = new Set<Role>();

    static fromObject(json: { badges: Role[]; roles: { [key in Role]?: number }; name: string; avatar: Avatar; }): Player {
        return new Player(json.name, json.avatar, RoleSheets.fromObject(json.roles), json.badges);
    }

    constructor(
        name: string,
        avatar: Avatar = 'dodo',
        roleSheets: RoleSheets = RoleSheets.empty(), 
        badges: Role[] = [],
    ) {
        this._name = name;
        this._avatar = avatar;
        this._roleSheets = roleSheets;
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
        this._roleSheets._roleSheets.set(role, new Score());
    }

    roles() {
        return Array.from(this._roleSheets._roleSheets.keys());
    }

    hasBadge(role: Role) {
        return this._badges.has(role)
    }

    scoreTimes(role: Role, times) {
        for (let i = 0; i < times; i++) {
            this.doScoreAndAddBadge(role);
        }
    }

    doScoreAndAddBadge(role: Role) {
        if (!this.hasRole(role)) {
            return;
        }
        this.increasePointsFor(role);
        this.addBadgeForMaximumScore(role);
    }

    private addBadgeForMaximumScore(role: Role) {
        const score = this._roleSheets._roleSheets.get(role);
        if (score?.isMaximum()) {
            this._badges.add(role);
        }
    }

    pointsFor(role: Role): number {
        if (!this.hasRole(role)) {
            return 0;
        }

        return this._roleSheets._roleSheets.get(role)!.points;
    }

    percentageFor(role: Role) {
        return this._roleSheets._roleSheets.get(role)!.asPercentage();
    }

    private hasCompleted(level: number) {
        return levels[level].some(it => this.hasBadge(it));
    }

    private increasePointsFor(role: Role) {
        const oldScore = this._roleSheets._roleSheets.get(role);
        this._roleSheets._roleSheets.set(role, oldScore!.incrementScoreUntilMaximum());
    }

    private canSelectRoleFor(level) {
        return this.hasCompleted(level - 1) && !this.hasRoleForLevel(level);
    }

    private hasRoleForLevel(level: number) {
        return this.roles().some(it => levels[level].includes(it));
    }

    private hasRole(role: Role) {
        return this._roleSheets._roleSheets.has(role);
    }

    toObject() {
        return {
            "name": this._name,
            "avatar": this._avatar,
            "roles": Object.fromEntries(Array.from(this._roleSheets._roleSheets.entries()).map(([role, point]) => ([role, point.points]))),
            "badges": Array.from(this._badges)
        };
    }
}
