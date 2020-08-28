"use strict";

let db_functions = require('../db_functions');

let express = require("express");
let router = express.Router();

let db_connection = null;

module.exports = function config(config_object){

    db_connection = config_object["database"];

    router.get("/", (req, res)=> {

        let limit = +req.query.limit;
        let query_string = `SELECT l.name, a.name, r.cnt
        FROM (
            SELECT airline_id, airplane, count(*) as cnt
            FROM routes
            GROUP BY airline_id, airplane
            ORDER BY count(*) desc
        ) as r
        INNER JOIN airplanes as a on r.airplane = a.iata
        INNER JOIN airlines as l on r.airline_id = l.id;
        ORDER by r.cnt desc, l.name, a.name
        LIMIT ?`;    
        db_functions.send_query_result(query_string, [limit], db_connection, res);
    });
    

    return router;
};