import {ClockStub, MilliSeconds} from "./Clock";
import {Countdown} from "./Countdown";
import {noOp} from "./Func";

describe('Countdown', () => {
    
    let clock;

    beforeEach(() => {
        clock = new ClockStub();
        jest.useFakeTimers();
    })

    it('starts from', () => {
        const countdown = new Countdown(3000, noOp, noOp, clock);
        expect(countdown.from()).toBe(3000);
    })

    it('starts from minutes', () => {
        const countdown = Countdown.fromMinutes(3, noOp, noOp, clock);
        expect(countdown.from()).toBe(3000 * 60);
    })

    it('provides time left', () => {
        const countdown = new Countdown(3000, noOp, noOp, clock);
        expect(countdown.timeLeft()).toBe(3000);
        expect(countdown.timeLeftPretty()).toBe('00:03');
    })

    it('does not count when not started', () => {
        const countdown = new Countdown(3, noOp, noOp, clock);
        advanceTimeBy(123)
        expect(countdown.timeLeft()).toBe(3);
        expect(countdown.status()).toBe("STOPPED");
    })

    it.each([
        [0, 3],
        [1, 2],
        [2, 1],
        [3, 0],
        [4, 0],
    ])('after starting, past %p ms has %p ms left', (time: MilliSeconds, expectedLeft: MilliSeconds) => {
        const countdown = new Countdown(3, noOp, noOp, clock);
        countdown.start();
        advanceTimeBy(time);
        expect(countdown.timeLeft()).toBe(expectedLeft);
    })

    it('changes status to RUNNING', () => {
        const onFinish = jest.fn();
        const countdown = new Countdown(300, onFinish, noOp, clock);

        countdown.start();

        expect(countdown.status()).toBe("RUNNING");
    })

    it('notifies when its over', () => {
        const onFinish = jest.fn();
        const countdown = new Countdown(300, onFinish, noOp, clock);
        countdown.start();

        advanceTimeBy(300);

        expect(onFinish).toHaveBeenCalled();
        expect(countdown.status()).toBe("STOPPED");
    })

    it('updates time every second', () => {
        const updateTime = jest.fn();
        new Countdown(3000, noOp, updateTime, clock).start();

        advanceTimeBy(1000);
        expect(updateTime).toHaveBeenCalledWith("00:02");
        advanceTimeBy(1000);
        expect(updateTime).toHaveBeenCalledWith("00:01");
        advanceTimeBy(1000);
        expect(updateTime).toHaveBeenCalledWith("00:00");

    })

    it('sends no notification prior to being over', () => {
        const onFinish = jest.fn();
        new Countdown(300, onFinish, noOp, clock).start();
        
        advanceTimeBy(299);

        expect(onFinish).not.toHaveBeenCalled();
    })

    it('sends no notification prior getting started', () => {
        const onFinish = jest.fn();
        new Countdown(300, onFinish, noOp, clock);

        advanceTimeBy(300);

        expect(onFinish).not.toHaveBeenCalled();
    })

    function advanceTimeBy(time: MilliSeconds) {
        clock.advanceTime(time);
        jest.advanceTimersByTime(time);
    }
})
