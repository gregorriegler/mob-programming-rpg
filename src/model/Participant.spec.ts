import { Participant } from "./Participant";

describe('Participant', () => {
    it('has a name', () => {
        const participant = new Participant('Gregor');
        expect(participant.name()).toBe('Gregor');
    });
    
    
})