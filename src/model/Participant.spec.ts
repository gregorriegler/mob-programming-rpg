import { Participant } from "./Participant";

describe('Participant', () => {

    let participant;

    beforeEach(() => {
        participant = new Participant('Gregor');
    })

    it('starts with no badges and no points', () => {
        expect(participant.name()).toBe('Gregor');
        expect(participant.badges()).toEqual([]);
        expect(participant.pointsFor('Driver')).toEqual(0);
        expect(participant.pointsFor('Navigator')).toEqual(0);
        expect(participant.pointsFor('Mobber')).toEqual(0);
    });

    it('scores as Driver', () => {
        participant.score('Driver');

        expect(participant.badges()).toEqual([]);
        expect(participant.pointsFor('Driver')).toEqual(1);
        expect(participant.pointsFor('Navigator')).toEqual(0);
        expect(participant.pointsFor('Mobber')).toEqual(0);
    });

    it('scores two times as Navigator', () => {
        participant.scoreTimes('Navigator', 2);

        expect(participant.badges()).toEqual([]);
        expect(participant.pointsFor('Driver')).toEqual(0);
        expect(participant.pointsFor('Navigator')).toEqual(2);
        expect(participant.pointsFor('Mobber')).toEqual(0);
    });

    it('earns Mobber Badge', () => {
        expect(participant.hasBadge('Mobber')).toBeFalsy();
        
        participant.scoreTimes('Mobber', 3);

        expect(participant.hasBadge('Mobber')).toBeTruthy();
        expect(participant.badges()).toEqual(['Mobber']);
        expect(participant.pointsFor('Driver')).toEqual(0);
        expect(participant.pointsFor('Navigator')).toEqual(0);
        expect(participant.pointsFor('Mobber')).toEqual(3);
    });

    it('earns all level 1 Badges', () => {
        participant.scoreTimes('Mobber', 3);
        participant.scoreTimes('Driver', 3);
        participant.scoreTimes('Navigator', 3);

        expect(participant.badges()).toEqual(expect.arrayContaining(['Mobber', 'Driver', 'Navigator']));
        expect(participant.pointsFor('Driver')).toEqual(3);
        expect(participant.pointsFor('Navigator')).toEqual(3);
        expect(participant.pointsFor('Mobber')).toEqual(3);
    });

    it('cannot score for a Role that is not yet selected', () => {
        participant.score('Researcher');

        expect(participant.badges()).toEqual([]);
        expect(participant.pointsFor('Researcher')).toEqual(0);
    });

    it('can select level 2 Role after gaining a level 1 Badge', () => {
        participant.scoreTimes('Mobber', 3);

        participant.selectRole('Researcher');
        participant.score('Researcher');

        expect(participant.pointsFor('Researcher')).toEqual(1);
    });

    it('does not reset points on selecting an already selected role', () => {
        participant.score('Mobber');

        participant.selectRole('Mobber');

        expect(participant.pointsFor('Mobber')).toEqual(1);
    });


    it('cannot select a level 2 role without gaining a level 1 Badge', () => {
        const act = () => participant.selectRole('Researcher');

        expect(act).toThrow();
        participant.score('Researcher');
        expect(participant.pointsFor('Researcher')).toEqual(0);
    });

})
