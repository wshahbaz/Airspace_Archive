"use strict";

let db_functions = require('../db_functions');

let express = require("express");
let router = express.Router();

let db_connection = null;

module.exports = function config(config_object){

    db_connection = config_object["database"];

    router.get("/", (req, res)=> {

        let long = +req.query.long;
        let lat = +req.query.lat;

        let query_string = `SELECT a.name as airport, c.name as country
        FROM 
        (
            SELECT * FROM
            airports as a
            WHERE ST_Y(a.position) < 180 and ST_Y(a.position) > -180 and ST_X(a.position) < 90 and ST_X(a.position) > -90
            and id not in (
                SELECT a.id
                FROM airports as a 
                JOIN airports as a2
                WHERE ST_X(a.position) < 180 and ST_X(a.position) > -180 and ST_Y(a.position) < 90 and ST_Y(a.position) > -90
                and ST_X(a2.position) < 180 and ST_X(a2.position) > -180 and ST_Y(a2.position) < 90 and ST_Y(a2.position) > -90
                and ST_Distance_Sphere(a.position, ST_GeomFromText('POINT (? ?)', 4326), 4326) > ST_Distance_Sphere(a2.position, ST_GeomFromText('POINT (? ?)', 4326), 4326)
            )
        ) as a
        JOIN countries as c 
        ON c.ISO_A2 = a.iso_country`;    
        db_functions.send_query_result(query_string, [long, lat, long, lat], db_connection, res);
    });
    

    return router;
};