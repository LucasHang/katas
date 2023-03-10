require('dotenv').config()

import Car from "./domain/Car";
import CarKey from "./domain/CarKey";
import Logger from "./shared/Logger";

async function main() {
    const car = new Car();
    const key = new CarKey(car);

    car.unlock(key);

    car.openDoor(0);

    car.turnOn(key);

    car.windshieldWiper.activate();
    car.windshieldWiper.increaseLevel();
    car.windshieldWiper.speedContext = 'rain';
    car.windshieldWiper.decreaseLevel();
    car.windshieldWiper.deactivate();

    await car.waterSystem.washFrontal()

    console.log(Logger.logs);
}

main();
