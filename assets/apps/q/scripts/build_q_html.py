""" Simple script to generate the q.html file needed for the Doctor Who Quotient app.

    There is a lot of HTML boilerplate here, treated as string manipulation only.
    There are not HTML or XML libraries used, and all of the CSS and JavaScript
    is included as magic constants in strings.

    NOTE: This script exists because the website is served statically via GitHub Pages,
          and it would be against their policy for me to have this page generated
          dynamically at build time.
"""


EPISODE_FILE = 'episodes.csv'
SEASON_FILE = 'seasons.csv'
OUT_FILE = 'q.html'


def main():
    """ Read the two data files and then
        generate the HTML file.
    """
    seasons = read_seasons(SEASON_FILE)
    episodes = read_episodes(EPISODE_FILE)
    build_file(OUT_FILE, seasons, episodes)


def build_file(file_path, seasons, episodes):
    """ master function to build the q.html file
    """
    f = open(file_path, 'w')
    f.write(PAGE_START.replace('MAX_NUM',  str(max(episodes[max(seasons.keys())].keys()))))

    for season_num in sorted(seasons.keys()):
        f.write(build_season_div(season_num, seasons[season_num], episodes[season_num]))

    f.write(PAGE_END)
    f.close()


def build_season_div(num, nomen, season):
    """ Build the string for the HTML div representing an entire season
    """
    txt = SEASON_START % {'season': str(num), 'name': nomen}

    for episode_num in sorted(season.keys()):
        txt += build_episode_row(season[episode_num])

    txt += SEASON_END
    return txt


def build_episode_row(episode):
    """ Build the string for the HTML row representing a single episode
    """
    row = EPISODE_ROW % episode

    if episode['note']:
        row = row.replace('NOTE', '\n  <br/><sup>*' + episode['note'] + '</sup>')
    else:
        row = row.replace('NOTE', '')

    return row


def read_episodes(file_path):
    """ read the episodes file into a dictionary
        s_num|e_num|name|link|desc|notes
        38|266|Smile|https://en.wikipedia.org/wiki/Smile_(Doctor_Who)|Smiling Killer Robots|
    """
    eps = {}

    f = open(file_path, 'r')
    _ = f.readline()

    for line in f.readlines():
        ln = line.rstrip().split('|')
        season = int(ln[0])
        episode = int(ln[1])
        nomen = ln[2]
        link = ln[3]
        desc = ln[4]
        note = ln[5]

        # QA on episode description length
        if len(desc) > 80:
            print('\nWARNING: S' + str(season) + ' E' + str(episode) + ' is too long by ' +
                  str(len(desc) - 80) + ' characters.\n\t' + desc)

        if season not in eps:
            eps[season] = {}
        eps[season][episode] = {'name': nomen, 'link': link, 'desc': desc, 'note': note,
                                'season': season, 'episode': episode}

    f.close()
    return eps


def read_seasons(file_path):
    """ read the seasons file into a dictionary
        s_num|title
        1|Season 1 (1963-64)
    """
    seas = {}

    f = open(file_path, 'r')
    _ = f.readline()

    for line in f.readlines():
        ln = line.rstrip().split('|')
        season = int(ln[0])
        nomen = ln[1]
        seas[season] = nomen

    f.close()
    return seas


SEASON_START = """<div class="exPan" id="cp-%(season)s">
  <div id="cp-%(season)s-exPanHead" class="exPanHead">
   <input type=hidden id="cp-%(season)s-panCnt" value=0 />
   <h2>%(name)s<span id="cp-%(season)s-icon" class="icon-close-open"></span><span id="cp-%(season)s-panLabel" class="exPanCnt"></span></h2>
  </div>
  <div id="cp-%(season)s-exPanCont" class="exPanCont">
   <table class="no-border">
<thead>
 <tr>
  <th>Story</th>
  <th>Title</th>
  <th>Seen It?
   <br/>
   <div class="chk">
    <input type="checkbox" value="1" id="group%(season)s" name="check" />
    <label for="group%(season)s"></label>
   </div>
  </th>
 </tr>
</thead>
"""


SEASON_END = """</table>
  <div>&nbsp;</div>
 </div>
</div>

"""


EPISODE_ROW = """
<tr>
 <td align="left">%(episode)s</td>
 <td align="left">
  <a target="_blank" rel="noopener noreferrer" href="%(link)s" title="%(desc)s">%(name)s</a>NOTE
 </td>
 <td class="centered">
  <div class="chk">
   <input type="checkbox" value="1" id="story%(episode)s" name="check" class="cp-%(season)s-pan" />
   <label for="story%(episode)s"></label>
  </div>
 </td>
</tr>
"""


PAGE_START = """---
layout: page
title: Doctor Who Quotient Calculator
tagline: Q - Calculator
group: apps
category: tool
---
{% include JB/setup %}

<link rel="stylesheet" type="text/css" href="/assets/apps/q/q_style.css">

<h2>Doctor Who Quotient</h2><form action="#" method="post" class="qForm" id="qForm"><fieldset>

<table class="eqn-table">
 <tbody>
  <tr>
    <td>
     <div style="float:left;">Q = </div>
    </td>
    <td>
     <div style="float:left">
      <div class="eqn-numerator">(# of complete stories you've seen)</div>
      <div style="text-align:center;">(# total)</div>
     </div>
    </td>
    <td style="width:1em;">
     <div style="float:left;margin:0;padding:0;">=</div>
    </td>
    <td>
     <div style="float:left">
      <div class="eqn-numerator">
       <input name="total" id="total" class="q-total-input" size="3" value="0" readonly="readonly" type="text">
      </div>
      <div style="text-align:center;">
       <span id="displayTotal">MAX_NUM</span>
      </div>
     </div>
    </td>
  </tr>
 </tbody>
</table>

<p>
 <label class="q-input-label">Q =
  <input type="text" name="q" id="q" class="q-input" size="3" value="0.00" readonly="readonly" />
 </label>
</p>
<br/>
<div id="container">

"""


PAGE_END  = """  </div>
  <br>
  <h4>Save Your Progress</h4>
  <p>Your browser will try and save your progress. If you are paranoid (like me) and want to ensure you do not lose your work, save the hash code below. Next time, simply paste in your old hash code to load the results.</p>
  <input type="text" name="load" id="load" size="3" value="000000000000000000000000" pattern="[a-vA-V0-9]{1,}" style="width: 100%;" />
 </fieldset>
</form>

<br>

<div class="misc-content">
 <div class="social"></div>
</div>

<script src="/assets/apps/expandable_panels.js"></script>
<script src="/assets/apps/q/q.js"></script>
"""


if __name__ == '__main__':
    main()
