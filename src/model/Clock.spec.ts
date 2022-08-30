import { ClockStub, format } from "./Clock";

describe('ClockStub', () => {

    it('starts at 0', () => {
        const stub = new ClockStub();

        const millis = stub.currentTime();

        expect(millis).toBe(0);
    });

    it('changes time', () => {
        const stub = new ClockStub();

        stub.setTime(100);

        const millis = stub.currentTime();
        expect(millis).toBe(100);
    });
    
    it('formats the time', () => {
        expect(format(3000)).toEqual('00:03');
        expect(format(1000 * 60 * 3)).toEqual('03:00');
        expect(format(3000)).toEqual('00:03');
    })
    
})