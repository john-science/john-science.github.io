var RPG_Char = (function() {
  /* local vars and functions */
  var gen_text = ['Generate ANOTHER Character', 'And Another!', 'Another!', 'Gimme Another One', "Let's try this again...", 'Re-Roll'];

  /* put HTML obujects on page */
  var draw_page = function() {
    var page = '<strong>DnD Edition: </strong><select id="edition">';
    page += '<option value="0">Original</option>';
    page += '<option value="1">1st</option>';
    page += '<option value="2">2nd</option>';
    page += '<option value="3">3rd</option>';
    page += '<option value="3.5">3.5</option>';
    page += '<option value="4">4th</option>';
    page += '<option value="5" selected="selected">5th</option>';
    page += '</select><br><input type="button" id="test_button" value="Generate Character" style="width: 100%">';
    page += '<br></br><h1 class="center" id="result">Dwarf Paladin from the Land of Tierananog who loves rock climbing and beer brewing.</h1>'
    document.getElementById('dnd_char').innerHTML = page;
  };

  /* attach event listeners to page */
  var attach_listeners = function() {
    
  }

  /* external vars and functions */
  return {
    init: function() {
      draw_page();
      attach_listeners();
    }
  };
}());
