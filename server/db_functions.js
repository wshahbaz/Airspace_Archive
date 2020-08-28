"use strict";

module.exports.send_query_result = function (query_string, params, db_pool, response){

    db_pool.query(query_string, params, function (err, result) {
        let response_body = null;
        if (err){
            response_body = String(err);
            response.status(500);
        }
        else{
            response_body = result;
            response.status(200);
        }
        response.json(response_body);
    });
};
