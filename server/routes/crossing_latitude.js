"use strict";

let db_functions = require('../db_functions');

let express = require("express");
let router = express.Router();

let db_connection = null;

module.exports = function config(config_object){

    db_connection = config_object["database"];

    router.get("/", (req, res)=> {

        let latitude = req.query.latitude;
        let query_string = `SELECT a.src as source, a.dest as destination
        FROM
        (
            SELECT src_lat.lat as src_lat,dest_lat.lat as dest_lat,f.id,f.source as src, f.destination as dest
            FROM 
            routes as f 
            INNER JOIN (
                SELECT ST_X(position) as lat, iata 
                FROM airports
            ) as src_lat
            ON src_lat.iata = f.source
            INNER JOIN
            (
                SELECT ST_X(position) as lat, iata
                FROM airports
            ) as dest_lat
            ON dest_lat.iata = f.destination
        ) as a
        WHERE 
        (a.src_lat < ?  and a.dest_lat > ?)
        OR
        (a.src_lat > ? and a.dest_lat < ?)`;    
        db_functions.send_query_result(query_string, [latitude, latitude, latitude, latitude], db_connection, res);
    });
    

    return router;
};