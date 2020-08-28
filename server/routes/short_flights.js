"use strict";

let db_functions = require('../db_functions');

let express = require("express");
let router = express.Router();

let db_connection = null;

module.exports = function config(config_object){

    db_connection = config_object["database"];

    router.get("/", (req, res)=> {

        let distance = +req.query.distance;
        let limit = +req.query.limit;
        let src_airport = req.query.src_airport;
        
        let query_string = `SELECT r.id, s.name, d.name
        FROM routes as r
        INNER JOIN airports as s
        ON source = s.iata and r.source = ?
        INNER JOIN airports as d
        ON destination = d.iata 
        where ST_Y(s.position) < 90 and ST_Y(d.position) < 90 and ST_Y(s.position) > -90 and ST_Y(d.position) > -90
        and ST_Distance_Sphere(s.position,d.position, 4326) < ?
        ORDER by ST_Distance_Sphere(s.position,d.position, 4326) asc
        LIMIT ?`;    
        db_functions.send_query_result(query_string, [src_airport,distance,limit], db_connection, res);
    });
    

    return router;
};