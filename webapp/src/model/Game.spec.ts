import { Game } from "./Game";
import { Player } from "./Player";

function createGame() {
    return new Game("gameId");
}

describe('Game', () => {
    it('has an id', () => {
        const game = createGame();

        expect(game.id()).toEqual("gameId");
    });

    it('creates a new id every time', () => {
        const game1 = Game.withPlayers([]);
        const game2 = Game.withPlayers([]);

        expect(game1.id()).not.toEqual(game2.id());
    });

    it('starts with an empty list of players', () => {
        const game = createGame();

        expect(game.players()).toEqual([]);
    });

    it('can set a player', () => {
        const game = createGame();

        game.setPlayers('Max');

        expect(game.players()).toEqual([new Player('Max')]);
    });

    it('can add a player to an empty game', () => {
        const game = createGame();

        game.addPlayer('Max', 'dev');

        expect(game.players()).toEqual([new Player('Max', 'dev')]);
    });

    it('adds players to the end of the player list', () => {
        const game = Game.withPlayers(["1", "2"]);

        game.addPlayer('  3', 'dodo');

        expect(game.players()).toEqual([
            new Player('1'),
            new Player('2'),
            new Player('3')
        ]);
    });

    it('can set many players, even with dirty whitespace', () => {
        const game = createGame();

        game.setPlayers('Max,Rita,  Peter');

        expect(game.players()).toEqual([
            new Player('Max'),
            new Player('Rita'),
            new Player('Peter')
        ]);
    });

    it('changing players order does not delete their points', () => {
        const game = Game.withPlayers(['1', '2']);
        const player1 = game.players()[0];
        const player2 = game.players()[1];

        player1.score("Driver")
        game.setPlayers('2,1');

        expect(game.players()).toEqual([player2, player1]);
    });

    it('can initialize players by array', () => {
        const game = Game.withPlayers(['Max', 'Rita', 'Peter']);

        expect(game.players()).toEqual([
            new Player('Max'),
            new Player('Rita'),
            new Player('Peter')
        ]);
    });

    it('has the first player starting as a driver', () => {
        const game = createGame();

        game.setPlayers('Max,Rita,  Peter');

        expect(game.driver()).toEqual('Max');
        expect(game.navigator()).toEqual('Rita');
        expect(game.next()).toEqual('Peter');
        expect(game.roleOf('Max')).toEqual('Driver');
        expect(game.roleOf('Rita')).toEqual('Navigator');
        expect(game.roleOf('Peter')).toEqual('Mobber');
    });

    it('set the direction of roles: Navigator, Driver', () => {
        const game = createGame();
        game.setPlayers('Max,Rita,Peter');

        game.navigatorThenDriver();

        expect(game.driver()).toEqual('Rita');
        expect(game.navigator()).toEqual('Max');
        expect(game.next()).toEqual('Peter');
        expect(game.roleOf('Rita')).toEqual('Driver');
        expect(game.roleOf('Max')).toEqual('Navigator');
        expect(game.roleOf('Peter')).toEqual('Mobber');
    });

    it('set the direction of roles: Driver, Navigator', () => {
        const game = createGame();
        game.setPlayers('Max,Rita,Peter');
        game.navigatorThenDriver();

        game.driverThenNavigator();

        expect(game.driver()).toEqual('Max');
        expect(game.navigator()).toEqual('Rita');
        expect(game.next()).toEqual('Peter');
        expect(game.roleOf('Max')).toEqual('Driver');
        expect(game.roleOf('Rita')).toEqual('Navigator');
        expect(game.roleOf('Peter')).toEqual('Mobber');
    });

    it('initialized with a 4 minute timer', () => {
        const game = createGame();

        expect(game.timer()).toEqual(4 * 60);
        expect(game.timerInMinutes()).toEqual(4);
    });

    it('initializes with the timer stopped', () => {
        const game = createGame();

        expect(game.timerStatus()).toEqual("STOPPED");
    });

    it('starts the timer', () => {
        const game = createGame();

        game.startTimer()

        expect(game.timerStatus()).toEqual("STARTED");
    });

    it('stops the timer', () => {
        const game = createGame();
        game.startTimer()

        game.stopTimer()

        expect(game.timerStatus()).toEqual("STOPPED");
    });

    it('changes the timer', () => {
        const game = createGame();

        game.
            changeTimer(10 * 60)

        expect(game.timer()).toEqual(600);
    });

    it('rotates', () => {
        const game = createGame();
        game.setPlayers('Max,Rita,Peter,Sam');

        game.rotate();

        expect(game.driver()).toEqual('Rita');
        expect(game.navigator()).toEqual('Peter');
        expect(game.roleOf('Rita')).toEqual('Driver');
        expect(game.roleOf('Peter')).toEqual('Navigator');
        expect(game.roleOf('Sam')).toEqual('Mobber');
        expect(game.roleOf('Max')).toEqual('Mobber');
    });

    // rotate to target
    it('rotates - to targetRotation', () => {
        const game = createGame();
        game.setPlayers('Max,Rita,Peter,Sam');
        game.startTimer();

        game.rotateToTarget();

        expect(game.driver()).toEqual('Rita');
        expect(game.navigator()).toEqual('Peter');
        expect(game.roleOf('Rita')).toEqual('Driver');
        expect(game.roleOf('Peter')).toEqual('Navigator');
        expect(game.roleOf('Sam')).toEqual('Mobber');
        expect(game.roleOf('Max')).toEqual('Mobber');
    });

    it('rotates around', () => {
        const game = createGame();
        game.setPlayers('Max,Rita,Peter,Sam');

        game.rotate();
        game.rotate();

        expect(game.driver()).toEqual('Peter');
        expect(game.navigator()).toEqual('Sam');
    });

    it('rotates the other way', () => {
        const game = createGame();
        game.setPlayers('Max,Rita,Peter,Sam');
        game.navigatorThenDriver();

        game.rotate();

        expect(game.driver()).toEqual('Peter');
        expect(game.navigator()).toEqual('Rita');
        expect(game.roleOf('Peter')).toEqual('Driver');
        expect(game.roleOf('Rita')).toEqual('Navigator');
        expect(game.roleOf('Sam')).toEqual('Mobber');
        expect(game.roleOf('Max')).toEqual('Mobber');
    });

    it('serializes to json', () => {
        const game = createGame();
        game.setPlayers('Max,Rita');
        game.rotate();
        game.startTimer();

        const json = game.toJSON();

        const result = JSON.parse(json);

        expect(result.players.length).toEqual(2);
        expect(result.players[0].name).toEqual('Max');
        expect(result.players[1].name).toEqual('Rita');
        expect(result.timer.value).toEqual(4 * 60);
        expect(result.timer.status).toEqual("STARTED");
        expect(result.rotations).toEqual(1);
        expect(result.targetRotation).toEqual(2);
    })

    it('deserializes from json', () => {
        const game = Game.fromJSON(`
        {
          "players": [
            {
              "name": "Gregor",
              "roles": {
                "Mobber": 3,
                "Driver": 0,
                "Navigator": 0,
                "Researcher": 0
              },
              "badges": ["Mobber"]
            }
          ],
          "timer": {
            "value": 240,
            "status": "STOPPED"
          }, 
          "rotations": 1,
          "targetRotation": 7
        }
        `);

        expect(game.players().length).toEqual(1);
        expect(game.players()[0].name()).toEqual("Gregor");
        expect(game.players()[0].badges()).toEqual(["Mobber"]);
        expect(game.timer()).toEqual(240);
        expect(game.timerStatus()).toEqual("STOPPED");
        expect(game.rotations()).toEqual(1);
        expect(game.targetRotation()).toEqual(7);
    })

    it('is equal to its deserialized form', () => {
        const game = createGame();
        game.setPlayers('Max,Rita');
        const deserializedGame = Game.fromJSON(game.toJSON());

        expect(game).toEqual(deserializedGame);
        expect(game.id()).toEqual(deserializedGame.id());
    })
});
