import asyncio

MIN_SPEED_LEVEL = 1
MAX_SPEED_LEVEL = 4

class CarWindshieldWiper:
    def __init__(self, car):
        self._car = car
        self._isActive = False
        self._speedContext = 'normal'
        """'normal' | 'rain'"""
        self._speedLevel = MIN_SPEED_LEVEL

    @property
    def isActive(self):
        return self._isActive
    
    @property
    def velocity(self):
        """Expressed in ss (swipe by second)"""

        if not self._isActive:
            return 0
        
        contextBaseVelocity = 0 if self._speedContext == 'normal' else 4

        return self._speedLevel + contextBaseVelocity

    @property
    def speedContext(self):
        return self._speedContext
    
    @speedContext.setter
    def speedContext(self, value):
        """'normal' | 'rain'"""
        self._speedContext = value

    def activate(self):
        if not self._car.turnedOn:
            print('entrou no pass')
            return

        self._isActive = True
    
    async def activateTemporarily(self, numberOfSwipes):
        self.activate()

        timeoutInSeconds = numberOfSwipes / self.velocity

        await asyncio.sleep(timeoutInSeconds)

        self.deactivate()

    def deactivate(self):
        self._isActive = False

    def increaseLevel(self):
        if not self._isActive:
            return
        
        newSpeedLevel = self._speedLevel + 1

        if newSpeedLevel > MAX_SPEED_LEVEL:
            return
        
        self._speedLevel = newSpeedLevel
    
    def decreaseLevel(self):
        if not self._isActive:
            return
        
        newSpeedLevel = self._speedLevel - 1

        if newSpeedLevel < MIN_SPEED_LEVEL:
            return
        
        self._speedLevel = newSpeedLevel