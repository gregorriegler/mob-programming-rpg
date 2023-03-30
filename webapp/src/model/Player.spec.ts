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
            ['Driver', 0],
            ['Navigator', 0],
            ['Mobber', 0],
        ]);
        expectPercentage([
            ['Driver', 0],
            ['Navigator', 0],
            ['Mobber', 0],
        ])
    });

    it('can choose an avatar', () => {
        player.changeAvatar('mut');

        expect(player.avatar).toEqual('mut');
    })

    it('scores as Driver', () => {
        player.doScoreAndAddBadge('Driver');

        expect(player.badges).toEqual([]);
        expect(player.level()).toBe(0);
        expectRolesAndPoints([
            ['Driver', 1],
            ['Navigator', 0],
            ['Mobber', 0],
        ]);
        expectPercentage([
            ['Driver', 33.3],
            ['Navigator', 0],
            ['Mobber', 0],
        ])
    });

    it('scores two times as Navigator', () => {
        player.scoreTimes('Navigator', 2);

        expect(player.badges).toEqual([]);
        expectRolesAndPoints([
            ['Driver', 0],
            ['Navigator', 2],
            ['Mobber', 0],
        ]);
        expectPercentage([
            ['Driver', 0],
            ['Navigator', 66.6],
            ['Mobber', 0],
        ])
    });

    it('earns Mobber Badge', () => {
        expect(player.hasBadge('Mobber')).toBeFalsy();

        player.scoreTimes('Mobber', 3);

        expect(player.hasBadge('Mobber')).toBeTruthy();
        expect(player.badges).toEqual(['Mobber']);
        expect(player.level()).toBe(1);
        expectRolesAndPoints([
            ['Driver', 0],
            ['Navigator', 0],
            ['Mobber', 3],
        ]);
        expectPercentage([
            ['Driver', 0],
            ['Navigator', 0],
            ['Mobber', 100],
        ])
    });

    it('earns all level 1 Badges', () => {
        player.scoreTimes('Mobber', 3);
        player.scoreTimes('Driver', 3);
        player.scoreTimes('Navigator', 3);

        expect(player.badges).toEqual(expect.arrayContaining(['Mobber', 'Driver', 'Navigator']));
        expectRolesAndPoints([
            ['Driver', 3],
            ['Navigator', 3],
            ['Mobber', 3],
        ]);
    });

    it('cannot score for a Role that is not yet selected', () => {
        player.doScoreAndAddBadge('Researcher');

        expect(player.badges).toEqual([]);
        expect(player.pointsFor('Researcher')).toEqual(0);
    });

    it('can select level 2 Role after gaining a level 1 Badge', () => {
        expect(player.selectableRoles()).toEqual([]);
        player.scoreTimes('Mobber', 3);

        expect(player.selectableRoles()).toContain("Researcher");
        player.selectRole('Researcher');
        player.doScoreAndAddBadge('Researcher');
        expect(player.selectableRoles()).toEqual([]);

        expect(player.pointsFor('Researcher')).toEqual(1);
    });

    it('does not reset points on selecting an already selected role', () => {
        player.doScoreAndAddBadge('Mobber');

        player.selectRole('Mobber');

        expect(player.pointsFor('Mobber')).toEqual(1);
    });

    it('cannot select a level 2 role without gaining a level 1 Badge', () => {
        const act = () => player.selectRole('Researcher');

        expect(act).toThrow();
        player.doScoreAndAddBadge('Researcher');
        expect(player.pointsFor('Researcher')).toEqual(0);
    });

    it('cannot select a level 3 role without gaining a level 2 Badge', () => {
        player.scoreTimes('Mobber', 3);

        const act = () => player.selectRole('Automationist');

        expect(act).toThrow();
    });

    it('reaches level 2 and 3', () => {
        player.scoreTimes('Mobber', 3);
        player.selectRole('Researcher');
        player.scoreTimes('Researcher', 3);
        expect(player.level()).toBe(2);
        player.selectRole('Nose');
        player.scoreTimes('Nose', 3);
        expect(player.level()).toBe(3);
    });

    it('converts to object', () => {
        player.scoreTimes('Mobber', 3);
        player.selectRole('Researcher');
        player.changeAvatar('dev');

        const json = player.toObject();

        expect(json).toEqual(
            {
                name: 'Gregor',
                avatar: 'dev',
                roles: {
                    "Mobber": 3,
                    "Driver": 0,
                    "Navigator": 0,
                    "Researcher": 0
                },
                badges: ["Mobber"]
            }
        );
    });

    it('initializes from object', () => {
        const player = Player.fromObject(
            {
                name: 'Gregor',
                avatar: 'dev',
                roles: {
                    "Mobber": 3,
                    "Driver": 0,
                    "Navigator": 0,
                    "Researcher": 0
                },
                badges: ["Mobber"]
            }
        );

        expect(player.name).toEqual('Gregor');
        expect(player.avatar).toEqual('dev');
        expect(player.roles).toEqual([
            "Mobber",
            "Driver",
            "Navigator",
            "Researcher"
        ])
        expect(player.pointsFor("Mobber")).toEqual(3)
        expect(player.pointsFor("Researcher")).toEqual(0)
        expect(player.badges).toEqual(["Mobber"]);
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

