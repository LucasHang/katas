MIN_FAN_SPEED = 0
MAX_FAN_SPEED = 3

MIN_TEMPERATURE = 16
MAX_TEMPERATURE = 35

AIR_DIRECTIONS_OPTIONS = 'front', 'down', 'front-down', 'up-front'

class CarAirConditioner:
    def __init__(self, car):
        self._car = car
        self._fanSpeed = MIN_FAN_SPEED
        self._temperature = MIN_TEMPERATURE
        self._airDirection = 'front'
        """'front' | 'down' | 'front-down' | 'up-front'""" 
        self._outsideAirEntranceOpen = False
        self._cool = False

    @property
    def isActive(self):
        if not self._car.turnedOn:
            return False
        
        return self._fanSpeed > 0

    @property
    def fanSpeed(self):
        return self._fanSpeed

    @property
    def temperature(self):
        return self._temperature
    
    @temperature.setter
    def temperature(self, value):
        if value < MIN_TEMPERATURE:
            self._temperature = MIN_TEMPERATURE
            return
        
        if value > MAX_TEMPERATURE:
            self._temperature = MAX_TEMPERATURE
            return

        self._temperature = value

    @property
    def airDirection(self):
        return self._airDirection
    
    @airDirection.setter
    def airDirection(self, value):
        """'front' | 'down' | 'front-down' | 'up-front'"""

        if not AIR_DIRECTIONS_OPTIONS.count(value) == 1:
            return

        self._airDirection = value

        if value == 'up-front':
            self._outsideAirEntranceOpen = False

    @property
    def outsideAirEntranceOpen(self):
        return self._outsideAirEntranceOpen
    
    @property
    def cool(self):
        return self._cool

    def increaseFanSpeed(self):
        newFanSpeed = self._fanSpeed + 1

        if newFanSpeed > MAX_FAN_SPEED:
            return
        
        self._fanSpeed = newFanSpeed

    def decreaseFanSpeed(self):
        newFanSpeed = self._fanSpeed - 1

        if newFanSpeed < MIN_FAN_SPEED:
            return
        
        self._fanSpeed = newFanSpeed

    def toggleOutsideAirEntrance(self):
        if not self.isActive:
            return
        
        if self._airDirection == 'up-front':
            self._outsideAirEntranceOpen = False
            return

        self._outsideAirEntranceOpen = not self._outsideAirEntranceOpen

    def toggleCool(self):
        if not self.isActive:
            return
        
        self._cool = not self._cool
