import CarDoor from "./CarDoor";
import CarKey from "./CarKey";
import CarWindshieldWiper from "./CarWindshieldWiper";

interface CarFeatures {
}

export default class Car {
    private _locked = true;
    private _turnedOn = false;
    private _moving = false;
    private _doors = [new CarDoor(), new CarDoor(), new CarDoor(), new CarDoor()];
    private _windshieldWiper = new CarWindshieldWiper(this);

    constructor() {
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

    unlock(key: CarKey) {
        if(!key.authorizedFor(this)){
            return;
        }

        this._locked = false;
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
    }

    turnOn(key: CarKey) {
        if(!key.authorizedFor(this)){
            return;
        }

        this._turnedOn = true;
    }

    turnOff(key: CarKey) {
        if(!key.authorizedFor(this)){
            return;
        }

        this._turnedOn = false;
    }
}