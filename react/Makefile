default: yarn.lock
	npx webpack

serve: yarn.lock
	npx webpack-dev-server --watch

release: yarn.lock
	NODE_ENV=production npx webpack

yarn.lock: node_modules package.json
	yarn install

node_modules:
	mkdir -p node_modules
