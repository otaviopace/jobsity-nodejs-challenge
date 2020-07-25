# jobsity-nodejs-challenge

Jobsity's Node.js Code Challenge.

## Table of Contents

- [Installation](#installation)
- [Running](#running)
- [Features](#features)
	- [Register Users](#register-users)
	- [Log Users In](#log-users-in)
	- [Users Chat](#users-chat)
- [Architecture](#architecture)

## Installation

To install the project you will need `Docker` and `docker-compose`. Also, all the `Docker`/`docker-compose` comands that will be shown below will use `make`, if you don't want to install it, you can see what each one of them does on the [`Makefile`](https://github.com/otaviopace/jobsity-nodejs-challenge/blob/master/Makefile) to run them directly.

### Back-end

To build the back-end images and dependencies, just run:

```shell
make build-backend
```

### Front-end

To build the front-end images and dependencies, just run:

```shell
make build-frontend
```

## Running

The full project is a front-end communicating with a back-end. Below there are instructions on how to get both up and running.

### Back-end

To run the back-end just execute:

```shell
make run-backend
```

It should be listening on `http://localhost:4000`.

### Front-end

To run the front-end just execute:

```shell
make run-frontend
```

It should be listening on `http://localhost:3000`.

## Features

### Register Users
### Log Users In
### Users Chat

## Architecture

Since there are two applications there's a `README.md` on both folders explaining the architecture.

- [Back-end](https://github.com/otaviopace/jobsity-nodejs-challenge/blob/master/backend/README.md)
- [Front-end](https://github.com/otaviopace/jobsity-nodejs-challenge/blob/master/frontend/README.md)
