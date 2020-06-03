# Typescript-restful-starter
Node.js + ExpressJS + TypeOrm + Typescript + JWT + ES2015 + Clustering + Tslint + Mocha + Chai + Supertest
------------
# What use is this Starter App?
- **JWT** for protecting routes.
- **Clustering mode** for loading many forks depending of the CPU's units.
- **Typeorm** for ORM.
- **ES2015** the lastest javascript version has promises and async/await
- **Mocha - Chai** for testing
- **Supertest** to load the entire server into the tests seamlessly

## Structure
```json
/app
	/controllers (Controllers of the app)
	/middlewares (Middlewares for the routes of the app)
	/routes (Routes for Controllers of the app)
	/service (Services for using in any Controller)
	/entity (Models configuration for use)
	/repository (Custom queries)
/config
	/Router.ts (Config file for Routing)
	/Database (DB configuration for use)
	/Server.ts (Server configuration)
config.ts (Config file for the app)
tsconfig.json (File configuration typescript)
tslint.json (File configuration rules typescript)
Index.ts (Main file to start the app)
```
# Install
1. First clone this repository.
		
		git@github.com:camesine/Typescript-restful-starter.git
		
2. Download all dependencies.

		npm install
		
3. Edit the file `./env` and add config database like:

```js
#
# APPLICATION
#
APP_NAME=restful-starter-server
APP_SCHEMA=http
APP_HOST=localhost
APP_PORT=3000

APP_SECRET=HltH3R3


#
# MySQL DATABASE
#
# mysql or mariadb
TYPEORM_CONNECTION=mariadb
TYPEORM_HOST=localhost
TYPEORM_PORT=3306
TYPEORM_USERNAME=root
TYPEORM_PASSWORD=root
TYPEORM_DATABASE=test
TYPEORM_SYNCHRONIZE=true
TYPEORM_LOGGING=error
TYPEORM_LOGGER=advanced-console

#
# PATH STRUCTRUE
#
TYPEORM_ENTITIES=app/models/**/*.ts
TYPEORM_ENTITIES_DIR=app/models
```

# Start App
When execute any of this commands the app start with clustering, creating many cluster apps depending of the numbers of CPU's your computer had.
### Development: In Development mode, the express app is started with nodemon for automatic refresh when changes are made.
	npm run dev
### Test: Run test in development environment
	npm test
### Production: Run app in production environment
	npm start
