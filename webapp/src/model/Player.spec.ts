import {Player, Score} from "./Player";

describe('Player', () => {

    let player: Player;

    beforeEach(() => {
        player = new Player('Gregor');
    })

    it('starts with no badges and no points', () => {
        expect(player.name).toBe('Gregor');
        expect(player.level()).toBe(0);
        expect(player.badges).toEqual([]);
        expect(player.avatar).toEqual('dodo');
        expectRolesAndPoints([
            ['Typing', 0],
            ['Talking', 0],
            ['Observing', 0],
        ]);
        expectPercentage([
            ['Typing', 0],
            ['Talking', 0],
            ['Observing', 0],
        ])
    });

    it('can choose an avatar', () => {
        player.changeAvatar('mut');

        expect(player.avatar).toEqual('mut');
    })

    it('scores as Typing', () => {
        player.doScoreAndAddBadge('Typing');

        expect(player.badges).toEqual([]);
        expect(player.level()).toBe(0);
        expectRolesAndPoints([
            ['Typing', 1],
            ['Talking', 0],
            ['Observing', 0],
        ]);
        expectPercentage([
            ['Typing', 33.3],
            ['Talking', 0],
            ['Observing', 0],
        ])
    });

    it('scores two times as Talking', () => {
        player.scoreTimes('Talking', 2);

        expect(player.badges).toEqual([]);
        expectRolesAndPoints([
            ['Typing', 0],
            ['Talking', 2],
            ['Observing', 0],
        ]);
        expectPercentage([
            ['Typing', 0],
            ['Talking', 66.6],
            ['Observing', 0],
        ])
    });

    it('earns Observing Badge', () => {
        expect(player.hasBadge('Observing')).toBeFalsy();

        player.scoreTimes('Observing', 3);

        expect(player.hasBadge('Observing')).toBeTruthy();
        expect(player.badges).toEqual(['Observing']);
        expect(player.level()).toBe(1);
        expectRolesAndPoints([
            ['Typing', 0],
            ['Talking', 0],
            ['Observing', 3],
        ]);
        expectPercentage([
            ['Typing', 0],
            ['Talking', 0],
            ['Observing', 100],
        ])
    });

    it('earns all level 1 Badges', () => {
        player.scoreTimes('Observing', 3);
        player.scoreTimes('Typing', 3);
        player.scoreTimes('Talking', 3);

        expect(player.badges).toEqual(expect.arrayContaining(['Observing', 'Typing', 'Talking']));
        expectRolesAndPoints([
            ['Typing', 3],
            ['Talking', 3],
            ['Observing', 3],
        ]);
    });

    it('cannot score for a Role that is not yet selected', () => {
        player.doScoreAndAddBadge('Researcher');

        expect(player.badges).toEqual([]);
        expect(player.pointsFor('Researcher')).toEqual(0);
    });

    it('can select level 2 Role after gaining a level 1 Badge', () => {
        expect(player.selectableRoles()).toEqual([]);
        player.scoreTimes('Observing', 3);

        expect(player.selectableRoles()).toContain("Researcher");
        player.selectRole('Researcher');
        player.doScoreAndAddBadge('Researcher');
        expect(player.selectableRoles()).toEqual([]);

        expect(player.pointsFor('Researcher')).toEqual(1);
    });

    it('does not reset points on selecting an already selected role', () => {
        player.doScoreAndAddBadge('Observing');

        player.selectRole('Observing');

        expect(player.pointsFor('Observing')).toEqual(1);
    });

    it('cannot select a level 2 role without gaining a level 1 Badge', () => {
        const act = () => player.selectRole('Researcher');

        expect(act).toThrow();
        player.doScoreAndAddBadge('Researcher');
        expect(player.pointsFor('Researcher')).toEqual(0);
    });

    it('cannot select a level 3 role without gaining a level 2 Badge', () => {
        player.scoreTimes('Observing', 3);

        const act = () => player.selectRole('Automationist');

        expect(act).toThrow();
    });

    it('reaches level 2 and 3', () => {
        player.scoreTimes('Observing', 3);
        player.selectRole('Researcher');
        player.scoreTimes('Researcher', 3);
        expect(player.level()).toBe(2);
        player.selectRole('Nose');
        player.scoreTimes('Nose', 3);
        expect(player.level()).toBe(3);
    });

    it('converts to object', () => {
        player.scoreTimes('Observing', 3);
        player.selectRole('Researcher');
        player.changeAvatar('dev');

        const json = player.toObject();

        expect(json).toEqual(
            {
                name: 'Gregor',
                avatar: 'dev',
                roles: {
                    "Observing": 3,
                    "Typing": 0,
                    "Talking": 0,
                    "Researcher": 0
                },
                badges: ["Observing"]
            }
        );
    });

    it('initializes from object', () => {
        const player = Player.fromObject(
            {
                name: 'Gregor',
                avatar: 'dev',
                roles: {
                    "Observing": 3,
                    "Typing": 0,
                    "Talking": 0,
                    "Researcher": 0
                },
                badges: ["Observing"]
            }
        );

        expect(player.name).toEqual('Gregor');
        expect(player.avatar).toEqual('dev');
        expect(player.roles).toEqual([
            "Observing",
            "Typing",
            "Talking",
            "Researcher"
        ])
        expect(player.pointsFor("Observing")).toEqual(3)
        expect(player.pointsFor("Researcher")).toEqual(0)
        expect(player.badges).toEqual(["Observing"]);
    });

    describe("Score", () => {
        it('limit number of points to 3', () => {
            const score = new Score()
                .incrementScoreUntilMaximum()
                .incrementScoreUntilMaximum()
                .incrementScoreUntilMaximum()
                .incrementScoreUntilMaximum();
            
            expect(score.points).toEqual(3);
        });
    })

    function expectRolesAndPoints(points) {
        expect(player.roles).toEqual(points.map(it => it[0]));
        points.forEach(expectOneRolesPoints);
    }

    function expectOneRolesPoints(points) {
        expect(player.pointsFor(points[0])).toEqual(points[1]);
    }

    function expectPercentage(percentages) {
        expect(player.roles).toEqual(percentages.map(it => it[0]));
        percentages.forEach(expectOneRolesPercentage);
    }

    function expectOneRolesPercentage(percentage) {
        expect(player.percentageFor(percentage[0])).toEqual(percentage[1]);
    }
})

