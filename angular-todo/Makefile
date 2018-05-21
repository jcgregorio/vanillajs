default: package-lock.json
	npx webpack --mode=development

serve: package-lock.json
	npx webpack-dev-server --watch

release: package-lock.json
	npx webpack --mode=production

package-lock.json: package.json
	npm update
