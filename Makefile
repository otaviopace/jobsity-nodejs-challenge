build-backend:
	@docker-compose build backend

run-backend:
	@docker-compose up backend

start-db:
	@docker-compose up -d postgres

migrate-db:
	@docker-compose up migrate

setup-db: start-db migrate-db

.PHONY: build-backend run-backend start-db setup-db migrate-db
