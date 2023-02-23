window.addEventListener('load', function () {
    var id = null;
    var old_pick = null;
    
    function pickANumber(max) {
       let pick = Math.floor(Math.random() * max);
       if (pick === old_pick) {
          return pickANumber(max);
       } else {
          old_pick = pick;
          return pick;
       }
    }
    
    function bubbleUp() {
       let frasi = document.querySelectorAll('#cose-belle p');
       let pick = pickANumber(frasi.length - 1);
       let old_focus = document.querySelector('.focus');
       if (old_focus !== null) {
          old_focus.classList.remove('focus');
       }
       frasi[pick].classList.add('focus');
    }
   bubbleUp();
   id = setInterval(bubbleUp, 5000);
}, false);