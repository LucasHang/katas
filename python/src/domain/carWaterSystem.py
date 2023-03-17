from src.shared.logger import log

SWIPE_TIMES_AFTER_WASHING = 3

class CarWaterSystem:
    def __init__(self, car):
        self._car = car

    async def washFrontal(self):
        if not self._car.turnedOn:
            return
        
        log('Washing frontal...')

        await self._car.windshieldWiper.activateTemporarily(SWIPE_TIMES_AFTER_WASHING)

        log('Washed frontal')