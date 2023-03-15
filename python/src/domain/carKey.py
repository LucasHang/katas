class CarKey:
    def __init__(self, car):
        self._car = car

    def authorizedFor(self, car):
        return self._car == car

    def insertAndUnlock(self):
        self._car.unlock(self)

    def pressUnlock(self):
        self._car.unlock(self)