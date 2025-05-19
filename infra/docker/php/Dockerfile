FROM php:8.2-fpm-bullseye AS base
EXPOSE 5173

WORKDIR /workspace

# timezone environment
ENV TZ=UTC \
    # locale
    LANG=en_US.UTF-8 \
    LANGUAGE=en_US:en \
    LC_ALL=en_US.UTF-8 \
    # composer environment
    COMPOSER_HOME=/composer

ARG UID=1000
ARG GID=1000

COPY --from=composer:2.7 /usr/bin/composer /usr/bin/composer

RUN apt-get update \
    && apt-get -y install --no-install-recommends \
        locales \
        git \
        unzip \
        libzip-dev \
        libicu-dev \
        libonig-dev \
        default-mysql-client \
    && locale-gen en_US.UTF-8 \
    && localedef -f UTF-8 -i en_US en_US.UTF-8 \
    && docker-php-ext-install \
        intl \
        pdo_mysql \
        zip \
        bcmath \
    && groupadd --gid $GID phper \
    && useradd --uid $UID --gid $GID phper \
    && mkdir /composer \
    && mkdir -p /home/phper/.config/psysh \
    && mkdir -p /home/phper/.npm \
    && chown phper:phper /composer \
    && chown phper:phper /workspace \
    && chown phper:phper /home/phper/.config/psysh \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

# === ここから追加 ===
# Node.jsのバージョンを指定してインストール
ARG NODE_VERSION=20.x
RUN curl -sL https://deb.nodesource.com/setup_$NODE_VERSION | bash - \
    && apt-get update \
    && apt-get install -y nodejs \
    && apt-get clean \
    && npm install -g npm@10.7.0
# === ここまで追加 ===

RUN apt-get install -y vim

FROM base AS development

COPY ./infra/docker/php/php.development.ini /usr/local/etc/php/php.ini

USER phper

FROM base AS development-xdebug

COPY ./infra/docker/php/xdebug.ini /usr/local/etc/php/conf.d/xdebug.ini

USER phper

FROM base AS deploy

COPY ./infra/docker/php/php.deploy.ini /usr/local/etc/php/php.ini
COPY --chown=phper:phper ./src /workspace

USER phper

RUN pecl install xdebug \
    && docker-php-ext-enable xdebug \
    && chown -R 1000:1000 "/home/phper/.npm"

RUN composer install --quiet --no-interaction --no-ansi --no-dev --no-scripts --no-progress --prefer-dist \
    && composer dump-autoload --optimize \
    && chmod -R 777 storage bootstrap/cache \
    && php artisan optimize:clear \
    && php artisan optimize
