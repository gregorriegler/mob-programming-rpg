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
        return this.canSelectRoleForLevel(1)
            || this.canSelectRoleForLevel(2)

    }

    private canSelectRoleForLevel(level: number) {
        return this.hasCompleted(level - 1) && !this.hasRoleForLevel(level);
    }

    private hasRoleForLevel(level: number) {
        return this.roles().some(it => levels[level].includes(it));
    }

    roles() {
        return Array.from(this._points.keys());
    }

    selectRole(role: Role) {
        if (this._points.has(role)) {
            return;
        }
        if (this._badges.size === 0) {
            throw Error("Need a level 1 Badge first.");
        }
        this._points.set(role, 0);
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
        if (!this._points.has(role)) {
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
        if (!this._points.has(role)) {
            return 0;
        }
        return this._points.get(role);
    }

}