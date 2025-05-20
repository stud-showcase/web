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

clear-cache:
	$(APP_EXEC) php artisan cache:clear
	$(APP_EXEC) php artisan config:clear
	$(APP_EXEC) php artisan route:clear
	$(APP_EXEC) php artisan view:clear
	$(APP_EXEC) php artisan event:clear
	$(APP_EXEC) php artisan clear-compiled
	$(DOCKER_COMPOSE) exec redis redis-cli FLUSHALL

shell:
	$(APP_EXEC) bash

run:
	$(APP_EXEC) $(filter-out $@,$(MAKECMDGOALS))

%:
	@: