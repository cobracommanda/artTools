import os

def generate_include_directives(root_dir):
    include_directives = []

    for dirpath, dirnames, filenames in os.walk(root_dir):
        for filename in filenames:
            if filename.endswith('.js'):
                include_directives.append(f'#include "{os.path.join(dirpath, filename)}";\n')

    return include_directives

def main():
    root_directory = '.'  # Change this to your desired root directory
    include_directives = generate_include_directives(root_directory)

    if include_directives:
        with open('includes.txt', 'w') as include_file:
            include_file.writelines(include_directives)
        print("Include directives written to includes.txt")
    else:
        print("No JavaScript files found in directories.")

if __name__ == "__main__":
    main()
