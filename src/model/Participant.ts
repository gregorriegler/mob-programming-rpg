export class Participant {
    private readonly _name: string;

    private readonly _points = new Map([
        ["Driver", 0],
        ["Navigator", 0],
        ["Mobber", 0],
    ]);
    private _badges = new Set<string>();

    constructor(name: string) {
        this._name = name;
    }

    name() {
        return this._name;
    }

    badges() {
        return Array.from(this._badges);
    }
    
    scoreTimes(role, times) {
        for (let i = 0; i < times; i++) {
            this.score(role);
        }
    }

    score(role: string) {
        if (!this._points.has(role)) {
            return;
        }
        this.increasePointsFor(role);
        if (this._points.get(role) >= 3) {
            this._badges.add(role);
        }
    }

    private increasePointsFor(role: string) {
        this._points.set(role, this._points.get(role) + 1);
    }

    pointsFor(role: string) {
        if (!this._points.has(role)) {
            return 0;
        }
        return this._points.get(role);
    }

    selectRole(role: string) {
        if(this._points.has(role)) {
            return;
        }
        if(this._badges.size === 0) {
            throw Error("Need a level 1 Badge first.");
        }
        this._points.set(role, 0);
    }
}