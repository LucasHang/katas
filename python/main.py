import asyncio
from pprint import pprint

from src.domain.car import Car
from src.domain.carKey import CarKey
from src.shared.logger import logs

async def main():
    car = Car()
    key = CarKey(car)

    car.unlock(key)

    car.openDoor(0)

    car.turnOn(key)

    car.closeDoor(0)

    car.windshieldWiper.activate()
    car.windshieldWiper.increaseLevel()
    car.windshieldWiper.speedContext = 'rain'
    car.windshieldWiper.decreaseLevel()
    car.windshieldWiper.deactivate()

    await car.waterSystem.washFrontal()

    car.airConditioner.increaseFanSpeed()
    car.airConditioner.temperature = 20
    car.airConditioner.airDirection = 'front'
    car.airConditioner.toggleOutsideAirEntrance()
    car.airConditioner.toggleCool()
    car.airConditioner.decreaseFanSpeed()

    pprint(logs)

if __name__ == '__main__':
    sample_event = asyncio.get_event_loop()

    try:
        task_object_loop = sample_event.create_task(main())
        sample_event.run_until_complete(task_object_loop)
    finally:
        sample_event.close()
