# My Budget API
RESTful API based on NodeJs to give middle/back-end support for upcomming Angular and [React](https://mybudget-react.herokuapp.com/) web applications.

## What do i need?
Before clone this repo, i recommend install the following software:
- [Node](https://nodejs.org/en/download/) >=12.16.1 to install packages
- [MongoDB](https://www.mongodb.com/download-center/community) >=4.2.3 to have a local database
- [Robo 3T](https://robomongo.org/download) to visualize data
- [Postman](https://www.postman.com/downloads/) to test [API endopints](https://github.com/NicolasOmar/my-budget-api/wiki/API-reference)

## Setup
After cloning the repo, just install the node packages in project´s root file.
```sh
git clone https://github.com/NicolasOmar/my-budget-api.git
cd my-budget-api
npm install
```

## How to run it
Before asking, i do not recommend `npm start` because it is reserved for heroku deploy process.
Therefore, i added another option based on [nodemon](https://www.npmjs.com/package/nodemon) to run it as a non-stopping server
```sh
npm run local
```

## Branches and Environments
To mantain a better code tracking in time, i resolved to mantain two branches with its respective environments.
Those environments are been build deployed on [Heroku](https://www.heroku.com/) using [MongoDB](https://account.mongodb.com/) as database service.
| Branch | Environment | Usage |
| ------ | ------ | ------ |
| master | [mybudget-api](https://mybudget-api.herokuapp.com/) | Stable version
| in-progress | [mybudget-api-dev](https://mybudget-api-dev.herokuapp.com/) | Working on next iteration

## Find out more
| [Project Docs](https://github.com/NicolasOmar/my-budget-api/wiki/Project-documentation) | [Technical Docs](https://github.com/NicolasOmar/my-budget-api/wiki/Technical-documentation) | [Changelog](https://github.com/NicolasOmar/my-budget-api/blob/master/CHANGELOG.md) |
| ----- | ----- | ----- |
| Documentation related to project aspects (objective, features & roadmap) | Documentation related to technical aspects (used packages, testing mechanisms) | List of features and bug fixes included on each iteration/release |

## License
**MIT**