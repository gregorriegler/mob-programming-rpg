import { ClockStub, MilliSeconds } from "./Clock";
import { Countdown } from "./Countdown";

describe('Countdown', () => {
    
    const noop: () => void = () => {};
    it('provides time left', () => {
        const clock = new ClockStub();
        const countdown = new Countdown(3, noop, clock);
        expect(countdown.timeLeft()).toBe(3);
    })

    it('does not count when not  started', () => {
        const clock = new ClockStub();
        const countdown = new Countdown(3, noop, clock);
        clock.setTime(123)
        expect(countdown.timeLeft()).toBe(3);
    })
    
    it.each([
        [0, 3],
        [1, 2],
        [2, 1],
        [3, 0],
        [4, 0],
    ])('after starting, past %p ms has %p ms left', (time: MilliSeconds, expectedLeft: MilliSeconds) => {
        const clock = new ClockStub();
        const countdown = new Countdown(3, noop, clock);
        countdown.start();
        clock.setTime(time);
        expect(countdown.timeLeft()).toBe(expectedLeft);
    })
    
    it('notifies when its over', () => {
        jest.useFakeTimers();
        const onFinish = jest.fn();
        const clockStub = new ClockStub();
        const countdown = new Countdown(300, onFinish, clockStub);
        countdown.start();
        clockStub.setTime(300)
        jest.runOnlyPendingTimers();
        expect(onFinish).toHaveBeenCalled();
    })
    
})
