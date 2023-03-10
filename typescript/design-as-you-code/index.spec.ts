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

    it('can have a door open if unlocked', () => {
        const car = new Car();
        const key = new CarKey(car);

        key.pressUnlock();

        car.openDoor(0);

        expect(car.doors[0].isOpen).toBe(true);
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

    it('windshield wiper must wipe 3 times if water system is activated', () => {
        const car = new Car();
        const key = new CarKey(car);

        key.pressUnlock();
        car.turnOn(key);

        const spyActivateTemporarily = vitest.spyOn(car.windshieldWiper, 'activateTemporarily');
        spyActivateTemporarily.mockImplementationOnce(() => Promise.resolve());

        // With normal speed context and level 1 of speed we should have 1 swipe per second
        car.windshieldWiper.speedContext = 'normal';

        car.waterSystem.washFrontal();

        expect(spyActivateTemporarily).toHaveBeenCalledTimes(1);
        expect(spyActivateTemporarily).toHaveBeenCalledWith(3);
    });
});