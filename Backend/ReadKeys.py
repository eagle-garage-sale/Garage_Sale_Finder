# This file contains a function that reads all the keys from a file and returns
# them in the form of an array.
import fileinput

filename = "keys.txt"
def ExtractKeys(file):
    i = 0
    lines = []
    for line in fileinput.input(file):
        if i % 2 == 1 and i != 0:
            lines.append(line.strip())
        i += 1
    return lines

