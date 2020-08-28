"use strict";

let db_functions = require('../db_functions');

let express = require("express");
let router = express.Router();

let db_connection = null;

module.exports = function config(config_object){

    db_connection = config_object["database"];

    router.get("/", (req, res)=> {
        
        let game_id = req.query.game_id;
        let uid = req.query.uid;
        
        let query_string = `SELECT uid,score
        FROM scores
        where game_id = ? and uid = ?
        order by score desc
        `;    
        db_functions.send_query_result(query_string, [game_id,uid], db_connection, res);
    });
    

    return router;
};