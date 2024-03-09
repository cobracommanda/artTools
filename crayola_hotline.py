from factory.the_color_api import get_color_scheme, get_cmyk_values, extract_color_names_and_cmyk
from factory.generate_tones import generate_variations, save_to_python_file
from factory.crayons import crayola_cmyk


def generate_and_write_variations_for_all_colors(crayola_cmyk, mode="analogic-complement", count=15):
    for color_name, _ in crayola_cmyk.items():
        generate_and_write_variations(crayola_cmyk, color_name, mode, count)

def generate_and_write_variations(crayola_cmyk, color_name, mode="analogic-complement", count=15):
    cmyk_values = crayola_cmyk[color_name]
    data = get_color_scheme(cmyk_values, mode=mode, count=count)
    color_info = extract_color_names_and_cmyk(data)
    kulers = generate_variations(color_info)
    save_to_python_file(kulers, mode, f'{color_name}_{mode} ',folder=color_name)
    




scheme = ['monochrome','monochrome-dark','monochrome-light','analogic','complement','analogic-complement','triad','quad']
for color in scheme:
    generate_and_write_variations_for_all_colors(crayola_cmyk, mode=color)