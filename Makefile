build-backend:
	@docker-compose build backend

run-backend:
	@docker-compose up backend

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

.PHONY: build-backend run-backend build-frontend run-frontend start-db setup-db migrate-up migrate-down rabbitmq build-command-bot run-command-bot
