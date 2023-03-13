import Logger from "../shared/Logger";
import CarAirConditioner from "./CarAirConditioner";
import CarDoor from "./CarDoor";
import CarKey from "./CarKey";
import CarWaterSystem from "./CarWaterSystem";
import CarWindshieldWiper from "./CarWindshieldWiper";

export default class Car {
    private _locked = true;
    private _turnedOn = false;
    private _moving = false;
    private _doors = [new CarDoor(), new CarDoor(), new CarDoor(), new CarDoor()];
    private _windshieldWiper = new CarWindshieldWiper(this);
    private _waterSystem = new CarWaterSystem(this);
    private _airConditioner = new CarAirConditioner(this);

    constructor() {
        Logger.log('Car created');
    }

    get locked(): boolean {
        return this._locked;
    }

    get turnedOn(): boolean {
        return this._turnedOn;
    }

    get moving(): boolean {
        return this._moving;
    }

    get doors(): CarDoor[] {
        return [...this._doors];
    }

    get windshieldWiper(): CarWindshieldWiper {
        return this._windshieldWiper;
    }

    get waterSystem(): CarWaterSystem {
        return this._waterSystem;
    }
    
    get airConditioner(): CarAirConditioner {
        return this._airConditioner;
    }

    unlock(key: CarKey) {
        if(!key.authorizedFor(this)){
            return;
        }

        this._locked = false;

        Logger.log('Car unlocked');
    }

    openDoor(doorIndex: number) {
        if(this._locked) {
            return;
        }

        const selectedDoor = this._doors[doorIndex];

        if(!selectedDoor){
            return;
        }

        selectedDoor.open();

        Logger.log(`Door ${doorIndex} open`);
    }

    closeDoor(doorIndex: number) {
        if(this._locked) {
            return;
        }

        const selectedDoor = this._doors[doorIndex];

        if(!selectedDoor){
            return;
        }

        selectedDoor.close();

        Logger.log(`Door ${doorIndex} closed`);
    }

    turnOn(key: CarKey) {
        if(!key.authorizedFor(this)){
            return;
        }

        this._turnedOn = true;

        Logger.log('Car turned on');
    }

    turnOff(key: CarKey) {
        if(!key.authorizedFor(this)){
            return;
        }

        this._turnedOn = false;

        Logger.log('Car turned off');
    }
}