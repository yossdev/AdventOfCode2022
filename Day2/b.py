# RULES
# Rock defeats Scissors, Scissors defeats Paper, and Paper defeats Rock
# win = 6
# lost = 0
# draw = 3

# Shape points
# rock = 1
# paper = 2
# scissors = 3

# Sequence -> Rock, Paper, Scissors
# Opponent -> A, B, C
# Self -> X, Y, Z

# Score = selected shape + outcome

with open("./Day2/input.txt") as input:
    rounds = input.readlines()

score = 0

opponent_move = ""
self_move = ""

# New Strategy
# X = Lose, Y = Draw, Z = Win

for round in rounds:
    matches = round.replace("\n", "").split(" ")
    opponent_move = matches[0]
    self_move = matches[1]

    if opponent_move == "A":
        opponent_move = "X"
    elif opponent_move == "B":
        opponent_move = "Y"
    else:
        opponent_move = "Z"

    # evaluate score
    # if opponent_move == "Z" and self_move == "X":
    #     score += 6
    # elif opponent_move == "X" and self_move == "Y":
    #     score += 6
    # elif opponent_move == "Y" and self_move == "Z":
    #     score += 6
    # elif opponent_move == self_move:
    #     score += 3

    if self_move == "Z":
        score += 6
        if opponent_move == "X":
            self_move = "Y"
        elif opponent_move == "Y":
            self_move = "Z"
        else:
            self_move = "X"
    elif self_move == "Y":
        score += 3
        self_move = opponent_move
    else:
        if opponent_move == "X":
            self_move = "Z"
        elif opponent_move == "Y":
            self_move = "X"
        else:
            self_move = "Y"

    if self_move == "X":
        score += 1
    elif self_move == "Y":
        score += 2
    else:
        score += 3


print(score)
