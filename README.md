# Showcase

## Инициализация проекта
1. Сборка и запуск контейнеров:
```bash
make build
```
2. Выполнение миграций:
```bash
make migrate
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
make up
```
- Остановка контейнеров:
```bash
make down
```
- Перезапуск контейнеров:
```bash
make reup
```
- Войти в контейнер:
```bash
make shell
```
- Запустить команду в контейнере:
```bash
make run "CMD"
```

### Работа с базой данных
- Выполнение миграций:
```bash
make migrate
```
- Перезапуск миграций с заполнением тестовыми данными:
```bash
make migrate-fresh
```