import { Badge, IncompleteBadge } from "./Badge";

describe('Badge', () => {

    it('starts with 0 points', () => {
        const badge = new IncompleteBadge('Driver');
        expect(badge.name()).toBe('Driver');
        expect(badge.points()).toBe(0);
    })

    it('scores', () => {
        const badge = new IncompleteBadge('Driver');
        expect(badge.score()).toEqual(new IncompleteBadge('Driver', 1));
        expect(badge.score().score()).toEqual(new IncompleteBadge('Driver', 2));
    })

    it('makes a complete badge on 3 points', () => {
        const badge = new IncompleteBadge('Driver');
        expect(badge.score().score().score()).toEqual(new Badge('Driver'));
    })
})