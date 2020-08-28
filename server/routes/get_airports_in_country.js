"use strict";

let db_functions = require('../db_functions');

let express = require("express");
let router = express.Router();

let db_connection = null;

module.exports = function config(config_object){

    db_connection = config_object["database"];

    router.get("/", (req, res)=> {

        let country_iso = req.query.country_iso;
        console.log("COUNTRY ISO: ", country_iso );
        
        let query_string = `SELECT id, name as label FROM airports WHERE iso_country = ?`;    
        db_functions.send_query_result(query_string, [country_iso], db_connection, res);
    });
    

    return router;
};