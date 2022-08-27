import { Player } from "./Player";

describe('Participant', () => {

    let player;

    beforeEach(() => {
        player = new Player('Gregor');
    })

    it('starts with no badges and no points', () => {
        expect(player.name()).toBe('Gregor');
        expect(player.level()).toBe(0);
        expect(player.badges()).toEqual([]);
        expect(player.roles()).toEqual([
            'Driver',
            'Navigator',
            'Mobber',
        ]);
        expect(player.pointsFor('Driver')).toEqual(0);
        expect(player.pointsFor('Navigator')).toEqual(0);
        expect(player.pointsFor('Mobber')).toEqual(0);
    });

    it('scores as Driver', () => {
        player.score('Driver');

        expect(player.badges()).toEqual([]);
        expect(player.level()).toBe(0);
        expect(player.pointsFor('Driver')).toEqual(1);
        expect(player.pointsFor('Navigator')).toEqual(0);
        expect(player.pointsFor('Mobber')).toEqual(0);
    });

    it('scores two times as Navigator', () => {
        player.scoreTimes('Navigator', 2);

        expect(player.badges()).toEqual([]);
        expect(player.pointsFor('Driver')).toEqual(0);
        expect(player.pointsFor('Navigator')).toEqual(2);
        expect(player.pointsFor('Mobber')).toEqual(0);
    });

    it('earns Mobber Badge', () => {
        expect(player.hasBadge('Mobber')).toBeFalsy();

        player.scoreTimes('Mobber', 3);

        expect(player.hasBadge('Mobber')).toBeTruthy();
        expect(player.badges()).toEqual(['Mobber']);
        expect(player.level()).toBe(1);
        expect(player.pointsFor('Driver')).toEqual(0);
        expect(player.pointsFor('Navigator')).toEqual(0);
        expect(player.pointsFor('Mobber')).toEqual(3);
    });

    it('earns all level 1 Badges', () => {
        player.scoreTimes('Mobber', 3);
        player.scoreTimes('Driver', 3);
        player.scoreTimes('Navigator', 3);

        expect(player.badges()).toEqual(expect.arrayContaining(['Mobber', 'Driver', 'Navigator']));
        expect(player.pointsFor('Driver')).toEqual(3);
        expect(player.pointsFor('Navigator')).toEqual(3);
        expect(player.pointsFor('Mobber')).toEqual(3);
    });

    it('cannot score for a Role that is not yet selected', () => {
        player.score('Researcher');

        expect(player.badges()).toEqual([]);
        expect(player.pointsFor('Researcher')).toEqual(0);
    });

    it('can select level 2 Role after gaining a level 1 Badge', () => {
        expect(player.selectableRoles()).toEqual([]);
        player.scoreTimes('Mobber', 3);

        expect(player.selectableRoles()).toEqual([
            "Rear Admiral",
            "Researcher",
            "Sponsor",
        ]);
        player.selectRole('Researcher');
        player.score('Researcher');
        expect(player.selectableRoles()).toEqual([]);

        expect(player.pointsFor('Researcher')).toEqual(1);
    });

    it('does not reset points on selecting an already selected role', () => {
        player.score('Mobber');

        player.selectRole('Mobber');

        expect(player.pointsFor('Mobber')).toEqual(1);
    });

    it('cannot select a level 2 role without gaining a level 1 Badge', () => {
        const act = () => player.selectRole('Researcher');

        expect(act).toThrow();
        player.score('Researcher');
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
})
