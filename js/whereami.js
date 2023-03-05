---
---
window.addEventListener('load', function () {
    var locations_list = JSON.parse('{{ site.data.locations | jsonify }}');
    var current_date = new Date();
    var day_length = 1000 * 60 * 60 * 24;
    var current_location;
    var next_location;
    var next_location_date;
    
    var i = 0;
    do {
        let location = locations_list[i];
        let location_date = new Date(location.date);
        if (current_date < location_date) {
            next_location = location;
            next_location_date = location_date;
            break;
        } else {
            current_location = location;
            i++;
        }
        if (i == locations_list.length) { break; }
    } while (next_location == null);

    document.querySelector('#current_location').textContent = current_location.label;

    if (next_location != null) {
        let days = Math.round(Math.abs(current_date - next_location_date) / day_length);
        document.querySelector('#freccia').classList.remove('nascosto');
        document.querySelector('#next_location').textContent = next_location.label;
        if (days != 1) {
            document.querySelector('#when_next_location').textContent = `(tra ${days} giorni)`;
        } else {
            document.querySelector('#when_next_location').textContent = `(tra ${days} giorno)`;
        }
        document.querySelector('#when_next_location').textContent = `(tra ${Math.round(Math.abs(current_date - next_location_date) / day_length)} giorni)`;
    }
}, false);