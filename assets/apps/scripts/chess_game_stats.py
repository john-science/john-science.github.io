from glob import glob
import json
from matplotlib import pyplot as plt


def main():
    files = glob('json/*.json')
    print('Number of games: {0}'.format(len(files)))

    # TODO: ELO distribution (stats and plot)
    # TODO: number of moves vs max player ELO (stats and plot)
    # TODO: number of moves vs player ELO diff (stats and plot)
    # TODO: result vs ELOs


def grab_data(files):
    """ grab the following data for each file:
    - result (win vs draw)
    - ELOs
    - number of moves
    """
    pass


if __name__ == '__main__':
    main()
