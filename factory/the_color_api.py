import requests

def get_color_scheme(cmyk_values, mode="monochrome", count=6):
    """
    Retrieves a color scheme from the Color API based on CMYK values.
    
    Args:
    - cmyk_values (dict): A dictionary containing CMYK values for a color.
    
    Returns:
    - dict: A dictionary containing the retrieved color scheme.
    
    modes: monochrome monochrome-dark monochrome-light analogic complement analogic-complement triad quad
    """
    url = "https://www.thecolorapi.com/scheme"
    params = {
        "cmyk": f"{cmyk_values['C']},{cmyk_values['M']},{cmyk_values['Y']},{cmyk_values['K']}",
        "format": "json",
        "mode": mode,
        "count": count
    }
    
    response = requests.get(url, params=params)
    if response.status_code == 200:
        return response.json()
    else:
        print(f"Error: {response.status_code}")
        return None



def get_cmyk_values(color_name, crayola_data):
    """
    Returns the CMYK values for a given color name from the Crayola dictionary.
    
    Args:
    - color_name (str): The name of the Crayola color.
    - crayola_data (dict): The Crayola CMYK data dictionary.
    
    Returns:
    - dict: A dictionary containing the CMYK values for the specified color.
    """
    try:
        cmyk_values = crayola_data[color_name]
        return cmyk_values
    except KeyError:
        print(f"Color '{color_name}' not found in the Crayola dictionary.")
        return None


def get_cmyk_dict(color_name, crayola_data):
    cmyk_values = get_cmyk_values(color_name, crayola_data)
    if cmyk_values:
        return {"C": cmyk_values['C'], "M": cmyk_values['M'], "Y": cmyk_values['Y'], "K": cmyk_values['K']}
    else:
        return None
    
def extract_color_names_and_cmyk(data):
    color_info_list = []

    for color_info in data['colors']:
        color_dict = {
            'name': color_info['name']['value'],
            'cmyk': {
                'c': color_info['cmyk']['c'],
                'm': color_info['cmyk']['m'],
                'y': color_info['cmyk']['y'],
                'k': color_info['cmyk']['k']
            }
        }
        color_info_list.append(color_dict)

    return color_info_list

