from datetime import datetime
from random import choice, random, shuffle
from time import sleep

URLS = """http://webzook.net/soup/morgue/trunk/Vega/morgue-Vega-20160405-021403.txt
http://webzook.net/soup/morgue/trunk/vegetableman/morgue-vegetableman-20160209-013311.txt
http://webzook.net/soup/morgue/trunk/vegetableman/morgue-vegetableman-20160707-113737.txt
http://crawl.akrasiac.org/rawdata/0Int/morgue-0Int-20151215-032229.txt
http://crawl.akrasiac.org/rawdata/0mnicide/morgue-0mnicide-20160427-220429.txt
http://crawl.kelbi.org/crawl/morgue/holysushi/morgue-holysushi-20190326-132804.txt
http://crawl.kelbi.org/crawl/morgue/holysushi/morgue-holysushi-20190326-132912.txt
https://crawl.project357.org/morgue/0range/morgue-0range-20170820-050058.txt
https://crawl.project357.org/morgue/123/morgue-123-20190523-124620.txt
""".strip().split('\n')


def main():
    ui = URLIterator(URLS, 1.5)
    for url in ui:
        print(url)


class URLIterator:

    def __init__(self, url_set, wait=60.0):
        # load set of URLs into interleaving dictionary
        self.wait = abs(wait)
        self.urls = {}

        for url in url_set:
            base_url = url[:url[8:].find('/') + 8].replace('https', 'http')
            if base_url not in self.urls:
                self.urls[base_url] = []

            self.urls[base_url].append(url)

        for base_url in list(self.urls.keys()):
            shuffle(self.urls[base_url])

        # set the last time each base URL has been hit
        self.last_times = {}
        last = datetime.now().timestamp() - self.wait * 2
        for base_url in self.urls:
            self.last_times[base_url] = last

        # What was the last base URL we hit?
        self.last_base_url = 'FAKE_URL'

    def __iter__(self):
        return self

    def __next__(self):
        # cleanup any base URLs that are now empty
        all_keys = list(self.urls.keys())
        for k in all_keys:
            if not len(self.urls[k]):
                del self.urls[k]

        # Do we need to stop iteration?
        if not len(self.urls):
            raise StopIteration

        # Okay, we need to iterate over something, pick a random element
        new_keys = set(self.urls.keys()) - {self.last_base_url}
        if not len(new_keys):
            new_key = self.last_base_url
        else:
            # TODO: We need to find one OTHER than the one we picked last time.
            new_key = choice(list(new_keys))

        # Wait, if need be.
        if new_key == self.last_base_url or (datetime.now().timestamp() - self.last_times[new_key]) < self.wait:
            print('==================== WAITING ==========================')  # TODO: Just for testing
            sleep(self.wait + 0.25 * self.wait * random())

        # FINALLY, return the next URL
        self.last_times[new_key] = datetime.now().timestamp()
        self.last_base_url = new_key
        return self.urls[new_key].pop()


if __name__ == '__main__':
    main()
