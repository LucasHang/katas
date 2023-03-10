import Car from "./Car";

const SWIPE_TIMES_AFTER_WASHING = 3;

export default class CarWaterSystem {
    constructor(private car: Car) {}

    washFrontal() {
        if(!this.car.turnedOn){
            return;
        }

        console.log('Washing frontal...');

        this.car.windshieldWiper.activateTemporarily(SWIPE_TIMES_AFTER_WASHING);
    }
}