SWIPE_TIMES_AFTER_WASHING = 3

class CarWaterSystem:
    def __init__(self, car):
        self._car = car

    async def washFrontal(self):
        if not self._car.turnedOn:
            return
        
        await self._car.windshieldWiper.activateTemporarily(SWIPE_TIMES_AFTER_WASHING)