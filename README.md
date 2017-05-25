# Typescript-restful-starter
Node.js + ExpressJS + SequelizeJS + Typescript + JWT + ES2015 + Clustering + Tslint
------------
# What use this Starter App?
- **JWT** for protect routes.
- **Clustering mode** for load many forks depending of the CPU's units.
- **Sequalize** for ORM.
- **ES2015** with the last of javascript like promises and async/await
##Structure
```json
/app
	/controllers (Controllers of the app)
	/middlewares (Middlewares for the routes of the app)
	/routes (Routes for Controllers of the app)
	/service (Services for using in any Controller)
	/models (Models configuration for use)
	Router.ts (Config file for Routing)
/config
	/db (DB configuration for use)
/tasks
	migrate.ts (Script file for create the table for the test case)
config.ts (Config file for the app)
tsconfig.json (File configuration typescript)
tslint.json (File configuration rules typescript)
server.ts (Main file to start the app)
```
# Install
1. First clone this repository.
		https://github.com/camesine/restful-starter.git
2. Download all dependencies.
		npm install
3. Edit the file config/config.ts with your own settings:
```json
	{
		SECRET: "HltH3R3",
		PORT: 1344,
		DATABASE: {
		SERVER: "127.0.0.1",
			DB: "test",
			USER: "root",
			PASSWORD: "",
			DIALECT: "mariadb",
		},
	}
```
## Global dependencies
Typescript, nodemon and ts-node for development
## Start App
When execute any of this commands the app start with clustering, creating many cluster apps depending of the numbers of CPU's your computer had.
## Development
		npm run dev -> (nodemon --watch '**/*.ts' --exec 'ts-node' server.ts)
	In Development mode the express app is starter with nodemon for automatic refresh when do changes.
## Production
		npm start -> (ts-node server.ts)
