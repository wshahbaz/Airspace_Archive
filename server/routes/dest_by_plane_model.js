"use strict";

let db_functions = require('../db_functions');

let express = require("express");
let router = express.Router();

let db_connection = null;

module.exports = function config(config_object){

    db_connection = config_object["database"];

    router.get("/", (req, res)=> {

        let airplane_id = +req.query.airplane_id;
        let limit = +req.query.limit;
        let query_string = `SELECT c.name, a.name, r.cnt
        FROM (
            SELECT airplane, destination, COUNT(*) as cnt
            FROM routes
            WHERE airplane = ?
            GROUP BY airplane, destination 
            ORDER BY cnt desc 
        ) as r
        INNER JOIN airplanes as a on r.airplane = a.iata
        INNER JOIN airports as air on air.iata = r.destination
        INNER JOIN countries as c on c.ISO_A2 = air.iso_country
        ORDER by r.cnt, c.name, a.name
        LIMIT ?`;    
        db_functions.send_query_result(query_string, [airplane_id,limit], db_connection, res);
    });
    

    return router;
};