# Airspace Intermediate Server

This is the Node.js server that serves as an intermediary between the client and the server. It uses Express.js and is deployed on GCP App Engine.

## Key Files:

- app.js: our primary entry point.
- router/router.js: the router moving beteen all of our routes.
- router/*: the actual SQL query endpoints themselves, correponsing to .sql feature files in feature_queries
- app.yaml: deployment config for GCP App Engine


## Deployment

With our GCP project set in the `gcloud` command line, run `gcloud app deploy` to deploy the server.

## Running Locally

Download and start the GCP cloud proxy. Then run `npm start`.