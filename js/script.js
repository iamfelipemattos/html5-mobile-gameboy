 $('document').ready(function() {
          var romStream = base64_decode(drmario);
          start(document.getElementsByTagName('canvas')[0],  document.getElementsByTagName('canvas')[0], romStream);
          initPlayer();

          return false;
        });

        // ### keycodes ###
        // up = 38
        // down = 40
        // left = 37
        // right = 39
        // a = 88
        // b = 90
        // select = 16
        // start = 13

        $('.btn').bind('touchstart', function(e){
          GameBoyMouseDown($(this).attr('data-key'));
          e.preventDefault();
          return false;
        });

        /*
        $('.btn').bind('mousedown', function(e){
          GameBoyMouseDown($(this).attr('data-key'));
          e.preventDefault();
          return false;
        });
        */

        $('.btn').bind('touchend', function(e){
          GameBoyMouseUp($(this).attr('data-key'));
          e.preventDefault();
          return false;
        });

        /*
        $('.btn').bind('mouseup', function(e){
          GameBoyMouseUp($(this).attr('data-key'));
          e.preventDefault();
          return false;
        });
        */

        function GameBoyMouseDown(keycode) {
          gameboy.JoyPadEvent(matchKey(parseInt(keycode)), true);
        }

        function GameBoyMouseUp(keycode) {
          gameboy.JoyPadEvent(matchKey(parseInt(keycode)), false);
        }

        // Disable double tap zoom
        $('#gameboy-buttons').bind('touchstart', function(e) {
          e.preventDefault();
          return false;
        });

        $('#gameboy-paddle').bind('touchstart', function(e) {
          e.preventDefault();
          return false;
        });

        $('#gameboy-startpause').bind('touchstart', function(e) {
          e.preventDefault();
          return false;
  });