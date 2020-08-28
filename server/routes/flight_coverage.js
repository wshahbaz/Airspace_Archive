"use strict";

let db_functions = require('../db_functions');

let express = require("express");
let router = express.Router();

let db_connection = null;

module.exports = function config(config_object){

    db_connection = config_object["database"];

    router.get("/", (req, res)=> {

        let country_id = req.query.country_id;
        let query_string = `SELECT c.name as country, AVG(b.dist) as avg_dist
        FROM (
            SELECT b.ISO_A2 as cid, MIN(ST_Distance_Sphere(p.position, a.position, 4326)) as dist
            FROM uniform as p 
            JOIN (
                SELECT position,iso_country FROM airports as a
                WHERE ST_X(a.position) < 180 and ST_X(a.position) > -180 and ST_Y(a.position) < 90 and ST_Y(a.position) > -90
                and iso_country = ?
            ) as a
            JOIN (
                SELECT * FROM country_boundaries
                WHERE ISO_A2 = ?
            ) as b
            WHERE MBRContains(b.boundary,p.position) and a.iso_country = b.ISO_A2
            GROUP BY b.ISO_A2, p.position
        ) as b
        JOIN countries as c
        ON c.ISO_A2 = b.cid 
        GROUP BY c.name`;    
        db_functions.send_query_result(query_string, [country_id, country_id], db_connection, res);
    });
    

    return router;
};