"use strict";

let db_functions = require('../db_functions');

let express = require("express");
let router = express.Router();

let db_connection = null;

module.exports = function config(config_object){

    db_connection = config_object["database"];

    router.get("/", (req, res)=> {
        
        let limit = +req.query.limit;
        let query_string = `SELECT * 
        FROM countries
        ORDER BY RAND()
        LIMIT ?`;    
        db_functions.send_query_result(query_string, [limit], db_connection, res);
    });
    

    return router;
};