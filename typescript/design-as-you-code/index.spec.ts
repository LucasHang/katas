import { describe, expect, it, vitest } from 'vitest';
import Car from './domain/Car';
import CarKey from './domain/CarKey';

describe('Car entity', () => {
    it('constructs in the right state', () => {
        const car = new Car();

        expect(car.locked).toBe(true);
        expect(car.turnedOn).toBe(false);
        expect(car.moving).toBe(false);
    })

    it('can be unlocked inserting the key in the keyhole', () => {
        const car = new Car();
        const key = new CarKey(car);

        key.insertAndUnlock();

        expect(car.locked).toBe(false);
    });

    it('can be unlocked pressing the "unlock" button on key', () => {
        const car = new Car();
        const key = new CarKey(car);

        key.pressUnlock();

        expect(car.locked).toBe(false);
    });

    it('can have a door open/closed if unlocked', () => {
        const car = new Car();
        const key = new CarKey(car);

        key.pressUnlock();

        car.openDoor(0);

        expect(car.doors[0].isOpen).toBe(true);
        
        car.closeDoor(0);

        expect(car.doors[0].isOpen).toBe(false);
    });

    it('can be turned on/off using a key', () => {
        const car = new Car();
        const key = new CarKey(car);

        key.pressUnlock();

        car.turnOn(key);

        expect(car.turnedOn).toBe(true);
        
        car.turnOff(key);

        expect(car.turnedOn).toBe(false);
    });

    it('can have the windshield wiper activated if turned on', () => {
        const car = new Car();
        const key = new CarKey(car);

        key.pressUnlock();

        car.turnOn(key);

        car.windshieldWiper.activate();

        expect(car.turnedOn).toBe(true);
        expect(car.windshieldWiper.isActive).toBe(true);

        car.windshieldWiper.deactivate();

        car.turnOff(key);

        car.windshieldWiper.activate();

        expect(car.turnedOn).toBe(false);
        expect(car.windshieldWiper.isActive).toBe(false);
    });

    it('windshield wiper can choose different velocities', () => {
        const car = new Car();
        const key = new CarKey(car);

        key.pressUnlock();

        car.turnOn(key);

        car.windshieldWiper.activate();

        expect(car.windshieldWiper.velocity).toBe(1);

        car.windshieldWiper.increaseLevel();

        expect(car.windshieldWiper.velocity).toBe(2);
        
        car.windshieldWiper.increaseLevel();

        expect(car.windshieldWiper.velocity).toBe(3);
        
        car.windshieldWiper.increaseLevel();

        expect(car.windshieldWiper.velocity).toBe(4);

        // To ensure it dont go over the max level

        car.windshieldWiper.increaseLevel();

        expect(car.windshieldWiper.velocity).toBe(4);

        // Now in 'rain' context

        car.windshieldWiper.speedContext = 'rain';
        
        expect(car.windshieldWiper.velocity).toBe(8);

        car.windshieldWiper.decreaseLevel();

        expect(car.windshieldWiper.velocity).toBe(7);
        
        car.windshieldWiper.decreaseLevel();

        expect(car.windshieldWiper.velocity).toBe(6);
        
        car.windshieldWiper.decreaseLevel();

        expect(car.windshieldWiper.velocity).toBe(5);

        // To ensure it dont go under the minimum level

        car.windshieldWiper.decreaseLevel();

        expect(car.windshieldWiper.velocity).toBe(5);
    });

    it('windshield wiper must wipe 3 times if water system is activated', async () => {
        const car = new Car();
        const key = new CarKey(car);

        key.pressUnlock();
        car.turnOn(key);

        const spyActivateTemporarily = vitest.spyOn(car.windshieldWiper, 'activateTemporarily');
        spyActivateTemporarily.mockImplementationOnce(() => Promise.resolve());

        // With normal speed context and level 1 of speed we should have 1 swipe per second
        car.windshieldWiper.speedContext = 'normal';

        await car.waterSystem.washFrontal();

        expect(spyActivateTemporarily).toHaveBeenCalledTimes(1);
        expect(spyActivateTemporarily).toHaveBeenCalledWith(3);
    });

    it('can have the air conditioner activated if turned on', () => {
        const car = new Car();
        const key = new CarKey(car);

        key.pressUnlock();
        car.turnOn(key);

        car.airConditioner.increaseFanSpeed();

        expect(car.turnedOn).toBe(true);
        expect(car.airConditioner.isActive).toBe(true);

        car.airConditioner.decreaseFanSpeed();

        car.turnOff(key);

        car.airConditioner.increaseFanSpeed();

        expect(car.turnedOn).toBe(false);
        expect(car.airConditioner.isActive).toBe(false);
    });

    it('air conditioner fan can have different velocities', () => {
        const car = new Car();
        const key = new CarKey(car);

        key.pressUnlock();
        car.turnOn(key);

        // Test increasing

        expect(car.airConditioner.fanSpeed).toBe(0);

        car.airConditioner.increaseFanSpeed();

        expect(car.airConditioner.fanSpeed).toBe(1);

        car.airConditioner.increaseFanSpeed();

        expect(car.airConditioner.fanSpeed).toBe(2);
        
        car.airConditioner.increaseFanSpeed();

        expect(car.airConditioner.fanSpeed).toBe(3);

        // To ensure it dont go over the max speed

        car.airConditioner.increaseFanSpeed();

        expect(car.airConditioner.fanSpeed).toBe(3);

        // Test decreasing

        car.airConditioner.decreaseFanSpeed();

        expect(car.airConditioner.fanSpeed).toBe(2);

        car.airConditioner.decreaseFanSpeed();

        expect(car.airConditioner.fanSpeed).toBe(1);
        
        car.airConditioner.decreaseFanSpeed();

        expect(car.airConditioner.fanSpeed).toBe(0);

        // To ensure it dont go under the max speed

        car.airConditioner.decreaseFanSpeed();

        expect(car.airConditioner.fanSpeed).toBe(0);
    });

    it('air conditioner temperature can be changed within a limit', () => {
        const car = new Car();
        const key = new CarKey(car);

        key.pressUnlock();
        car.turnOn(key);

        expect(car.airConditioner.temperature).toBe(16);

        car.airConditioner.temperature = 20

        expect(car.airConditioner.temperature).toBe(20);
        
        car.airConditioner.temperature = 14;

        expect(car.airConditioner.temperature).toBe(16);
        
        car.airConditioner.temperature = 36;

        expect(car.airConditioner.temperature).toBe(35);
    });

    it('air conditioner air-direction can be chosen within a specified set', () => {
        const car = new Car();
        const key = new CarKey(car);

        key.pressUnlock();
        car.turnOn(key);

        expect(car.airConditioner.airDirection).toBe('front');

        car.airConditioner.airDirection = 'down';

        expect(car.airConditioner.airDirection).toBe('down');
        
        car.airConditioner.airDirection = 'front-down';

        expect(car.airConditioner.airDirection).toBe('front-down');
        
        car.airConditioner.airDirection = 'up-front';

        expect(car.airConditioner.airDirection).toBe('up-front');
    });

    it('air conditioner outside air entrance can be toggled on/off', () => {
        const car = new Car();
        const key = new CarKey(car);

        key.pressUnlock();
        car.turnOn(key);

        car.airConditioner.increaseFanSpeed();

        expect(car.airConditioner.outsideAirEntranceOpen).toBe(false);

        car.airConditioner.toggleOutsideAirEntrance();

        expect(car.airConditioner.outsideAirEntranceOpen).toBe(true);
        
        car.airConditioner.toggleOutsideAirEntrance();

        expect(car.airConditioner.outsideAirEntranceOpen).toBe(false);

        // To ensure it does no toggle after deactivated

        car.airConditioner.decreaseFanSpeed();

        car.airConditioner.toggleOutsideAirEntrance();

        expect(car.airConditioner.outsideAirEntranceOpen).toBe(false);
    });
    
    it('air conditioner cool can be toggled on/off', () => {
        const car = new Car();
        const key = new CarKey(car);

        key.pressUnlock();
        car.turnOn(key);

        car.airConditioner.increaseFanSpeed();

        expect(car.airConditioner.cool).toBe(false);

        car.airConditioner.toggleCool();

        expect(car.airConditioner.cool).toBe(true);
        
        car.airConditioner.toggleCool();

        expect(car.airConditioner.cool).toBe(false);

        // To ensure it does no toggle after deactivated

        car.airConditioner.decreaseFanSpeed();

        car.airConditioner.toggleCool();

        expect(car.airConditioner.cool).toBe(false);
    });

    it('air conditioner outside air entrance can not be on if air direction is "up-front"', () => {
        const car = new Car();
        const key = new CarKey(car);

        key.pressUnlock();
        car.turnOn(key);

        car.airConditioner.increaseFanSpeed();

        expect(car.airConditioner.airDirection).toBe('front');
        expect(car.airConditioner.outsideAirEntranceOpen).toBe(false);

        car.airConditioner.airDirection = 'up-front';

        car.airConditioner.toggleOutsideAirEntrance();

        expect(car.airConditioner.outsideAirEntranceOpen).toBe(false);

        car.airConditioner.airDirection = 'down';

        car.airConditioner.toggleOutsideAirEntrance();

        expect(car.airConditioner.outsideAirEntranceOpen).toBe(true);

        car.airConditioner.airDirection = 'up-front';

        expect(car.airConditioner.outsideAirEntranceOpen).toBe(false);
    });
});