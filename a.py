def extract_added_lines(patch_file, output_file=None):
    """
    Extracts lines that start with '+' (added lines) from a given patch file.

    Args:
    - patch_file (str): The path to the patch file to process.
    - output_file (str, optional): If provided, the added lines will be written to this file.

    Returns:
    - list: A list of added lines.
    """
    added_lines = []

    try:
        with open(patch_file, 'r') as file:
            for line in file:
                if line.startswith('+') and not line.startswith('+++'):
                    added_lines.append(line.strip())

        # Output to file if an output file path is given
        if output_file:
            with open(output_file, 'w') as out_file:
                for line in added_lines:
                    out_file.write(line + '\n')

        # Return added lines for further processing or printing
        return added_lines

    except FileNotFoundError:
        print(f"Error: The file '{patch_file}' was not found.")
        return []


# Example Usage
if __name__ == "__main__":
    patch_file = '0001-Implement-command-pattern-for-About-Us-management-an.patch'  # Replace with your patch file path
    output_file = 'added_lines.patch'    # Output file path (optional)

    added_lines = extract_added_lines(patch_file, output_file)

    print("Extracted Added Lines:")
    for line in added_lines:
        print(line)

    if output_file:
        print(f"\nThe added lines have been written to '{output_file}'.")