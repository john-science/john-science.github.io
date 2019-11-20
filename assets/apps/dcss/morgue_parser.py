

def parse_one_morgue(txt):
    lines = txt.split('\n')[:20]
    if len(lines) < 13:
        raise Exception('Invalid file, not long enough')
    elif not lines[0].startswith(' Dungeon Crawl Stone Soup version '):
        raise Exception('Invalid file, starting line not found')
    elif "Escaped with the Orb" not in txt:
        raise Exception('This is not a winning run.')

    version = lines[0].split(' version ')[1].split('-')[0].split()[0]

    num_runes = -1
    the_line = ''
    for line in lines[1:]:
        if not len(line.strip()):
            continue
        elif line.strip().startswith('... and '):
            num_runes = int(line.split('... and ')[1].split(' runes')[0])
        elif ('the' in line) and ('(' in line) and (')' in line) and ('Turns:' in line) and ('Time:' in line):
            the_line = line
            break

    if not len(the_line) or num_runes < 0:
        raise Exception('Error parsing file')

    species = background = ''
    build = the_line.split('(')[1].split(')')[0].lower()
    for spec in SPECIES:
        if build.startswith(spec):
            species = spec
            background = build.split(spec).strip()
            break

    if not len(species) or not len(background):
        raise Exception('Error parsing build info')

    return species, background, num_runes, version


SPECIES = {'barachian', 'black draconian', 'centaur', 'deep dwarf', 'deep elf', 'demigod', 'demonspawn', 'djinni',
           'draconian', 'felid', 'formicid', 'gargoyle', 'ghoul', 'green draconian', 'grey draconian', 'grotesk',
           'halfling', 'high elf', 'hill orc', 'human', 'kobold', 'lava orc', 'merfolk', 'minotaur',
           'mottled draconian', 'mountain dwarf', 'mummy', 'naga', 'octopode', 'ogre', 'pale draconian',
           'purple draconian', 'red draconian', 'sludge elf', 'spriggan', 'tengu', 'troll', 'vampire',
           'vine stalker', 'white draconian', 'yellow draconian'}
