# backend

## Architecture

The code is inspired by the Hexagonal Architecture. The main layers of this project are:

- ports
- middlewares
- controllers
- business-logic
- presenters
- event-handlers

The way it works is that the `ports` layer will interact with the extern world. In it there is the implementation of how to: start a HTTP server, connect to a database, start a Web Socket server, etc.

After that the `middlewares` will be in between the request and the `controllers`, translating and parsing what's necessary.

The `controllers` will then handle the route specific logic, being the glue of `business-logic`, `repository` and `presenters`.

You might ask yourself where's the `adapters` layer that the Hexagonal architecture talks about? Well, the `middlewares` and `presenters` act as it. They help on the incoming request and on the outgoing response, so at the boudaries of the ports and controller.

Here is a visual representation simplified:

<p align="center">
  <img src=".png" alt="project-architecture" />
</p>

The reasioning behind this is that the `business-logic` is isolated so it has no knowledge of the outside world. The advantage of this is that we can create different `ports` and `adapters` to use the same logic with different circumstances, like to process a HTTP request, a Kafka message, CLI stdin, etc.

Below there is a simple explanation of each layer/module:

### bin

> Entrypoint for the applications.

It has the `server.js` and the `stock-bot.js`. They call the `ports` and `repository` code to start running.

### ports

> Handles the outside world.

It has implementations for talking with a database, starting a HTTP server and Web Sockets.

#### http-server

> The name is really self explanatory.

#### web-socket

> Receives a HTTP server and adds Web Socket event handlers to it.

#### repository

> Abstracts the database layer to ease change of it.

For now it only can abstract for `sequelize` (PostgreSQL, etc).

#### sequelize

> Uses sequelize ORM to connect on a SQL database.

Right now it is configured for PostgreSQL.

### middlewares

> Stays in between the ports entrance for internal components (controllers).

Handles authentication, JSON parsing, global error handling, HTTP logging, etc.

### controllers

> Main request handling of a route.

It is a glue between `business-logic`, `repository` and `presenters`.

### business-logic

> Pure business logic.

It doesn't have any side effects, it just purely converts some data structures to other ones by applying the business rules.

### config

> Configuration for multiple modules.

### logger

> Logging for regular use and HTTP middleware.

### event-handlers

> Event handlers for Web Sockets.

It is analogous to the `controllers` layer for `HTTP`.

### presenters

> Builds objects to present for users, it is used on HTTP responses.

It will format, filtrate and do necessary parsing to present the data for it to be responded on HTTP requests for example.

### routes

> Contains the HTTP routes configuration.

### schemas

> Contains the schemas to validate outside requests.

### errors

> Contains error classes.
