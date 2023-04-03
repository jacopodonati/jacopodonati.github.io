---
---
window.addEventListener('load', function () {
    const locationsList = JSON.parse('{{ site.data.locations | jsonify }}');
    const dayLength = 1000 * 60 * 60 * 24;
    const currentDate = new Date();
    const limitDate = new Date();
    limitDate.setDate(limitDate.getDate() + 14);
    var currentLocation;
    var nextLocation;
    var nextLocationDate;
    
    var i = 0;
    do {
        let location = locationsList[i];
        let locationDate = new Date(location.date);
        if (currentDate < locationDate && locationDate <= limitDate) {
            nextLocation = location;
            nextLocationDate = locationDate;
            break;
        } else {
            currentLocation = location;
            i++;
        }
        if (i == locationsList.length) { break; }
    } while (nextLocation == null);

    document.querySelector('#current_location').textContent = currentLocation.label;

    if (nextLocation != null) {
        let days = Math.round(Math.abs(currentDate - nextLocationDate) / dayLength);
        document.querySelector('#freccia').classList.remove('nascosto');
        document.querySelector('#next_location').textContent = nextLocation.label;
        if (days != 1) {
            document.querySelector('#when_next_location').textContent = `(tra ${days} giorni)`;
        } else {
            document.querySelector('#when_next_location').textContent = `(tra ${days} giorno)`;
        }
        document.querySelector('#when_next_location').textContent = `(tra ${Math.round(Math.abs(currentDate - nextLocationDate) / dayLength)} giorni)`;
    }
}, false);