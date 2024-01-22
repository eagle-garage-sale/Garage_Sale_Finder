# This file contains a function that reads all the keys from a file and returns
# them in the form of an array.
import fileinput

def ExtractKeys(filename):
    i = 0
    lines = []
    for line in fileinput.input(filename):
        if i % 2 == 1 and i != 0:
            lines.append(line.strip())
        i += 1
    return lines

