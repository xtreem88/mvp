# Setup Instructions

## Backend
#### Install dependencies

```bash
$ npm i
```

#### Installing pm2
```bash
$ npm i -g pm2
```

#### Environments

Copy `.env.example` to `.env` and set environments

#### Install database driver

- **PostgresSQL**
```bash
$ npm install --save pg pg-hstore
```

- **MySQL**
```bash
$ npm install --save mysql2
```

- **MariaDB**
```bash
$ npm install --save mariadb
```

- **SQLite**
```bash
$ npm install --save sqlite3
```

- **SQL Server**
```bash
$ npm install --save tedious
```

###  Running

```bash
$ npm run dev
```

### Building

#### DEV

```bash
$ npm run build:dev
```

#### PROD

```bash
$ npm run build
```

### Testing

For unit tests and integration tests with coverage, run
```bash
$ npm run test
```

## Frontend

### Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

### Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

### Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

### Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

### Running end-to-end tests

Run `npm run cypress:run` to execute the end-to-end tests via [Cypress](https://www.cypress.io/).

### Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.


## Implementation
### Frontend
- Frontend is built with Angular
- [@ngrx](https://ngrx.io/) was used for state management
- An Api service is used (as a singleton) by all service to make http calls
- The pagination state is separated from product state because the product state uses `entites` from [@ngrx/data](https://v10.ngrx.io/guide/data)
- A role guard is used to protect pages that require certain roles
- After cloning, run `npm install`
- To run the app use `ng serve`
- An accessibility test is added to cypress
- The e2e tests can be run with `npm run cypress:run`
- To run unit tests use `ng test`
- Frontend documentation is generated into the `documentation` folder
- The documentation is already generated and can be viewed in a browser
- To generate new documentation, run `npm run compodoc`
- To view the documantation, open `index.html` in your browser
- The project dependencies are listed in the documentation

### Backend
- Backend is built with Node(Typescript) and Sequelize
- Every route is generated from a module
- Tables are created automatically (if they dont exist) when server starts
- The modules have controllers, models and services
- The controllers and services inheret from their parent classes and share methods and attributes (e.g. helper functions for http responses and data)
- The services read and write to the database via a repository (Sequelize)
- There are middlewares for authentication, access control and validation and security
- A middleware for generating swagger docs was used
- visit `/api-docs` to view the docs
- More info about the middleware can be found [here](https://www.npmjs.com/package/express-swagger-ui-generator)
- To start the API server, Follow the instructions above

## Future work (Todo)
- Use stateful api tokens for backend so that sessions can be destroyed and multiple sessions can be tracked
- Better error handling for frontend and backend
- Error logging for frontend and backend
- Docker containers for frontend and backend
- Add tooltip for user inputs
- Add form validation message on frontend
- Better UX feedback and feedforward for frontend (e.g. when submitting a form, there should be visual feedback about what is happening)
- Better unit testing on the backend
- Server side rendering for frontend to improve performance
- Frontend e2e testing
- More api tests for backend API endpoints
- A 404 page on frontend
- Better accessibility features
- Use wrapper components for third party components used on frontend
- Use backend services for all database interactions
- Use better naming on frontend and backend (e.g. `VendingComponent` should be something like `DepositComponent`)
- More consistency for api response structure
- Documentation for backend
