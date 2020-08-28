"use strict";

let db_functions = require('../db_functions');

let express = require("express");
let router = express.Router();

let db_connection = null;

module.exports = function config(config_object){

    db_connection = config_object["database"];

    router.get("/", (req, res)=> {

        let user_id = req.query.user_id;
        
        let query_string = `SELECT *
        FROM favourite_routes as fv
        JOIN routes as r
        on fv.route_id = r.id
        where fv.uid = ?`;    
        db_functions.send_query_result(query_string, [user_id], db_connection, res);
    });
    

    return router;
};