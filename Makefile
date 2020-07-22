build-backend:
	@docker-compose build backend

run-backend:
	@docker-compose up backend

start-db:
	@docker-compose up -d postgres

migrate-up:
	@docker-compose up migrate-up

migrate-down:
	@docker-compose up migrate-down

setup-db: start-db migrate-up

.PHONY: build-backend run-backend start-db setup-db migrate-up migrate-down
