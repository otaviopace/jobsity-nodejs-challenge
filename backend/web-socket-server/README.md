# web-socket-server

This project handles Web Sockets for the chat page. Also, if a message is sent via `messages` queue on RabbitMQ, it will be emitted to the chat too.

## Architecture

This project has the following modules:

- `bin`: contains the entrypoint of the application
- `event-handlers`: contains the handlers for each socket.io event
