"use strict";

let db_functions = require('../db_functions');

let express = require("express");
let router = express.Router();

let db_connection = null;

module.exports = function config(config_object){

    db_connection = config_object["database"];

    router.get("/", (req, res)=> {
        
        let country_id = req.query.country_id;
        let limit = +req.query.limit;
        
        let query_string = `SELECT c2.name as most_popular_dest
        FROM 
        (
            SELECT r1.destination as dcode
            FROM routes as r1 
            INNER JOIN airports as a1 
            ON r1.source = a1.iata 
            INNER JOIN countries as c1 
            ON c1.ISO_A2 = a1.iso_country 
            WHERE c1.ISO_A2 = ?
        ) as dcodes 
        INNER JOIN airports as a2
        ON dcodes.dcode = a2.iata
        INNER JOIN countries as c2
        ON c2.ISO_A2 = a2.iso_country 
        WHERE c2.ISO_A2 != ?
        GROUP BY c2.name 
        ORDER BY COUNT(*) DESC 
        LIMIT ?`;    
        db_functions.send_query_result(query_string, [country_id, country_id,limit], db_connection, res);
    });
    

    return router;
};