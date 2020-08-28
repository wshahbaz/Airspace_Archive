<h1 align="center">
<br>
<a href="#"><img src="https://cdn.pixabay.com/photo/2018/02/04/01/54/paper-planes-3128885_960_720.png" alt="Airspace" width="200"></a>
<br>
Project Monorepo
<br>
</h1>

<h4 align="center">Interesting Subtitle Here</h4>

<h5 align="center">By: Atif Mahmud, Bradley Brown, Jordan Juravsky, Jack Lu, Wais Shahbaz</h5>

<p align="center">
<a href="#">
<img src="https://forthebadge.com/images/badges/gluten-free.svg" alt="">
</a>
<a href="#">
<img src="http://forthebadge.com/images/badges/built-with-love.svg" alt="">
</a>
<a href="#">
<img src="http://forthebadge.com/images/badges/60-percent-of-the-time-works-every-time.svg" alt="">
</a>
</p>

<p align="center">
<a href="#quick-start">Quick Start</a> •
<a href="#project-structure">Project Structure</a> •
<a href="#contribution-log">Contribution Log</a> •
<a href="#resources">Resources</a>
</p>

## Feature Implementation Progress:

The majority of the our database features are complete and are hooked up to our Node.js intermediary server - test versions of the queries for these features can be found in the feature_queries folder, while the parameterized, REST endpoints for those features in the server can be found in the server/routes/ folder, with the same file name but with a .js extension. Example features (and their corresponding .sql files in feature_queries):

- Finding the coverage of airports in a given country (flight_coverage.sql, see report for details on how coverage is calculated).
- Getting what fraction of an airport’s traffic is domestic vs international (domestic_travel_by_airport.sql)
- Getting what fraction of an country’s traffic is domestic vs international (domestic_travel.sql)
- Registering a route that a user has marked as their “favourite” (add_favourite_route.sql)
- Getting the number of airports in a given country (get_num_airports.sql)
- Finding the flights that cross a specified line of latitude (crossing_latitude.sql)
- Grabbing random countries, airports, and airlines for games (random_airline.sql, random_airport.sql, random_country.sql).
- Registering a new user (register_user.sql).
- Getting a user’s highest scores from previous games (get_user_top_score.sql).
- Getting the all-time highest scores from previous games (get_top_score.sql).

### Client Files:

Get Fraction of Domestic vs International Travel: client/src/components/query-box/domesticPortion.jsx

Get Favourite Routes: client/src/components/query-box/favouriteRoutes.jsx

Get Flight Coverage: client/src/components/query-box/fligtCoverage.jsx

Get High Traffic areas at some referenced geographical location: client/src/components/query-box/highTraffic.jsx

Get Most Popular Country/Airport to Visit: client/src/components/query-box/mostPopularVisits.jsx

Get Nearest Airport: client/src/components/query-box/nearestAirport.jsx

Get Plane Information based on Model: client/src/components/query-box/planeModelInfo.jsx

Get Shortest Flights: client/src/components/query-box/shorestFlight.jsx

Favour searched up Files (hosted by shortest flights feature): client/src/components/query-box/shorestFlight.jsx

Play the country guessing game: client/src/components/views/game-screen/game-view/gameView.jsx

Review results of game plays: client/src/components/views/game-screen/gameResults/gameResultsView.jsx

## Setup and Database Initialization

1. Familiarize yourself with the data. The data for this project is included in [`./data/`](./data/). Inside which are several CSV files
that make up the source data for our project. The data folder also
contains its own [`README.md`](./data/README.md) which outlines
the data sources and aquisition details.

All data is accquired from the following sites:
- [OpenFlights](https://openflights.org/data.html)
- [OurAirports](https://ourairports.com/data/)
- [Country Polygons as GeoJSON](https://datahub.io/core/geo-countries#resource-geo-countries_zip)

2. For our database solution, we used Google Cloud Platform's CloudSQL.
You'll require MySQL version 5.7 on your database in order to use our sql files. If you want to use any of our data pipelining scripts you'll need
to use Google Cloud Platform's CloudSQL as well. Details on how to set
it up are included in [`database_setup.md`](./cloud_sql_setup.md)

3. Our setup scripts require that you have [Python 3.5](https://www.python.org/) installed on your machine and the packages listed in [`requirements.txt`](./requirements.txt) installed in your current python environment.

4. Execute
It will do the following:
- Create the tables and constraints outlined in our E/R diagram
- Extract transform and load the projects data into the database
- Generate a uniform distribution of 10,000 location points around the globe and
sample from that distribution inserting them into the uniform table.

```sh
cd populate && ./init.sh
```

5. Running Test Queries

To see sample tests and their outputs visit the [`tests`]('./tests/') folder and read the [`README.md`]('./tests/README.md').

6. Running a local application UI
Go to the `client` folder and execute the commands `npm install` followed by `npm start` to start the dev server on port 3000. Head to `localhost:3000` on a browser to access the application.

