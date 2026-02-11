
import re
import sys

def clean_duplicates(filename):
    with open(filename, 'r') as f:
        content = f.read()

    def process_object(match):
        obj_name = match.group(1)
        body = match.group(2)
        
        lines = body.split('\n')
        new_lines = []
        seen_keys = set()
        
        for line in lines:
            line_strip = line.strip()
            if not line_strip:
                new_lines.append(line)
                continue
            
            # Key matching
            m = re.match(r'^\s*([a-zA-Z0-9_]+)\s*:', line_strip)
            if m:
                key = m.group(1)
                if key in seen_keys:
                    continue # Skip duplicate
                seen_keys.add(key)
                new_lines.append(line)
            else:
                new_lines.append(line)
        
        return f'const {obj_name} = {{\n' + '\n'.join(new_lines).strip('\n') + '\n};'

    # Pattern for language objects
    pattern = re.compile(r'const ([A-Z]{2}) = \{(.*?)\};', re.DOTALL)
    new_content = pattern.sub(process_object, content)

    with open(filename, 'w') as f:
        f.write(new_content)
    print(f"Cleaned duplicates in {filename}")

if __name__ == "__main__":
    clean_duplicates(sys.argv[1])
