import re

with open("./Day3/input.txt") as input:
    rucksack = input.readlines()

priorities = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"

sum = 0

for ruck in rucksack:
    chunks, chunk_size = len(ruck), len(ruck) // 2
    split_ruck = [
        ruck.strip()[i : i + chunk_size] for i in range(0, chunks, chunk_size)
    ]

    first_compartment = split_ruck[0]
    second_compartment = split_ruck[1]

    regx = re.compile(
        r"[{first_compartment}]".format(first_compartment=first_compartment)
    )

    find_duplicate = regx.search(second_compartment)

    sum += priorities.index(find_duplicate.group()) + 1

print(sum)
