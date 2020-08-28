"use strict";

let db_functions = require('../db_functions');

let express = require("express");
let router = express.Router();

let db_connection = null;

module.exports = function config(config_object){

    db_connection = config_object["database"];

    router.get("/", (req, res)=> {

        let airport_id = +req.query.airport_id;

        let query_string = `SELECT all_routes.arpt as arpt, domestic.ct/all_routes.ct*100 as percent_domestic
        FROM (
            SELECT a1.iata as arpt, COUNT(*) as ct
            FROM routes as f 
            INNER JOIN (
                SELECT * FROM airports 
            ) as a1
            ON a1.iata = f.source
            INNER JOIN (
                SELECT * FROM airports 
            ) as a2
            ON a2.iata = f.destination
            WHERE a1.id = ?
            GROUP BY a1.iata
        ) as all_routes
        INNER JOIN (
            SELECT a1.iata as arpt, COUNT(*) as ct
            FROM routes as f 
            INNER JOIN (
                SELECT * FROM airports 
            ) as a1
            ON iata = f.source
            INNER JOIN (
                SELECT * FROM airports
            ) as a2
            ON a2.iata = f.destination and a2.iso_country = a1.iso_country
            WHERE a1.id = ?
            GROUP BY a1.iata
        ) as domestic
        ON domestic.arpt = all_routes.arpt`;    
        
        db_functions.send_query_result(query_string, [airport_id, airport_id], db_connection, res);
    });
    

    return router;
};