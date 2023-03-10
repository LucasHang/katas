import Logger from "../shared/Logger";
import Car from "./Car";

const SWIPE_TIMES_AFTER_WASHING = 3;

export default class CarWaterSystem {
    constructor(private car: Car) {}

    async washFrontal() {
        if(!this.car.turnedOn){
            return;
        }

        Logger.log('Washing frontal...');

        await this.car.windshieldWiper.activateTemporarily(SWIPE_TIMES_AFTER_WASHING);

        Logger.log('Washed frontal');
    }
}