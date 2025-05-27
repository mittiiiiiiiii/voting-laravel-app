FROM php:8.2-fpm
WORKDIR /app
COPY --from=frontend /app /app
COPY ./src /app
RUN apt-get update && apt-get install -y unzip libpq-dev \
    && docker-php-ext-install pdo pdo_pgsql
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer
RUN composer install --no-dev --optimize-autoloader
RUN php artisan storage:link
RUN chmod -R 777 storage bootstrap/cache

FROM node:20 AS frontend
WORKDIR /app
COPY ./src/package*.json ./
RUN npm ci
COPY ./src .
RUN npm run build

EXPOSE 8000
CMD ["php", "artisan", "serve", "--host", "0.0.0.0", "--port", "8000"]
