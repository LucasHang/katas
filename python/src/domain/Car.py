from src.shared.logger import log

from .carDoor import CarDoor
from .carWindshieldWiper import CarWindshieldWiper
from .carWaterSystem import CarWaterSystem
from .carAirConditioner import CarAirConditioner

class Car:
    def __init__(self):
        self._locked = True
        self._turnedOn = False
        self._moving = False
        self._doors = (CarDoor(), CarDoor(), CarDoor(), CarDoor())
        self._windshieldWiper = CarWindshieldWiper(self)
        self._waterSystem = CarWaterSystem(self)
        self._airConditioner = CarAirConditioner(self)

        log('Car created')

    @property
    def locked(self):
        return self._locked
    
    @property
    def turnedOn(self):
        return self._turnedOn
    
    @property
    def moving(self):
        return self._moving
    
    @property
    def doors(self):
        return self._doors
    
    @property
    def windshieldWiper(self):
        return self._windshieldWiper
    
    @property
    def waterSystem(self):
        return self._waterSystem
    
    @property
    def airConditioner(self):
        return self._airConditioner
    
    def unlock(self, carKey):
        if not carKey.authorizedFor(self):
            return

        self._locked = False

        log('Car unlocked')
    
    def openDoor(self, doorNumber):
        if self._locked:
            return

        self._doors[doorNumber].open()

        log(f'Door {doorNumber} open')

    def closeDoor(self, doorNumber):
        if self._locked:
            return

        self._doors[doorNumber].close()

        log(f'Door {doorNumber} closed')

    def turnOn(self, carKey):
        if not carKey.authorizedFor(self):
            return
        
        self._turnedOn = True

        log('Car turned on')

    def turnOff(self, carKey):
        if not carKey.authorizedFor(self):
            return
        
        self._turnedOn = False

        log('Car turned off')