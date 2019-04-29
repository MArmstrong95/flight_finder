const months = {
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

//  function:   addFlights
//  @param:     none
//  purpose:    update the table with flights determined from pre selected criteria
async function addFlights() {
    deleteTableRows();
    let flightList = await eel.getBestFlights()();
    var table = document.getElementById("flightsTable");
    var row = table.insertRow(1);
    var carrier, originCity, destCity, distance, flight, month, success, seats;

    for (var i = 1; i < flightList.length; i++) {
        flight = flightList[i];
        row = table.insertRow(i);
        carrier = row.insertCell(0);
        originCity = row.insertCell(1);
        destCity = row.insertCell(2);
        distance = row.insertCell(3);
        seats = row.insertCell(4);
        month = row.insertCell(5);
        success = row.insertCell(6);
        carrier.innerHTML = flight.CARRIER_NAME;
        originCity.innerHTML = flight.ORIGIN_CITY_NAME;
        destCity.innerHTML = flight.DEST_CITY_NAME;
        distance.innerHTML = flight.DISTANCE;
        seats.innerHTML = flight.SEATS_AVAIL;
        month.innerHTML = months[flight.MONTH];
        success.innerHTML = flight.SUCCESSFULNESS.toFixed(2) + '%';

    }
}

//  function:   searchFlights
//  @param:     none
//  purpose:    update the table with flights determined from search criteria
//              provided by the user
async function searchFlights() {
    deleteTableRows();
    searchMonth = document.getElementById("selectMonth").value;
    searchOrigin = document.getElementById("selectOrigin").value;
    searchDest = document.getElementById("selectDest").value;
    searchCarrier = document.getElementById("selectCarrier").value;

    let flightList = await eel.getSearchFlights(searchMonth, searchOrigin, searchDest, searchCarrier)();

    var table = document.getElementById("flightsTable");
    var row = table.insertRow(1);
    var carrier, originCity, destCity, distance, flight, month, success, seats;

    flight = flightList[0];
    carrier = row.insertCell(0);
    originCity = row.insertCell(1);
    destCity = row.insertCell(2);
    distance = row.insertCell(3);
    seats = row.insertCell(4);
    month = row.insertCell(5);
    success = row.insertCell(6);
    carrier.innerHTML = flight.CARRIER_NAME;
    originCity.innerHTML = flight.ORIGIN_CITY_NAME;
    destCity.innerHTML = flight.DEST_CITY_NAME;
    distance.innerHTML = flight.DISTANCE + ' miles';
    seats.innerHTML = flight.SEATS_AVAIL;
    month.innerHTML = months[flight.MONTH];
    success.innerHTML = flight.SUCCESSFULNESS.toFixed(2) + '%';

    for (var i = 1; i < flightList.length; i++) {
        flight = flightList[i];
        row = table.insertRow((i+1));
        carrier = row.insertCell(0);
        originCity = row.insertCell(1);
        destCity = row.insertCell(2);
        distance = row.insertCell(3);
        seats = row.insertCell(4);
        month = row.insertCell(5);
        success = row.insertCell(6);
        carrier.innerHTML = flight.CARRIER_NAME;
        originCity.innerHTML = flight.ORIGIN_CITY_NAME;
        destCity.innerHTML = flight.DEST_CITY_NAME;
        distance.innerHTML = flight.DISTANCE + ' miles';
        seats.innerHTML = flight.SEATS_AVAIL;
        month.innerHTML = months[flight.MONTH];
        success.innerHTML = flight.SUCCESSFULNESS.toFixed(2) + '%';
    }
}

//  function:   deleteTableRows
//  @param:     none
//  purpose:    delete all rows from table except for headers
function deleteTableRows() {
    var table = document.getElementById("flightsTable");

    for (var x = table.rows.length - 1; x > 0; x--) {
        table.deleteRow(x);
    }
}

//  function:   addMonths
//  @param:     none
//  purpose:    update selection of months
function addMonths() {
    var select = document.getElementById("selectMonth");
    select.options[select.options.length] = new Option('','');
    for (index in months) {
        select.options[select.options.length] = new Option(months[index], index);
    }
}

//  function:   addOriginCities
//  @param:     none
//  purpose:    update selection of origin cities
async function addOriginCities() {
    let cities = await eel.getOriginCities()();
    var select = document.getElementById("selectOrigin");
    select.options[select.options.length] = new Option('','');
    for (index in cities) {
        select.options[select.options.length] = new Option(cities[index], cities[index]);
    }
}

//  function:   addDestinationCities
//  @param:     none
//  purpose:    update selection of destination cities
async function addDestinationCities() {
    let cities = await eel.getDestCities()();
    var select = document.getElementById("selectDest");
    select.options[select.options.length] = new Option('','');
    for (index in cities) {
        select.options[select.options.length] = new Option(cities[index], cities[index]);
    }
}

//  function:   addCarriers
//  @param:     none
//  purpose:    update selection of carriers
async function addCarriers() {
    let carriers = await eel.getCarriers()();
    var select = document.getElementById("selectCarrier");
    select.options[select.options.length] = new Option('','');
    for (index in carriers) {
        select.options[select.options.length] = new Option(carriers[index], carriers[index]);
    }
}

//  function:   start
//  @param:     none
//  purpose:    initialize options for dropdown menus
function start() {
    addMonths();
    addOriginCities();
    addDestinationCities();
    addCarriers();
}

// on window load, initialize elements with function start()
window.onload = start;
