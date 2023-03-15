from .carDoor import CarDoor

class Car:
    def __init__(self):
        self._locked = True
        self._turnedOn = False
        self._moving = False
        self.doors = (CarDoor(), CarDoor(), CarDoor(), CarDoor())

    @property
    def locked(self):
        return self._locked
    
    @property
    def turnedOn(self):
        return self._turnedOn
    
    @property
    def moving(self):
        return self._moving
    
    def unlock(self, carKey):
        if not carKey.authorizedFor(self):
            pass

        self._locked = False
    
    def openDoor(self, doorNumber):
        if self._locked:
            pass

        self.doors[doorNumber].open()

    def closeDoor(self, doorNumber):
        if self._locked:
            pass

        self.doors[doorNumber].close()