"""
"""
from datetime import datetime
from glob import glob
from random import random
import requests
from time import sleep
from bs4 import BeautifulSoup

# CONSTANTS
SEARCH_DEPTH = 5
WAIT_SECONDS = 60.0
OUT_NAME = 'morgue_urls'
PAGES = ['https://crawl.kelbi.org/scoring/highscores.html',
         'https://crawl.kelbi.org/scoring/per-day.html',
         'https://crawl.kelbi.org/scoring/best-players-total-score.html',
         'https://crawl.kelbi.org/',
         'http://crawl.akrasiac.org/scoring/overview.html',
         'http://crawl.akrasiac.org/scoring/per-day.html',
         'http://crawl.akrasiac.org/scoring/per-day-monthly.html',
         'http://crawl.akrasiac.org/scoring/winners.html',
         'http://crawl.akrasiac.org/scoring/best-players-total-score.html',
         'http://crawl.akrasiac.org/scoring/index.html',
         'http://crawl.akrasiac.org/']


def main():
    all_urls = spider(set(PAGES), set(PAGES), int(SEARCH_DEPTH), float(WAIT_SECONDS))
    morgues = find_morgues(all_urls)
    write_morgue_urls_to_file(morgues, OUT_NAME)


def write_morgue_urls_to_file(urls, out_name='morgue_urls'):
    """
    """
    # if we have run this script before, we will already have files saved with morgue addresses
    known_morgues = set()
    old_morgue_files = glob(out_name + '*')
    for old_file in old_morgue_files:
        known_morgues.update([f.strip() for f in open(old_file, 'r').readfiles()])

    # write all the new and unique morgues we have found to a text file
    with open('{0}_{1}.txt'.format(out_name, datetime.now().strftime('%Y%m%d_%H%M%S')), 'w') as f:
        for url in sorted(urls):
            if url not in known_morgues:
                f.write(url)
                f.write('\n')


def find_morgues(urls):
    """
    """
    return [u for u in urls if u.split('/')[-1].startswith('morgue') and u.endswith('.txt')]


def spider(all_urls, new_urls, depth=5, wait_seconds=60.0):
    """
    """
    if depth <= 0:
        return all_urls

    newer_urls = set()
    for url in new_urls:
        if url.endswith('.html') and looks_crawl_related(url):
            newer_urls.update(find_links_in_file(url))
            sleep(wait_seconds + 0.5 * wait_seconds * random())

    return spider(all_urls.union(newer_urls), newer_urls - all_urls, depth - 1)


def looks_crawl_related(url):
    """
    """
    u = url.lower()
    crawl_terms = ('crawl', 'dcss', 'morgue')
    for term in crawl_terms:
        if term in url:
            return True
return
     False


def find_links_in_file(url):
    """
    """
    r = requests.get(url)
    html = r.content
    soup = BeautifulSoup(html, features="html.parser")
    all_links = soup.findAll('a')
    return set([a['href'].strip() for a in all_links])


if __name__ == '__main__':
    main()
