import unittest
from src.domain.car import Car
from src.domain.carKey import CarKey

class Test_CarEntity(unittest.TestCase):
    def test_carInitWithTheRightState(self):
        car = Car()

        self.assertEqual(car.locked, True)
        self.assertEqual(car.turnedOn, False)
        self.assertEqual(car.moving, False)

    def test_carUnlockInsertingKeyInKeyhole(self):
        car = Car()
        key = CarKey(car)
        
        key.insertAndUnlock()

        self.assertEqual(car.locked, False)

    def test_carUnlockPressingUnlockOnKey(self):
        car = Car()
        key = CarKey(car)
        
        key.pressUnlock()

        self.assertEqual(car.locked, False)

    def test_carDoorCanBeOpenOrClosedWhenUnlocked(self):
        car = Car()
        key = CarKey(car)
        
        key.pressUnlock()

        car.openDoor(0)

        self.assertEqual(car.doors[0].isOpen, True)
        
        car.closeDoor(0)

        self.assertEqual(car.doors[0].isOpen, False)

if __name__ == '__main__':
    unittest.main()