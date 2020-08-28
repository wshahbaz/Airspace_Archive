"use strict";

let db_functions = require('../db_functions');

let express = require("express");
let router = express.Router();

let db_connection = null;

module.exports = function config(config_object){

    db_connection = config_object["database"];

    router.get("/", (req, res)=> {
        
        let user_id = req.query.name;
        let game_id = req.query.game_id;
        let score = +req.query.score;

        let query_string = `INSERT INTO scores VALUES(Default, ?, ?, ?, NOW())`;    
        db_functions.send_query_result(query_string, [game_id, user_id, score], db_connection, res);
    });
    

    return router;
};