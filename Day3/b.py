import re

with open("./Day3/input.txt") as input:
    rucksack = input.readlines()

priorities = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"

sum = 0

for n in range(0, len(rucksack), 3):
    first_elves = rucksack[n].strip()
    second_elves = rucksack[n + 1].strip()
    third_elves = rucksack[n + 2].strip()

    first_elves_regex = "[{pattern}]".format(pattern=first_elves)

    find_duplicate = re.findall(first_elves_regex, second_elves)

    second_elves_regex = "[{pattern}]".format(pattern="".join(find_duplicate))

    find_common = re.search(second_elves_regex, third_elves)

    sum += priorities.index(find_common.group()) + 1

print(sum)
