/* Generic code for generated an RPG character */
var RPG_Char = (function() {
  /* local vars and functions */
  var data_map = {};

  /* randomly select a key from an object */
  var choose_key = function(obj) {
    return Object.keys(obj)[parseInt(Object.keys(obj).length * Math.random())];
  };

  /* randomly select an item from an array */
  var choose_item = function(arr) {
    return arr[parseInt(arr.length * Math.random())];
  };

  /* put HTML obujects on page */
  var draw_page = function(data) {
    var versions = data['versions'];
    data_map = data;
    var page = '';
    if (versions.length > 1) {
      page += '<strong>Edition: </strong><select id="edition">';
      var len = versions.length;
      for (var i=0; i < len; i++) {
        var k = Object.keys(versions[i])[0];
        if (i === (len - 1)) {
      	  page += '<option value="' + k + '" selected="selected">' + versions[i][k] + '</option>';
        } else {
      	  page += '<option value="' + k + '">' + versions[i][k] + '</option>';
        }
      }
      page += '</select><br>';
    } else {
      page += '<select id="edition" style="display:none"><option value="0" selected="selected">Original</option></select>';
    }
    page += '<input type="button" id="gen_button" value="Generate Character" style="width: 100%">';
    page += '<br></br><h1 class="center" id="result"></h1>'
    document.getElementById('rpg_char').innerHTML = page;
  };
  
  /* Generate a new character, in the format of a single printed string. */
  var gen_char = function() {
    var ed = document.getElementById('edition').value;
    var adj = choose_item(data_map['adjective']);
    var spec = choose_key(data_map['species'][ed]);
    var clas = choose_item(data_map['species'][ed][spec]);
    var from = choose_item(data_map['location']);
    var backstory = choose_item(data_map['backstory']);
    document.getElementById('result').innerHTML = adj + " " + spec + ' <span style="color:#999">' + clas + "</span> " + " from " + from + " who " + backstory + ".";
  };

  /* attach event listeners to page */
  var attach_listeners = function() {
    document.getElementById('gen_button').addEventListener('click', function(e) {
      gen_char();
      document.getElementById('gen_button').value = choose_item(data_map['gen_text']);
    });
  }

  /* external vars and functions */
  return {
    init: function(data_map) {
      draw_page(data_map);
      attach_listeners();
    }
  };
}());
