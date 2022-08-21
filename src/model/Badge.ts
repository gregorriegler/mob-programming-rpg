export class Badge {
    protected readonly _name: string;

    constructor(name: string) {
        this._name = name;
    }

    name() {
        return this._name;
    }

    score(): Badge {
        return this;
    }
}

export class IncompleteBadge extends Badge {
    private readonly _points;

    constructor(name: string, points: number = 0) {
        super(name);
        this._points = points;
    }

    points() {
        return this._points;
    }

    score(): Badge {
        const nextPoints = this._points + 1;
        return nextPoints === 3
            ? new Badge(this._name)
            : new IncompleteBadge(this._name, nextPoints);
    }
}