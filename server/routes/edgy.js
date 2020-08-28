"use strict";

let db_functions = require('../db_functions');

let express = require("express");
let router = express.Router();

let db_connection = null;

module.exports = function config(config_object){

    db_connection = config_object["database"];

    router.get("/", (req, res)=> {

        let query_string = `SELECT s.* 
        FROM routes as s
        INNER JOIN
        (
            SELECT destination as id, COUNT(*)
            FROM routes
            GROUP BY destination
            ORDER BY COUNT(*) ASC
            LIMIT 1
        ) as dest
        ON s.destination = dest.id`;    
        db_functions.send_query_result(query_string, [], db_connection, res);
    });
    

    return router;
};