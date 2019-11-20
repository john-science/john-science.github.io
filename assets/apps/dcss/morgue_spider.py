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
TIMEOUT_SECONDS = 60 * 30
OUT_NAME = 'morgue_urls'
PAGES = ['http://crawl.akrasiac.org/',
         'http://crawl.akrasiac.org/scoring/overview.html',
         'http://crawl.akrasiac.org/scoring/per-day.html',
         'http://crawl.akrasiac.org/scoring/per-day-monthly.html',
         'http://crawl.akrasiac.org/scoring/winners.html',
         'http://crawl.akrasiac.org/scoring/best-players-total-score.html',
         'http://crawl.akrasiac.org/scoring/index.html',
         'https://crawl.kelbi.org/',
         'https://crawl.kelbi.org/scoring/per-day.html',
         'https://crawl.kelbi.org/scoring/highscores.html',
         'https://crawl.kelbi.org/scoring/best-players-total-score.html']


def main():
    all_urls = morgue_spider(set(PAGES), set(PAGES), OUT_NAME, int(TIMEOUT_SECONDS), int(SEARCH_DEPTH),
                             float(WAIT_SECONDS))
    print('Spidered {0} URLs'.format(len(all_urls)))


def morgue_spider(all_urls, new_urls, out_name='morgue_urls', timeout=1800, depth=5, wait=60.):
    """
    """
    if depth <= 0 or len(new_urls) == 0:
        return all_urls

    print('Depth {0}: {1} new URLs'.format(depth, len(new_urls)))
    print('\t', end='', flush=True)

    newer_urls = set()
    start = datetime.now().timestamp()
    for url in new_urls:
        if url.endswith('.html') and looks_crawl_related(url):
            print('.', end='', flush=True)
            newer_urls.update(find_links_in_file(url))
            if datetime.now().timestamp() - start > timeout:
                write_morgue_urls_to_file(newer_urls - all_urls, out_name)
                start = datetime.now().timestamp()
                print('\t', end='', flush=True)
            sleep(wait + 0.5 * wait * random())

    write_morgue_urls_to_file(newer_urls - all_urls, out_name)

    return morgue_spider(all_urls.union(newer_urls), newer_urls - all_urls, out_name, timeout, depth - 1, wait)


def looks_crawl_related(url):
    """ Determine if, broadly, it seems likely a URL is DCSS-related.
    
    Args:
        url (str): Any arbitary URL
    Returns:
        bool: Could this URL possibly be a DCSS link?
    """
    u = url.lower()
    crawl_terms = ('crawl', 'dcss', 'morgue')
    for term in crawl_terms:
        if term in u:
            return True

    return False


def find_links_in_file(url):
    """ Find all the HTML links we can on a given webpage.

    Args:
        url (str): Any arbitary URL
    Returns:
        set: All the URLs we could find on that page.
    """
    r = requests.get(url)
    html = r.content
    soup = BeautifulSoup(html, features="html.parser")
    all_links = soup.findAll('a')
    return set([a['href'].strip() for a in all_links])


def write_morgue_urls_to_file(all_urls, out_name='morgue_urls'):
    """
    """
    urls = find_morgues(all_urls)

    # if we have run this script before, we will already have files saved with morgue addresses
    known_morgues = set()
    old_morgue_files = glob(out_name + '*')
    for old_file in old_morgue_files:
        known_morgues.update([f.strip() for f in open(old_file, 'r').readlines()])

    urls = [u for u in urls if u not in known_morgues]

    if not len(urls):
        print("\n\tFound no new morgues.")
    else:
        print("\n\tWriting {0} new morgues to file.".format(len(urls)))

    # write all the new and unique morgues we have found to a text file
    with open('{0}_{1}.txt'.format(out_name, datetime.now().strftime('%Y%m%d_%H%M%S')), 'a+') as f:
        for url in sorted(urls):
            f.write(url)
            f.write('\n')


def find_morgues(urls):
    """ Find the subset of URLs that look like they might be morgue files.

    Args:
        urls (set): A bunch of URLs
    Returns:
        list: All URLs that might be morgue files
    """
    return [u for u in urls if u.split('/')[-1].startswith('morgue') and u.endswith('.txt')]


if __name__ == '__main__':
    main()
