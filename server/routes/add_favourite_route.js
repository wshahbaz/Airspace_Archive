"use strict";

let db_functions = require('../db_functions');

let express = require("express");
let router = express.Router();

let db_connection = null;

module.exports = function config(config_object){

    db_connection = config_object["database"];

    router.get("/", (req, res)=> {

        let user_id = req.query.name;
        let route = +req.query.route;
        let query_string = `INSERT INTO favourite_routes VALUES(DEFAULT, ?, ?, NOW())`;    
        db_functions.send_query_result(query_string, [user_id, route], db_connection, res);
    });
    

    return router;
};