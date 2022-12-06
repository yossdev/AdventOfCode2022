res = 0
total = 0

with open("./Day1/input.txt") as input:
    inventory = input.readlines()

for food in inventory:
    if food == "\n":
        if total > res:
            res = total
        total = 0
    else:
        total += int(food.replace("\n", ""))

print(res)
