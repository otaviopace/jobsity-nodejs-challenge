# backend

I've made three applications for the backend, the `http-server`, the `web-socket-server` and the `command-bot`. All of them use a `common` library.

The `http-server` handles HTTP requests related to registering and logging in users, and to get messages too.

The `web-socket-server` handles Web Socket connections for the chat page.

The `command-bot` handles events of commands sent to the chat, then it will send them parsed to the `messages` queue.

The `common` library contains both business logic and IO of multiple kinds.

## Architecture

Since there are three applications and a library, there's a `README.md` on each folder explaining the architecture:

- [http-server](https://github.com/otaviopace/jobsity-nodejs-challenge/blob/master/backend/http-server/README.md)
- [web-socket-server](https://github.com/otaviopace/jobsity-nodejs-challenge/blob/master/backend/web-socket-server/README.md)
- [command-bot](https://github.com/otaviopace/jobsity-nodejs-challenge/blob/master/backend/command-bot/README.md)
- [common](https://github.com/otaviopace/jobsity-nodejs-challenge/blob/master/backend/common/README.md)
