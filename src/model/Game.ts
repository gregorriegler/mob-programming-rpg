enum RoleIndex {
    Driver,
    Navigator,
    Next
}

export class Game {
    constructor(players: string[] = []) {
        this.players = players
    }

    private players = [];
    private rotations = 0;

    getPlayers() {
        return this.players;
    }

    setPlayers(players: string) {
        this.players = players.split(',')
            .map(player => player.trim())
            .filter(it => it !== "");
    }

    driver() {
        return this.whoIs(RoleIndex.Driver);
    }

    navigator() {
        return this.whoIs(RoleIndex.Navigator);
    }

    next() {
        return this.whoIs(RoleIndex.Next);
    }

    private whoIs(index: RoleIndex) {
        return this.players[(index + this.rotations) % this.players.length];
    }

    rotate() {
        this.rotations++;
    }

    roleOf(player: string) {
        if (this.driver() === player) return 'Driver';
        if (this.navigator() === player) return 'Navigator';
        if (this.next() === player) return 'Next';
        return undefined;
    }
}
