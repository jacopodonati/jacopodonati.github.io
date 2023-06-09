---
---
{%- assign all_locations = site.data.locations %}
{%- assign locations = '' | split: '' %}
{%- assign today = 'now' | date: '%s' %}
{%- assign index = 0 %}
{%- assign already_recorded_today = false %}
{%- for location in all_locations %}
    {%- assign date = location.date | date: '%s' %}
    {%- if date > today %}
        {%- unless already_recorded_today %}
            {%- assign previous_location_index = index | minus: 1 %}
            {%- assign locations = locations | push: all_locations[previous_location_index] %}
            {%- assign already_recorded_today = true %}
        {%- endunless %}
        {%- assign locations = locations | push: location %}
    {%- endif %}
    {%- assign index = index | plus: 1 %}
{%- endfor -%}
window.addEventListener('load', function () {
    const locationsList = JSON.parse('{{ locations | jsonify }}');
    const dayLength = 1000 * 60 * 60 * 24;
    const currentDate = new Date();
    const limitDate = new Date();
    limitDate.setDate(limitDate.getDate() + 14);

    const currentLocation = locationsList[0];
    if (typeof currentLocation !== "undefined") {
        document.querySelector('#current_location').textContent = currentLocation.label;
        
        if (locationsList.length) {
            const nextLocation = locationsList[1];
            const nextLocationDate = new Date(nextLocation.date);
            if (nextLocationDate <= limitDate) {
                let days = Math.round(Math.abs(currentDate - nextLocationDate) / dayLength);
                document.querySelector('#freccia').classList.remove('nascosto');
                document.querySelector('#next_location').textContent = nextLocation.label;
                let label = '';
                if (days < 1) {
                    label = '(oggi)';
                } else if (days === 1) {
                    label = '(tra 1 giorno)';
                } else {
                    label = `(tra ${days} giorni)`;
                }
                document.querySelector('#when_next_location').textContent = label;
            }
        }
    }
}, false);