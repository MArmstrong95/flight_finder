import eel
import csv
import json
import statistics

# initialize front end folder
eel.init('web')

############## Internal functions for app.py ####################

#   function:   monthToString
#   @param:     month -> number to be converted to month word
def monthToString(month):
    m = {
        '1': 'January',
        '2': 'February',
        '3': 'March',
        '4': 'April',
        '5': 'May',
        '6': 'June',
        '7': 'July',
        '8': 'August',
        '9': 'September',
        '10': 'October',
        '11': 'November',
        '12': 'December'
    }
    return m[month]

#   function:   searchFlights
#   @param:     m -> month
#   @param:     o -> origin city
#   @param:     d -> destination city
#   @return:    fList -> list of flights based on search
def searchFlights(m, o, d):
    flList = []

    for flight in flightData:
        if (int(flight["MONTH"]) == int(m)) & (flight["SEATS_AVAIL"] > 0) & (flight["ORIGIN_CITY_NAME"] == o) & (flight["DEST_CITY_NAME"] == d):
            flList.append(flight)

    return flList

############## Functions to export to front end #################

#   function:   printListMode
#   @param:     none
#   purpose:    return mode of successful months to front end
@eel.expose
def printListMode():
    month = "Month with highest success rate: " + \
        monthToString(statistics.mode(maxList))
    return month

#   function:   getBestFlights
#   @param:     none
#   purpose:    return best determined flights
@eel.expose
def getBestFlights():
    return bestFlights

#   function:   getOriginCities
#   @param:     none
#   purpose:    return all origin cities
@eel.expose
def getOriginCities():
    return originCites

#   function:   getDestCities
#   @param:     none
#   purpose:    return all destination cities
@eel.expose
def getDestCities():
    return destCities

#   function:   getSearchFlights
#   @param:     none
#   purpose:    return flights based on search criteria
@eel.expose
def getSearchFlights(m, o, d):
    newFlightList = searchFlights(m, o, d)
    return newFlightList

###############################################################################


# open project data for reading, read into JSON object, input into dictionary
f = open('ProjectData.csv', 'r')
reader = csv.DictReader(f)

flightsJSON = json.dumps([row for row in reader],
                         indent=4, separators=(',', ': '))

flightData = json.loads(flightsJSON)

for flight in flightData:
    dep_perf = flight["DEPARTURES_PERFORMED"]
    dep_sched = flight["DEPARTURES_SCHEDULED"]
    seats = flight["SEATS"]
    passengers = flight["PASSENGERS"]

    try:
        if int(seats) == 0:
            flight["SUCCESSFULNESS"] = 0
            flight["SEATS_AVAIL"] = 0
        elif float(int(passengers) / int(seats)) >= 1:
            flight["SUCCESSFULNESS"] = 0
            flight["SEATS_AVAIL"] = 0
        else:
            successfulness = (((float(dep_perf) / float(dep_sched)) * .8) +
                              ((1 - (float(int(passengers) / int(seats)))) * .2)) * 100
            if successfulness > 100:
                flight["SUCCESSFULNESS"] = 0
                flight["SEATS_AVAIL"] = 0
            else:
                flight["SUCCESSFULNESS"] = successfulness
                flight["SEATS_AVAIL"] = int(int(seats) - int(passengers))
    except ZeroDivisionError:
        flight["SUCCESSFULNESS"] = 0
        flight["SEATS_AVAIL"] = 0

# list to store best month for flights
maxList = []
# list for most successful flights
bestFlights = []

for flight in flightData:
    if flight["SUCCESSFULNESS"] >= float(90):
        maxList.append(flight["MONTH"])

# to return lists of data
originCites = []
destCities = []
# list for most successful flights
bestFlights = []

# - get list of origin cities and destination cites to load select in front end
# - get the best flights determined by pre-selected data:
#   1 - if the success rate is > 90%
#   2 - if the month has the highest success rate
#   3 - if the flight has more than 20 seats available
#   4 - if the origin city is Charlotte, NC
for flight in flightData:
    if (flight["SUCCESSFULNESS"] >= float(90)) & (int(flight["MONTH"]) == int(statistics.mode(maxList))) & (flight["SEATS_AVAIL"] > 20) & (flight["ORIGIN_CITY_NAME"] == "Charlotte, NC"):
        bestFlights.append(flight)
    newOgCity = flight["ORIGIN_CITY_NAME"]
    destCity = flight["DEST_CITY_NAME"]
    originCites.append(newOgCity)
    destCities.append(destCity)

# remove duplicates from lists
originCites = list(dict.fromkeys(originCites))
destCities = list(dict.fromkeys(destCities))

# start the server
eel.start('main.html')
