build-http-backend:
	@docker-compose build http-backend

run-http-backend:
	@docker-compose up http-backend

build-web-socket-backend:
	@docker-compose build web-socket-backend

run-web-socket-backend:
	@docker-compose up web-socket-backend

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

.PHONY: build-web-socket-backend run-web-socket-backend build-http-backend run-http-backend build-frontend run-frontend start-db setup-db migrate-up migrate-down rabbitmq build-command-bot run-command-bot
