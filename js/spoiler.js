window.addEventListener('load', function () {
    var elem = document.querySelector('#cork-board');
    var iso = new Isotope(elem, {
       itemSelector: '.film',
       masonry: {
          columnWidth: 160,
          gutter: 32,
          fitWidth: true
       }
    });
    
    var buttonGroups = document.querySelectorAll('#tag-selector');
    for (var i = 0, len = buttonGroups.length; i < len; i++) {
       var buttonGroup=buttonGroups[i];
       radioButtonGroup(buttonGroup);
    }
    
    function radioButtonGroup(buttonGroup) {
       buttonGroup.addEventListener('click', function (event) {
          if (!matchesSelector(event.target, 'button' )) {
             return;
          } else if (event.target.classList.contains('active-filter')) {
             iso.arrange({
                filter: '*'
             });
             event.target.classList.remove('active-filter');
          } else {
             iso.arrange({
                filter: event.target.getAttribute('data-filter')
             });
             if (buttonGroup.querySelector('.active-filter') !== null) {
                buttonGroup.querySelector('.active-filter').classList.remove('active-filter');
             }
             event.target.classList.add('active-filter');
          }
       });
    }
 }, false);