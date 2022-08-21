import { ClockStub } from "./Clock";

describe('ClockStub', () => {

    it('starts at 0', () => {
        const stub = new ClockStub();

        const millis = stub.currentTime();

        expect(millis).toBe(0);
    })

    it('changes time', () => {
        const stub = new ClockStub();

        stub.setTime(100);

        const millis = stub.currentTime();
        expect(millis).toBe(100);
    })
    
})