"use strict";

let db_functions = require('../db_functions');

let express = require("express");
let router = express.Router();

let db_connection = null;

module.exports = function config(config_object){

    db_connection = config_object["database"];

    router.get("/", (req, res)=> {
        
        let airplane_name = +req.query.airplane;

        let query_string = `SELECT id FROM airplanes WHERE name = ?`;    
        db_functions.send_query_result(query_string, [airplane_name], db_connection, res);
    });
    

    return router;
};