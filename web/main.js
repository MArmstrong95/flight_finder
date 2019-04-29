async function listMode() {
    let value = await eel.printListMode()();
    document.getElementById("mostFreqMonth").innerHTML = value;
}

async function addFlights() {
    let flightList = await eel.getFlights()();
    var table = document.getElementById("flightsTable");
    var row = table.insertRow(1);
    var carrier, originCity, destCity, distance, flight;

    for (var i = 1; i < 15; i++) {
        flight = flightList[i];
        row = table.insertRow(i);
        carrier = row.insertCell(0);
        originCity = row.insertCell(1);
        destCity = row.insertCell(2);
        distance = row.insertCell(3);
        carrier.innerHTML = flight.CARRIER_NAME;
        originCity.innerHTML = flight.ORIGIN_CITY_NAME;
        destCity.innerHTML = flight.DEST_CITY_NAME;
        distance.innerHTML = flight.DISTANCE;

    }
}

async function updateFlights() {
    let flightList = await eel.getFlights()();
    var row, flight;
    for (var i = 1; i < 15; i++) {
        flight = flightList[i + 15];
        row = document.getElementById("flightsTable").rows[i].cells;
        row[0].innerHTML = flight.CARRIER_NAME;
        row[1].innerHTML = flight.ORIGIN_CITY_NAME;
        row[2].innerHTML = flight.DEST_CITY_NAME;
        row[3].innerHTML = flight.DISTANCE;
    }

}

function deleteTableRows() {
    var table = document.getElementById("flightsTable");

    for (var x = table.rows.length - 1; x > 0; x--) {
        table.deleteRow(x);
    }
}

function addMonths() {
    var months = {
        1 : "January",
        2 : "February",
        3 : "March",
        4 : "April",
        5 : "May",
        6 : "June",
        7 : "July",
        8 : "August",
        9 : "September",
        10 : "October",
        11 : "November",
        12 : "December"
    }
    var select = document.getElementById("selectMonth");

    console.log(months);
    for (index in months) {
        select.options[select.options.length] = new Option(months[index], index);
    }
}

async function addOriginCities() {
    let cities = await eel.getOriginCities()();
    var select = document.getElementById("selectOrigin");
    for (index in cities) {
        select.options[select.options.length] = new Option(cities[index],index);
    }
}

async function addDestinationCities() {
    let cities = await eel.getDestCities()();
    var select = document.getElementById("selectDest");
    for (index in cities) {
        select.options[select.options.length] = new Option(cities[index],index);
    }
}

function start() {
    addMonths();
    addOriginCities();
    addDestinationCities();
}

window.onload = start;
