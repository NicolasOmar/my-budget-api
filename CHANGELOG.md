# Changelog

## [v0.1.0](https://github.com/NicolasOmar/my-budget-api/compare/0.0.3...0.1.0)

### Enhancements
 - Unit testing and Mocks added for `User` and `Transaction` endpoints
 - Changes on `User` and `Transaction` entities according to business analysis

## [v0.0.3](https://github.com/NicolasOmar/my-budget-api/compare/0.0.2...0.0.3)

### Enhancements
 - Added Jest as the Unit testing library with first tests

## [v0.0.2](https://github.com/NicolasOmar/my-budget-api/compare/0.0.1...0.0.2)

### Features
 - `Transaction` entity added as a relationship `n to 1` User
 - Transaction endpoints added for `CREATE` and `READ` methods

### Enhancements
 - Index page added to render a welcome message to the user when hits the main url

### Bug Fixes
 - Cors issue in enviroment request solved including [cors package](https://www.npmjs.com/package/cors)
 - User `GET` 500 error solved

## [v0.0.1](https://github.com/NicolasOmar/my-budget-api/commit/811febdc18879cff2eec1062045ccb03ac7e205e)

### Features
 - Basic Node structure added
 - `User` entity added
 - User endpoints added for `CREATE`, `READ`, `UPDATE` and `DELETE` methods
 - Authentication middleware added
 - Evironment configuration and variables added for future deployments