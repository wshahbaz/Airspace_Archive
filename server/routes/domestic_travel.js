"use strict";

let db_functions = require('../db_functions');

let express = require("express");
let router = express.Router();

let db_connection = null;

module.exports = function config(config_object){

    db_connection = config_object["database"];

    router.get("/", (req, res)=> {

        let country_id = req.query.country_id;

        let query_string = `SELECT ctry.*, domestic.percent_domestic*100 as percent_domestic
        FROM (
            SELECT * FROM countries
            WHERE ISO_A2 = ?
        ) as ctry
        INNER JOIN
        (
        SELECT all_routes.ctry as ctry, domestic.ct/all_routes.ct as percent_domestic
            FROM (
                SELECT a1.iso_country as ctry, COUNT(*) as ct
                FROM routes as f 
                INNER JOIN (
                    SELECT * FROM airports 
                ) as a1
                ON iata = f.source
                INNER JOIN (
                    SELECT * FROM airports 
                ) as a2
                ON a2.iata = f.destination
                GROUP BY a1.iso_country
            ) as all_routes
            INNER JOIN (
                SELECT a1.iso_country as ctry, COUNT(*) as ct
                FROM routes as f 
                INNER JOIN (
                    SELECT * FROM airports 
                ) as a1
                ON iata = f.source
                INNER JOIN (
                    SELECT * FROM airports
                ) as a2
                ON a2.iata = f.destination and a2.iso_country = a1.iso_country
                GROUP BY a1.iso_country
            ) as domestic
            ON domestic.ctry = all_routes.ctry
        ) as domestic
        ON ctry.ISO_A2 = domestic.ctry;
        `;    
        
        db_functions.send_query_result(query_string, [country_id], db_connection, res);
    });
    

    return router;
};