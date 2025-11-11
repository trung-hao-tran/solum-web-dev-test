"""
CargoCraft Fleet - Mathematical Solution

Equation: 4a + 6b = n  →  2a + 3b = n/2 (let m = n/2)

Strategy:

For MINIMUM crafts (fewer is better):
  - Maximize Type B usage (6 units each = more efficient)
  - Handle remainders with Type A:
    • m % 3 == 0: Use only Type B → min = m/3
    • m % 3 == 1: Trade 1 Type B for 2 Type A (saves 3, adds 4) → min = (m+2)/3
    • m % 3 == 2: Add 1 Type A for the remainder → min = (m+1)/3

For MAXIMUM crafts (more is better):
  - Maximize Type A usage (4 units each = less efficient)
  - Use Type B only to handle odd remainders:
    • m is even: Use only Type A → max = m/2
    • m is odd: Need 1 Type B, rest Type A → max = (m-1)/2

Edge cases:
  - n is odd: Impossible (can't make odd with even numbers)
  - m = 1 (n = 2): No solution (minimum is 4 or 6)
"""

def solve_cargocraft(n):
    if n % 2 == 1:
        return (-1, -1)

    m = n // 2

    if m == 1:
        return (-1, -1)

    if m % 3 == 0:
        min_crafts = m // 3
    elif m % 3 == 1:
        min_crafts = (m + 2) // 3
    else:
        min_crafts = (m + 1) // 3

    if m % 2 == 0:
        max_crafts = m // 2
    else:
        max_crafts = (m - 1) // 2

    return (min_crafts, max_crafts)


def main():
    t = int(input())

    for _ in range(t):
        n = int(input())
        result = solve_cargocraft(n)

        if result == (-1, -1):
            print(-1)
        else:
            print(result[0], result[1])


if __name__ == "__main__":
    main()
