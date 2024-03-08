
import os
def generate_variations(colors, lighten_by=-18, darken_by=10):
    variations_list = []

    for color in colors:
        original_cmyk = color['cmyk']
        highlight_cmyk = generate_cmyk_variation(original_cmyk, lighten_by)
        shadow_cmyk = generate_cmyk_variation(original_cmyk, darken_by)

        variations = {
            'name': color['name'],
            'cmyk': original_cmyk,
            'tones': {
                'highlight': highlight_cmyk,
                'shadow': shadow_cmyk
            }
        }
        variations_list.append(variations)

    return variations_list


def generate_cmyk_variation(cmyk_values, offset):
    cmyk_variation = {}
    for key, value in cmyk_values.items():
        if value is None:
            print(f"Value for key '{key}' is None in dictionary: {cmyk_values}")
            cmyk_variation[key] = 0  # Set to 0 if value is None
        else:
            cmyk_variation[key] = max(0, min(100, value + offset))
    return cmyk_variation


def clean_string(filename):
    # Remove extension
    filename = filename.split('.')[0]
    # Replace '-' with '_'
    filename = filename.replace('-', '_').strip()
    filename = filename.replace(' ', '_')
    return filename

# def save_to_python_file(data, filename):
#     with open(f'{clean_string(filename)}.js', 'w') as py_file:
#         py_file.write(f"var {clean_string(filename)} = [\n")
#         for variation in data:
#             py_file.write("  {\n")
#             py_file.write(f"    'name': '{variation['name']}',\n")
#             py_file.write("    'cmyk': {\n")
#             py_file.write(f"      'c': {variation['cmyk']['c']},\n")
#             py_file.write(f"      'm': {variation['cmyk']['m']},\n")
#             py_file.write(f"      'y': {variation['cmyk']['y']},\n")
#             py_file.write(f"      'k': {variation['cmyk']['k']}\n")
#             py_file.write("    },\n")
#             py_file.write("    'tones': {\n")
#             py_file.write("      'highlight': {\n")
#             py_file.write(f"        'c': {variation['tones']['highlight']['c']},\n")
#             py_file.write(f"        'm': {variation['tones']['highlight']['m']},\n")
#             py_file.write(f"        'y': {variation['tones']['highlight']['y']},\n")
#             py_file.write(f"        'k': {variation['tones']['highlight']['k']}\n")
#             py_file.write("      },\n")
#             py_file.write("      'shadow': {\n")
#             py_file.write(f"        'c': {variation['tones']['shadow']['c']},\n")
#             py_file.write(f"        'm': {variation['tones']['shadow']['m']},\n")
#             py_file.write(f"        'y': {variation['tones']['shadow']['y']},\n")
#             py_file.write(f"        'k': {variation['tones']['shadow']['k']}\n")
#             py_file.write("      }\n")
#             py_file.write("    }\n")
#             py_file.write("  },\n")
#         py_file.write("];\n")




def save_to_python_file(data, filename,mode, folder=None):
    if folder:
        if not os.path.exists(folder):
            os.makedirs(folder)
        filename = os.path.join(folder, filename)
    with open(f'{filename}.js', 'w') as py_file:
        py_file.write(f"var {clean_string(mode)} = [\n")
        for variation in data:
            py_file.write("  {\n")
            py_file.write(f"    'name': '{variation['name']}',\n")
            py_file.write("    'cmyk': {\n")
            py_file.write(f"      'c': {variation['cmyk']['c']},\n")
            py_file.write(f"      'm': {variation['cmyk']['m']},\n")
            py_file.write(f"      'y': {variation['cmyk']['y']},\n")
            py_file.write(f"      'k': {variation['cmyk']['k']}\n")
            py_file.write("    },\n")
            py_file.write("    'tones': {\n")
            py_file.write("      'highlight': {\n")
            py_file.write(f"        'c': {variation['tones']['highlight']['c']},\n")
            py_file.write(f"        'm': {variation['tones']['highlight']['m']},\n")
            py_file.write(f"        'y': {variation['tones']['highlight']['y']},\n")
            py_file.write(f"        'k': {variation['tones']['highlight']['k']}\n")
            py_file.write("      },\n")
            py_file.write("      'shadow': {\n")
            py_file.write(f"        'c': {variation['tones']['shadow']['c']},\n")
            py_file.write(f"        'm': {variation['tones']['shadow']['m']},\n")
            py_file.write(f"        'y': {variation['tones']['shadow']['y']},\n")
            py_file.write(f"        'k': {variation['tones']['shadow']['k']}\n")
            py_file.write("      }\n")
            py_file.write("    }\n")
            py_file.write("  },\n")
        py_file.write("];\n")