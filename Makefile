web-socket-server-test:
	@docker-compose up web-socket-server-test

common-test:
	@docker-compose up common-test

http-server-test:
	@docker-compose up http-server-test

build-http-server:
	@docker-compose build http-server

run-http-server:
	@docker-compose up http-server

build-web-socket-server:
	@docker-compose build web-socket-server

run-web-socket-server:
	@docker-compose up web-socket-server

build-frontend:
	@docker-compose build frontend

run-frontend:
	@docker-compose up frontend

build-command-bot:
	@docker-compose build command-bot

run-command-bot:
	@docker-compose up command-bot

start-rabbitmq:
	@docker-compose up -d rabbitmq

start-db:
	@docker-compose up -d postgres

migrate-up:
	@docker-compose up migrate-up

migrate-down:
	@docker-compose up migrate-down

setup-db: start-db migrate-up

.PHONY: build-web-socket-server run-web-socket-server build-http-server run-http-server build-frontend run-frontend start-db setup-db migrate-up migrate-down rabbitmq build-command-bot run-command-bot
