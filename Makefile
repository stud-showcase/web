DOCKER_COMPOSE = docker-compose -f docker/docker-compose.yml
APP_EXEC = $(DOCKER_COMPOSE) exec app

build:
	$(DOCKER_COMPOSE) up -d --build

build-no-cache:
	$(DOCKER_COMPOSE) build --no-cache
	$(DOCKER_COMPOSE) up -d

up:
	$(DOCKER_COMPOSE) up -d

down:
	$(DOCKER_COMPOSE) down

reup:
	$(DOCKER_COMPOSE) down
	$(DOCKER_COMPOSE) up -d

migrate:
	$(APP_EXEC) php artisan migrate

migrate-fresh:
	$(APP_EXEC) php artisan migrate:fresh --seed

shell:
	$(APP_EXEC) bash

run:
	$(APP_EXEC) $(filter-out $@,$(MAKECMDGOALS))

%:
	@: