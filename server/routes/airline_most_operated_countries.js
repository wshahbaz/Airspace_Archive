"use strict";

let db_functions = require('../db_functions');

let express = require("express");
let router = express.Router();

let db_connection = null;

module.exports = function config(config_object){

    db_connection = config_object["database"];

    router.get("/", (req, res)=> {

        let airline_id = req.query.airline_id;
        let limit = +req.query.limit;

        let query_string = `
        select c.name
        from (
            select source as country, count(*) as num_flights
            from routes
            where airline_id = ?
            group by source
            order by count(*) desc
            limit ?
        ) as r
        join airports as a
        on a.iata = r.country
        join countries as c
        on a.iso_country = c.ISO_A2
        group by c.name
        `;    
        
        db_functions.send_query_result(query_string, [airline_id, limit], db_connection, res);
    });
    

    return router;
};