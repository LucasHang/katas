from .carDoor import CarDoor
from .carWindshieldWiper import CarWindshieldWiper
from .carWaterSystem import CarWaterSystem

class Car:
    def __init__(self):
        self._locked = True
        self._turnedOn = False
        self._moving = False
        self._doors = (CarDoor(), CarDoor(), CarDoor(), CarDoor())
        self._windshieldWiper = CarWindshieldWiper(self)
        self._waterSystem = CarWaterSystem(self)

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
    
    def unlock(self, carKey):
        if not carKey.authorizedFor(self):
            return

        self._locked = False
    
    def openDoor(self, doorNumber):
        if self._locked:
            return

        self._doors[doorNumber].open()

    def closeDoor(self, doorNumber):
        if self._locked:
            return

        self._doors[doorNumber].close()

    def turnOn(self, carKey):
        if not carKey.authorizedFor(self):
            return
        
        self._turnedOn = True

    def turnOff(self, carKey):
        if not carKey.authorizedFor(self):
            return
        
        self._turnedOn = False