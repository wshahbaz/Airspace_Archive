"use strict";

let db_functions = require('../db_functions');

let express = require("express");
let router = express.Router();

let db_connection = null;

module.exports = function config(config_object){

    db_connection = config_object["database"];

    router.get("/", (req, res)=> {
        
        let airport_id = +req.query.airport_id;

        let query_string = `SELECT f.name as source_airport, (
            SELECT a2.name
            FROM routes as r
            INNER JOIN airports as a2 
            ON r.destination = a2.iata
            WHERE source = f.iata
            GROUP BY a2.name
            ORDER BY COUNT(*) desc
            limit 1
        ) as most_popular_dest
        FROM airports as f
        WHERE id = ?;`;    
        db_functions.send_query_result(query_string, [airport_id], db_connection, res);
    });
    

    return router;
};