import Logger from "../shared/Logger";
import Car from "./Car";

const MIN_SPEED_LEVEL = 1;
const MAX_SPEED_LEVEL = 4;

export default class CarWindshieldWiper {
    private _isActive = false;
    private _speedContext: 'normal' | 'rain' = 'normal';
    private _speedLevel = MIN_SPEED_LEVEL;
    
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

        Logger.log('Windshield wiper activated');
    }

    deactivate() {
        this._isActive = false;

        Logger.log('Windshield wiper deactivated');
    }

    async activateTemporarily(numberOfSwipes: number) {
        this.activate();

        const timeoutInSeconds = numberOfSwipes / this.velocity;

        return new Promise(resolve => {
            setTimeout(() => {
                this.deactivate();

                resolve(null);
            }, timeoutInSeconds * 1000);
        });
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

        Logger.log('Windshield wiper speed level increased');
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

        Logger.log('Windshield wiper speed level decreased');
    }
}