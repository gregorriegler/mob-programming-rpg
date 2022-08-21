import { ClockStub, MilliSeconds } from "./Clock";
import { Countdown } from "./Countdown";

describe('Countdown', () => {
    
    const noOp = () => {};
    let clock;
    
    beforeEach(() => {
        clock = new ClockStub();
        jest.useFakeTimers();
    })
    
    it('provides time left', () => {
        const countdown = new Countdown(3, noOp, clock);
        expect(countdown.timeLeft()).toBe(3);
    })

    it('does not count when not started', () => {
        const countdown = new Countdown(3, noOp, clock);
        advanceTimeBy(123)
        expect(countdown.timeLeft()).toBe(3);
    })
    
    it.each([
        [0, 3],
        [1, 2],
        [2, 1],
        [3, 0],
        [4, 0],
    ])('after starting, past %p ms has %p ms left', (time: MilliSeconds, expectedLeft: MilliSeconds) => {
        const countdown = new Countdown(3, noOp, clock);
        countdown.start();
        advanceTimeBy(time);
        expect(countdown.timeLeft()).toBe(expectedLeft);
    })
    
    it('notifies when its over', () => {
        const onFinish = jest.fn();
        new Countdown(300, onFinish, clock).start();
        
        advanceTimeBy(300);
        
        expect(onFinish).toHaveBeenCalled();
    })

    it('sends no notification prior to being over', () => {
        const onFinish = jest.fn();
        new Countdown(300, onFinish, clock).start();
        
        advanceTimeBy(299);

        expect(onFinish).not.toHaveBeenCalled();
    })

    it('sends no notification prior getting started', () => {
        const onFinish = jest.fn();
        new Countdown(300, onFinish, clock);

        advanceTimeBy(300);

        expect(onFinish).not.toHaveBeenCalled();
    })

    function advanceTimeBy(time: MilliSeconds) {
        clock.setTime(time)
        jest.advanceTimersByTime(time);
    }
})
