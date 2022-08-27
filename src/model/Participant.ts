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

export class Participant {
    private readonly _name: string;
    private readonly _points = new Map<Role, number>([
        ["Driver", 0],
        ["Navigator", 0],
        ["Mobber", 0],
    ]);
    private readonly _badges = new Set<string>();

    constructor(name: string) {
        this._name = name;
    }

    name() {
        return this._name;
    }

    badges() {
        return Array.from(this._badges);
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

    canSelectRole() {
        return this.badges().length !== 0 && this._points.size === 3;
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
}