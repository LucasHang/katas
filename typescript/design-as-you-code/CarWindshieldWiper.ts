import Car from "./Car";

const MIN_SPEED_LEVEL = 1;
const MAX_SPEED_LEVEL = 4;

export default class CarWindshieldWiper {
    private _isActive = false;
    private _speedContext: 'normal' | 'rain' = 'normal';
    private _speedLevel = 1;
    
    constructor(private car: Car) {}

    get isActive(): boolean {
        return this._isActive;
    }
    
    /** Expressed in ss (swipe by second) */
    get velocity(): number {
        if(!this._isActive){
            return 0;
        }

        const contextBaseVelocity = this._speedContext === 'normal' ? 0 : 4;

        return this._speedLevel + contextBaseVelocity;
    }

    set speedContext(value: 'normal' | 'rain') {
        this._speedContext = value;
    }

    activate() {
        if(!this.car.turnedOn) {
            return;
        }

        this._isActive = true;
    }

    deactivate() {
        this._isActive = false;
    }

    activateTemporarily(numberOfSwipes: number) {
        if(!this.car.turnedOn) {
            return;
        }

        const timeoutInSeconds = numberOfSwipes / this.velocity;

        this._isActive = true;

        setTimeout(this.deactivate, timeoutInSeconds * 1000);
    }

    increaseLevel() {
        if(!this._isActive){
            return;
        }

        const nextLevel = this._speedLevel + 1;

        if(nextLevel > MAX_SPEED_LEVEL){
            return;
        }

        this._speedLevel = nextLevel;
    }

    decreaseLevel() {
        if(!this._isActive){
            return;
        }

        const nextLevel = this._speedLevel - 1;

        if(nextLevel < MIN_SPEED_LEVEL){
            return;
        }

        this._speedLevel = nextLevel;
    }
}