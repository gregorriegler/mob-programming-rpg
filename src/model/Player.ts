import { levelOf, levels, Role } from "./Roles";

export class Player {
    private readonly _name: string;
    private readonly _points: Map<Role, number>;
    private readonly _badges = new Set<Role>();

    static fromObject(json: { badges: Role[]; roles: { [key in Role]?: number }; name: string }): Player {
        const roles = new Map<Role, number>();
        for (let role in json.roles) {
            roles.set(role as Role, json.roles[role]);
        }
        return new Player(json.name, roles, json.badges);
    }

    constructor(
        name: string,
        points: Map<Role, number> = new Map<Role, number>(levels[0].map(role => [role, 0])),
        badges: Role[] = []
    ) {
        this._name = name;
        this._points = points
        this._badges = new Set<Role>(badges);
    }

    name() {
        return this._name;
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
        this._points.set(role, 0);
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
        if (this._points.get(role)!! >= 3) {
            this._badges.add(role);
        }
    }

    pointsFor(role: Role) {
        if (!this.hasRole(role)) {
            return 0;
        }
        return this._points.get(role);
    }

    toObject() {
        return {
            "name": this._name,
            "roles": Object.fromEntries(this._points.entries()),
            "badges": Array.from(this._badges)
        };
    }

    private hasCompleted(level: number) {
        return levels[level].some(it => this.hasBadge(it));
    }

    private increasePointsFor(role: Role) {
        this._points.set(role, this._points.get(role)!! + 1);
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
}
