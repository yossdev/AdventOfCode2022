res = []
total = 0

with open("./Day1/input.txt") as input:
    inventory = input.readlines()

for food in inventory:
    if food == "\n":
        res.append(total)
        total = 0
    else:
        total += int(food.replace("\n", ""))

top_three = 0
res_sorted = sorted(res)
for x in range(3):
    top_three += res_sorted[(len(res_sorted) - (x + 1))]

print(top_three)
