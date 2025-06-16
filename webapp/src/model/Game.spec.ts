import { Game } from "./Game";
import { Player } from "./Player";

function createGame() {
    return new Game({ id: "gameId" });
}

describe('Game', () => {
    it("contruct using props ctor", () => {
        const game = new Game({
            id: "some-id",
            players: ['Bob'],
            timer: 100,
            timerStatus: "STARTED",
            rotations: 10,
            targetRotation: 3
        });

        expect(game.id()).toEqual("some-id");
        expect(game.playerNames()).toEqual('Bob');
        expect(game.timer()).toEqual(100);
        expect(game.timerStatus()).toEqual("STARTED");
        expect(game.rotations()).toEqual(10);
        expect(game.targetRotation()).toEqual(3);
    })

    it("contruct using withProps with player objects", () => {
        const game = new Game({
            id: "some-id",
            playerObjects: [new Player("Bob")],
            timer: 100,
            timerStatus: "STARTED",
            rotations: 10,
            targetRotation: 3
        });

        expect(game.id()).toEqual("some-id");
        expect(game.playerNames()).toEqual('Bob');
        expect(game.timer()).toEqual(100);
        expect(game.timerStatus()).toEqual("STARTED");
        expect(game.rotations()).toEqual(10);
        expect(game.targetRotation()).toEqual(3);
    })

    it('has an id', () => {
        const game = createGame();

        expect(game.id()).toEqual("gameId");
    });

    it('creates a new id every time', () => {
        const game1 = new Game();
        const game2 = new Game();

        expect(game1.id()).not.toEqual(game2.id());
    });

    it('starts with an empty list of players', () => {
        const game = createGame();

        expect(game.mob()).toEqual([]);
    });

    it('can set a player', () => {
        const game = createGame();

        game.setPlayers('Max');

        expect(game.mob()).toEqual([new Player('Max')]);
    });

    it('can add a player to an empty game', () => {
        const game = createGame();

        game.addPlayer('Max', 'dev');

        expect(game.mob()).toEqual([new Player('Max', 'dev')]);
    });

    it('adds players to the end of the player list', () => {
        const game = new Game({ players: ["1", "2"] });

        game.addPlayer('  3', 'dodo');

        expect(game.mob()).toEqual([
            new Player('1'),
            new Player('2'),
            new Player('3')
        ]);
    });

    it('can set many players, even with dirty whitespace', () => {
        const game = createGame();

        game.setPlayers('Max,Rita,  Peter');

        expect(game.mob()).toEqual([
            new Player('Max'),
            new Player('Rita'),
            new Player('Peter')
        ]);
    });

    it('changing players order does not delete their points', () => {
        const game = new Game({ players: ['1', '2'] });
        const player1 = game.mob()[0];
        const player2 = game.mob()[1];

        player1.doScoreAndAddBadge("Typing")
        game.setPlayers('2,1');

        expect(game.mob()).toEqual([player2, player1]);
    });

    it('can initialize players by array', () => {
        const game = new Game({ players: ['Max', 'Rita', 'Peter'] });

        expect(game.mob()).toEqual([
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
        expect(game.positionOf('Max')).toEqual('Typing');
        expect(game.positionOf('Rita')).toEqual('Navigator');
        expect(game.positionOf('Peter')).toEqual('Mobber');
    });

    it('set the direction of roles: Navigator, Typing', () => {
        const game = createGame();
        game.setPlayers('Max,Rita,Peter');

        game.navigatorThenTyping();

        expect(game.driver()).toEqual('Rita');
        expect(game.navigator()).toEqual('Max');
        expect(game.next()).toEqual('Peter');
        expect(game.positionOf('Rita')).toEqual('Typing');
        expect(game.positionOf('Max')).toEqual('Navigator');
        expect(game.positionOf('Peter')).toEqual('Mobber');
    });

    it('set the direction of roles: Typing, Navigator', () => {
        const game = createGame();
        game.setPlayers('Max,Rita,Peter');
        game.navigatorThenTyping();

        game.typingThenNavigator();

        expect(game.driver()).toEqual('Max');
        expect(game.navigator()).toEqual('Rita');
        expect(game.next()).toEqual('Peter');
        expect(game.positionOf('Max')).toEqual('Typing');
        expect(game.positionOf('Rita')).toEqual('Navigator');
        expect(game.positionOf('Peter')).toEqual('Mobber');
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
        expect(game.positionOf('Rita')).toEqual('Typing');
        expect(game.positionOf('Peter')).toEqual('Navigator');
        expect(game.positionOf('Sam')).toEqual('Mobber');
        expect(game.positionOf('Max')).toEqual('Mobber');
    });

    // rotate to target
    it('rotates - to targetRotation', () => {
        const game = createGame();
        game.setPlayers('Max,Rita,Peter,Sam');
        game.startTimer();

        game.rotateToTarget();

        expect(game.driver()).toEqual('Rita');
        expect(game.navigator()).toEqual('Peter');
        expect(game.positionOf('Rita')).toEqual('Typing');
        expect(game.positionOf('Peter')).toEqual('Navigator');
        expect(game.positionOf('Sam')).toEqual('Mobber');
        expect(game.positionOf('Max')).toEqual('Mobber');
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
        game.navigatorThenTyping();

        game.rotate();

        expect(game.driver()).toEqual('Peter');
        expect(game.navigator()).toEqual('Rita');
        expect(game.positionOf('Peter')).toEqual('Typing');
        expect(game.positionOf('Rita')).toEqual('Navigator');
        expect(game.positionOf('Sam')).toEqual('Mobber');
        expect(game.positionOf('Max')).toEqual('Mobber');
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
                "Typing": 0,
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

        expect(game.mob().length).toEqual(1);
        expect(game.mob()[0].name).toEqual("Gregor");
        expect(game.mob()[0].badges).toEqual(["Mobber"]);
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
