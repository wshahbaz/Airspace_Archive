"use strict";

let db_functions = require('../db_functions');

let express = require("express");
let router = express.Router();

let db_connection = null;

module.exports = function config(config_object){

    db_connection = config_object["database"];

    router.get("/", (req, res)=> {

        let airport_iata = req.query.airport_iata;
        let limit = +req.query.limit;

        let query_string = `select airplane as aircraft, count(*) as num_flights
        from routes
        where airline_id = ?
        group by airplane
        order by count(*) desc
        limit ?
       `;    
        
        db_functions.send_query_result(query_string, [airport_iata,limit], db_connection, res);
    });
    

    return router;
};