import { describe, expect, it } from 'vitest';
import Car from './Car';
import CarKey from './CarKey';

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
});