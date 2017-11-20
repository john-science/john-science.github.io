/** GENERAL UTILITIES */
var choice = function(lst) {
  /** select a random item from a list */
  return lst[Math.floor(Math.random() * lst.length)];
};

var randint = function(max) {
  /** select a random integer from zero to the provided max */
  return Math.floor(Math.random() * max);
};

var shallowCopy = function(oldObj) {
  /** shallow copy of an object */
  var newObj = {};
  for (var i in oldObj) {
    if (oldObj.hasOwnProperty(i)) {
      newObj[i] = oldObj[i];
    }
  }
  return newObj;
};

/** GAME-SPECIFIC CODE */
var StoryDiv = (function() {
  /** internal variables */
  var divId = "storydiv";
  var thisEl = document.getElementById(divId);

  /** internal methods */
  var scrollDown = function() {
    window.scrollTo(0, thisEl.scrollHeight);
  };

  /** external interface */
  return {
    addContentObj: function(obj) {
      /** add DOM object to this div's content */
      thisEl.appendChild(obj);
      scrollDown();
    },
    addContentStr: function(str) {
      /** add DOM object (from string) to this div's content */
      thisEl.insertAdjacentHTML('beforeend', str);
      scrollDown();
    },
    init: function(idStr) {
      /** master init logic */
      divId = idStr;
    }
  };
}());

/** CONTENT */
var CONTENT = {
  "intro": "<p>You have one night to kill as many Nazis as possible.</p><p>You are <span id='hero1'>HERO</span>, a Jewish-American spy, slowly working your way through the winter mountains and into Germany. Raised in Alaska, you are no stranger to the cold weather or roughing it outdoors.</p><p>You started watching the Nazi caravan from far away. You had your dinner as they slowly wound their way through the mountain roads as the snow storm set in. You watched their vehicles get stuck in snow drifts and slow off the road.</p><p>You watch as they spread into the forest, looking for shelter. They are building little camps; trying to find shelter from the blizzard. They curl up to stay warm and to sleep.</p><p>They think they are safe; they are well inside Germany and it is 1942. They think the the nearest enemy army is a thousand miles away. They can't imagine anyone finding them in this Hellish blizzard.</p><p>Night will fall soon.</p><p>You've decided to go hunting.</p>",
  "firstNames": ["Abby", "Carley", "Carolyn", "Emmy"],
  "lastNames": ["Blazkowicz", "Einstein", "Feynman", "Gadot", "Noether"],
  "winScreen": "<p>You did it! You actually did it! You killed the entire convoy of Nazi bastards. You are honestly surprised you are still alive. That wasn't, really, part of the plan. You're cold though, and soaked to the bone. You want find a warm place to ride out the storm. But you know as soon as this storm lets up someone will find all these dead bodies and start looking for you. You have to grab your gear and get as far away as possible. You could try and leave Germany, but they will probably expect that. Besides, you still have a mission to do. You decide to go North, deeper into Germany.</p><br><br>",
  "attackPistol": "Shoot with pistol",
  "attackKnife": "Sneak attack with knife",
  "kills": ["Boom! Head shot!", "You slit the Nazi bastard's throat while he sleeps."],
};

/** ZERO-DRAFT GAME ENGINE */
var HeavySnow = (function() {
  /** internal variables */
  var hero = "";
  var numBad = 0;
  var opts = [];
  var action = null;

  /** internal methods */
  var attackOpts = {
    1: CONTENT["attackPistol"],
    2: CONTENT["attackKnife"]
  };

  var nameGen = function() {
    /** generate a random hero name */
    return choice(CONTENT["firstNames"]) + " " + choice(CONTENT["lastNames"]);
  };

  var removeAllButtons = function() {
    /** remove all inputs from the page */
    while (document.getElementsByTagName('input').length > 0) {
      var inp = document.getElementsByTagName('input')[0];
      //inp.removeEventListener('click', attack); // TODO: I believe unnecessary: https://stackoverflow.com/a/12528067/1287593
      inp.parentNode.removeChild(inp)
    }
  }

  var click = function(obj, fun) {
    /** helper to make adding click event listeners take less code */
    obj.addEventListener("click", function(e) {
      fun(this.value);
    })
  };

  var addButtons = function() {
    /** Add whatever buttons are in the opts object and then add listeners */
    var str = '';
    for (var i in opts) {
      str += '<input type="button" class="but" value="' + i + ') ' + opts[i] + '" />'
    }
    StoryDiv.addContentStr(str);
    clickAttackAll();
  };

  /** TODO: add methods to generate options for different levels of actions */

  var userIn = function(val) {
    /** generic user input parser */
    opts = [];
    removeAllButtons();
    action(val);
  };

  var attackAction = function(val) {
    /** TEMPORARY... all attacks are 100% successful */
    var opt = parseInt(val.split(")")[0]);
    numBad -= 1;
    StoryDiv.addContentStr('<p> -> ' + val + '</p>');

    if (numBad > 0) {
      opts = shallowCopy(attackOpts);
      var str = '<p>' + CONTENT["kills"][opt - 1] + '</p>';
      StoryDiv.addContentStr(str);
      addButtons();
      clickAttackAll();
    } else {
      StoryDiv.addContentStr(CONTENT["winScreen"]);
    }
  };

  var clickAttackAll = function() {
    /** TEMPORARY... all buttons are attack buttons */
    var butz = document.getElementsByClassName('but');
    for (var j = 0; j < butz.length; j++) {
      click(butz[j], userIn);
    }
  };

  var keyPressListenter = function() {
    /** TODO: could be a function, but it will only ever be called once */
    document.addEventListener("keydown", function(press) {
      var key = parseInt(press.key);
      if (key in opts) {
        userIn(key + ') ' + opts[key]); // TODO: attack only
      }
    });
  };

  /** external interface */
  return {
    init: function(div) {
      /** Init Content */
      hero = nameGen();
      numBad = 20 + randint(12);
      action = attackAction;

      /** Init Intro */
      StoryDiv.addContentStr(CONTENT["intro"]);
      document.getElementById('hero1').innerText = hero;

      /** Init Game Engine */
      window.onload = StoryDiv.init(div);
      opts = shallowCopy(attackOpts);
      addButtons();
      window.scrollTo(0, 0); // TODO: Ugly
      keyPressListenter();
    }
  };
}());

HeavySnow.init("storydiv");
