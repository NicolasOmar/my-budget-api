# My Budget API
RESTful API based on NodeJs to give middle/back-end support for a web client based on [Angular](https://master.d2i6kyeewx6g66.amplifyapp.com/).

## What do I need?
Before cloning this repo, I recommend installing the following software:
- [Node](https://nodejs.org/en/download/) >=12.16.1 to install packages
- [MongoDB](https://www.mongodb.com/download-center/community) >=4.2.3 to have a local database
- [Robo 3T](https://robomongo.org/download) to visualize data
- [Postman](https://www.postman.com/downloads/) to test API endopints

## Setup
After cloning the repo, go to the created folder and install the node packages.
```sh
git clone https://github.com/NicolasOmar/my-budget-api.git
cd my-budget-api
npm install
```

## How to run it
To run it correctly (as a non-stopping server using local environment variables), I modified the `start` command by adding [nodemon](https://www.npmjs.com/package/nodemon) and [env-cmd](https://www.npmjs.com/package/env-cmd). So just run the following line:
```sh
npm start
```

## Branches and Environments
To maintain better code tracking in time, I decided to separate the development process into two branches with their respective environments.
Those environments are being hosted on [DigitalOcean](https://www.digitalocean.com/) and connected to a [MongoDB instance](https://account.mongodb.com/) as database service.
| Branch | Version | Coverage | Environment | Usage |
| :--- | :---: | :---: | :--- | :--- |
| master | ![My Budget API (master branch)](https://img.shields.io/github/package-json/v/nicolasomar/my-budget-api/master?color=success&label=%20&style=flat-square) | ![My Budget API Coverage (master branch)](https://img.shields.io/codecov/c/github/nicolasomar/my-budget-api/master?label=%20&style=flat-square&logo=codecov) | [Production](https://my-budget-api-prod-ebnaf.ondigitalocean.app/) | Stable version
| develop | ![My Budget API (develop branch)](https://img.shields.io/github/package-json/v/nicolasomar/my-budget-api/develop?color=yellow&label=%20&style=flat-square) | ![My Budget API Coverage (develop branch)](https://img.shields.io/codecov/c/github/nicolasomar/my-budget-api/develop?label=%20&style=flat-square&logo=codecov) | [Development](https://my-budget-api-dev-lq4w6.ondigitalocean.app/) | Working on next iteration |

## Find out more
| [Documentation](https://nicolasomar.github.io/my-budget-docs) | [Project Status](https://trello.com/b/R6Yn7vb0/mybudget) | [Angular Repo](https://github.com/NicolasOmar/my-budget) |
| :--- | :--- | :--- |
| Documentation page for analysis and technical reference | Trello board for project status & tracking | Angular front-end repository |

## License
**MIT**
