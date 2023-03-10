import Car from "./Car";

export default class CarKey {
    constructor(private car: Car) {}

    authorizedFor(car: Car): boolean {
        return this.car === car;
    }

    insertAndUnlock() {
        this.car.unlock(this);
    }

    pressUnlock() {
        this.car.unlock(this);
    }
}