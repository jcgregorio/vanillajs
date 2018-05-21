default: package-lock.json
	npx webpack --mode=development

serve: package-lock.json
	npx webpack-dev-server --watch

release: package-lock.json
	npx webpack --mode=production

package-lock.json: node_modules package.json
	npm update

node_modules:
	mkdir -p node_modules
