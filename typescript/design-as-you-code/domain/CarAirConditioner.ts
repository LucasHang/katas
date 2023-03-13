import Logger from "../shared/Logger";
import Car from "./Car";

const MIN_FAN_SPEED = 0;
const MAX_FAN_SPEED = 3;

const MIN_TEMPERATURE = 16;
const MAX_TEMPERATURE = 35;

type AirDirections = 'front' | 'down' | 'front-down' | 'up-front';

export default class CarAirConditioner {
    private _fanSpeed = MIN_FAN_SPEED;
    private _temperature = MIN_TEMPERATURE;
    private _airDirection: AirDirections = 'front'; 
    private _outsideAirEntranceOpen = false;
    private _cool = false;
    
    constructor(private car: Car) {}

    get isActive(): boolean {
        if(!this.car.turnedOn) {
            return false;
        }

        return this._fanSpeed > 0;
    }

    get fanSpeed(): number {
        return this._fanSpeed;
    }

    get temperature(): number {
        return this._temperature;
    }

    set temperature(value: number) {
        if(value < MIN_TEMPERATURE) {
            this._temperature = MIN_TEMPERATURE;
            return;
        }

        if(value > MAX_TEMPERATURE) {
            this._temperature = MAX_TEMPERATURE;
            return;
        }

        this._temperature = value;

        Logger.log(`Temperature set to ${value} degrees`);
    }

    get airDirection(): AirDirections {
        return this._airDirection;
    }

    set airDirection(value: AirDirections) {
        this._airDirection = value;

        if(value === 'up-front'){
            this._outsideAirEntranceOpen = false;
        }

        Logger.log(`Air direction set to ${value}`);
    }

    get outsideAirEntranceOpen(): boolean {
        return this._outsideAirEntranceOpen;
    }

    get cool(): boolean {
        return this._cool;
    }

    increaseFanSpeed() {
        const newFanSpeed = this._fanSpeed + 1;

        if(newFanSpeed > MAX_FAN_SPEED) {
            return;
        }

        this._fanSpeed = newFanSpeed;

        Logger.log(`Fan speed increased to ${newFanSpeed}`);
    }

    decreaseFanSpeed() {
        const newFanSpeed = this._fanSpeed - 1;

        if(newFanSpeed < MIN_FAN_SPEED) {
            return;
        }

        this._fanSpeed = newFanSpeed;

        Logger.log(`Fan speed decreased to ${newFanSpeed}`);
    }

    toggleOutsideAirEntrance() {
        if(!this.isActive){
            return;
        }

        if(this._airDirection === 'up-front') {
            this._outsideAirEntranceOpen = false;
            return;    
        }

        this._outsideAirEntranceOpen = !this._outsideAirEntranceOpen;

        Logger.log(`Outside air entrance toggled`);
    }

    toggleCool() {
        if(!this.isActive){
            return;
        }
        
        this._cool = !this._cool;

        Logger.log(`Cool toggled`);
    }
}