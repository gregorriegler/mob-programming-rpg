export type Role = "Driver"
    | "Navigator"
    | "Mobber"
    | "Archivist"
    | "Automationist"
    | "Nose"
    | "Rear Admiral"
    | "Researcher"
    | "Sponsor"
    | "Traffic Cop";

const levels: Role[][] = [
    [
        "Driver",
        "Navigator",
        "Mobber",
    ],
    [
        "Rear Admiral",
        "Researcher",
        "Sponsor",
    ],
    [
        "Archivist",
        "Automationist",
        "Nose",
    ],
    [
        "Traffic Cop"
    ]
];

function levelOf(role: Role) {
    for (let level = 0; level < levels.length; level++) {
        if(levels[level].includes(role)){
            return level;
        }
    }
}

export class Participant {
    private readonly _name: string;
    private readonly _points = new Map<Role, number>(levels[0].map(role => [role, 0]));
    private readonly _badges = new Set<string>();

    constructor(name: string) {
        this._name = name;
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

    private hasCompleted(level: number) {
        return levels[level].some(it => this.hasBadge(it));
    }

    badges() {
        return Array.from(this._badges);
    }

    canSelectRole() {
        return Array.from(levels.keys())
            .some(level => this.canSelectRoleFor(level+1))
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

    private canSelectRoleFor(level) {
        return this.hasCompleted(level-1) && !this.hasRoleForLevel(level);
    }

    private hasRoleForLevel(level: number) {
        return this.roles().some(it => levels[level].includes(it));
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
        if (this._points.get(role) >= 3) {
            this._badges.add(role);
        }
    }

    private increasePointsFor(role: Role) {
        this._points.set(role, this._points.get(role) + 1);
    }

    pointsFor(role: Role) {
        if (!this.hasRole(role)) {
            return 0;
        }
        return this._points.get(role);
    }

    private hasRole(role: Role) {
        return this._points.has(role);
    }
}