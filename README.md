# Showcase

## Инициализация проекта
1. Сборка и запуск контейнеров:
```bash
docker-compose -f docker/docker-compose.yml up -d --build
```
2. Выполнение миграций:
```bash
docker-compose -f docker/docker-compose.yml exec app php artisan migrate
```

## Доступ к сервисам
- Приложение: http://localhost:8000
- phpMyAdmin: http://localhost:8080
  - Username: root
  - Password: root
- MySQL: localhost:3306

## Полезные команды

### Управление контейнерами
- Запуск контейнеров:
```bash
docker-compose -f docker/docker-compose.yml up -d
```
- Остановка контейнеров:
```bash
docker-compose -f docker/docker-compose.yml down
```

### Работа с базой данных
- Выполнение миграций:
```bash
docker-compose -f docker/docker-compose.yml exec app php artisan migrate
```

- Перезапуск миграций с заполнением тестовыми данными:
```bash
docker-compose -f docker/docker-compose.yml exec app php artisan migrate:fresh --seed
```