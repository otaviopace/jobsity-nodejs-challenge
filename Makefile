build-backend:
	@docker-compose build backend

run-backend:
	@docker-compose up backend

start-db:
	@docker-compose up -d postgres

setup-db: start-db

.PHONY: build-backend run-backend start-db setup-db
