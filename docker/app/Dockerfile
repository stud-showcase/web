FROM php:8.2-fpm

RUN apt-get update && apt-get install -y \
    git curl libpng-dev libonig-dev libxml2-dev zip unzip
RUN docker-php-ext-install pdo_mysql mbstring exif pcntl bcmath
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

WORKDIR /var/www
COPY . /var/www
RUN composer install --no-scripts --no-interaction
RUN chown -R www-data:www-data /var/www

COPY docker/app/php.ini /usr/local/etc/php/php.ini

CMD php artisan serve --host=0.0.0.0 --port=8000
EXPOSE 8000