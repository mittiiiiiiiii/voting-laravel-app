install:
	@make build
	@make up
	docker compose exec app composer install
	docker compose exec app php artisan key:generate
	docker compose exec app php artisan storage:link
	docker compose exec app chmod -R 777 storage bootstrap/cache
	@make migrate

build:
	docker compose build

up:
	docker compose up -d

stop:
	docker compose stop

down:
	docker compose down --remove-orphans

down-v:
	docker compose down --remove-orphans --volumes

app:
	docker compose exec app bash

app-bash:
	docker compose exec app bash

app-root:
	docker compose exec -u root app bash

restart:
	@make down
	@make up

destroy:
	docker compose down --rmi all --volumes --remove-orphans

remake:
	@make destroy
	@make install

migrate:
	docker compose exec app php artisan migrate

fresh:
	docker compose exec app php artisan migrate:fresh --seed

seed:
	docker compose exec app php artisan db:seed

laravel-log:
	tail -f src/storage/logs/laravel.log
