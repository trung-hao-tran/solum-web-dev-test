"""
Mystic Waves - Solution

Problem Analysis:
- every 2 waves, the energy returns to 0.
- if n is even, total energy = 0.
- if n is odd, total energy = x.
- Or we can express this as total energy = x * (n % 2). This is faster to compute.

"""

def calculate_energy(x, n):
    """
    Calculate total magical energy after n waves.

    Args:
        x: The initial energy value
        n: Number of waves

    Returns:
        Total energy (0 if n is even, x if n is odd)
    """
    # Method 1: Simple formula 
    return x * (n % 2)

    # Alternative Method 2: Explicit if-else 
    # if n % 2 == 0:
    #     return 0
    # else:
    #     return x


def main():
    # Read number of test cases
    t = int(input())

    for _ in range(t):
        x, n = map(int, input().split())

        result = calculate_energy(x, n)
        print(result)


if __name__ == "__main__":
    main()
