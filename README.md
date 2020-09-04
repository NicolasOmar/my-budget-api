# My Budget API
RESTful API based on NodeJs to give middle/back-end support for web clients based on [Angular](https://mybudget-angular.herokuapp.com/) and [React](https://mybudget-react.herokuapp.com/).

## What do I need?
Before cloning this repo, I recommend installing the following software:
- [Node](https://nodejs.org/en/download/) >=12.16.1 to install packages
- [MongoDB](https://www.mongodb.com/download-center/community) >=4.2.3 to have a local database
- [Robo 3T](https://robomongo.org/download) to visualize data
- [Postman](https://www.postman.com/downloads/) to test [API endopints](https://github.com/NicolasOmar/my-budget-api/wiki/API-reference)

## Setup
After cloning the repo, go to the created folder and install the node packages.
```sh
git clone https://github.com/NicolasOmar/my-budget-api.git
cd my-budget-api
npm install
```

## How to run it
Before asking, I do not recommend `npm start` because it's reserved for the Heroku deploy process.
Therefore, I added another option based on [nodemon](https://www.npmjs.com/package/nodemon) to run it as a non-stopping server
```sh
npm run local
```

## Branches and Environments
To maintain a better code tracking in time, I decided to separate two branches with its respective environments.
Those environments are being built and deployed on [Heroku](https://www.heroku.com/) using [MongoDB](https://account.mongodb.com/) as database service.
| Branch | Environment | Usage |
| ------ | ------ | ------ |
| master | [mybudget-api](https://mybudget-api.herokuapp.com/) | Stable version
| in-progress | [mybudget-api-dev](https://mybudget-api-dev.herokuapp.com/) | Working on next iteration |

## Find out more
| [Documentation](https://nicolasomar.github.io/my-budget-docs) | [Project Status](https://trello.com/b/R6Yn7vb0/mybudget) | [Changelog](https://github.com/NicolasOmar/my-budget-angular/blob/master/CHANGELOG.md) |
| ----- | ----- | ----- |
| Documentation related to project (objective, features & roadmap) & technical aspects (used packages, testing mechanisms) | Project board to track current status | List of features and bug fixes included on each iteration/release |

## License
**MIT**