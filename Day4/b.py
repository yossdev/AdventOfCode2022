with open("./Day4/input.txt") as input:
    a = input.readlines()

res = 0

for section in a:
    pairs = section.strip().split(",")
    first_pair = pairs[0].split("-")
    second_pair = pairs[1].split("-")

    list_first_pair = list(range(int(first_pair[0]), int(first_pair[1]) + 1))
    list_second_pair = list(
        range(int(second_pair[0]), int(second_pair[1]) + 1))

    if any(item in list_first_pair for item in list_second_pair) is True:
        res += 1

print(res)
