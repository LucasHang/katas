import CarDoor from "./CarDoor";
import CarKey from "./CarKey";

interface CarFeatures {
}

export default class Car {
    private _locked: boolean = true;
    private _turnedOn: boolean = false;
    private _moving: boolean = false;
    private _doors: CarDoor[] = [new CarDoor(), new CarDoor(), new CarDoor(), new CarDoor()];

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
}