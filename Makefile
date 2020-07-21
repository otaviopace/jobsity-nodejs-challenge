build-backend:
	@docker-compose build backend

run-backend:
	@docker-compose up backend

.PHONY: build-backend run-backend
