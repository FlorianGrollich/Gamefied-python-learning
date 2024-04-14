from player_actions import PlayerActions


class Player:
    def __init__(self):
        self.x = 0
        self.y = 0
        self.backpack = []

    def move(self):
       print(PlayerActions.Move.value)

    def turnRight(self):
       print(PlayerActions.TurnRight.value)

    def turnLeft(self):
        pass

    def inspect(self):
        pass

    def take(self):
        pass
