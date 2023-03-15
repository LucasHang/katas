class CarDoor:
    def __init__(self):
        self._isOpen = False

    @property
    def isOpen(self):
        return self._isOpen
    
    def open(self):
        self._isOpen = True

    def close(self):
        self._isOpen = False