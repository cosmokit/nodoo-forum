.SILENT:
.PHONY: install test server help cache-clear assets watch db fixtures doc server

.DEFAULT_GOAL = help

help:
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}'

doc: ## Generate table of contents for README.md
	npx doctoc ./README.md

composer.lock: composer.json
	composer update

vendor: composer.lock
	composer install

yarn.lock: package.json
	yarn upgrade

node_modules: yarn.lock
	yarn install

assets: node_modules ## Compiling assets with Webpack Encore
	yarn run dev

watch: node_modules ## Live compilation assets with Webpack Encore
	yarn run dev-server

db: vendor ## Database creation
	-bin/console doctrine:database:drop --if-exists --force
	-bin/console doctrine:database:create --if-not-exists
	bin/console doctrine:migrations:migrate --no-interaction

fixtures: ## Fixtures loading
	bin/console hautelook:fixtures:load--no-interaction

install: db assets ## Install dependencies & assets

test: vendor ## Start functionnal tests
	bin/phpunit

cache-clear: vendor ## Clear cache
	bin/console cache:clear