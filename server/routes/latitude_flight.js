"use strict";

let db_functions = require('../db_functions');

let express = require("express");
let router = express.Router();

let db_connection = null;

module.exports = function config(config_object){

    db_connection = config_object["database"];

    router.get("/", (req, res)=> {
        
        let latitude = +req.query.latitude;
        let query_string =  `SELECT * 
        FROM routes
        WHERE destination in
        (
            SELECT iata 
            FROM airports
            WHERE ST_Y(position) > -10 and ST_Y(position) < 10
        )`;    
        db_functions.send_query_result(query_string, [latitude], db_connection, res);
    });
    

    return router;
};