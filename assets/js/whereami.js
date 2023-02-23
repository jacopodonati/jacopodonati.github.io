---
---
window.addEventListener('load', function () {
    var locations_list = JSON.parse('{{ site.data.locations | jsonify }}');
    var current_date = new Date();
    var current_location;
    var next_location;
    
    var i = 0;
    do {
        let location = locations_list[i];
        let location_date = new Date(location.date);
        if (current_date < location_date) {
            next_location = location;
            break;
        } else {
            current_location = location;
            i++;
        }
        if (i == locations_list.length) { break; }
    } while (next_location == null);

    document.querySelector('#current_location').textContent = current_location.label;

    if (next_location != null) {
        document.querySelector('#freccia').classList.remove('nascosto');
        document.querySelector('#next_location').textContent = next_location.label;
    }
}, false);