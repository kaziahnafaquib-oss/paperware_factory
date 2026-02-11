
import sys

def check_brackets(filename):
    with open(filename, 'r') as f:
        content = f.read()
    
    stack = []
    lines = content.split('\n')
    for i, line in enumerate(lines):
        for char in line:
            if char == '{':
                stack.append(('{', i + 1))
            elif char == '}':
                if not stack:
                    print(f"Extra closing brace at line {i + 1}")
                    return
                stack.pop()
            elif char == '[':
                stack.append(('[', i + 1))
            elif char == ']':
                if not stack:
                    print(f"Extra closing bracket at line {i + 1}")
                    return
                top, _ = stack.pop()
                if top != '[':
                    print(f"Mismatched bracket at line {i + 1}")
                    return
    
    if stack:
        for char, line in stack:
            print(f"Unclosed {char} starting at line {line}")
    else:
        print("All brackets match!")

if __name__ == "__main__":
    check_brackets(sys.argv[1])
