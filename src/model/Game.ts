export class Game {
    private _players = [];
    private _rotations = 0;

    players() {
        return this._players;
    }

    setPlayers(players: string | string[]) {
        if(typeof players === "string"){
            this._players = players.split(',')
                .map(player => player.trim())
                .filter(it => it !== "");
        } else {
            this._players = players
        }
    }

    driver() {
        return this.roleOf(RoleIndex.Driver);
    }

    navigator() {
        return this.roleOf(RoleIndex.Navigator);
    }

    next() {
        return this.roleOf(RoleIndex.Next);
    }

    private roleOf(index: RoleIndex) {
        return this._players[(index + this._rotations) % this._players.length];
    }

    rotate() {
        this._rotations++;
    }
}

enum RoleIndex {
    Driver,
    Navigator,
    Next
}