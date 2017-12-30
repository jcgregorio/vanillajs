default: yarn.lock
	npx webpack

dev: yarn.lock
	npx webpack-dev-server

yarn.lock: node_modules package.json
	yarn install

node_modules:
	mkdir -p node_modules
