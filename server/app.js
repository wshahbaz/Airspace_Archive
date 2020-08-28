"use strict";

let express = require("express");
let app = express();
let cors = require('cors');

let mysql = require('mysql');
let body_parser = require("body-parser");
let https = require('https');
let fs = require("fs");

/*
//DATABASE SETUP.
let pool = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "sqltutorial",
    database: "dysc",
    connectionLimit: 100,
    debug: false,
    multipleStatements: true,
});
*/

app.use(cors());


app.enable('trust proxy');
let gcloud_config = require('./gcloud_config');

// const config = {
//     user: gcloud_config.get("MYSQL_USER"),
//     password: gcloud_config.get("MYSQL_PASSWORD"),
//     database: "dysc",
//     connectionLimit: 100,
//     debug: false,
//     multipleStatements: true,
//     port: 3306,
// };
//
// /*const config = {
//     user: "root",
//     password: "BuyMeGoogle$$$",
//     database: "dysc",
//     connectionLimit: 100,
//     debug: false,
//     multipleStatements: true,
//     socketPath : `/cloudsql/dysc-deployment-2:us-east4:flare-test-database`,
// };*/

const options = {
    user: "server",
    password: "server",
    database: 'airspace',
    connectionLimit: 100,
    multipleStatements: true
};

if (
    gcloud_config.get('INSTANCE_CONNECTION_NAME') &&
    gcloud_config.get('NODE_ENV') === 'production'
) {
    options.socketPath = `/cloudsql/${gcloud_config.get('INSTANCE_CONNECTION_NAME')}`;
}

//DATABASE SETUP.
let pool = mysql.createPool(options);


let router_config = {
    "database": pool,
};


//ROUTING BEGINS
app.use(body_parser.json());

app.use("/ping", function (req,res) {
   res.sendStatus(200);
});

app.use("/query", require("./routes/router")(router_config));


// Generic error handling.
app.use(function (err, req, res, next) {
    res.status(500).json({error: err.message});
});


const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`);
    console.log('Press Ctrl+C to quit.');
});

module.exports = app;

