"""
"""
import requests
from sys import argv


def main():
    # TODO: Normalize species, backgrounds, and Gods on output
    # TODO: function to read text from a file and return stats
    # TODO: function to grab text from a link and return the stats
    # TODO: function to loop through links (or files) and build a winners file
    for url in argv[1:]:
        txt = read_url(url)
        try:
            print(parse_one_morgue(txt))
        except ParserError as e:
            print('ParserError', e, url)
        except Loser as e:
            print('Loser', url)


def read_url(url):
    """
    """
    r = requests.get(url)
    return r.content.decode("utf-8")


def parse_one_morgue(txt):
    txt = strip_html(txt)

    lines = txt.split('\n')[:20]
    if len(lines) < 13:
        raise ParserError('Invalid file, not long enough')
    elif not lines[0].startswith(' Dungeon Crawl Stone Soup version '):
        raise ParserError('Invalid file, starting line not found')
    elif "Escaped with the Orb" not in txt:
        raise Loser('This is not a winning run.')

    version = lines[0].split(' version ')[1].split('-')[0].split()[0].split('.')
    version = '.'.join([version[0], version[1]])

    god = ''
    num_runes = -1
    the_line = ''
    for line in lines[1:]:

    if not len(the_line) or num_runes < 0:
        raise ParserError('Error parsing file')

    species = background = ''
    build = the_line.split('(')[1].split(')')[0].lower()
    if ' ' not in build and len(build) == 4:
        # cover the case where builds are written as (OpEE)
        species = build[:2]
        background = build[2:]
    else:
        # cover the case where builds are written as (Octopode Earth Elementalist)
        for spec in SPECIES:
            if build.startswith(spec):
                species = spec
                background = build.split(spec)[1].strip()
                break

    if not len(species) or not len(background):
        raise ParserError('Error parsing build info')

    return species, background, god, num_runes, version


def strip_html(txt):
    """ strip HTML from a non-raw dump, if any exists
    """
    if "<!DOCTYPE html>" in txt or "<html>" in txt:
        i = txt.find(' Dungeon Crawl Stone Soup version ')
        if i < 21:
            return ''
        else:
            return txt[i:].split('</pre>')[0]
    else:
        return txt


class Loser(Exception):
    pass


class ParserError(Exception):
    pass


SPECIES = {'barachian', 'black draconian', 'centaur', 'deep dwarf', 'deep elf', 'demigod', 'demonspawn', 'djinni',
           'draconian', 'felid', 'formicid', 'gargoyle', 'ghoul', 'green draconian', 'grey draconian', 'grotesk',
           'halfling', 'high elf', 'hill orc', 'human', 'kobold', 'lava orc', 'merfolk', 'minotaur',
           'mottled draconian', 'mountain dwarf', 'mummy', 'naga', 'octopode', 'ogre', 'pale draconian',
           'purple draconian', 'red draconian', 'sludge elf', 'spriggan', 'tengu', 'troll', 'vampire',
           'vine stalker', 'white draconian', 'yellow draconian'}

GODS = {'muna': 'Sif Muna', 'madash': 'Fedhas Madash', 'sagoz': 'Gozag Ym Sagoz', 'xobeh': 'Nemelex Xobeh',
        'stormbringer': 'Qazlal Stormbringer', 'council': 'The Wu Jian Council', 'one': 'The Shining One'}


if __name__ == '__main__':
    main()
