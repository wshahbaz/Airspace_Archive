"use strict";

let db_functions = require('../db_functions');

let express = require("express");
let router = express.Router();

let db_connection = null;

module.exports = function config(config_object){

    db_connection = config_object["database"];

    router.get("/", (req, res)=> {

        let airplane_name = req.query.airplane_name;
        let query_string = `
        Select airplane_info.airline, airplane_info.cnt from (
            SELECT l.name as airline, a.name as airplane, r.cnt as cnt
            FROM (
                SELECT airline_id, airplane, count(*) as cnt
                FROM routes
                GROUP BY airline_id, airplane
                ORDER BY count(*) desc
            ) as r
            INNER JOIN airplanes as a on r.airplane = a.iata
            INNER JOIN airlines as l on r.airline_id = l.id
            ORDER by r.cnt desc, l.name, a.name 
        ) as airplane_info
        WHERE airplane_info.airplane LIKE ?`;    
        db_functions.send_query_result(query_string, [airplane_name], db_connection, res);
    });
    

    return router;
};