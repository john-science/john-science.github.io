"""
"""
from bz2 import BZ2File
import requests
from sys import argv


# TODO: create a callable non-main function
def main():
    master_file = argv[1]
    if master_file.endswith('.bz2'):
        urls = bz2.BZ2File(master_file, 'r').readlines()
        urls = [u.decode('utf-8') for u in urls]
    else:
        urls = open(master_file, 'r').readlines()

    # TODO: write the results to output files (every 30 minutes)
    # TODO: smart sleeping when rotating through URLs
    for url in urls:
        if url.startswith('http'):
            txt = read_url(url)
        else:
            txt = read_file(url)

        try:
            spec, back, god, runes, ver = parse_one_morgue(txt)
            print('{0}{1}^{2},{3},{4}'.format(spec, back, god, runes, ver))
        except ParserError as e:
            print('ParserError', e, url)
        except Loser:
            print('Loser', url)


def read_url(url):
    """ Read the text from a URL
    """
    r = requests.get(url)
    return r.content.decode("utf-8")


def read_file(file_path):
    """ Read the text from a file
    """
    return open(file_path, 'r').read()


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
        if not len(line.strip()):
            continue
        elif line.strip().startswith('... and '):
            num_runes = int(line.split('... and ')[1].split(' runes')[0])
        elif line.strip().startswith('Was ') and line.strip().endswith('.'):
            god = line.lower().split('.')[0].split(' ')[-1]
        elif ('the' in line) and ('(' in line) and (')' in line) and ('Turns:' in line) and ('Time:' in line):
            the_line = line
            break

    if not len(the_line) or num_runes < 0:
        raise ParserError('Error parsing file')

    try:
        build = the_line.split('(')[1].split(')')[0].lower()
        if ' ' not in build and len(build) == 4:
            # cover the case where builds are written as (OpEE)
            species = build[:2]
            background = build[2:]
        else:
            # cover the case where builds are written as (Octopode Earth Elementalist)
            b = build.split()
            if b[0] in SPECIES:
                species = SPECIES[b[0]]
                background = ' '.join(b[1:])
            elif (b[0] + ' ' + b[1]) in SPECIES:
                species = SPECIES[b[0] + ' ' + b[1]]
                background = ' '.join(b[2:])

        if background in BACKGROUNDS:
            background = BACKGROUNDS[background]
        elif background in BACKGROUNDS_ABR:
            background = BACKGROUNDS_ABR[background]

        if species in SPECIES:
            species = SPECIES[species]
        elif species in SPECIES_ABR:
            species = SPECIES_ABR[species]

        if god in GODS:
            god = GODS[god]
        elif god in GODS_ABR:
            god = GODS_ABR[god]
    except:
        raise ParserError('Build info: {0}'.format(build))

    if len(species) != 2 or len(background) != 2:
        raise ParserError('Build info: {0}'.format(build))

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


SPECIES = {'barachian': 'Br', 'black draconian': 'Dr', 'centaur': 'Ce', 'deep dwarf': 'DD', 'deep elf': 'DE',
           'demigod': 'Dg', 'demonspawn': 'Ds', 'djinni': 'Dj', 'draconian': 'Dr', 'felid': 'Fe', 'formicid': 'Fo',
           'gargoyle': 'Gr', 'ghoul': 'Gh', 'green draconian': 'Dr', 'grey draconian': 'Dr', 'grotesk': 'Gr',
           'halfling': 'Ha', 'high elf': 'HE', 'hill orc': 'HO', 'human': 'Hu', 'kobold': 'Ko', 'lava orc': 'LO',
           'merfolk': 'Me', 'minotaur': 'Mi', 'mottled draconian': 'Dr', 'mountain dwarf': 'MD', 'mummy': 'Mu',
           'naga': 'Na', 'octopode': 'Op', 'ogre': 'Og', 'pale draconian': 'Dr', 'purple draconian': 'Dr',
           'red draconian': 'Dr', 'sludge elf': 'SE', 'spriggan': 'Sp', 'tengu': 'Te', 'troll': 'Tr', 'vampire': 'Va',
           'vine stalker': 'VS', 'white draconian': 'Dr', 'yellow draconian': 'Dr'}
SPECIES_ABR = {v.lower(): v for v in SPECIES.values()}

BACKGROUNDS = {'abyssal': 'AK', 'abyssal knight': 'AK', 'air': 'AE', 'air elementalist': 'AE', 'arcane': 'AM',
               'arcane marksman': 'AM', 'artificer': 'Ar', 'assassin': 'As', 'berserker': 'Be', 'chaos': 'CK',
               'chaos knight': 'CK', 'conjurer': 'Cj', 'death': 'DK', 'death knight': 'DK', 'earth': 'EE',
               'earth elementalist': 'EE', 'enchanter': 'En', 'fighter': 'Fi', 'fire': 'FE', 'fire elementalist': 'FE',
               'gladiator': 'Gl', 'healer': 'He', 'hunter': 'Hu', 'ice': 'IE', 'ice elementalist': 'IE', 'monk': 'Mo',
               'necromancer': 'Ne', 'paladin': 'Pa', 'priest': 'Pr', 'reaver': 'Re', 'skald': 'Sk', 'stalker': 'St',
               'summoner': 'Su', 'thief': 'Th', 'transmuter': 'Tm', 'venom': 'VM', 'venom mage': 'VM',
               'wanderer': 'Wn', 'warper': 'Wr', 'wizard': 'Wz'}
BACKGROUNDS_ABR = {b.lower(): b for b in BACKGROUNDS.values()}

GODS = {'ashenzari': 'Ash', 'beogh': 'Beo', 'cheibriados': 'Chei', 'council': 'Wu', 'dithmenos': 'Dith',
        'elyvilon': 'Ely', 'fedhas': 'Fed', 'fedhas madash': 'Fed', 'gozag': 'Goz', 'gozag ym sagoz': 'Goz',
        'hepliaklqana': 'Hep', 'jian': 'Wu', 'jiyva': 'Jiyva', 'kikubaaqudgha': 'Kik', 'lugonu': 'Lug',
        'madash': 'Fed', 'makhleb': 'Mak', 'muna': 'Sif', 'nemelex': 'Nem', 'nemelex xobeh': 'Nem', 'okawaru': 'Oka',
        'one': 'TSO', 'pakellas': 'Pak', 'qazlal': 'Qaz', 'qazlal stormbringer': 'Qaz', 'ru': 'Ru', 'sagoz': 'Goz',
        'shining': 'TSO', 'shinning': 'TSO', 'sif': 'Sif', 'sif muna': 'Sif', 'stormbringer': 'Qaz',
        'the shining one': 'TSO', 'the wu jian council': 'Wu', 'trog': 'Trog', 'uskayaw': 'Usk', 'vehumet': 'Veh',
        'wu': 'Wu', 'xobeh': 'Nem', 'xom': 'Xom', 'ym': 'Goz', 'yredelemnul': 'Yred', 'zin': 'Zin'}
GODS_ABR = {g.lower(): g for g in GODS.values()}



if __name__ == '__main__':
    main()
