"use strict";

let express = require("express");
let cors = require('cors')
let router = express.Router();

module.exports = function config(config_object){

    router.get("/ping", function (req, res) {
        res.sendStatus(200);
    });

    router.use("/add_favourite_route", require("./add_favourite_route")(config_object));
    router.use("/airlines_by_plane_model", require("./airlines_by_plane_model")(config_object));
    router.use("/crossing_latitude", require("./crossing_latitude")(config_object));
    router.use("/dest_by_plane_model", require("./dest_by_plane_model")(config_object));
    router.use("/edgy", require("./edgy")(config_object));
    router.use("/find_nearest_airport", require("./find_nearest_airport")(config_object));
    router.use("/flight_coverage", require("./flight_coverage")(config_object));
    router.use("/get_some_flights", require("./get_some_flights")(config_object));
    router.use("/latitude_flight", require("./latitude_flight")(config_object));

    router.use("/popular_airport", require("./popular_airport")(config_object));
    router.use("/popular_country", require("./popular_country")(config_object));

    router.use("/random_airport", require("./random_airport")(config_object));
    router.use("/random_airline", require("./random_airline")(config_object));
    router.use("/random_country", require("./random_country")(config_object));

    router.use("/short_flights", require("./short_flights")(config_object));
    router.use("/domestic_travel", require("./domestic_travel")(config_object));
    router.use("/domestic_travel_by_airport", require("./domestic_travel_by_airport")(config_object));

    router.use("/get_game_scores", require("./get_game_scores")(config_object));
    router.use("/get_top_score", require("./get_top_score")(config_object));
    router.use("/get_user_top_score", require("./get_user_top_score")(config_object));
    router.use("/insert_user_score", require("./insert_user_score")(config_object));

    router.use("/register_user", require("./register_user")(config_object));
    router.use("/login_user", require("./login_user")(config_object));

    router.use("/get_airplane_id", require("./get_airplane_id")(config_object));
    router.use("/get_airport_id", require("./get_airport_id")(config_object));
    router.use("/get_country_id", require("./get_country_id")(config_object));

    router.use("/get_all_airplanes", require("./get_all_airplanes")(config_object));
    router.use("/get_all_airports", require("./get_all_airports")(config_object));
    router.use("/get_all_countries", require("./get_all_countries")(config_object));

    router.use("/get_airports_in_country", require("./get_airports_in_country")(config_object));
    router.use("/get_airlines_by_airplane", require("./get_airlines_by_airplane")(config_object));

    router.use("/airline_most_operated_countries", require("./airline_most_operated_countries")(config_object));
    router.use("/top_5_most_used_aircraft", require("./top_5_most_used_aircraft")(config_object));
    router.use("/top_5_dest_given_src_airport", require("./top_5_dest_given_src_airport")(config_object));

    router.use("/num_routes_goingto_airport", require("./num_routes_goingto_airport")(config_object));
    router.use("/num_routes_leaving_airport", require("./num_routes_leaving_airport")(config_object));

    router.use("/get_favourite_routes", require("./get_favourite_routes")(config_object));


    return router;
};