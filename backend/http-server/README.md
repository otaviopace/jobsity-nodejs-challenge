# http-server

This server has the following routes:

- `GET /health_check`: just sends a `200 OK` if the server is up
- `POST /users`: creates an user
- `POST /sessions`: creates an session with an username and password
- `GET /messages`: gets all messages to load the chat

## Architecture

This project has the following modules:

- `app`: contains the creation of the express app, adding routes and middlewares
- `bin`: contains the entrypoint of the application
- `controllers`: contains the main logic for each route. It is kind of a glue between: request data, `common/business-logic` and the `repository`
- `middlewares`: contains express middlewares
- `presenters`: contains the format the routes deliver on response
- `routes`: contains all the application routes
- `schemas`: contains schemas for what every route receives on a request
