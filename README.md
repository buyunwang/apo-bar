# Apo-bar

A simple react CRUD client that serves beers and wines from a rest api.

## Dependencies
- redux
- react-router-dom

## Setting up environment
Docker server needs to be running at:
http://0.0.0.0:9190/

## API Endpoints
- GET /beers will list all the beers
- GET /beers/1 will get the beer with the ID=1
- PUT /beers/1 will update the beer with the ID=1. You can specify the name
- DELETE /beers/1 will delete the beer with ID=1