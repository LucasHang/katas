import unittest
from unittest.mock import AsyncMock

from src.domain.car import Car
from src.domain.carKey import CarKey

class Test_CarEntity(unittest.TestCase):
    def test_carInitWithTheRightState(self):
        """Car constructs in the right state"""
        
        car = Car()

        self.assertEqual(car.locked, True)
        self.assertEqual(car.turnedOn, False)
        self.assertEqual(car.moving, False)

    def test_carUnlockInsertingKeyInKeyhole(self):
        """Car can be unlocked inserting the key in the keyhole"""

        car = Car()
        key = CarKey(car)
        
        key.insertAndUnlock()

        self.assertEqual(car.locked, False)

    def test_carUnlockPressingUnlockOnKey(self):
        """Car can be unlocked pressing the "unlock" button on key"""

        car = Car()
        key = CarKey(car)

        key.pressUnlock()

        self.assertEqual(car.locked, False)

    def test_carDoorCanBeOpenOrClosedWhenUnlocked(self):
        """Car can have a door open/closed if unlocked"""

        car = Car()
        key = CarKey(car)
        
        key.pressUnlock()

        car.openDoor(0)

        self.assertEqual(car.doors[0].isOpen, True)
        
        car.closeDoor(0)

        self.assertEqual(car.doors[0].isOpen, False)
    
    def test_carCanBeTurnedOnInsertingKey(self):
        """Car can be turned on/off using a key"""

        car = Car()
        key = CarKey(car)
        
        key.pressUnlock()

        car.turnOn(key)

        self.assertEqual(car.turnedOn, True)

        car.turnOff(key)

        self.assertEqual(car.turnedOn, False)

    def test_carWindshieldWiperActivatedIfCarTurnedOn(self):
        """Car windshield wiper can only be activated when the car is turned on"""

        car = Car()
        key = CarKey(car)

        car.turnOn(key)
        
        car.windshieldWiper.activate()

        self.assertEqual(car.windshieldWiper.isActive, True)

        car.windshieldWiper.deactivate()

        self.assertEqual(car.windshieldWiper.isActive, False)

        car.turnOff(key)

        car.windshieldWiper.activate()

        self.assertEqual(car.windshieldWiper.isActive, False)
    
    def test_carWindshieldWiperDifferentVelocities(self):
        """Car windshield wiper can choose different velocities"""

        car = Car()
        key = CarKey(car)

        car.turnOn(key)
        
        car.windshieldWiper.activate()

        self.assertEqual(car.windshieldWiper.velocity, 1)

        car.windshieldWiper.increaseLevel()

        self.assertEqual(car.windshieldWiper.velocity, 2)
        
        car.windshieldWiper.increaseLevel()

        self.assertEqual(car.windshieldWiper.velocity, 3)
        
        car.windshieldWiper.increaseLevel()

        self.assertEqual(car.windshieldWiper.velocity, 4)

        # To ensure it dont go over the max level

        car.windshieldWiper.increaseLevel()

        self.assertEqual(car.windshieldWiper.velocity, 4)

        # Now in 'rain' context

        car.windshieldWiper.speedContext = 'rain'
        
        self.assertEqual(car.windshieldWiper.velocity, 8)

        car.windshieldWiper.decreaseLevel()

        self.assertEqual(car.windshieldWiper.velocity, 7)
        
        car.windshieldWiper.decreaseLevel()

        self.assertEqual(car.windshieldWiper.velocity, 6)
        
        car.windshieldWiper.decreaseLevel()

        self.assertEqual(car.windshieldWiper.velocity, 5)

        # To ensure it dont go under the minimum level

        car.windshieldWiper.decreaseLevel()

        self.assertEqual(car.windshieldWiper.velocity, 5)

    def test_carAirConditionerActivatedIfCarTurnedOn(self):
        """Car air conditioner can only be activated if the car is turned on"""

        car = Car()
        key = CarKey(car)

        car.turnOn(key)

        self.assertEqual(car.airConditioner.isActive, False)

        car.airConditioner.increaseFanSpeed()

        self.assertEqual(car.airConditioner.isActive, True)
        
        car.airConditioner.decreaseFanSpeed()

        car.turnOff(key)

        car.airConditioner.increaseFanSpeed()

        self.assertEqual(car.airConditioner.isActive, False)

    def test_carAirConditionerFanSpeedDifferentVelocities(self):
        """Car air conditioner fan can have different velocities"""

        car = Car()
        key = CarKey(car)

        car.turnOn(key)

        # Test increasing

        self.assertEqual(car.airConditioner.fanSpeed, 0)

        car.airConditioner.increaseFanSpeed()

        self.assertEqual(car.airConditioner.fanSpeed, 1)

        car.airConditioner.increaseFanSpeed()

        self.assertEqual(car.airConditioner.fanSpeed, 2)
        
        car.airConditioner.increaseFanSpeed()

        self.assertEqual(car.airConditioner.fanSpeed, 3)

        # To ensure it dont go over the max speed

        car.airConditioner.increaseFanSpeed()

        self.assertEqual(car.airConditioner.fanSpeed, 3)

        # Test decreasing

        car.airConditioner.decreaseFanSpeed()

        self.assertEqual(car.airConditioner.fanSpeed, 2)

        car.airConditioner.decreaseFanSpeed()

        self.assertEqual(car.airConditioner.fanSpeed, 1)
        
        car.airConditioner.decreaseFanSpeed()

        self.assertEqual(car.airConditioner.fanSpeed, 0)

        # To ensure it dont go under the max speed

        car.airConditioner.decreaseFanSpeed()

        self.assertEqual(car.airConditioner.fanSpeed, 0)

    def test_carAirConditionerTemperatureChangesRespectingLimits(self):
        """Car air conditioner temperature can be changed within a limit"""

        car = Car()
        key = CarKey(car)

        car.turnOn(key)

        self.assertEqual(car.airConditioner.temperature, 16)

        car.airConditioner.temperature = 20

        self.assertEqual(car.airConditioner.temperature, 20)
        
        car.airConditioner.temperature = 14

        self.assertEqual(car.airConditioner.temperature, 16)
        
        car.airConditioner.temperature = 36

        self.assertEqual(car.airConditioner.temperature, 35)

    def test_carAirConditionerDirectionChosenWithinSet(self):
        """Car air conditioner air-direction can be chosen within a specified set"""

        car = Car()
        key = CarKey(car)

        car.turnOn(key)
        
        self.assertEqual(car.airConditioner.airDirection, 'front')

        car.airConditioner.airDirection = 'down'

        self.assertEqual(car.airConditioner.airDirection, 'down')
        
        car.airConditioner.airDirection = 'front-down'

        self.assertEqual(car.airConditioner.airDirection, 'front-down')
        
        car.airConditioner.airDirection = 'up-front'

        self.assertEqual(car.airConditioner.airDirection, 'up-front')

    def test_carAirConditionerOutsideEntranceToggled(self):
        """Car air conditioner outside air entrance can be toggled on/off"""

        car = Car()
        key = CarKey(car)

        car.turnOn(key)

        car.airConditioner.increaseFanSpeed()

        self.assertEqual(car.airConditioner.outsideAirEntranceOpen, False)

        car.airConditioner.toggleOutsideAirEntrance()

        self.assertEqual(car.airConditioner.outsideAirEntranceOpen, True)
        
        car.airConditioner.toggleOutsideAirEntrance()

        self.assertEqual(car.airConditioner.outsideAirEntranceOpen, False)

        # To ensure it does no toggle after deactivated

        car.airConditioner.decreaseFanSpeed()

        car.airConditioner.toggleOutsideAirEntrance()

        self.assertEqual(car.airConditioner.outsideAirEntranceOpen, False)
    
    def test_carAirConditionerCoolToggled(self):
        """Car air conditioner cool can be toggled on/off"""

        car = Car()
        key = CarKey(car)

        car.turnOn(key)

        car.airConditioner.increaseFanSpeed()

        self.assertEqual(car.airConditioner.cool, False)

        car.airConditioner.toggleCool()

        self.assertEqual(car.airConditioner.cool, True)
        
        car.airConditioner.toggleCool()

        self.assertEqual(car.airConditioner.cool, False)

        # To ensure it does no toggle after deactivated

        car.airConditioner.decreaseFanSpeed()

        car.airConditioner.toggleCool()

        self.assertEqual(car.airConditioner.cool, False)

class Test_CarEntityAsync(unittest.IsolatedAsyncioTestCase):
    async def test_carWindshieldWiperWipe3TimesIfWaterSystemActivated(self):
        """Car windshield wiper must wipe 3 times if water system is activated"""

        car = Car()
        key = CarKey(car)

        car.turnOn(key)

        car.windshieldWiper.activateTemporarily = AsyncMock(name="activateTemporarily")

        car.windshieldWiper.speedContext = 'normal'

        await car.waterSystem.washFrontal()

        car.windshieldWiper.activateTemporarily.assert_called_once()
        car.windshieldWiper.activateTemporarily.assert_called_once_with(3)

if __name__ == '__main__':
    unittest.main()