"use strict";

let db_functions = require('../db_functions');

let express = require("express");
let router = express.Router();

let db_connection = null;

module.exports = function config(config_object){

    db_connection = config_object["database"];

    router.get("/", (req, res)=> {

        let country_id = +req.query.country_id;
        
        let query_string = `SELECT COUNT(*) as num_airports
        FROM airports 
        WHERE iso_country = ?`;    
        db_functions.send_query_result(query_string, [country_id], db_connection, res);
    });
    

    return router;
};