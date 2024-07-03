async function searchCountry() {
    const searchValue = document.getElementById('txtSearchValue').value;
    if (!searchValue) {
        alert("Please enter a country name.");
        return;
    }

    try {
        const response = await fetch(`https://restcountries.com/v3.1/name/${searchValue}`);
        if (!response.ok) {
            throw new Error("Country not found");
        }
        const data = await response.json();
        displayCountryData(data[0]);
    } catch (error) {
        alert(error.message);
    }
}

function displayCountryData(country) {
    document.getElementById('officialName').textContent = country.name.official;
    document.getElementById('name').textContent = country.name.common;
    document.getElementById('img').innerHTML = `<img src="${country.flags.png}" alt="Flag of ${country.name.common}" style="max-width: 100%;">`;

    const tableBody = document.getElementById('tbl').querySelector('tbody');
    tableBody.innerHTML = '';

    const rows = [
        { field: "Capital", value: country.capital ? country.capital[0] : "N/A" },
        { field: "Region", value: country.region },
        { field: "Subregion", value: country.subregion },
        { field: "Population", value: country.population.toLocaleString() },
        { field: "Area (sq km)", value: country.area.toLocaleString() },
        { field: "Languages", value: Object.values(country.languages).join(", ") },
        { field: "Currencies", value: Object.values(country.currencies).map(c => c.name).join(", ") }
    ];

    rows.forEach(row => {
        const tr = document.createElement('tr');
        const tdField = document.createElement('td');
        const tdValue = document.createElement('td');

        tdField.textContent = row.field;
        tdValue.textContent = row.value;

        tr.appendChild(tdField);
        tr.appendChild(tdValue);
        tableBody.appendChild(tr);
    });
}
