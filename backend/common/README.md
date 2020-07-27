# common

The `common` library contains both business logic and IO of multiple kinds. This code is concentrated here because it is used by multiple applications.

## Architecture

This project has the following modules:

- `business-logic`: contains pure business logic. It has no IO whatsoever
- `config`: contains the different types of configuration
- `errors`: contains all error types
- `logger`: contains a logger for regular use and for HTTP requests
- `ports`: it is the IO for the applications, either being the database, message broker, it doesn't matter
- `ports/http`: helps to create a HTTP and start servers
- `ports/message-broker`: it abstracts some kind of broker, for now it has implementation only for RabbitMQ
- `ports/rabbitmq`: code for communicating with RabbitMQ
- `ports/repository`: it abstracts some kind of storage/database, for now it has implementation only for Sequelize
- `ports/sequelize`: code for communicating with a SQL database, for now it is configured with PostgreSQL
- `ports/web-socket`: helps to create and start a Web Socket server
