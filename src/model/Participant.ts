export class Participant {
    private readonly _name: string;

    constructor(name: string) {
        this._name = name;
    }

    name() {
        return this._name;
    }
}