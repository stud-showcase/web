DOCKER_COMPOSE = docker-compose -f docker/docker-compose.yml
APP_EXEC = $(DOCKER_COMPOSE) exec app

build:
	$(DOCKER_COMPOSE) up -d --build

up:
	$(DOCKER_COMPOSE) up -d

down:
	$(DOCKER_COMPOSE) down

migrate:
	$(APP_EXEC) php artisan migrate

migrate-fresh:
	$(APP_EXEC) php artisan migrate:fresh --seed

app:
	$(APP_EXEC) $(CMD)