"use strict";

let db_functions = require('../db_functions');

let express = require("express");
let router = express.Router();

let db_connection = null;

module.exports = function config(config_object){

    db_connection = config_object["database"];

    router.get("/", (req, res)=> {
        
        let name = req.query.name;
        let query_string = `SELECT * FROM users WHERE name = ?`;    
        db_functions.send_query_result(query_string, [name], db_connection, res);
    });
    

    return router;
};