export default class CarDoor {
    private _isOpen: boolean = false;
    
    constructor() {}

    get isOpen(): boolean {
        return this._isOpen;
    }

    open() {
        this._isOpen = true;
    }

    close() {
        this._isOpen = false;
    }
}