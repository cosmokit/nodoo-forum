.SILENT:
.PHONY: install test server help cache-clear assets watch db fixtures

.DEFAULT_GOAL = help

help:
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}'

composer.lock: composer.json
	composer update

vendor: composer.lock
	composer install

yarn.lock: package.json
	yarn upgrade

node_modules: yarn.lock
	yarn install

assets: node_modules ## Compile assets with Webpack Encore
	yarn run dev

watch: node_modules ## Live compiling assets with Webpack Encore
	yarn run dev-server

db: vendor ## Creating the database and launching migrations
	-bin/console doctrine:database:drop --if-exists --force
	-bin/console doctrine:database:create --if-not-exists
	bin/console doctrine:migrations:migrate --no-interaction

fixtures: ## Loading data fixtures
	bin/console hautelook:fixtures:load

install: db assets ## Install dependencies, assets and database

test: vendor ## Launches functional tests
	bin/phpunit

cache-clear: vendor ## Clear cache
	bin/console cache:clear