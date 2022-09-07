import { Game } from "./Game";
import { Player } from "./Player";

describe('Game', () => {
    it('starts with an empty list of players', () => {
        const game = new Game();

        expect(game.players()).toEqual([]);
    });

    it('can add a player', () => {
        const game = new Game();

        game.setPlayers('Max');

        expect(game.players()).toEqual([new Player('Max')]);
    });

    it('can add many players, even with dirty whitespace', () => {
        const game = new Game();

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
        const game = new Game();

        game.setPlayers('Max,Rita,  Peter');

        expect(game.driver()).toEqual('Max');
        expect(game.navigator()).toEqual('Rita');
        expect(game.next()).toEqual('Peter');
        expect(game.roleOf('Max')).toEqual('Driver');
        expect(game.roleOf('Rita')).toEqual('Navigator');
        expect(game.roleOf('Peter')).toEqual('Mobber');
    });

    it('rotates', () => {
        const game = new Game();
        game.setPlayers('Max,Rita,Peter,Sam');

        game.rotate();

        expect(game.driver()).toEqual('Rita');
        expect(game.navigator()).toEqual('Peter');
        expect(game.roleOf('Rita')).toEqual('Driver');
        expect(game.roleOf('Peter')).toEqual('Navigator');
        expect(game.roleOf('Sam')).toEqual('Mobber');
        expect(game.roleOf('Max')).toEqual('Mobber');
    });

    it('rotates around', () => {
        const game = new Game();
        game.setPlayers('Max,Rita,Peter,Sam');

        game.rotate();
        game.rotate();

        expect(game.driver()).toEqual('Peter');
        expect(game.navigator()).toEqual('Sam');
    });
    
    it('serializes to json', () => {
        const game = new Game();
        game.setPlayers('Max,Rita');
        game.rotate();
        
        const json = game.toJSON();
        
        const result = JSON.parse(json);
        
        expect(result.players.length).toEqual(2);
        expect(result.players[0].name).toEqual('Max');
        expect(result.players[1].name).toEqual('Rita');
        expect(result.rotations).toEqual(1);
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
          "rotations": 1
        }
        `);
        
        expect(game.players().length).toEqual(1);
        expect(game.players()[0].name()).toEqual("Gregor");
        expect(game.players()[0].badges()).toEqual(["Mobber"]);
        expect(game.rotations()).toEqual(1);
    })
});
