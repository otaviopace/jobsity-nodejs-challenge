# jobsity-nodejs-challenge

Jobsity's Node.js Code Challenge.

## Table of Contents

- [Installation](#installation)
- [Running](#running)
- [Tests](#tests)
- [Lint](#lint)
- [Features](#features)
- [Architecture](#architecture)

## Installation

To install the project you will need `Docker` and `docker-compose`. Also, all the `Docker`/`docker-compose` comands that will be shown below will use `make`, if you don't want to install it, you can see what each one of them does on the [`Makefile`](https://github.com/otaviopace/jobsity-nodejs-challenge/blob/master/Makefile) to run them directly.

### Back-end

First you'll need to copy the `.env.example` file in the `backend` folder to a file named `.env` at the same location.

There are 3 projects on the backend, to build them you can run:

```shell
make build-http-server
make build-web-socket-server
make build-command-bot
```

### Front-end

Just as the back-end, you'll need to copy the `.env.example` file in the `backend` folder to a file named `.env` at the same location.

To build the front-end images and dependencies, just run:

```shell
make build-frontend
```

## Running

The full project is a front-end communicating with a back-end. Below there are instructions on how to get both up and running.

### Back-end

To run the back-end just execute the commands below in different terminals:

```shell
make run-http-server
```

It listens on `http://localhost:4000`.

```shell
make run-web-socket-server
```

It listens on `http://localhost:5000`.

```shell
make run-command-bot
```

It is just a bot listening to a RabbitMQ queue, so there's no port to listen to.

### Front-end

To run the front-end just execute:

```shell
make run-frontend
```

It should be listening on `http://localhost:3000`.

## Tests

To run tests just use:

```shell
make common-test
make http-server-test
make web-socket-test
```

## Lint

The project uses [standard JS](https://standardjs.com/index.html) style guide. To run the linter just use (you'll need Node.js installed for this one):

```shell
npx standard
```

## Features

- Register Users
- Log Users In
- Users Chat

## Architecture

Since there are four (three back-end + one front-end) applications there's a `README.md` on both folders explaining the architecture.

- [Back-end](https://github.com/otaviopace/jobsity-nodejs-challenge/blob/master/backend/README.md)
- [Front-end](https://github.com/otaviopace/jobsity-nodejs-challenge/blob/master/frontend/README.md)
